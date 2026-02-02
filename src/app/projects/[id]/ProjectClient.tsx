"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
    Share2,
    Heart,
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
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";

export interface UnitConfiguration {
    type: string;
    area_min: number;
    area_max: number;
    price_min: number;
    price_max: number;
    minSize: number;
    maxSize: number;
    minPrice: number;
    maxPrice: number;
    size: number;
    price: number;
}

export interface ConnectivityItem {
    type: string;
    name: string;
    distance: string;
}

export interface NearbyPlace {
    type: string;
    name: string;
    category: string;
    distance: string;
}

export interface Property {
    id: string;
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
    images: string[] | null;
    features: string[] | null;
    latitude: number | null;
    longitude: number | null;
    views: number | null;
    status: string;
    created_at: string | null;
    agent_id: string;
    rooms: number | null;
    floors: number | null;
    furnishing: string | null;
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

const demoProperties: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: [
        {
            type: "Feature",
            properties: { price: 80 },
            geometry: { type: "Point", coordinates: [73.8567, 18.5204] },
        },
        {
            type: "Feature",
            properties: { price: 120 },
            geometry: { type: "Point", coordinates: [73.86, 18.523] },
        },
        {
            type: "Feature",
            properties: { price: 200 },
            geometry: { type: "Point", coordinates: [73.85, 18.52] },
        },
    ],
};

interface ProjectClientProps {
    initialData?: Property | null;
}

const ProjectClient = ({ initialData }: ProjectClientProps) => {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const params = useParams();
    const id = Array.isArray(params?.id) ? params?.id[0] : params?.id;
    const { toast } = useToast();
    const [property, setProperty] = useState<Property | null>(initialData || null);
    const [agent, setAgent] = useState<AgentProfile | null>(null);
    const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(initialData ? false : true);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const floorPlans = property?.floor_plans || [];
    const videoUrl = property?.video_url || null;

    const requireAuth = process.env.NEXT_PUBLIC_REQUIRE_AUTH_DETAILS === "true";
    const showAuthWall = requireAuth && !authLoading && !user;

    useEffect(() => {
        if (!initialData) {
            fetchProperty();
        }
    }, [id, initialData]);

    const fetchProperty = async () => {
        if (!id) return;

        setLoading(true);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/township/${id}`,
                { cache: "no-store" },
            );

            if (!res.ok) throw new Error("Property not found");

            const result = await res.json();
            const t = result.data;

            const parsedProperty: Property = {
                id: t._id,
                title: t.title || t.name,
                description: t.description,
                price: t.startingPrice || 0,

                address: t.address,
                city: t.city,
                state: t.state,
                zip_code: t.zipCode || "",
                country: "India",

                // These are not relevant for projects but required by interface
                property_type: "Project",
                listing_type: "sale",
                bedrooms: 0,
                bathrooms: 0,
                area: t.totalArea || 0,

                images: t.images || [],
                floor_plans: t.floorPlans || [],
                features: [],

                latitude: t.latitude || null,
                longitude: t.longitude || null,
                views: 0,
                status: "active",
                created_at: t.createdAt,

                agent_id: t.agent,
                furnishing: null,
                facing: null,
                parking_spaces: null,
                rooms: null,
                floors: null,
                video_url: t.video || null,
                cover_image: t.coverImage || null,
                shops_count: null,
                office_spaces: null,
                age_of_property: null,


                is_project: true,
                project_name: t.name,
                total_towers: t.totalTowers || null,
                total_units: t.totalUnits || null,
                rera_number: t.reraNumber || null,
                possession_date: t.possessionDate || null,
                construction_status: t.constructionStatus || null,
                unit_configurations: t.unitConfigurations || [],
                connectivity: t.connectivity || [],
                nearby_places: t.nearbyPlaces || [],
                project_highlights: t.highlights || [],
            };

            setProperty(parsedProperty);
        } catch (error) {
            console.error("Error fetching project:", error);
            toast({
                title: "Error",
                description: "Failed to load project details",
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!property?.id) return;

        if (!formData.phone.trim()) {
            toast({
                title: "Phone number required",
                variant: "destructive",
            });
            return;
        }

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/messages/send`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        message: formData.message || "Interested in this property",
                        townshipId: property.id,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to send inquiry");
            }

            toast({
                title: "Inquiry Sent!",
                description: "The agent will contact you shortly.",
            });

            setFormData({
                name: "",
                email: "",
                phone: "",
                message: "",
            });
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Something went wrong",
                variant: "destructive",
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

    interface GroupedConfig {
        type: string;
        minSize: number;
        maxSize: number;
        minPrice: number;
        maxPrice: number;
    }

    const grouped = Object.values(
        (property?.unit_configurations || []).reduce(
            (acc: Record<string, GroupedConfig>, u) => {
                if (!acc[u.type]) {
                    acc[u.type] = {
                        type: u.type,
                        minSize: u.size,
                        maxSize: u.size,
                        minPrice: u.price,
                        maxPrice: u.price,
                    };
                } else {
                    acc[u.type].minSize = Math.min(acc[u.type].minSize, u.size);
                    acc[u.type].maxSize = Math.max(acc[u.type].maxSize, u.size);
                    acc[u.type].minPrice = Math.min(acc[u.type].minPrice, u.price);
                    acc[u.type].maxPrice = Math.max(acc[u.type].maxPrice, u.price);
                }
                return acc;
            },
            {},
        ),
    );

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
                onClose={() => router.push(`/projects/${id}`)}
                defaultStep="register"
            />

            <main className={`container mx-auto px-4 py-8 mt-10 transition-all duration-500 ${showAuthWall ? "blur-md pointer-events-none select-none opacity-50 h-[80vh] overflow-hidden" : ""}`}>
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
                                        className="w-full h-full object-cover transition-transform duration-300"
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
                                            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition"
                                        >
                                            <ChevronLeft className="h-5 w-5" />
                                        </button>

                                        <button
                                            onClick={() =>
                                                setSelectedImageIndex((prev) =>
                                                    prev === images.length - 1 ? 0 : prev + 1,
                                                )
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition"
                                        >
                                            <ChevronRight className="h-5 w-5" />
                                        </button>
                                    </>
                                )}

                                <button
                                    onClick={() => setIsGalleryOpen(true)}
                                    className="absolute right-3 top-3 bg-white/80 hover:bg-white p-2 rounded-full shadow"
                                >
                                    <Maximize2 className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Thumbnails */}
                            {images.length > 1 && (
                                <div className="flex gap-2 overflow-x-auto pb-2">
                                    {images.map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImageIndex(index)}
                                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${selectedImageIndex === index
                                                ? "border-primary ring-2 ring-primary/30"
                                                : "border-transparent hover:border-muted-foreground/30"
                                                }`}
                                        >
                                            <img
                                                src={getImageUrl(img)}
                                                alt={`Thumb ${index + 1}`}
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
                                <span className="flex items-center gap-1">
                                    <Eye className="h-4 w-4" />
                                    {property.views || 0} views
                                </span>
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
                                        {grouped.map((config) => (
                                            <div
                                                key={config.type}
                                                className="p-4 rounded-xl border bg-background shadow-sm"
                                            >
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="flex items-center gap-2 text-muted-foreground">
                                                        <Bed className="h-4 w-4 text-primary" />
                                                    </div>
                                                    <h4 className="font-semibold text-lg">
                                                        {config.type}
                                                    </h4>
                                                </div>

                                                <div className="space-y-1 text-sm">
                                                    <p className="flex items-center gap-2 text-muted-foreground">
                                                        <Square className="h-4 w-4 text-muted-foreground" />
                                                        {config.minSize} – {config.maxSize} sq.ft
                                                    </p>

                                                    <p className="flex items-center gap-2 font-medium text-primary">
                                                        <IndianRupee className="h-4 w-4 text-primary" />
                                                        {formatPriceShort(config.minPrice)} –{" "}
                                                        {formatPriceShort(config.maxPrice)}
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
                        <Card>
                            <CardHeader>
                                <CardTitle>Description</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                    {property.description}
                                </p>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t">
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Property Type
                                        </p>
                                        <p className="font-medium">{property.property_type}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Listing Type
                                        </p>
                                        <p className="font-medium capitalize">
                                            {property.listing_type}
                                        </p>
                                    </div>
                                    {property.furnishing && (
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Furnishing
                                            </p>
                                            <p className="font-medium capitalize">
                                                {property.furnishing}
                                            </p>
                                        </div>
                                    )}
                                    {property.facing && (
                                        <div>
                                            <p className="text-sm text-muted-foreground">Facing</p>
                                            <p className="font-medium">{property.facing}</p>
                                        </div>
                                    )}
                                    {property.age_of_property && (
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Property Age
                                            </p>
                                            <p className="font-medium">{property.age_of_property}</p>
                                        </div>
                                    )}
                                    {property.construction_status && (
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Construction Status
                                            </p>
                                            <p className="font-medium">
                                                {property.construction_status}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

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
                                        nearbyPlaces={nearbyPlaces}
                                        plotPolygon={[
                                            [73.855, 18.52],
                                            [73.858, 18.52],
                                            [73.858, 18.523],
                                            [73.855, 18.523],
                                        ]}
                                        propertiesGeoJson={demoProperties}
                                    />
                                </CardContent>
                                {nearbyPlaces.length > 0 && (
                                    <div className="mt-4 p-4 rounded-xl bg-muted/40">
                                        <h4 className="text-sm font-semibold mb-3">
                                            Nearby Places on Map:
                                        </h4>

                                        <div className="flex flex-wrap gap-2">
                                            {nearbyPlaces.map((place, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border bg-background text-sm shadow-sm"
                                                >
                                                    <span className="font-medium">{index + 1}.</span>
                                                    <span className="font-medium">{place.name}</span>
                                                    <span className="text-muted-foreground">
                                                        ({place.distance})
                                                    </span>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
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
                            title="Featured Properties"
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

export default ProjectClient;
