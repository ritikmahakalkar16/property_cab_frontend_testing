"use client";

import { useState, useEffect } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle, XCircle, Eye } from 'lucide-react';

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
  agent_id: string;
}

const AdminPropertyApproval = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchPendingProperties();
  }, []);

  const fetchPendingProperties = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/properties?status=pending');
      if (!response.ok) throw new Error('Failed to load pending properties');
      const data = await response.json();

      const typedData = (data || []).map((item: any) => ({
        ...item,
        id: item._id || item.id,
      }));
      setProperties(typedData);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load pending properties',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (propertyId: string, newStatus: 'approved' | 'rejected') => {
    setProcessingId(propertyId);

    try {
      const response = await fetch(`/api/properties/${propertyId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error(`Failed to ${newStatus === 'approved' ? 'approve' : 'reject'} property`);

      toast({
        title: 'Success',
        description: `Property ${newStatus === 'approved' ? 'approved' : 'rejected'} successfully`,
      });
      fetchPendingProperties();
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${newStatus === 'approved' ? 'approve' : 'reject'} property`,
        variant: 'destructive',
      });
    } finally {
      setProcessingId(null);
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
          <CardTitle>Pending Property Approvals</CardTitle>
          <CardDescription>No pending properties to review</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Property Approvals</CardTitle>
        <CardDescription>Review and approve property listings ({properties.length} pending)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {properties.map((property) => (
          <div key={property.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-4">
              {property.images && property.images[0] && (
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-24 h-24 object-cover rounded"
                />
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{property.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {property.address}, {property.city}, {property.state}
                </p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline">{property.property_type}</Badge>
                  <Badge variant="outline">{property.listing_type}</Badge>
                  <Badge variant="secondary">${property.price.toLocaleString()}</Badge>
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
                onClick={() => handleApproval(property.id, 'approved')}
                disabled={processingId === property.id}
              >
                {processingId === property.id ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <CheckCircle className="h-4 w-4 mr-2" />
                )}
                Approve
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleApproval(property.id, 'rejected')}
                disabled={processingId === property.id}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AdminPropertyApproval;
