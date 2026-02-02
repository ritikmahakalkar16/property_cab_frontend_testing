"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, Plus, MoreVertical, Edit, Trash, Users } from 'lucide-react';
import { toast } from 'sonner';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock Data
const mockEvents = [
    {
        id: 1,
        title: 'Luxury Home Showcase 2024',
        date: '2024-03-15',
        time: '10:00 AM - 4:00 PM',
        location: 'Grand Ballroom, City Center',
        status: 'Upcoming',
        attendees: 124,
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&q=80',
        description: 'An exclusive exhibition of the finest properties in the region.'
    },
    {
        id: 2,
        title: 'Real Estate Investment Summit',
        date: '2024-04-05',
        time: '09:00 AM - 5:00 PM',
        location: 'Business Hub Auditorium',
        status: 'Upcoming',
        attendees: 85,
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&q=80',
        description: 'Join industry experts to discuss the future of real estate investment.'
    },
    {
        id: 3,
        title: 'Agent Networking Night',
        date: '2024-02-10',
        time: '06:00 PM - 9:00 PM',
        location: 'The Roof Garden',
        status: 'Past',
        attendees: 45,
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&q=80',
        description: 'A casual evening for agents to connect and share insights.'
    },
    {
        id: 4,
        title: 'First-Time Homebuyer Workshop',
        date: '2024-03-22',
        time: '02:00 PM - 4:00 PM',
        location: 'Community Center Hall B',
        status: 'Upcoming',
        attendees: 30,
        image: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=500&q=80',
        description: 'Essential tips and tricks for purchasing your first home.'
    }
];

export default function AdminEventsPage() {
    const [events, setEvents] = useState(mockEvents);

    const handleDelete = (id: number) => {
        setEvents(events.filter(e => e.id !== id));
        toast.success("Event cancelled successfully");
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Events Management</h1>
                    <p className="text-slate-500">Schedule and manage upcoming property events and workshops.</p>
                </div>
                <Button className="bg-slate-900 text-white hover:bg-slate-800">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Event
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <Card key={event.id} className="overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={event.image}
                                alt={event.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-3 left-3">
                                <Badge className={event.status === 'Upcoming' ? 'bg-blue-600' : 'bg-slate-500'}>
                                    {event.status}
                                </Badge>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button size="icon" variant="secondary" className="absolute top-3 right-3 h-8 w-8 bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem className="cursor-pointer">
                                        <Edit className="mr-2 h-4 w-4" /> Edit Event
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="cursor-pointer text-red-600 focus:text-red-700"
                                        onClick={() => handleDelete(event.id)}
                                    >
                                        <Trash className="mr-2 h-4 w-4" /> Cancel Event
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-lg font-bold leading-tight mb-1">
                                        {event.title}
                                    </CardTitle>
                                    <CardDescription className="line-clamp-2 mt-1">
                                        {event.description}
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-3 flex-1">
                            <div className="flex items-center text-sm text-slate-500">
                                <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                                {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })}
                            </div>
                            <div className="flex items-center text-sm text-slate-500">
                                <Clock className="w-4 h-4 mr-2 text-slate-400" />
                                {event.time}
                            </div>
                            <div className="flex items-center text-sm text-slate-500">
                                <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                                {event.location}
                            </div>
                        </CardContent>

                        <CardFooter className="pt-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                            <div className="flex items-center text-sm font-medium text-slate-600">
                                <Users className="w-4 h-4 mr-2" />
                                {event.attendees} registered
                            </div>
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                Manage
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
