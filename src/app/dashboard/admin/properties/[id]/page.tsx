"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
    ArrowLeft,
    Edit,
    Trash2,
    CheckCircle,
    XCircle,
    Calendar,
    MapPin,
    Bed,
    Bath,
    Square,
    Eye,
    Star,
    ShieldCheck,
    Mail,
    Phone,
    Share2,
    ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';

// Mock Data
const mockProperty = {
    id: 'PROP-001',
    title: 'Luxury Villa in Palm Springs',
    description: 'A stunning modern villa with panoramic mountain views, featuring a private pool including a heated spa, expansive outdoor living space, and high-end finishes throughout. The property includes a state-of-the-art kitchen, home theater, and a spacious guest house.',
    price: '$1,200,000',
    type: 'Sale',
    propertyType: 'Villa',
    status: 'Pending',
    bedrooms: 5,
    bathrooms: 4,
    area: '4,500 sqft',
    address: '123 Palm Canyon Dr, Palm Springs, CA 92262',
    amenities: ['Pool', 'Gym', 'Garage', 'Garden', 'Smart Home', 'Security System'],
    featured: false,
    owner: {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        phone: '+1 (555) 123-4567',
        role: 'Agent',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
        joined: '2023-11-15'
    },
    images: [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
        'https://images.unsplash.com/photo-1613977257377-2342dbe50036?w=600&q=80',
        'https://images.unsplash.com/photo-1613545325278-324b81a0cd95?w=600&q=80'
    ],
    metadata: {
        views: 1245,
        favorites: 45,
        inquiries: 12,
        listedOn: '2024-02-01'
    }
};

export default function AdminPropertyDetailsPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [property, setProperty] = useState(mockProperty);

    const handleStatusUpdate = (newStatus: string) => {
        setProperty({ ...property, status: newStatus });
        toast.success(`Property marked as ${newStatus}`);
    };

    const StatusBadge = ({ status }: { status: string }) => {
        switch (status) {
            case 'Approved': return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">Approved</Badge>;
            case 'Pending': return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200">Pending Review</Badge>;
            case 'Rejected': return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200">Rejected</Badge>;
            default: return <Badge variant="secondary">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-6 pb-20">
            {/* Top Navigation & Status Bar */}
            <div className="sticky top-0 z-30 bg-slate-50/80 backdrop-blur-md pb-4 pt-2 -mx-4 px-4 lg:-mx-8 lg:px-8 border-b border-slate-200/50 mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
                            <ArrowLeft className="h-5 w-5 text-slate-500" />
                        </Button>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                {property.id}
                                <StatusBadge status={property.status} />
                            </h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" className="hidden sm:flex" onClick={() => window.open(`/properties/${params.id}`, '_blank')}>
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live View
                        </Button>
                        <Button variant="outline" onClick={() => router.push(`/dashboard/admin/properties/${params.id}/edit`)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                        </Button>
                        <div className="h-6 w-px bg-slate-200 mx-1" />
                        {property.status === 'Pending' && (
                            <>
                                <Button
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                    onClick={() => handleStatusUpdate('Approved')}
                                >
                                    <CheckCircle className="w-4 h-4 mr-2" /> Approve
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => handleStatusUpdate('Rejected')}
                                >
                                    <XCircle className="w-4 h-4 mr-2" /> Reject
                                </Button>
                            </>
                        )}
                        {property.status === 'Approved' && (
                            <Button
                                variant="outline"
                                className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                                onClick={() => handleStatusUpdate('Pending')}
                            >
                                <XCircle className="w-4 h-4 mr-2" /> Unpublish
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column: Property Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Hero Image Grid */}
                    <div className="grid grid-cols-2 gap-2 h-[400px] rounded-2xl overflow-hidden shadow-sm">
                        <div className="col-span-2 md:col-span-1 h-full">
                            <img src={property.images[0]} alt="Cover" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div className="hidden md:grid grid-rows-2 gap-2 h-full">
                            <img src={property.images[1]} alt="Interior" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                            <img src={property.images[2]} alt="Detail" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                        </div>
                    </div>

                    <Card className="border-slate-200 shadow-sm">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <Badge variant="outline" className="mb-2 bg-slate-50 text-slate-600 border-slate-200">{property.type} • {property.propertyType}</Badge>
                                    <CardTitle className="text-2xl font-bold text-slate-900 mb-2">{property.title}</CardTitle>
                                    <div className="flex items-center text-slate-500 font-medium">
                                        <MapPin className="w-4 h-4 mr-1.5 text-blue-600" />
                                        {property.address}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-black text-blue-600 tracking-tight">{property.price}</div>
                                    {property.featured && <Badge className="bg-amber-400 text-slate-900 hover:bg-amber-500 mt-2">⭐ Featured</Badge>}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-100 mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Bed className="w-5 h-5" /></div>
                                    <div>
                                        <p className="text-sm text-slate-500 font-medium">Bedrooms</p>
                                        <p className="text-lg font-bold text-slate-900">{property.bedrooms}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Bath className="w-5 h-5" /></div>
                                    <div>
                                        <p className="text-sm text-slate-500 font-medium">Bathrooms</p>
                                        <p className="text-lg font-bold text-slate-900">{property.bathrooms}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Square className="w-5 h-5" /></div>
                                    <div>
                                        <p className="text-sm text-slate-500 font-medium">Area</p>
                                        <p className="text-lg font-bold text-slate-900">{property.area}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-slate-900">Description</h3>
                                <p className="text-slate-600 leading-relaxed">{property.description}</p>
                            </div>

                            <div className="space-y-4 mt-8">
                                <h3 className="text-lg font-bold text-slate-900">Amenities</h3>
                                <div className="flex flex-wrap gap-2">
                                    {property.amenities.map(item => (
                                        <div key={item} className="px-3 py-1.5 bg-slate-100 rounded-lg text-sm font-medium text-slate-700 border border-slate-200">
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Sidebar */}
                <div className="space-y-6">
                    {/* Stats Card */}
                    <Card className="bg-slate-900 text-white border-0 shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-lg">Performance Logs</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-white/10 rounded-xl space-y-1">
                                <div className="flex items-center gap-2 text-slate-300 text-xs uppercase font-bold tracking-wider">
                                    <Eye className="w-3 h-3" /> Views
                                </div>
                                <div className="text-2xl font-bold">{property.metadata.views}</div>
                            </div>
                            <div className="p-3 bg-white/10 rounded-xl space-y-1">
                                <div className="flex items-center gap-2 text-slate-300 text-xs uppercase font-bold tracking-wider">
                                    <Star className="w-3 h-3" /> Favorites
                                </div>
                                <div className="text-2xl font-bold">{property.metadata.favorites}</div>
                            </div>
                            <div className="p-3 bg-white/10 rounded-xl space-y-1 col-span-2">
                                <div className="flex items-center gap-2 text-slate-300 text-xs uppercase font-bold tracking-wider">
                                    <Mail className="w-3 h-3" /> Total Inquiries
                                </div>
                                <div className="text-2xl font-bold">{property.metadata.inquiries}</div>
                            </div>
                        </CardContent>
                        <CardFooter className="text-xs text-slate-400 border-t border-white/10 pt-4">
                            First listed on {new Date(property.metadata.listedOn).toLocaleDateString()}
                        </CardFooter>
                    </Card>

                    {/* Owner / Agent Details */}
                    <Card className="border-slate-200">
                        <CardHeader>
                            <CardTitle>Listing Owner</CardTitle>
                            <CardDescription>Contact details of the person who posted this.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-start gap-4 mb-4">
                                <Avatar className="h-12 w-12 border border-slate-200">
                                    <AvatarImage src={property.owner.avatar} />
                                    <AvatarFallback>{property.owner.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-bold text-slate-900">{property.owner.name}</p>
                                    <p className="text-xs font-semibold uppercase text-blue-600 bg-blue-50 inline-block px-1.5 py-0.5 rounded mt-1">{property.owner.role}</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 p-2 rounded-lg">
                                    <Mail className="w-4 h-4 text-slate-400" />
                                    {property.owner.email}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600 bg-slate-50 p-2 rounded-lg">
                                    <Phone className="w-4 h-4 text-slate-400" />
                                    {property.owner.phone}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="pt-2">
                            <Button variant="outline" className="w-full">View User Profile</Button>
                        </CardFooter>
                    </Card>

                    {/* Audit / Safety */}
                    <Card className="border-red-100 bg-red-50/30">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-red-700">
                                <ShieldCheck className="w-5 h-5" /> Safety & Audit
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 bg-white">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Property Permanently
                            </Button>
                            <p className="text-xs text-slate-500 mt-2">
                                Actions are logged. Deleting is irreversible.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
