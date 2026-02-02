"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
    SlidersHorizontal,
    Search,
    Building2,
    MapPin,
    Layers,
    Filter,
    Home,
} from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-property.jpg";

export interface UnitConfiguration {
    type: string;
    area: string;
    price: string;
}

export interface Project {
    id: string;
    title: string;
    name: string;
    price: number;
    address: string;
    city: string;
    state: string;
    images: string[];
    created_at: string;
    is_project: boolean;
    totalTowers: number;
    totalUnits: number;
    rera_number: string;
    possessionDate: string;
    constructionStatus: string;
    unitConfigurations: UnitConfiguration[];
    highlights: string[];
    coverImage: string;
    listing_type: string;
}

interface ProjectsClientProps {
    initialProjects?: Project[];
}

const ProjectsClientContent = ({ initialProjects }: ProjectsClientProps) => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const searchParams = useSearchParams();
    const [showFilters, setShowFilters] = useState(true);
    const [projects, setProjects] = useState<Project[]>(initialProjects || []);
    const [loading, setLoading] = useState(!initialProjects);

    // Filter states
    const [searchQuery, setSearchQuery] = useState(
        searchParams.get("search") || "",
    );
    const [constructionStatus, setConstructionStatus] = useState("all");
    const [location, setLocation] = useState(searchParams.get("city") || "all");
    const [priceRange, setPriceRange] = useState([0, 500000000]);
    const [sortBy, setSortBy] = useState("newest");

    // Fetch projects from database if not provided initially
    useEffect(() => {
        if (initialProjects) {
            setLoading(false);
            return;
        }

        const fetchProjects = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/api/v1/township`, {
                    cache: "no-store",
                });
                if (!response.ok) throw new Error("Failed to fetch projects");
                const data = await response.json();

                const typedData = (data?.data || []).map((item: any) => ({
                    id: item._id,
                    title: item.title,
                    name: item.name,

                    price: item.startingPrice,

                    address: item.address,
                    city: item.city,
                    state: item.state,

                    images: item.images || [],

                    coverImage: item.coverImage
                        ? `${API_BASE_URL}${item.coverImage}`
                        : "/placeholder.svg",

                    created_at: item.createdAt,
                    is_project: true,

                    totalTowers: item.totalTowers,
                    totalUnits: item.totalUnits,

                    rera_number: item.reraNumber,
                    possessionDate: item.possessionDate,
                    constructionStatus: item.constructionStatus,

                    unitConfigurations: (item.unitConfigurations || []).map(
                        (config: any) => ({
                            type: config.type || "",
                            area: config.area || config.size || "",
                            price: config.price || "",
                        }),
                    ),
                    highlights: item.highlights || [],
                }));

                setProjects(typedData);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [API_BASE_URL, initialProjects]);

    // Format price for display
    const formatPrice = (price: number) => {
        if (price >= 10000000) {
            return `₹${(price / 10000000).toFixed(2)} Cr`;
        }
        if (price >= 100000) {
            return `₹${(price / 100000).toFixed(2)} Lacs`;
        }
        return `₹${price.toLocaleString()}`;
    };

    // Get image for project
    const getProjectImage = (project: Project) => {
        if (project?.coverImage && project?.coverImage.length > 0) {
            return project?.coverImage;
        }
        return "/placeholder.svg";
    };

    // Get unique cities from projects
    const cities = [...new Set(projects.map((p) => p.city))].filter(Boolean);

    // Live filtering logic
    const filteredProjects = projects.filter((project) => {
        const matchesSearch =
            searchQuery === "" ||
            project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.city.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus =
            constructionStatus === "all" ||
            project.constructionStatus === constructionStatus;

        const matchesLocation = location === "all" || project.city === location;

        const matchesPrice =
            project.price >= priceRange[0] && project.price <= priceRange[1];

        return matchesSearch && matchesStatus && matchesLocation && matchesPrice;
    });

    const sortedProjects = [...filteredProjects].sort((a, b) => {
        switch (sortBy) {
            case "price-low":
                return a.price - b.price;
            case "price-high":
                return b.price - a.price;
            case "units-high":
                return (b.totalUnits || 0) - (a.totalUnits || 0);
            case "newest":
            default:
                return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
        }
    });

    // Clear all filters
    const clearFilters = () => {
        setSearchQuery("");
        setConstructionStatus("all");
        setLocation("all");
        setPriceRange([0, 500000000]);
        setSortBy("newest");
    };

    // Stats
    const totalTowers = projects.reduce(
        (sum, p) => sum + (p.totalTowers || 0),
        0,
    );

    const totalUnits = projects.reduce((sum, p) => sum + (p.totalUnits || 0), 0);

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Header />

            <main className="flex-1">
                {/* Modern Hero Section with Integrated Search */}
                <section className="relative h-[500px] flex items-center justify-center pt-16 overflow-hidden">
                    {/* Background Image & Overlay */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={heroImage}
                            alt="Projects Hero"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-900/40" />
                        <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay" />
                    </div>

                    {/* Content */}
                    <div className="container mx-auto px-4 z-10 relative text-center">
                        <Badge className="mb-6 bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md px-4 py-1.5 text-sm font-medium tracking-wide animate-fade-up">
                            <Building2 className="w-4 h-4 mr-2 text-amber-400" />
                            Premium Townships & Estates
                        </Badge>

                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-up font-serif tracking-tight leading-tight">
                            Discover Your
                            <span className="ml-3 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
                                Future Home
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto animate-fade-up font-light leading-relaxed">
                            Explore our curated collection of township projects and newly launched buildings with world-class amenities.
                        </p>

                        {/* Search Bar - Floating */}
                        <div className="max-w-3xl mx-auto relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
                            <div className="bg-white p-2 rounded-full shadow-2xl flex items-center">
                                <div className="pl-4 text-slate-400">
                                    <Search className="h-5 w-5" />
                                </div>
                                <Input
                                    placeholder="Search projects, location, or builders..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="border-none shadow-none focus-visible:ring-0 text-base h-12 bg-transparent w-full placeholder:text-slate-400"
                                />
                                <Button className="rounded-full px-8 h-12 bg-primary hover:bg-primary/90 text-white font-medium">
                                    Search
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="relative z-20 container mx-auto px-4 -mt-10 mb-12">
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-4 md:p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { label: "Total Projects", value: sortedProjects.length, icon: Building2, color: "text-blue-500", bg: "bg-blue-50" },
                            { label: "Total Towers", value: totalTowers, icon: Layers, color: "text-amber-500", bg: "bg-amber-50" },
                            { label: "Total Units", value: `${totalUnits}+`, icon: Home, color: "text-emerald-500", bg: "bg-emerald-50" },
                            { label: "Cities Covered", value: cities.length, icon: MapPin, color: "text-purple-500", bg: "bg-purple-50" },
                        ].map((stat, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center p-2 rounded-xl hover:bg-slate-50 transition-colors">
                                <div className={`p-3 rounded-full ${stat.bg} ${stat.color} mb-3 shadow-sm`}>
                                    <stat.icon className="h-6 w-6" />
                                </div>
                                <div className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">{stat.value}</div>
                                <div className="text-xs md:text-sm text-slate-500 font-medium uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="container mx-auto px-4 pb-20">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Filters Sidebar - Desktop */}
                        <aside
                            className={`lg:w-80 flex-shrink-0 ${showFilters ? "hidden lg:block" : "hidden"}`}
                        >
                            <div className="bg-white border border-slate-200 rounded-3xl p-6 sticky top-28 shadow-lg shadow-slate-200/50">
                                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                                    <div className="flex items-center gap-2 text-slate-800">
                                        <Filter className="h-5 w-5" />
                                        <h2 className="text-lg font-bold">Filters</h2>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs text-slate-500 hover:text-red-500 h-8 px-2">
                                        Clear All
                                    </Button>
                                </div>

                                <div className="space-y-8">
                                    {/* Construction Status */}
                                    <div>
                                        <Label className="mb-3 block text-sm font-semibold text-slate-700">Construction Status</Label>
                                        <Select
                                            value={constructionStatus}
                                            onValueChange={setConstructionStatus}
                                        >
                                            <SelectTrigger className="w-full bg-slate-50 border-slate-200 h-10 rounded-xl focus:ring-1 focus:ring-primary/20">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">Any Status</SelectItem>
                                                <SelectItem value="Under Construction">Under Construction</SelectItem>
                                                <SelectItem value="Ready to Move">Ready to Move</SelectItem>
                                                <SelectItem value="Pre-Launch">Pre-Launch</SelectItem>
                                                <SelectItem value="Nearing Possession">Nearing Possession</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Location */}
                                    <div>
                                        <Label className="mb-3 block text-sm font-semibold text-slate-700">Location (City)</Label>
                                        <Select value={location} onValueChange={setLocation}>
                                            <SelectTrigger className="w-full bg-slate-50 border-slate-200 h-10 rounded-xl focus:ring-1 focus:ring-primary/20">
                                                <SelectValue placeholder="Select city" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Cities</SelectItem>
                                                {cities.map((city) => (
                                                    <SelectItem key={city} value={city}>
                                                        {city}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Price Range */}
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <Label className="text-sm font-semibold text-slate-700">Price Budget</Label>
                                        </div>
                                        <Slider
                                            min={0}
                                            max={500000000}
                                            step={1000000}
                                            value={priceRange}
                                            onValueChange={setPriceRange}
                                            className="mt-2"
                                        />
                                        <div className="mt-4 flex items-center justify-between text-xs font-medium text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                                            <span>{formatPrice(priceRange[0])}</span>
                                            <span className="text-slate-300 mx-1">-</span>
                                            <span>{formatPrice(priceRange[1])}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Projects Grid */}
                        <div className="flex-1 min-w-0">
                            {/* Header: toggle filters & sort (Mobile/Desktop mix) */}
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">

                                <div className="flex items-center gap-4 w-full sm:w-auto">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className={`gap-2 rounded-full border-slate-200 ${showFilters ? 'bg-slate-100 text-slate-900' : 'text-slate-600'}`}
                                        onClick={() => setShowFilters(!showFilters)}
                                    >
                                        <SlidersHorizontal className="h-4 w-4" />
                                        <span className="hidden sm:inline">{showFilters ? "Hide Filters" : "Show Filters"}</span>
                                    </Button>
                                    <p className="text-sm text-slate-500 font-medium">
                                        Showing <span className="text-slate-900 font-bold">{sortedProjects.length}</span> Results
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                    <Label className="text-sm whitespace-nowrap text-slate-500">Sort by:</Label>
                                    <Select value={sortBy} onValueChange={setSortBy}>
                                        <SelectTrigger className="w-full sm:w-48 bg-slate-50 border-slate-200 h-9 rounded-full text-sm">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="newest">Newest First</SelectItem>
                                            <SelectItem value="price-low">Price: Low to High</SelectItem>
                                            <SelectItem value="price-high">Price: High to Low</SelectItem>
                                            <SelectItem value="units-high">Most Units</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Loading State */}
                            {loading ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <div
                                            key={i}
                                            className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm"
                                        >
                                            <Skeleton className="h-64 w-full" />
                                            <div className="p-5 space-y-3">
                                                <Skeleton className="h-4 w-24 rounded-full" />
                                                <Skeleton className="h-6 w-3/4 rounded-md" />
                                                <Skeleton className="h-4 w-1/2 rounded-md" />
                                                <div className="grid grid-cols-3 gap-2 mt-4">
                                                    <Skeleton className="h-16 rounded-xl" />
                                                    <Skeleton className="h-16 rounded-xl" />
                                                    <Skeleton className="h-16 rounded-xl" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : sortedProjects.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-slate-200 rounded-3xl m-4">
                                    <div className="p-4 bg-blue-50 text-blue-500 rounded-full mb-4">
                                        <Search className="h-10 w-10" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                                        No Projects Found
                                    </h3>
                                    <p className="text-slate-500 mb-8 max-w-sm text-center">
                                        We couldn't find any projects matching your search criteria. Try adjusting filters or budget.
                                    </p>
                                    <Button onClick={clearFilters} variant="default" className="rounded-full px-8">
                                        Clear All Filters
                                    </Button>
                                </div>
                            ) : (
                                <div className={`grid grid-cols-1 md:grid-cols-2 ${showFilters ? 'xl:grid-cols-2' : 'xl:grid-cols-3'} gap-6`}>
                                    {sortedProjects.map((project) => (
                                        <ProjectCard
                                            key={project.id}
                                            id={project.id}
                                            title={project.title}
                                            projectName={project.name || undefined}
                                            price={formatPrice(project.price)}
                                            location={`${project.address}, ${project.city}`}
                                            totalTowers={project.totalTowers || undefined}
                                            totalUnits={project.totalUnits || undefined}
                                            unitConfigurations={
                                                project.unitConfigurations || undefined
                                            }
                                            constructionStatus={
                                                project.constructionStatus || undefined
                                            }
                                            possessionDate={project.possessionDate || undefined}
                                            reraNumber={project.rera_number || undefined}
                                            imageUrl={getProjectImage(project)}
                                            type={project.listing_type === "rent" ? "rent" : "sale"}
                                            projectHighlights={project.highlights || undefined}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

const ProjectsClient = ({ initialProjects }: ProjectsClientProps) => {
    return (
        <Suspense fallback={
            <div className="h-screen w-full flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <p className="text-slate-500 animate-pulse">Loading Projects...</p>
                </div>
            </div>
        }>
            <ProjectsClientContent initialProjects={initialProjects} />
        </Suspense>
    );
};

export default ProjectsClient;
