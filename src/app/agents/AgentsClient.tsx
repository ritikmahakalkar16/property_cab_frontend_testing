"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Star,
    MapPin,
    Phone,
    Mail,
    Award,
    Building2,
    Search,
    CheckCircle2,
    Briefcase,
    Filter
} from "lucide-react";

export interface Agent {
    id: string;
    name: string;
    avatar?: string | null;
    city: string;
    experience: string;
    rating: number;
    reviews: number;
    specialization: string[];
    verified: boolean;
    phone?: string;
    email?: string;
    propertiesSold?: number;
    description: string;
}

interface AgentsClientProps {
    initialAgents: Agent[];
}

const AgentsClient = ({ initialAgents }: AgentsClientProps) => {
    const [agents] = useState<Agent[]>(initialAgents);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCity, setSelectedCity] = useState("all");
    const [selectedSpecialization, setSelectedSpecialization] = useState("all");

    const filteredAgents = agents.filter(agent => {
        const name = agent.name?.toLowerCase() || "";
        const description = agent.description?.toLowerCase() || "";
        const query = searchQuery.toLowerCase();

        const matchesSearch =
            name.includes(query) || description.includes(query);

        const matchesCity =
            selectedCity === "all" || agent.city === selectedCity;

        const matchesSpecialization =
            selectedSpecialization === "all" ||
            agent.specialization?.includes(selectedSpecialization);

        return matchesSearch && matchesCity && matchesSpecialization;
    });

    const formatPhone = (phone?: string) =>
        phone ? phone.replace(/\s+/g, "").replace(/^\+/, "") : "";

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />

            {/* Hero Section */}
            <div className="relative pt-24 pb-24 md:pt-32 md:pb-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))]" />
                    <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
                    {/* Abstract blobs */}
                    <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[hsl(var(--accent))]/10 rounded-full blur-[100px] animate-pulse-glow" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[hsl(var(--primary))]/20 rounded-full blur-[100px]" />
                </div>

                <div className="container relative z-10 mx-auto px-4 max-w-6xl text-center">
                    <div className="inline-block mb-6 animate-fade-in opacity-0" style={{ animationDelay: "0.1s" }}>
                        <span className="px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-white/90 text-sm font-medium backdrop-blur-sm flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-[hsl(var(--accent))]" />
                            Professional Network
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in opacity-0" style={{ animationDelay: "0.2s" }}>
                        Meet Our <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--accent))] to-amber-300">
                            Verified Agents
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12 animate-fade-in opacity-0" style={{ animationDelay: "0.3s" }}>
                        Connect with experienced real estate professionals dedicated to finding your perfect property match.
                    </p>
                </div>
            </div>

            <main className="container mx-auto px-4 -mt-20 relative z-30 pb-20">
                {/* Filters Section */}
                <div className="max-w-5xl mx-auto mb-12 animate-fade-up opacity-0" style={{ animationDelay: "0.4s" }}>
                    <div className="bg-card border border-white/20 rounded-2xl p-6 shadow-2xl relative z-10">
                        <div className="flex items-center gap-2 mb-4 text-sm font-medium text-muted-foreground">
                            <Filter className="w-4 h-4" />
                            Filter Agents
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search by name..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 h-11 bg-background/50 border-input/50 focus:bg-background transition-all rounded-xl"
                                />
                            </div>

                            {/* City Filter */}
                            <Select value={selectedCity} onValueChange={setSelectedCity}>
                                <SelectTrigger className="h-11 bg-background/50 border-input/50 focus:bg-background transition-all rounded-xl">
                                    <SelectValue placeholder="Select City" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Cities</SelectItem>
                                    <SelectItem value="Nagpur">Nagpur</SelectItem>
                                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                                    <SelectItem value="Pune">Pune</SelectItem>
                                    <SelectItem value="Bangalore">Bangalore</SelectItem>
                                    <SelectItem value="Delhi">Delhi</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Specialization Filter */}
                            <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                                <SelectTrigger className="h-11 bg-background/50 border-input/50 focus:bg-background transition-all rounded-xl">
                                    <SelectValue placeholder="Specialization" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Specializations</SelectItem>
                                    <SelectItem value="Residential">Residential</SelectItem>
                                    <SelectItem value="Commercial">Commercial</SelectItem>
                                    <SelectItem value="Luxury">Luxury</SelectItem>
                                    <SelectItem value="Land">Land</SelectItem>
                                    <SelectItem value="Rental">Rental</SelectItem>
                                    <SelectItem value="Investment">Investment</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Agents Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAgents.map((agent, index) => (
                        <div
                            key={agent.id}
                            className="animate-fade-up opacity-0"
                            style={{ animationDelay: `${0.1 + (index * 0.05)}s` }}
                        >
                            <Card className="group h-full flex flex-col overflow-hidden border border-border/50 bg-card hover:bg-card/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[hsl(var(--accent))/30] rounded-2xl">
                                <CardHeader className="pb-4 relative">
                                    {/* Header Background Pattern */}
                                    <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-br from-primary/5 to-transparent z-0" />

                                    <div className="relative z-10 flex items-start gap-4">
                                        <div className="relative">
                                            <Avatar className="h-20 w-20 border-4 border-background shadow-lg">
                                                {agent.avatar && <AvatarImage src={agent.avatar} alt={agent.name} className="object-cover" />}
                                                <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                                                    {(agent.name || "A").split(" ").map(n => n[0]).join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            {agent.verified && (
                                                <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5" title="Verified Agent">
                                                    <CheckCircle2 className="h-5 w-5 text-blue-500 fill-blue-500/10" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1 pt-2">
                                            <h3 className="font-bold text-xl group-hover:text-primary transition-colors line-clamp-1">{agent.name}</h3>
                                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
                                                <MapPin className="h-3.5 w-3.5" />
                                                <span>{agent.city}</span>
                                            </div>
                                            <div className="flex items-center gap-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full w-fit">
                                                <Star className="h-3.5 w-3.5 fill-current" />
                                                <span className="font-bold text-sm">{agent.rating}</span>
                                                <span className="text-xs opacity-80">({agent.reviews})</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-6 flex-grow relative z-10">
                                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                        {agent.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {agent.specialization.slice(0, 3).map((spec, idx) => (
                                            <Badge key={idx} variant="secondary" className="text-xs font-normal bg-secondary/50 hover:bg-secondary border-0">
                                                {spec}
                                            </Badge>
                                        ))}
                                        {agent.specialization.length > 3 && (
                                            <Badge variant="outline" className="text-xs font-normal text-muted-foreground">
                                                +{agent.specialization.length - 3}
                                            </Badge>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                                <Award className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Experience</div>
                                                <div className="font-bold text-sm">{agent.experience}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400">
                                                <Building2 className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Properties</div>
                                                <div className="font-bold text-sm">{agent.propertiesSold}+ Sold</div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>

                                <CardFooter className="grid grid-cols-2 gap-3 pt-2 pb-6 px-6 mt-auto">
                                    {agent.phone && (
                                        <Button variant="default" className="w-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20" asChild>
                                            <a href={`tel:+${formatPhone(agent.phone)}`}>
                                                <Phone className="h-4 w-4 mr-2" />
                                                Call
                                            </a>
                                        </Button>
                                    )}

                                    {agent.email && (
                                        <Button
                                            variant="outline"
                                            className="w-full border-primary/20 text-primary hover:bg-primary/5"
                                            asChild
                                        >
                                            <a href={`mailto:${agent.email}`}>
                                                <Mail className="h-4 w-4 mr-2" />
                                                Email
                                            </a>
                                        </Button>
                                    )}
                                </CardFooter>
                            </Card>
                        </div>
                    ))}
                </div>

                {/* No Results state */}
                {filteredAgents.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in glass-card rounded-3xl p-12">
                        <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
                            <Search className="h-10 w-10 text-muted-foreground/50" />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">No agents found</h3>
                        <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                            We couldn't find any agents matching your current filters. Try adjusting your search criteria.
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedCity("all");
                                setSelectedSpecialization("all");
                            }}
                        >
                            Clear all filters
                        </Button>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default AgentsClient;
