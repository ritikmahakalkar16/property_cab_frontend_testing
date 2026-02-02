"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Search,
    Filter,
    MoreHorizontal,
    CheckCircle2,
    XCircle,
    Eye,
    Edit,
    Trash2,
    Building2
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';

// Mock Data
const mockProperties = [
    { id: 'PROP-001', title: 'Luxury Villa in Palm Springs', type: 'Sale', price: '$1,200,000', location: 'California, USA', status: 'Pending', agent: 'Alice Johnson', date: '2024-02-01' },
    { id: 'PROP-002', title: 'Modern Apartment Downtown', type: 'Rent', price: '$2,500/mo', location: 'New York, USA', status: 'Approved', agent: 'Bob Smith', date: '2024-01-28' },
    { id: 'PROP-003', title: 'Cozy Cottage by the Lake', type: 'Sale', price: '$450,000', location: 'Michigan, USA', status: 'Approved', agent: 'Charlie Brown', date: '2024-01-25' },
    { id: 'PROP-004', title: 'Commercial Office Space', type: 'Rent', price: '$5,000/mo', location: 'Chicago, USA', status: 'Rejected', agent: 'David Lee', date: '2024-01-20' },
    { id: 'PROP-005', title: 'Seaside Condo with View', type: 'Sale', price: '$850,000', location: 'Florida, USA', status: 'Pending', agent: 'Eve Wilson', date: '2024-02-02' },
    { id: 'PROP-006', title: 'Industrial Warehouse', type: 'Rent', price: '$12,000/mo', location: 'Texas, USA', status: 'Approved', agent: 'Frank Wright', date: '2024-01-15' },
];

export default function AdminPropertiesPage() {
    const [properties, setProperties] = useState(mockProperties);
    const [searchTerm, setSearchTerm] = useState('');

    const handleStatusChange = (id: string, newStatus: string) => {
        setProperties(properties.map(p => p.id === id ? { ...p, status: newStatus } : p));
        toast.success(`Property ${newStatus} successfully`);
    };

    const handleDelete = (id: string) => {
        setProperties(properties.filter(p => p.id !== id));
        toast.success("Property deleted");
    };

    const filteredProperties = properties.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.agent.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Approved': return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">Approved</Badge>;
            case 'Pending': return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200">Pending Review</Badge>;
            case 'Rejected': return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200">Rejected</Badge>;
            default: return <Badge variant="secondary">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Properties</h1>
                    <p className="text-slate-500">Manage listings, review approvals, and monitor property status.</p>
                </div>
                <Button className="bg-slate-900 text-white hover:bg-slate-800">
                    <Building2 className="w-4 h-4 mr-2" />
                    Add New Property
                </Button>
            </div>

            <Card className="border-slate-200 shadow-sm">
                <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search properties..."
                                className="pl-9 bg-slate-50 border-slate-200"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="h-9">
                                <Filter className="w-4 h-4 mr-2" />
                                Filter
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="all" className="w-full">
                        <TabsList className="mb-4 bg-slate-100 p-1">
                            <TabsTrigger value="all">All Properties</TabsTrigger>
                            <TabsTrigger value="pending">Pending Approval</TabsTrigger>
                            <TabsTrigger value="approved">Active Listings</TabsTrigger>
                        </TabsList>

                        <TabsContent value="all" className="mt-0">
                            <div className="rounded-md border border-slate-200 overflow-hidden">
                                <Table>
                                    <TableHeader className="bg-slate-50">
                                        <TableRow>
                                            <TableHead className="w-[300px]">Property Details</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead>Agent</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Date Added</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredProperties.length > 0 ? (
                                            filteredProperties.map((property) => (
                                                <TableRow key={property.id} className="hover:bg-slate-50/50 transition-colors">
                                                    <TableCell>
                                                        <div className="flex flex-col">
                                                            <span className="font-medium text-slate-900">{property.title}</span>
                                                            <span className="text-xs text-slate-500">{property.location}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline" className="font-normal">{property.type}</Badge>
                                                    </TableCell>
                                                    <TableCell className="font-medium">{property.price}</TableCell>
                                                    <TableCell>
                                                        <div className="text-sm">{property.agent}</div>
                                                    </TableCell>
                                                    <TableCell>
                                                        {getStatusBadge(property.status)}
                                                    </TableCell>
                                                    <TableCell className="text-muted-foreground text-sm">
                                                        {property.date}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                                    <span className="sr-only">Open menu</span>
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                                <DropdownMenuItem className="cursor-pointer">
                                                                    <Eye className="mr-2 h-4 w-4" /> View Details
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem className="cursor-pointer">
                                                                    <Edit className="mr-2 h-4 w-4" /> Edit Property
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                {property.status === 'Pending' && (
                                                                    <>
                                                                        <DropdownMenuItem
                                                                            className="cursor-pointer text-green-600 focus:text-green-700"
                                                                            onClick={() => handleStatusChange(property.id, 'Approved')}
                                                                        >
                                                                            <CheckCircle2 className="mr-2 h-4 w-4" /> Approve
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem
                                                                            className="cursor-pointer text-amber-600 focus:text-amber-700"
                                                                            onClick={() => handleStatusChange(property.id, 'Rejected')}
                                                                        >
                                                                            <XCircle className="mr-2 h-4 w-4" /> Reject
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuSeparator />
                                                                    </>
                                                                )}
                                                                <DropdownMenuItem
                                                                    className="cursor-pointer text-red-600 focus:text-red-700"
                                                                    onClick={() => handleDelete(property.id)}
                                                                >
                                                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={7} className="h-24 text-center text-slate-500">
                                                    No properties found.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>
                        <TabsContent value="pending" className="mt-0">
                            {/* Reusing existing logic for simplicity in demo */}
                            <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                                <p>Filter logic to be implemented on backend or robust client-side filtering.</p>
                            </div>
                        </TabsContent>
                        <TabsContent value="approved" className="mt-0">
                            <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                                <p>Filter logic to be implemented on backend or robust client-side filtering.</p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
