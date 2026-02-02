"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Save, ArrowLeft, Upload, X, Home, MapPin, Image as ImageIcon, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

// Mock Data for "Initial" values
const mockProperty = {
    id: 'PROP-001',
    title: 'Luxury Villa in Palm Springs',
    description: 'A stunning modern villa with panoramic mountain views, featuring a private pool including a heated spa, expansive outdoor living space, and high-end finishes throughout.',
    price: 1200000,
    type: 'Sale',
    propertyType: 'Villa',
    status: 'Pending',
    bedrooms: 5,
    bathrooms: 4,
    area: 4500,
    address: '123 Palm Canyon Dr',
    city: 'Palm Springs',
    state: 'CA',
    zip: '92262',
    amenities: ['Pool', 'Gym', 'Garage', 'Garden', 'Smart Home', 'Security System'],
    featured: false,
    images: [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
        'https://images.unsplash.com/photo-1613977257377-2342dbe50036?w=800&q=80',
        'https://images.unsplash.com/photo-1613545325278-324b81a0cd95?w=800&q=80'
    ]
};

export default function EditPropertyPage({ params }: { params: { id: string } }) {
    // In a real app, use params.id to fetch data.
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // State to mimic form handling
    const [title, setTitle] = useState(mockProperty.title);
    const [price, setPrice] = useState(mockProperty.price.toString());
    const [featured, setFeatured] = useState(mockProperty.featured);

    const handleSave = () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            toast.success("Property updated successfully");
            router.push('/dashboard/admin/properties');
        }, 1200);
    };

    return (
        <div className="space-y-6 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Edit Property</h1>
                        <p className="text-slate-500 text-sm">Update listing details for {mockProperty.id}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
                    <Button onClick={handleSave} disabled={isLoading} className="bg-slate-900 text-white hover:bg-slate-800">
                        {isLoading ? "Saving..." : <><Save className="w-4 h-4 mr-2" /> Save Changes</>}
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="basic" className="w-full">
                <TabsList className="mb-6 bg-white border border-slate-200 p-1 rounded-xl w-full justify-start overflow-x-auto">
                    <TabsTrigger value="basic" className="data-[state=active]:bg-slate-100 flex-1 min-w-[100px]">
                        <Home className="w-4 h-4 mr-2" /> Basic Info
                    </TabsTrigger>
                    <TabsTrigger value="location" className="data-[state=active]:bg-slate-100 flex-1 min-w-[100px]">
                        <MapPin className="w-4 h-4 mr-2" /> Location
                    </TabsTrigger>
                    <TabsTrigger value="features" className="data-[state=active]:bg-slate-100 flex-1 min-w-[100px]">
                        <Sparkles className="w-4 h-4 mr-2" /> Features
                    </TabsTrigger>
                    <TabsTrigger value="media" className="data-[state=active]:bg-slate-100 flex-1 min-w-[100px]">
                        <ImageIcon className="w-4 h-4 mr-2" /> Media
                    </TabsTrigger>
                </TabsList>

                {/* Basic Info Tab */}
                <TabsContent value="basic" className="space-y-6">
                    <Card className="border-slate-200">
                        <CardHeader>
                            <CardTitle>Property Basics</CardTitle>
                            <CardDescription>Essential details about the listing.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Property Title</Label>
                                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Listing Types</Label>
                                    <Select defaultValue={mockProperty.type}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Sale">For Sale</SelectItem>
                                            <SelectItem value="Rent">For Rent</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Property Category</Label>
                                    <Select defaultValue={mockProperty.propertyType}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Villa">Villa</SelectItem>
                                            <SelectItem value="Apartment">Apartment</SelectItem>
                                            <SelectItem value="Office">Office</SelectItem>
                                            <SelectItem value="Plot">Plot</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="price">Price ($)</Label>
                                    <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="area">Area (sqft)</Label>
                                    <Input id="area" type="number" defaultValue={mockProperty.area} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" rows={5} defaultValue={mockProperty.description} />
                            </div>

                            <Separator className="my-2" />

                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                                <div>
                                    <h4 className="font-semibold text-slate-800">Featured Property</h4>
                                    <p className="text-sm text-slate-500">Highlight this property on the homepage.</p>
                                </div>
                                <Switch checked={featured} onCheckedChange={setFeatured} />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Location Tab */}
                <TabsContent value="location" className="space-y-6">
                    <Card className="border-slate-200">
                        <CardHeader>
                            <CardTitle>Address & Location</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="address">Street Address</Label>
                                <Input id="address" defaultValue={mockProperty.address} />
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" defaultValue={mockProperty.city} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="state">State</Label>
                                    <Input id="state" defaultValue={mockProperty.state} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="zip">Zip / Postal Code</Label>
                                    <Input id="zip" defaultValue={mockProperty.zip} />
                                </div>
                            </div>
                            <div className="h-64 bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
                                <p className="text-slate-400 font-medium flex items-center gap-2">
                                    <MapPin className="w-5 h-5" /> Map Preview (Mock)
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Features Tab */}
                <TabsContent value="features" className="space-y-6">
                    <Card className="border-slate-200">
                        <CardHeader>
                            <CardTitle>Amenities & Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="bedrooms">Bedrooms</Label>
                                    <Input id="bedrooms" type="number" defaultValue={mockProperty.bedrooms} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bathrooms">Bathrooms</Label>
                                    <Input id="bathrooms" type="number" defaultValue={mockProperty.bathrooms} />
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-3">
                                <Label>Select Amenities</Label>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                    {['Pool', 'Gym', 'Garage', 'Garden', 'Smart Home', 'Security System', 'Fireplace', 'Elevator', 'Air Conditioning', 'Heating', 'Solar Panels', 'Waterfront'].map((amenity) => (
                                        <div key={amenity} className="flex items-center space-x-2 p-2 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                                            <Switch id={`amenity-${amenity}`} defaultChecked={mockProperty.amenities.includes(amenity)} />
                                            <Label htmlFor={`amenity-${amenity}`} className="cursor-pointer font-normal">{amenity}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Media Tab */}
                <TabsContent value="media" className="space-y-6">
                    <Card className="border-slate-200">
                        <CardHeader>
                            <CardTitle>Photos & Videos</CardTitle>
                            <CardDescription>Manage property images. The first image will be the cover.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {mockProperty.images.map((img, i) => (
                                    <div key={i} className="relative group aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                                        <img src={img} alt={`Property ${i}`} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <Button size="icon" variant="destructive" className="h-8 w-8 rounded-full">
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                        {i === 0 && (
                                            <div className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded">
                                                Cover
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div className="aspect-square rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:border-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all cursor-pointer">
                                    <Upload className="w-8 h-8 mb-2" />
                                    <span className="text-xs font-semibold">Upload New</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
