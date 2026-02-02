"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AuthModal from "@/components/AuthModal";
import FeaturedPropertiesPromo from "@/components/FeaturedPropertiesPromo";
import { Skeleton } from "@/components/ui/skeleton";
import PropertyMap from "@/components/PropertyMap";
import {
    MapPin,
    Bed,
    Bath,
    Square,
    Car,
    Phone,
    Mail,
    Calendar,
    Home,
    Building2,
    Layers,
    Eye,
    CheckCircle2,
    X,
    ChevronLeft,
    ChevronRight,
    Maximize2,
    TreePine,
    Store,
    Briefcase,
    User,
    Train,
    Bus,
    School,
    Stethoscope,
    ShoppingBag,
    Landmark,
    Building,
    IndianRupee,
    FileCheck2,
    Clock,
    Hammer,
    Star,
    Navigation,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PropertyDescription from "@/components/PropertyDescription";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export interface UnitConfiguration {
    type: string;
    area_min: number;
    area_max: number;
    price_min: number;
    price_max: number;
}

export interface ConnectivityItem {
    type: string;
    name: string;
    distance: string;
}

export interface NearbyPlace {
    category: string;
    name: string;
    distance: string;
}

export interface Property {
    id: string;
    _id: string;
    title: string;
    description: string;
    price: number;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    property_type: string;
    listing_type: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    images?: string[];
    features: string[] | null;
    latitude: number | null;
    longitude: number | null;
    views: number | null;
    status?: "pending" | "approved" | "rejected";
    created_at: string | null;
    agent_id: string;
    rooms: number | null;
    floors: number | null;
    furnishing?: "furnished" | "semi-furnished" | "unfurnished";
    facing: string | null;
    parking_spaces: number | null;
    floor_plans: string[] | null;
    video_url: string | null;
    cover_image: string | null;
    shops_count: number | null;
    office_spaces: number | null;
    age_of_property: string | null;
    // Township/Project fields
    is_project: boolean | null;
    project_name: string | null;
    total_towers: number | null;
    total_units: number | null;
    rera_number: string | null;
    possession_date: string | null;
    construction_status: string | null;
    unit_configurations: UnitConfiguration[] | null;
    connectivity: ConnectivityItem[] | null;
    nearby_places: NearbyPlace[] | null;
    project_highlights: string[] | null;
}

interface AgentProfile {
    id: string;
    full_name: string | null;
    email: string;
    phone: string | null;
}

const getConnectivityIcon = (type: string) => {
    switch (type.toLowerCase()) {
        case "metro":
        case "train":
        case "railway":
            return <Train className="h-5 w-5" />;
        case "bus":
        case "bus stop":
            return <Bus className="h-5 w-5" />;
        case "airport":
            return <Navigation className="h-5 w-5" />;
        default:
            return <MapPin className="h-5 w-5" />;
    }
};

const getNearbyIcon = (type: string) => {
    switch (type.toLowerCase()) {
        case "school":
        case "college":
        case "university":
            return <School className="h-5 w-5" />;
        case "hospital":
        case "clinic":
            return <Stethoscope className="h-5 w-5" />;
        case "mall":
        case "market":
        case "shopping":
            return <ShoppingBag className="h-5 w-5" />;
        case "bank":
        case "atm":
            return <Landmark className="h-5 w-5" />;
        case "office":
        case "it park":
            return <Building className="h-5 w-5" />;
        default:
            return <MapPin className="h-5 w-5" />;
    }
};

const PropertyClient = ({ initialData }: { initialData?: { property: Property, recentProperties: Property[] } | null }) => {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const params = useParams();
    const id = Array.isArray(params?.id) ? params?.id[0] : params?.id;
    const { toast } = useToast();
    const [property, setProperty] = useState<Property | null>(initialData?.property || null);
    const [agent, setAgent] = useState<AgentProfile | null>(null);
    const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(!initialData?.property);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [recentProperties, setRecentProperties] = useState<Property[]>(initialData?.recentProperties || []);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const floorPlans = property?.floor_plans || [];
    const videoUrl = property?.video_url || null;

    // Logic to handle Auth Wall
    // We no longer redirect, but we show the AuthModal if !user
    const requireAuth = process.env.NEXT_PUBLIC_REQUIRE_AUTH_DETAILS === "true";
    const showAuthWall = requireAuth && !authLoading && !user;

    useEffect(() => {
        fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/properties/${id}/view`,
            {
                method: "POST",
                credentials: "include",
            }
        );
    }, [id]);


    useEffect(() => {
        // If we have initial data, we don't necessarily need to fetch immediately, 
        // but the original code fetched recentProperties and agent info too.
        // If initialData.property is present, we can skip fetching or fetch in background.
        // For now, let's fetch only if we don't have property or if ID changed.
        if (!property || property.id !== id) {
            fetchProperty();
        } else {
            // If we have property from props, we might still need to set Agent if the prop data didn't process it fully?
            // The fetchProperty logic handles parsing Agent.
            // Let's assume initialData is fully compatible.
            // But we might need to set Agent state if it wasn't set from props.
            // We can parse agent from property.agent_id if we had the full agent object there?
            // The original code:
            /*
            if (p.agent) {
                setAgent({ ... });
            }
            */
            // We can run a lighter effect to set agent from property if available.
        }
    }, [id]);

    // Also need to set Agent if initialData was used
    useEffect(() => {
        if (initialData?.property && !agent) {
            // This assumes the initialData.property matches the shape of what fetchProperty produces?
            // In fetchProperty, they extract agent from `result.data.agent`. 
            // But `parsedProperty.agent_id` is just the ID. 
            // We might need to pass `agent` in `initialData` separately or include it in Property type?
            // The Property interface has `agent_id: string`.
            // The fetchProperty uses `p.agent` (raw backend response) to setAgent.
            // Effectively we lose Agent details if we only pass `Property` interface object.
            // We should probably rely on `fetchProperty` to run anyway to get the full rich object if needed, 
            // OR update `Property` interface to include agent details.
            // For SEO, Agent details are less critical than Title/Desc/Price/Image.
            // Let's allow `fetchProperty` to run to fill in the gaps (Hydration mismatch might occur if we show skeletal agent vs real agent, but that's fine).
            if (!property) fetchProperty();
        }
    }, [initialData]);


    // const demoProperties: GeoJSON.FeatureCollection = {
    //   type: "FeatureCollection",
    //   features: [
    //     {
    //       type: "Feature",
    //       properties: { price: 80 },
    //       geometry: { type: "Point", coordinates: [73.8567, 18.5204] },
    //     },
    //     {
    //       type: "Feature",
    //       properties: { price: 120 },
    //       geometry: { type: "Point", coordinates: [73.86, 18.523] },
    //     },
    //     {
    //       type: "Feature",
    //       properties: { price: 200 },
    //       geometry: { type: "Point", coordinates: [73.852, 18.518] },
    //     },
    //   ],
    // };

    const fetchProperty = async () => {
        if (!id) return;

        setLoading(true);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/properties/${id}`,
                { cache: "no-store" },
            );

            if (!res.ok) throw new Error("Property not found");

            const result = await res.json();
            const p = result.data;

            // Helper to parse a raw BE property to FE Property type
            const parseProperty = (prop: any): Property => ({
                id: prop._id,
                _id: prop._id,
                title: prop.title,
                description: prop.description,
                price: prop.price,
                address: prop.address,
                city: prop.city,
                state: prop.state,
                zip_code: prop.zipCode || "",
                country: "India",
                property_type: prop.propertySubType || prop.propertyType,
                listing_type: prop.saleType,
                bedrooms: prop.bedrooms || 0,
                bathrooms: prop.bathrooms || 0,
                area: prop.builtUpArea || 0,
                images: prop.images || [],
                floor_plans: prop.floorPlans || [],
                features: prop.amenities || [],
                latitude: prop.latitude || null,
                longitude: prop.longitude || null,
                views: prop.viewsCount || 0,
                status: prop.status,
                created_at: prop.createdAt,
                agent_id: prop.agent?._id || prop.agent, // handle both populated object and ID string
                furnishing: prop.furnishing || undefined,
                facing: null,
                parking_spaces: prop.parking || null,
                rooms: null,
                floors: prop.floors || null,
                video_url: prop.video || null,
                cover_image: `${process.env.NEXT_PUBLIC_API_BASE_URL}${prop.coverImage}` || null,
                shops_count: null,
                office_spaces: null,
                age_of_property: null,
                is_project: false,
                project_name: null,
                total_towers: null,
                total_units: null,
                rera_number: null,
                possession_date: prop.possessionDate || null,
                construction_status: prop.possessionStatus || null,
                unit_configurations: [],
                connectivity: [],
                nearby_places: [],
                project_highlights: prop.highlights || [],
            });

            const parsedProperty = parseProperty(p);
            // Fetch View Count
            try {
                const viewsRes = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/properties/${id}/views/count`
                );
                if (viewsRes.ok) {
                    const viewsData = await viewsRes.json();
                    parsedProperty.views = viewsData.data?.views || 0;
                }
            } catch (err) {
                console.error("Error fetching views:", err);
            }

            setProperty(parsedProperty);

            // Handle recent properties sidebar - map backend data
            if (result.recentProperties && Array.isArray(result.recentProperties)) {
                const mappedRecents = result.recentProperties.map(parseProperty);
                setRecentProperties(mappedRecents);
            } else {
                // Fallback or empty if not provided
                setRecentProperties([]);
            }

            if (p.agent) {
                setAgent({
                    id: p.agent._id,
                    full_name: p.agent.name,
                    email: p.agent.email,
                    phone: null,
                });
            }
        } catch (error) {
            console.error("Error fetching property:", error);
            toast({
                title: "Error",
                description: "Failed to load property details",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Inquiry Sent!",
            description: "The agent will contact you shortly.",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
    };

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            toast({
                title: "Link Copied!",
                description: "Property link has been copied to clipboard.",
            });
        } catch {
            toast({
                title: "Share",
                description: "Copy this URL: " + window.location.href,
            });
        }
    };

    const formatPrice = (price: number, listingType: string) => {
        const formatted = new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(price);
        return listingType === "rent" ? `${formatted}/month` : formatted;
    };

    const formatPriceShort = (price: number) => {
        if (price >= 10000000) {
            return `₹${(price / 10000000).toFixed(2)} Cr`;
        } else if (price >= 100000) {
            return `₹${(price / 100000).toFixed(2)} Lac`;
        }
        return `₹${price.toLocaleString("en-IN")}`;
    };

    const getPropertyCategory = (type: string) => {
        const commercial = [
            "Shop",
            "Office Space",
            "Godown",
            "Farm House",
            "Resort",
        ];
        const agricultural = ["Agriculture Land", "Non Agriculture/Developed Land"];
        if (commercial.includes(type)) return "commercial";
        if (agricultural.includes(type)) return "agricultural";
        return "residential";
    };

    const getPropertyIcon = (type: string) => {
        const category = getPropertyCategory(type);
        if (category === "commercial") return <Building2 className="h-5 w-5" />;
        if (category === "agricultural") return <TreePine className="h-5 w-5" />;
        return <Home className="h-5 w-5" />;
    };

    const getImageUrl = (image: string) => {
        if (!image) return "/placeholder.svg";

        // If already absolute
        if (image.startsWith("http")) return image;

        // If coming from backend uploads
        if (image.startsWith("/uploads")) {
            return `${process.env.NEXT_PUBLIC_API_BASE_URL}${image}`;
        }

        // Fallback (old supabase images)
        return `${process.env.NEXT_PUBLIC_SUPABASE_URL || "https://jnrnlsqqujjqspaqyumw.supabase.co"}/storage/v1/object/public/property-images/${image}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <main className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <Skeleton className="h-[400px] w-full rounded-xl" />
                            <Skeleton className="h-8 w-3/4" />
                            <Skeleton className="h-6 w-1/2" />
                            <div className="grid grid-cols-4 gap-4">
                                {[...Array(4)].map((_, i) => (
                                    <Skeleton key={i} className="h-20 rounded-lg" />
                                ))}
                            </div>
                        </div>
                        <Skeleton className="h-[500px] rounded-xl" />
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!property) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <main className="container mx-auto px-4 py-16 text-center">
                    <div className="max-w-md mx-auto">
                        <Home className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <h1 className="text-2xl font-bold mb-2">Property Not Found</h1>
                        <p className="text-muted-foreground mb-6">
                            The property you're looking for doesn't exist or has been removed.
                        </p>
                        <Button asChild>
                            <Link href="/properties">Browse Properties</Link>
                        </Button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const images = property.images?.length
        ? property.images
        : ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800"];

    const category = getPropertyCategory(property.property_type);
    const isResidential = category === "residential";
    const isCommercial = category === "commercial";
    const isAgricultural = category === "agricultural";
    const isProject = property.is_project;

    const amenities = property.features || [];
    const unitConfigurations = property.unit_configurations || [];
    const connectivity = property.connectivity || [];
    const nearbyPlaces = property.nearby_places || [];
    const projectHighlights = property.project_highlights || [];

    return (
        <div className="min-h-screen bg-background relative">
            <Header />

            {/* Auth Wall Modal */}
            <AuthModal
                isOpen={showAuthWall}
                onClose={() => router.push(`/properties/${id}`)}
                defaultStep="register"
            />

            <main className={`container mx-auto px-4 py-12 md:py-16 mt-10 transition-all duration-500 ${showAuthWall ? "blur-md pointer-events-none select-none opacity-50 h-[80vh] overflow-hidden" : ""}`}>
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <Link href="/" className="hover:text-primary">
                        Home
                    </Link>
                    <span>/</span>
                    <Link href="/properties" className="hover:text-primary">
                        Properties
                    </Link>
                    <span>/</span>
                    <span className="text-foreground">{property.title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Image Gallery */}
                        <div className="space-y-4">
                            <div className="relative group">
                                <div className="aspect-[16/10] rounded-xl overflow-hidden bg-muted">
                                    <img
                                        src={getImageUrl(images[selectedImageIndex])}
                                        alt={property.title}
                                        className="w-full h-full object-cover cursor-pointer transition-transform hover:scale-105"
                                        onClick={() => setIsGalleryOpen(true)}
                                    />
                                </div>

                                {images.length > 1 && (
                                    <>
                                        <button
                                            onClick={() =>
                                                setSelectedImageIndex((prev) =>
                                                    prev === 0 ? images.length - 1 : prev - 1,
                                                )
                                            }
                                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <ChevronLeft className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                setSelectedImageIndex((prev) =>
                                                    prev === images.length - 1 ? 0 : prev + 1,
                                                )
                                            }
                                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <ChevronRight className="h-5 w-5" />
                                        </button>
                                    </>
                                )}

                                <button
                                    onClick={() => setIsGalleryOpen(true)}
                                    className="absolute right-4 top-4 bg-background/80 hover:bg-background p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Maximize2 className="h-5 w-5" />
                                </button>

                                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                                    <Badge className="bg-primary text-primary-foreground">
                                        {property.listing_type === "rent"
                                            ? "For Rent"
                                            : property.listing_type === "resale"
                                                ? "Resale"
                                                : "For Sale"}
                                    </Badge>
                                    <Badge
                                        variant="secondary"
                                        className="flex items-center gap-1"
                                    >
                                        {getPropertyIcon(property.property_type)}
                                        {property.property_type}
                                    </Badge>
                                    {isProject && (
                                        <Badge className="bg-amber-500 text-white">
                                            <Building2 className="h-3 w-3 mr-1" />
                                            Project
                                        </Badge>
                                    )}
                                    {property.construction_status && (
                                        <Badge variant="outline" className="bg-background/80">
                                            <Hammer className="h-3 w-3 mr-1" />
                                            {property.construction_status}
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            {images.length > 1 && (
                                <div className="flex gap-2 overflow-x-auto pb-2">
                                    {images.map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImageIndex(index)}
                                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedImageIndex === index
                                                ? "border-primary ring-2 ring-primary/30"
                                                : "border-transparent hover:border-muted-foreground/30"
                                                }`}
                                        >
                                            <img
                                                src={getImageUrl(img)}
                                                alt={`View ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Property Header */}
                        <div className="space-y-4">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    {isProject && property.project_name && (
                                        <p className="text-sm font-medium text-primary mb-1">
                                            {property.project_name}
                                        </p>
                                    )}
                                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                                        {property.title}
                                    </h1>
                                    <p className="flex items-center gap-2 text-muted-foreground mt-2">
                                        <MapPin className="h-4 w-4" />
                                        {property.address}, {property.city}, {property.state} -{" "}
                                        {property.zip_code}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    {/* <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setIsFavorite(!isFavorite)}
                                    >
                                        <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                                    </Button> */}
                                    {/* <Button variant="outline" size="icon" onClick={handleShare}>
                                        <Share2 className="h-5 w-5" />
                                    </Button> */}
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                {property && property?.views && property?.views > 0 && <span className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-700 rounded-full font-medium border border-orange-100">
                                    <Eye className="h-4 w-4" />
                                    {property.views || 0} Interested
                                </span>}
                                <span className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    Listed{" "}
                                    {property.created_at
                                        ? new Date(property.created_at).toLocaleDateString()
                                        : "N/A"}
                                </span>
                                {property.rera_number && (
                                    <span className="flex items-center gap-1 text-green-600">
                                        <FileCheck2 className="h-4 w-4" />
                                        RERA: {property.rera_number}
                                    </span>
                                )}
                            </div>

                            <div className="text-3xl font-bold text-primary">
                                {formatPrice(property.price, property.listing_type)}
                                {!isProject && property.area > 0 && (
                                    <span className="text-base font-normal text-muted-foreground ml-2">
                                        (₹
                                        {Math.round(property.price / property.area).toLocaleString(
                                            "en-IN",
                                        )}
                                        /sq.ft)
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Project Unit Configurations - Like Reference Image */}
                        {isProject && unitConfigurations.length > 0 && (
                            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
                                <CardHeader className="pb-4">
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <Building2 className="h-5 w-5 text-primary" />
                                        Available Configurations
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {unitConfigurations.map((config, index) => (
                                            <div
                                                key={index}
                                                className="p-4 rounded-lg bg-background border shadow-sm hover:shadow-md transition-shadow"
                                            >
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Bed className="h-5 w-5 text-primary" />
                                                    <h4 className="font-semibold text-lg">
                                                        {config.type}
                                                    </h4>
                                                </div>
                                                <div className="space-y-1 text-sm">
                                                    <p className="flex items-center gap-2 text-muted-foreground">
                                                        <Square className="h-4 w-4" />
                                                        {config.area_min.toLocaleString("en-IN")} -{" "}
                                                        {config.area_max.toLocaleString("en-IN")} sq.ft
                                                    </p>
                                                    <p className="flex items-center gap-2 font-medium text-primary">
                                                        <IndianRupee className="h-4 w-4" />
                                                        {formatPriceShort(config.price_min)} -{" "}
                                                        {formatPriceShort(config.price_max)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Project Highlights */}
                        {isProject && projectHighlights.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Star className="h-5 w-5 text-amber-500" />
                                        Project Highlights
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {projectHighlights.map((highlight, index) => (
                                            <div key={index} className="flex items-start gap-2 p-2">
                                                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                                <span>{highlight}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Property Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Card className="text-center p-4">
                                <Square className="h-6 w-6 mx-auto text-primary mb-2" />
                                <p className="text-2xl font-bold">
                                    {property.area.toLocaleString()}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {isAgricultural ? "Acres" : "Sq.ft"}
                                </p>
                            </Card>

                            {isResidential && !isProject && (
                                <>
                                    <Card className="text-center p-4">
                                        <Bed className="h-6 w-6 mx-auto text-primary mb-2" />
                                        <p className="text-2xl font-bold">{property.bedrooms}</p>
                                        <p className="text-sm text-muted-foreground">Bedrooms</p>
                                    </Card>
                                    <Card className="text-center p-4">
                                        <Bath className="h-6 w-6 mx-auto text-primary mb-2" />
                                        <p className="text-2xl font-bold">{property.bathrooms}</p>
                                        <p className="text-sm text-muted-foreground">Bathrooms</p>
                                    </Card>
                                </>
                            )}

                            {isProject && (
                                <>
                                    {property.total_towers && (
                                        <Card className="text-center p-4">
                                            <Building2 className="h-6 w-6 mx-auto text-primary mb-2" />
                                            <p className="text-2xl font-bold">
                                                {property.total_towers}
                                            </p>
                                            <p className="text-sm text-muted-foreground">Towers</p>
                                        </Card>
                                    )}
                                    {property.total_units && (
                                        <Card className="text-center p-4">
                                            <Home className="h-6 w-6 mx-auto text-primary mb-2" />
                                            <p className="text-2xl font-bold">
                                                {property.total_units}
                                            </p>
                                            <p className="text-sm text-muted-foreground">Units</p>
                                        </Card>
                                    )}
                                </>
                            )}

                            {isCommercial && (
                                <>
                                    {property.shops_count && (
                                        <Card className="text-center p-4">
                                            <Store className="h-6 w-6 mx-auto text-primary mb-2" />
                                            <p className="text-2xl font-bold">
                                                {property.shops_count}
                                            </p>
                                            <p className="text-sm text-muted-foreground">Shops</p>
                                        </Card>
                                    )}
                                    {property.office_spaces && (
                                        <Card className="text-center p-4">
                                            <Briefcase className="h-6 w-6 mx-auto text-primary mb-2" />
                                            <p className="text-2xl font-bold">
                                                {property.office_spaces}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Office Spaces
                                            </p>
                                        </Card>
                                    )}
                                </>
                            )}

                            {property.parking_spaces !== null &&
                                property.parking_spaces > 0 && (
                                    <Card className="text-center p-4">
                                        <Car className="h-6 w-6 mx-auto text-primary mb-2" />
                                        <p className="text-2xl font-bold">
                                            {property.parking_spaces}
                                        </p>
                                        <p className="text-sm text-muted-foreground">Parking</p>
                                    </Card>
                                )}

                            {/* {property.floors && (isResidential || isCommercial) && (
                                <Card className="text-center p-4">
                                    <Layers className="h-6 w-6 mx-auto text-primary mb-2" />
                                    <p className="text-2xl font-bold">{property.floors}</p>
                                    <p className="text-sm text-muted-foreground">Floors</p>
                                </Card>
                            )}  */}

                            {property.possession_date && (
                                <Card className="text-center p-4">
                                    <Clock className="h-6 w-6 mx-auto text-primary mb-2" />
                                    <p className="text-lg font-bold">
                                        {property.possession_date}
                                    </p>
                                    <p className="text-sm text-muted-foreground">Possession</p>
                                </Card>
                            )}
                        </div>

                        {/* Description Section */}
                        <PropertyDescription property={property} />

                        {/* Amenities Section */}
                        {amenities.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Amenities & Features</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                        {amenities.map((amenity, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 p-3 rounded-lg bg-muted/50"
                                            >
                                                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                                                <span className="text-sm">{amenity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Connectivity Section - Like Reference */}
                        {connectivity.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Train className="h-5 w-5 text-primary" />
                                        Connectivity
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {connectivity.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30"
                                            >
                                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                    {getConnectivityIcon(item.type)}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm">{item.name}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {item.type} • {item.distance}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Nearby Places Section */}
                        {nearbyPlaces.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-primary" />
                                        Nearby Places
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {nearbyPlaces.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30"
                                            >
                                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                    {getNearbyIcon(item.category)}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm">{item.name}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {item.category} • {item.distance}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Location Map */}
                        {property.latitude && property.longitude && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Location</CardTitle>
                                </CardHeader>
                                <CardContent className="h-[400px]">
                                    <PropertyMap
                                        latitude={property.latitude}
                                        longitude={property.longitude}
                                        title={property.title}
                                        nearbyPlaces={property.nearby_places || undefined}
                                    />
                                </CardContent>
                            </Card>
                        )}

                        {/* Video Tour */}
                        {videoUrl && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Video Tour</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="aspect-video rounded-lg overflow-hidden bg-black">
                                        <iframe
                                            src={videoUrl.replace("watch?v=", "embed/")}
                                            title="Property Video Tour"
                                            className="w-full h-full"
                                            allowFullScreen
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Floor Plans */}
                        {floorPlans.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Floor Plans</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {floorPlans.map((plan, index) => (
                                            <div
                                                key={index}
                                                className="rounded-lg overflow-hidden border"
                                            >
                                                <img
                                                    src={getImageUrl(plan)}
                                                    alt={`Floor Plan ${index + 1}`}
                                                    className="w-full h-auto"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Similar Properties */}
                        {similarProperties.length > 0 && (
                            <div className="pt-8 border-t">
                                <h2 className="text-2xl font-bold mb-6">Similar Properties</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {similarProperties.map((prop) => (
                                        <div
                                            key={prop.id}
                                            className="border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow"
                                        >
                                            <div className="h-48 overflow-hidden relative">
                                                <img
                                                    src={
                                                        prop.images && prop.images.length > 0
                                                            ? getImageUrl(prop.images[0])
                                                            : "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800"
                                                    }
                                                    alt={prop.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <Badge className="absolute top-2 left-2 bg-primary">
                                                    {prop.property_type}
                                                </Badge>
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-semibold text-lg truncate mb-1">
                                                    {prop.title}
                                                </h3>
                                                <p className="text-muted-foreground text-sm mb-2">
                                                    {prop.city}
                                                </p>
                                                <p className="font-bold text-primary">
                                                    {formatPriceShort(prop.price)}
                                                </p>
                                                <Button
                                                    variant="outline"
                                                    className="w-full mt-3"
                                                    asChild
                                                >
                                                    <Link href={`/properties/${prop.id}`}>
                                                        View Details
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6 sticky top-24 self-start">
                        <Card className=" top-24">
                            <CardHeader>
                                <CardTitle className="text-xl">Contact Agent</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {agent ? (
                                    <div className="flex items-center gap-3 pb-4 border-b">
                                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                            <User className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">
                                                {agent.full_name || "Property Agent"}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Certified Agent
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3 pb-4 border-b">
                                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                            <Building2 className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">PropertyCab Team</p>
                                            <p className="text-sm text-muted-foreground">
                                                Official Listing
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className=" space-y-4">
                                    <div>
                                        <Input
                                            placeholder="Your Name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            placeholder="Email Address"
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            placeholder="Phone Number"
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Textarea
                                            placeholder="I am interested in this property..."
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            className="min-h-[100px]"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-accent to-amber-500 hover:from-accent-hover hover:to-amber-600"
                                    >
                                        Send Inquiry
                                    </Button>
                                </form>

                                <div className="pt-4 space-y-3">
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start gap-2"
                                        onClick={() =>
                                            window.open(`tel:${agent?.phone || "+919876543210"}`)
                                        }
                                    >
                                        <Phone className="h-4 w-4" />
                                        Call Agent
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start gap-2"
                                        onClick={() =>
                                            window.open(
                                                `mailto:${agent?.email || "info@propertycab.in"}`,
                                            )
                                        }
                                    >
                                        <Mail className="h-4 w-4" />
                                        Email Agent
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <FeaturedPropertiesPromo
                            variant="default"
                            maxItems={2}
                            title="More Properties"
                            subtitle="Find your next perfect place"
                            properties={recentProperties
                                .filter((p) => p.id !== property?.id)
                                .map((p) => ({
                                    id: p.id,
                                    title: p.title,
                                    price: formatPriceShort(p.price),
                                    location: `${p.city}, ${p.state}`,
                                    cover_image: p.cover_image || undefined,
                                    type: ([
                                        "Shop",
                                        "Office Space",
                                        "Godown",
                                        "Farm House",
                                        "Resort",
                                    ].includes(p.property_type)
                                        ? "Commercial"
                                        : "Residential") as "Commercial" | "Residential",
                                    views: p.views || 0,
                                }))}
                        />
                    </div>
                </div>
            </main>

            <Footer />

            {/* Gallery Modal */}
            <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
                <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black/95 border-none">
                    <div className="relative h-[80vh] flex items-center justify-center">
                        <button
                            onClick={() => setIsGalleryOpen(false)}
                            className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/80 z-50"
                        >
                            <X className="h-6 w-6" />
                        </button>

                        <button
                            onClick={() =>
                                setSelectedImageIndex((prev) =>
                                    prev === 0 ? images.length - 1 : prev - 1,
                                )
                            }
                            className="absolute left-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/80 z-50"
                        >
                            <ChevronLeft className="h-8 w-8" />
                        </button>

                        <img
                            src={getImageUrl(images[selectedImageIndex])}
                            alt={`Gallery View ${selectedImageIndex + 1}`}
                            className="max-h-full max-w-full object-contain"
                        />

                        <button
                            onClick={() =>
                                setSelectedImageIndex((prev) =>
                                    prev === images.length - 1 ? 0 : prev + 1,
                                )
                            }
                            className="absolute right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/80 z-50"
                        >
                            <ChevronRight className="h-8 w-8" />
                        </button>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-1 rounded-full text-sm">
                            {selectedImageIndex + 1} / {images.length}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>


        </div>
    );
};

export default PropertyClient;
