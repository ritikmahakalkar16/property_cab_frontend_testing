"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Search,
    MessageSquare,
    Phone,
    Mail,
    ArrowRight,
    CheckCircle2,
    Clock,
    Archive
} from 'lucide-react';
import { toast } from 'sonner';

// Mock Data
const mockLeads = [
    { id: 'LEAD-001', name: 'John Doe', email: 'john@gmail.com', phone: '+1 (555) 123-4567', property: 'Sunset Villa', date: '2 min ago', message: 'Hi, I am interested in this property. Is it still available?', status: 'New' },
    { id: 'LEAD-002', name: 'Sarah Connor', email: 'sarah@skynet.com', phone: '+1 (555) 987-6543', property: 'Industrial Warehouse', date: '3 hours ago', message: 'I would like to schedule a viewing for next Tuesday.', status: 'Contacted' },
    { id: 'LEAD-003', name: 'James Smith', email: 'james@yahoo.com', phone: '+1 (555) 456-7890', property: 'Modern Apartment', date: '1 day ago', message: 'What is the HOA fee for this unit?', status: 'New' },
    { id: 'LEAD-004', name: 'Emma Watson', email: 'emma@hollywood.com', phone: '+1 (555) 111-2222', property: 'Cozy Cottage', date: '2 days ago', message: 'Does this property allow pets?', status: 'Closed' },
    { id: 'LEAD-005', name: 'Michael Jordan', email: 'mj@bulls.com', phone: '+1 (555) 232-4545', property: 'Luxury Villa', date: '3 days ago', message: 'I am looking to buy immediately. Cash offer.', status: 'Contacted' },
];

export default function AdminLeadsPage() {
    const [leads, setLeads] = useState(mockLeads);
    const [searchTerm, setSearchTerm] = useState('');

    const handleStatusUpdate = (id: string, newStatus: string) => {
        setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
        toast.success(`Marked as ${newStatus}`);
    };

    const StatusBadge = ({ status }: { status: string }) => {
        switch (status) {
            case 'New': return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200">New</Badge>;
            case 'Contacted': return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200">Contacted</Badge>;
            case 'Closed': return <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100 border-slate-200">Closed</Badge>;
            default: return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Leads & Inquiries</h1>
                <p className="text-slate-500">Track and manage incoming messages from potential clients.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
                <Card className="md:col-span-3 border-slate-200 shadow-sm">
                    <CardHeader className="pb-3 border-b border-slate-100">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-bold">Recent Inquiries</CardTitle>
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Search leads..."
                                    className="pl-9 h-9 bg-slate-50 border-slate-200"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-slate-50/50">
                                <TableRow>
                                    <TableHead className="w-[250px] pl-6">Client Details</TableHead>
                                    <TableHead>Interest</TableHead>
                                    <TableHead>Message Preview</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right pr-6">Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {leads.filter(l => l.name.toLowerCase().includes(searchTerm.toLowerCase()) || l.property.toLowerCase().includes(searchTerm.toLowerCase())).map((lead) => (
                                    <TableRow key={lead.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                                        <TableCell className="pl-6 font-medium">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9 bg-blue-100 text-blue-600 border border-blue-200">
                                                    <AvatarFallback>{lead.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col">
                                                    <span className="text-slate-900 font-semibold">{lead.name}</span>
                                                    <span className="text-xs text-slate-500">{lead.email}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-slate-700">{lead.property}</span>
                                                <span className="text-xs text-slate-500">Property Inquiry</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-sm text-slate-600 truncate max-w-[200px]">{lead.message}</p>
                                        </TableCell>
                                        <TableCell>
                                            <StatusBadge status={lead.status} />
                                        </TableCell>
                                        <TableCell className="text-right pr-6 text-slate-500 text-xs">
                                            {lead.date}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Quick Lead Stats / Focus */}
                <div className="space-y-6">
                    <Card className="bg-slate-900 text-white border-0 shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-lg">Lead Performance</CardTitle>
                            <CardDescription className="text-slate-400">Response metrics this week</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                <span className="text-slate-400">New Leads</span>
                                <span className="text-2xl font-bold">24</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                <span className="text-slate-400">Response Time</span>
                                <span className="text-xl font-bold text-green-400">1.2 hrs</span>
                            </div>
                            <div className="flex justify-between items-center pb-2">
                                <span className="text-slate-400">Conversion Rate</span>
                                <span className="text-xl font-bold text-blue-400">12%</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-200 shadow-sm bg-blue-50/50">
                        <CardHeader>
                            <CardTitle className="text-sm font-semibold text-blue-900 uppercase tracking-wider flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                Action Required
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {leads.filter(l => l.status === 'New').slice(0, 3).map(lead => (
                                    <div key={lead.id} className="bg-white p-3 rounded-lg border border-blue-100 shadow-sm">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="font-bold text-slate-800 text-sm">{lead.name}</span>
                                            <span className="text-[10px] text-slate-400">{lead.date}</span>
                                        </div>
                                        <p className="text-xs text-slate-600 line-clamp-2 mb-3">{lead.message}</p>
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                className="h-7 text-xs w-full bg-blue-600 hover:bg-blue-700"
                                                onClick={() => handleStatusUpdate(lead.id, 'Contacted')}
                                            >
                                                Reply
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="h-7 w-8 px-0"
                                                onClick={() => handleStatusUpdate(lead.id, 'Closed')}
                                            >
                                                <Archive className="w-3 h-3" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
