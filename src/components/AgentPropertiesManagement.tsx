"use client";

import { useState, useEffect } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Edit, Trash2, Eye } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  price: number;
  property_type: string;
  listing_type: string;
  images: string[] | null;
  status: string;
  views: number | null;
  created_at: string | null;
}

const AgentPropertiesManagement = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  const getImageUrl = (image: string) => {
    if (!image) return '/placeholder.svg';
    if (image.startsWith("http") || image.startsWith("/uploads")) return image;
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jnrnlsqqujjqspaqyumw.supabase.co'}/storage/v1/object/public/property-images/${image}`;
  };

  useEffect(() => {
    if (user) {
      fetchAgentProperties();
    }
  }, [user]);

  const fetchAgentProperties = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/properties?agent_id=${user.id}`);
      if (!response.ok) throw new Error('Failed to load properties');
      const data = await response.json();

      const typedData = (data || []).map((item: any) => ({
        ...item,
        id: item._id || item.id,
      }));
      setProperties(typedData);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load your properties',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (propertyId: string) => {
    setDeleting(true);

    try {
      const response = await fetch(`/api/properties/${propertyId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete property');

      toast({
        title: 'Success',
        description: 'Property deleted successfully',
      });
      fetchAgentProperties();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete property',
        variant: 'destructive',
      });
    } finally {
      setDeleting(false);
      setDeleteDialog(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'rejected':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (properties.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Properties</CardTitle>
          <CardDescription>You haven't listed any properties yet</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => window.location.href = '/add-property'}>
            Add Your First Property
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>My Properties</CardTitle>
          <CardDescription>Manage all your property listings ({properties.length} total)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {properties.map((property) => (
            <div key={property.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-4">

                {property.images && property.images[0] && (
                  <img
                    src={getImageUrl(property.images[0])}
                    alt={property.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{property.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {property.address}, {property.city}, {property.state}
                      </p>
                    </div>
                    <Badge className={getStatusColor(property.status)}>
                      {property.status}
                    </Badge>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline">{property.property_type}</Badge>
                    <Badge variant="outline">{property.listing_type}</Badge>
                    <Badge variant="secondary">${property.price.toLocaleString()}</Badge>
                    <Badge variant="outline">{property.views || 0} views</Badge>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(`/properties/${property.id}`, '_blank')}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.location.href = `/edit-property/${property.id}`}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => setDeleteDialog(property.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialog !== null} onOpenChange={() => setDeleteDialog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Property</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this property? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteDialog && handleDelete(deleteDialog)}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AgentPropertiesManagement;
