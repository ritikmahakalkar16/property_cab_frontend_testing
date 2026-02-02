"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Calendar,
    MapPin,
    Users,
    Clock,
    ArrowRight,
    Building2,
    Ticket,
    CalendarCheck,
    Star,
    Loader2,
    SearchX
} from "lucide-react";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface Event {
    _id: string;
    title: string;
    description: string;
    fullDescription: string;
    date: string;
    time: string;
    location: string;
    venue: string;
    type: "expo" | "exhibition" | "customer-meet" | "webinar";
    image: string;
    attendees?: number;
    isPast: boolean;
    highlights?: string[];
    gallery: string[];
}

interface EventsClientProps {
    initialUpcomingEvents?: Event[];
    initialPastEvents?: Event[];
}

const EventsClient = ({ initialUpcomingEvents, initialPastEvents }: EventsClientProps) => {
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>(initialUpcomingEvents || []);
    const [pastEvents, setPastEvents] = useState<Event[]>(initialPastEvents || []);
    const [loading, setLoading] = useState(!initialUpcomingEvents);

    useEffect(() => {
        if (initialUpcomingEvents) {
            setLoading(false);
            return;
        }

        const fetchEvents = async () => {
            try {
                const [upRes, pastRes] = await Promise.all([
                    fetch(`${API_URL}/api/v1/events/upcoming`),
                    fetch(`${API_URL}/api/v1/events/past`)
                ]);

                const upData = await upRes.json();
                const pastData = await pastRes.json();

                setUpcomingEvents(upData.data || []);
                setPastEvents(pastData.data || []);
            } catch (error) {
                console.error("Failed to fetch events", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [initialUpcomingEvents]);

    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString("en-IN", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
        });

    const getEventTypeBadge = (type: Event["type"]) => {
        const styles = {
            expo: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
            exhibition: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
            "customer-meet": "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
            webinar: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
        };
        const labels = {
            expo: "Expo",
            exhibition: "Exhibition",
            "customer-meet": "Customer Meet",
            webinar: "Webinar",
        };
        return (
            <Badge variant="outline" className={`backdrop-blur-md ${styles[type]} px-3 py-1`}>
                {labels[type]}
            </Badge>
        );
    };

    const EventCard = ({ event, isPast }: { event: Event; isPast: boolean }) => (
        <Link href={`/events/${event._id}`} className="group h-full">
            <div className={`relative h-full flex flex-col bg-card border border-border/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[hsl(var(--accent))/30] ${isPast ? "opacity-80 grayscale hover:grayscale-0 hover:opacity-100" : ""}`}>

                {/* Image Section */}
                <div className="relative h-56 overflow-hidden w-full">
                    <Image
                        src={`${API_URL}${event.image}`}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute top-4 left-4 z-20">
                        {getEventTypeBadge(event.type)}
                    </div>

                    <div className="absolute top-4 right-4 z-20">
                        {!isPast ? (
                            <Badge className="bg-[hsl(var(--success))] text-white border-0 shadow-lg shadow-green-900/20">
                                Upcoming
                            </Badge>
                        ) : (
                            <Badge variant="secondary" className="backdrop-blur-md bg-black/40 text-white border-white/20">
                                Past Event
                            </Badge>
                        )}
                    </div>

                    <div className="absolute bottom-4 left-4 z-20 text-white">
                        <div className="flex items-center gap-2 text-sm font-medium mb-1 opacity-90">
                            <Calendar className="h-4 w-4 text-[hsl(var(--accent))]" />
                            <span>{formatDate(event.date)}</span>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <CardHeader className="pb-3 flex-grow">
                    <CardTitle className="text-xl font-bold leading-tight group-hover:text-[hsl(var(--primary))] transition-colors line-clamp-2">
                        {event.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 mt-2 text-base">
                        {event.description}
                    </CardDescription>
                </CardHeader>

                <CardContent className="pb-4 space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground bg-secondary/30 p-2 rounded-lg">
                        <MapPin className="h-4 w-4 text-[hsl(var(--primary))]" />
                        <span className="truncate">{event.venue}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{event.time}</span>
                        </div>
                        {event.attendees && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Users className="h-4 w-4" />
                                <span>{isPast ? `${event.attendees} attended` : `${event.attendees}+ expected`}</span>
                            </div>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="pt-0 pb-5 px-6 mt-auto">
                    <Button variant="ghost" className="w-full justify-between hover:bg-[hsl(var(--primary))/5] group-hover:text-[hsl(var(--primary))] pl-0 hover:pl-4 transition-all duration-300">
                        View Details
                        <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                </CardFooter>
            </div>
        </Link>
    );

    const EmptyState = ({ message }: { message: string }) => (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
                <SearchX className="h-10 w-10 text-muted-foreground/50" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No Events Found</h3>
            <p className="text-muted-foreground max-w-sm mx-auto">{message}</p>
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            {/* HERO Section */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))]" />
                    <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
                    {/* Abstract Shapes */}
                    <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[hsl(var(--accent))]/10 rounded-full blur-[100px] animate-pulse-glow" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[hsl(var(--primary))]/20 rounded-full blur-[100px]" />
                </div>

                <div className="container relative z-10 mx-auto px-4 max-w-6xl text-center">
                    <div className="inline-block mb-6 animate-fade-in opacity-0" style={{ animationDelay: "0.1s" }}>
                        <span className="px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-white/90 text-sm font-medium backdrop-blur-sm flex items-center gap-2">
                            <Ticket className="w-4 h-4 text-[hsl(var(--accent))]" />
                            PropertyCab Events
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in opacity-0" style={{ animationDelay: "0.2s" }}>
                        Expos, Exhibitions & <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--accent))] to-amber-300">
                            Customer Meets
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12 animate-fade-in opacity-0" style={{ animationDelay: "0.3s" }}>
                        Join us at our exclusive real estate events. Discover properties, meet agents,
                        and get expert guidance all under one roof.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in opacity-0" style={{ animationDelay: "0.4s" }}>
                        {[
                            { icon: Building2, value: "50+", label: "Events Hosted" },
                            { icon: Users, value: "2,000+", label: "Happy Attendees" },
                            { icon: Star, value: "4.8", label: "Average Rating" },
                        ].map((stat, idx) => (
                            <div key={idx} className="glass-card p-4 rounded-xl flex items-center gap-4 text-left bg-white/10 transition-colors">
                                <div className="p-3 rounded-lg bg-[hsl(var(--accent))]/20 text-[hsl(var(--accent))]">
                                    <stat.icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white mb-0.5">{stat.value}</div>
                                    <div className="text-sm text-white/60">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Events Content */}
            <main className="container mx-auto px-4 py-16 -mt-10 relative z-20">
                <Tabs defaultValue="upcoming" className="space-y-12">
                    <div className="flex justify-center">
                        <TabsList className="grid grid-cols-2 w-full max-w-md bg-white dark:bg-card border border-border/50 shadow-lg p-1.5 rounded-full h-auto">
                            <TabsTrigger
                                value="upcoming"
                                className="rounded-full py-2.5 text-base font-medium data-[state=active]:bg-[hsl(var(--primary))] data-[state=active]:text-white transition-all"
                            >
                                <Ticket className="mr-2 h-4 w-4" />
                                Upcoming Events
                            </TabsTrigger>
                            <TabsTrigger
                                value="past"
                                className="rounded-full py-2.5 text-base font-medium data-[state=active]:bg-secondary data-[state=active]:text-foreground transition-all"
                            >
                                <CalendarCheck className="mr-2 h-4 w-4" />
                                Past Events
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground animate-in fade-in">
                            <Loader2 className="w-10 h-10 animate-spin mb-4 text-[hsl(var(--primary))]" />
                            <p className="text-lg">Loading events...</p>
                        </div>
                    ) : (
                        <>
                            <TabsContent value="upcoming" className="animate-fade-up">
                                {upcomingEvents.length > 0 ? (
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {upcomingEvents.map(e => (
                                            <EventCard key={e._id} event={e} isPast={false} />
                                        ))}
                                    </div>
                                ) : (
                                    <EmptyState message="There are no upcoming events at the moment. Please check back later!" />
                                )}
                            </TabsContent>

                            <TabsContent value="past" className="animate-fade-up">
                                {pastEvents.length > 0 ? (
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {pastEvents.map(e => (
                                            <EventCard key={e._id} event={e} isPast />
                                        ))}
                                    </div>
                                ) : (
                                    <EmptyState message="No past events found." />
                                )}
                            </TabsContent>
                        </>
                    )}
                </Tabs>
            </main>

            <Footer />
        </div>
    );
};

export default EventsClient;
