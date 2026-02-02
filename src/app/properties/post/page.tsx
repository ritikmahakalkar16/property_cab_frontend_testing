"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import {
    Loader2, Upload, X, Plus, Home, MapPin, List, Image as ImageIcon, Video,
    ArrowRight, ArrowLeft, CheckCircle2, Building2, Banknote, Ruler, Sparkles
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

const AMENITIES_LIST = [
    "Power Backup", "Parking", "CCTV", "Security", "Fire Safety", "Washroom",
    "Water Supply", "Modular kitchen", "Swimming pool", "Clubhouse",
    "Children’s play area", "Gym", "Lift", "Gas Pipeline", "Park",
    "Visitor Parking", "Intercom", "Wifi",
];

const PROPERTY_TYPES = ["residential", "commercial", "agricultural", "other"];
const PROPERTY_SUB_TYPES = [
    "godown", "farm_house", "bungalow", "agricultural_land", "raw_house",
    "flat", "resort", "agriculture_land", "plot", "office", "shop", "other",
];
const SALE_TYPES = ["sale", "rent", "resale"];
const FURNISHING_TYPES = ["furnished", "semi-furnished", "unfurnished"];
const POSSESSION_STATUS = ["ready_to_move", "under_construction"];

const STEPS = [
    { id: 1, title: "Basic Info", icon: Home, description: "Title & Price" },
    { id: 2, title: "Location", icon: MapPin, description: "Address & City" },
    { id: 3, title: "Specs", icon: Ruler, description: "Area & Layout" },
    { id: 4, title: "Details", icon: Sparkles, description: "Amenities" },
    { id: 5, title: "Gallery", icon: ImageIcon, description: "Photos & Video" },
];

export default function PostPropertyPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const topRef = useRef<HTMLDivElement>(null);

    // Form State
    const initialFormState = {
        title: "", description: "", overview: "", price: "", saleType: "sale",
        propertyType: "residential", propertySubType: "flat", bedrooms: "", bathrooms: "",
        balconies: "", parking: "", floors: "", towers: "", possessionStatus: "ready_to_move",
        possessionDate: "", furnishing: "unfurnished", builtUpArea: "", carpetArea: "",
        developers: "", address: "", city: "", state: "", zipCode: "", latitude: "",
        longitude: "", video: "", agentInfo: "", seoTitle: "", seoDescription: "",
        isFeatured: false,
    };

    const [formData, setFormData] = useState(initialFormState);
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
    const [highlights, setHighlights] = useState<string[]>([]);
    const [newHighlight, setNewHighlight] = useState("");

    // File States
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [galleryImages, setGalleryImages] = useState<File[]>([]);
    const [floorPlans, setFloorPlans] = useState<File[]>([]);
    const [brochure, setBrochure] = useState<File | null>(null);

    // Refs
    const coverInputRef = useRef<HTMLInputElement>(null);
    const galleryInputRef = useRef<HTMLInputElement>(null);
    const floorPlanInputRef = useRef<HTMLInputElement>(null);
    const brochureInputRef = useRef<HTMLInputElement>(null);

    // Auth & Scroll
    useEffect(() => {
        if (!authLoading && !user) router.push("/auth");
    }, [authLoading, user, router]);

    useEffect(() => {
        topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, [currentStep]);

    if (authLoading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <p className="text-muted-foreground animate-pulse">Loading experience...</p>
                </div>
            </div>
        );
    }

    // Handlers
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const toggleAmenity = (amenity: string) => {
        setSelectedAmenities((prev) =>
            prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
        );
    };

    const addHighlight = () => {
        if (newHighlight.trim()) {
            setHighlights([...highlights, newHighlight.trim()]);
            setNewHighlight("");
        }
    };

    const removeHighlight = (index: number) => {
        setHighlights(highlights.filter((_, i) => i !== index));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<File | null>>) => {
        if (e.target.files?.[0]) setter(e.target.files[0]);
    };

    const handleMultiFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<File[]>>) => {
        if (e.target.files) setter((prev) => [...prev, ...Array.from(e.target.files!)]);
    };

    const removeFile = (index: number, setter: React.Dispatch<React.SetStateAction<File[]>>) => {
        setter((prev) => prev.filter((_, i) => i !== index));
    };

    const validateStep = (step: number) => {
        switch (step) {
            case 1:
                if (!formData.title || !formData.price || !formData.saleType) {
                    toast.error("Required: Title, Price & Type");
                    return false;
                }
                return true;
            case 2:
                if (!formData.address || !formData.city || !formData.state) {
                    toast.error("Required: Address, City & State");
                    return false;
                }
                return true;
            default: return true;
        }
    };

    const nextStep = () => {
        if (validateStep(currentStep)) setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    };
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setLoading(true);
        try {
            const submitData = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (key === "seoTitle" || key === "seoDescription") return;
                if (value) submitData.append(key, String(value));
            });
            submitData.append("amenities", JSON.stringify(selectedAmenities));
            submitData.append("highlights", JSON.stringify(highlights));
            submitData.append("seo", JSON.stringify({ title: formData.seoTitle, description: formData.seoDescription }));
            if (coverImage) submitData.append("coverImage", coverImage);
            galleryImages.forEach((f) => submitData.append("images", f));
            floorPlans.forEach((f) => submitData.append("floorPlans", f));
            if (brochure) submitData.append("brochure", brochure);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/properties`, {
                method: "POST", body: submitData, credentials: "include",
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Failed to create property");
            toast.success("Listing published successfully!");
            router.push("/properties");
        } catch (error: any) {
            toast.error(error.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background font-sans selection:bg-primary/20">
            <Header />
            {/* Background Decor */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            </div>

            <main className="container mx-auto px-4 py-8 mt-20 max-w-6xl" ref={topRef}>
                <div className="grid lg:grid-cols-[280px_1fr] gap-8 items-start">

                    {/* Sidebar / Progress */}
                    <div className="lg:sticky lg:top-24 space-y-8">
                        <div className="mb-6">
                            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-amber-600 bg-clip-text text-transparent">
                                Create Listing
                            </h1>
                            <p className="text-muted-foreground mt-2">
                                Share your property with the world in 5 simple steps.
                            </p>
                        </div>

                        {/* Vertical Stepper (Desktop) / Horizontal (Mobile) */}
                        <div className="bg-card/50 backdrop-blur-sm border rounded-2xl p-6 shadow-sm">
                            <div className="space-y-6 relative">
                                {/* Vertical line for desktop */}
                                <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-muted hidden lg:block" />

                                {STEPS.map((step, idx) => {
                                    const isActive = step.id === currentStep;
                                    const isCompleted = step.id < currentStep;
                                    const Icon = step.icon;

                                    return (
                                        <div
                                            key={step.id}
                                            className={cn(
                                                "relative flex items-center gap-4 transition-all duration-300",
                                                isActive ? "opacity-100 scale-105 origin-left" : isCompleted ? "opacity-80" : "opacity-40"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 transition-colors",
                                                isActive ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" :
                                                    isCompleted ? "bg-green-500 border-green-500 text-white" : "bg-background border-muted text-muted-foreground"
                                            )}>
                                                {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                                            </div>
                                            <div className="flex-1 hidden lg:block">
                                                <p className={cn("font-semibold leading-none", isActive && "text-primary")}>{step.title}</p>
                                                <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Preview Widget (Placeholder for data completeness) */}
                        <div className="bg-gradient-to-br from-primary/10 to-amber-500/10 rounded-2xl p-6 border hidden lg:block">
                            <h3 className="font-semibold mb-2 flex items-center gap-2"><Sparkles className="w-4 h-4 text-amber-500" /> Pro Tip</h3>
                            <p className="text-sm text-muted-foreground">
                                Properties with 5+ photos and detailed descriptions get <strong>3x more inquiries</strong>.
                            </p>
                        </div>
                    </div>

                    {/* Main Form Area */}
                    <div className="flex-1 min-w-0">
                        <Card className="border-none shadow-xl bg-card/80 backdrop-blur-md overflow-hidden ring-1 ring-black/5">
                            <CardContent className="p-0">
                                {/* Form Steps */}
                                <div className="p-6 md:p-10 min-h-[500px]">
                                    {/* Step 1 */}
                                    {currentStep === 1 && (
                                        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                                            <div className="border-b pb-4">
                                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                                    Basic Details <span className="text-muted-foreground text-lg font-normal">/ step 1</span>
                                                </h2>
                                            </div>

                                            <div className="grid gap-6">
                                                <div className="space-y-2">
                                                    <Label className="text-base">Property Title</Label>
                                                    <Input
                                                        name="title"
                                                        value={formData.title}
                                                        onChange={handleInputChange}
                                                        placeholder="e.g. Luxury Penthouse in City Center..."
                                                        className="h-14 text-lg bg-background/50 focus:bg-background transition-all"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <Label>I want to</Label>
                                                        <Select value={formData.saleType} onValueChange={(val) => handleSelectChange("saleType", val)}>
                                                            <SelectTrigger className="h-12 bg-background/50"><SelectValue /></SelectTrigger>
                                                            <SelectContent>
                                                                {SALE_TYPES.map(t => <SelectItem key={t} value={t}>{t.toUpperCase()}</SelectItem>)}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Price (₹)</Label>
                                                        <div className="relative group">
                                                            <Banknote className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                                            <Input type="number" name="price" value={formData.price} onChange={handleInputChange} className="pl-10 h-12 bg-background/50" placeholder="0.00" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <Label>Property Type</Label>
                                                        <Select value={formData.propertyType} onValueChange={(val) => handleSelectChange("propertyType", val)}>
                                                            <SelectTrigger className="h-12 bg-background/50"><SelectValue /></SelectTrigger>
                                                            <SelectContent>
                                                                {PROPERTY_TYPES.map(t => <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>)}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Sub Type</Label>
                                                        <Select value={formData.propertySubType} onValueChange={(val) => handleSelectChange("propertySubType", val)}>
                                                            <SelectTrigger className="h-12 bg-background/50"><SelectValue /></SelectTrigger>
                                                            <SelectContent>
                                                                {PROPERTY_SUB_TYPES.map(t => <SelectItem key={t} value={t}>{t.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</SelectItem>)}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label>Description</Label>
                                                    <Textarea
                                                        name="description"
                                                        value={formData.description}
                                                        onChange={handleInputChange}
                                                        placeholder="Highlight key features, location benefits, etc..."
                                                        className="min-h-[150px] resize-none text-base p-4 bg-background/50 focus:bg-background"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 2 */}
                                    {currentStep === 2 && (
                                        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                                            <div className="border-b pb-4">
                                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                                    Location <span className="text-muted-foreground text-lg font-normal">/ step 2</span>
                                                </h2>
                                            </div>

                                            <div className="grid gap-6">
                                                <div className="space-y-2">
                                                    <Label>Full Address</Label>
                                                    <div className="relative group">
                                                        <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                                        <Textarea
                                                            name="address"
                                                            value={formData.address}
                                                            onChange={handleInputChange}
                                                            className="pl-10 min-h-[100px] bg-background/50"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                    <div className="space-y-2"><Label>City</Label><Input name="city" value={formData.city} onChange={handleInputChange} className="h-12 bg-background/50" /></div>
                                                    <div className="space-y-2"><Label>State</Label><Input name="state" value={formData.state} onChange={handleInputChange} className="h-12 bg-background/50" /></div>
                                                    <div className="space-y-2"><Label>Zip Code</Label><Input name="zipCode" value={formData.zipCode} onChange={handleInputChange} className="h-12 bg-background/50" /></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 3 */}
                                    {currentStep === 3 && (
                                        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                                            <div className="border-b pb-4">
                                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                                    Specifications <span className="text-muted-foreground text-lg font-normal">/ step 3</span>
                                                </h2>
                                            </div>

                                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                                {[{ l: "Bedrooms", n: "bedrooms" }, { l: "Bathrooms", n: "bathrooms" }, { l: "Balconies", n: "balconies" }, { l: "Parking", n: "parking" }].map((i) => (
                                                    <div key={i.n} className="space-y-2">
                                                        <Label>{i.l}</Label>
                                                        <Input type="number" name={i.n} value={(formData as any)[i.n]} onChange={handleInputChange} className="h-12 bg-background/50 text-center text-lg" />
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                                <div className="p-6 bg-muted/20 rounded-xl space-y-4 border border-border/50">
                                                    <h4 className="font-semibold flex items-center gap-2"><Ruler className="w-4 h-4" /> Area Details</h4>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-1"><Label className="text-xs uppercase text-muted-foreground">Built-up (sq.ft)</Label><Input type="number" name="builtUpArea" value={formData.builtUpArea} onChange={handleInputChange} className="h-11" /></div>
                                                        <div className="space-y-1"><Label className="text-xs uppercase text-muted-foreground">Carpet (sq.ft)</Label><Input type="number" name="carpetArea" value={formData.carpetArea} onChange={handleInputChange} className="h-11" /></div>
                                                    </div>
                                                </div>
                                                <div className="p-6 bg-muted/20 rounded-xl space-y-4 border border-border/50">
                                                    <h4 className="font-semibold flex items-center gap-2"><Building2 className="w-4 h-4" /> Structure</h4>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-1"><Label className="text-xs uppercase text-muted-foreground">Floors</Label><Input type="number" name="floors" value={formData.floors} onChange={handleInputChange} className="h-11" /></div>
                                                        <div className="space-y-1"><Label className="text-xs uppercase text-muted-foreground">Towers</Label><Input type="number" name="towers" value={formData.towers} onChange={handleInputChange} className="h-11" /></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <div className="space-y-2">
                                                    <Label>Furnishing</Label>
                                                    <Select value={formData.furnishing} onValueChange={(val) => handleSelectChange("furnishing", val)}>
                                                        <SelectTrigger className="h-12"><SelectValue /></SelectTrigger>
                                                        <SelectContent>{FURNISHING_TYPES.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Possession Status</Label>
                                                    <Select value={formData.possessionStatus} onValueChange={(val) => handleSelectChange("possessionStatus", val)}>
                                                        <SelectTrigger className="h-12"><SelectValue /></SelectTrigger>
                                                        <SelectContent>{POSSESSION_STATUS.map(s => <SelectItem key={s} value={s}>{s.replace(/_/g, ' ')}</SelectItem>)}</SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Date</Label>
                                                    <Input type="date" name="possessionDate" value={formData.possessionDate} onChange={handleInputChange} className="h-12 bg-background/50" />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 4 */}
                                    {currentStep === 4 && (
                                        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                                            <div className="border-b pb-4">
                                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                                    Amenities <span className="text-muted-foreground text-lg font-normal">/ step 4</span>
                                                </h2>
                                            </div>

                                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                                {AMENITIES_LIST.map((amenity) => (
                                                    <div key={amenity}
                                                        className={cn(
                                                            "group flex items-center space-x-3 border p-3 rounded-xl transition-all duration-200 cursor-pointer hover:shadow-md",
                                                            selectedAmenities.includes(amenity) ? "bg-primary/5 border-primary shadow-sm" : "bg-card hover:border-primary/50"
                                                        )}
                                                        onClick={() => toggleAmenity(amenity)}
                                                    >
                                                        <Checkbox checked={selectedAmenities.includes(amenity)} className="data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                                                        <span className="text-sm font-medium">{amenity}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="space-y-4 pt-6 border-t">
                                                <h3 className="font-semibold text-lg">Unique Highlights</h3>
                                                <div className="flex gap-3">
                                                    <Input
                                                        value={newHighlight}
                                                        onChange={(e) => setNewHighlight(e.target.value)}
                                                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addHighlight())}
                                                        placeholder="Type a highlight & press Enter..."
                                                        className="h-12 max-w-md bg-background/50"
                                                    />
                                                    <Button onClick={addHighlight} size="lg" variant="secondary"><Plus className="w-4 h-4" /></Button>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {highlights.map((h, i) => (
                                                        <div key={i} className="flex items-center gap-2 bg-gradient-to-r from-primary/10 to-amber-500/10 text-foreground px-4 py-2 rounded-full text-sm border shadow-sm animate-in zoom-in duration-300">
                                                            {h}
                                                            <button onClick={() => removeHighlight(i)} className="hover:text-destructive transition-colors"><X className="w-3.5 h-3.5" /></button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 5 */}
                                    {currentStep === 5 && (
                                        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                                            <div className="border-b pb-4">
                                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                                    Media Gallery <span className="text-muted-foreground text-lg font-normal">/ step 5</span>
                                                </h2>
                                            </div>

                                            <div className="space-y-6">
                                                {/* Cover Upload */}
                                                <div
                                                    className={cn(
                                                        "relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 group cursor-pointer",
                                                        coverImage ? "border-primary/50 bg-background" : "border-muted-foreground/20 hover:border-primary/50 hover:bg-primary/5"
                                                    )}
                                                    onClick={() => coverInputRef.current?.click()}
                                                >
                                                    {coverImage ? (
                                                        <>
                                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                                                                <p className="text-white font-medium flex items-center gap-2"><Upload className="w-4 h-4" /> Change Cover</p>
                                                            </div>
                                                            <img src={URL.createObjectURL(coverImage)} className="w-full h-64 object-cover" alt="Cover" />
                                                        </>
                                                    ) : (
                                                        <div className="h-64 flex flex-col items-center justify-center gap-4 text-center p-8">
                                                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                                                <ImageIcon className="w-8 h-8" />
                                                            </div>
                                                            <div>
                                                                <p className="text-lg font-semibold">Upload Cover Image</p>
                                                                <p className="text-muted-foreground text-sm mt-1">PNG, JPG up to 5MB</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <input type="file" accept="image/*" ref={coverInputRef} className="hidden" onChange={(e) => handleFileChange(e, setCoverImage)} />
                                                </div>

                                                {/* Gallery Grid */}
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                    {galleryImages.map((file, i) => (
                                                        <div key={i} className="relative aspect-square rounded-xl overflow-hidden group shadow-sm">
                                                            <img src={URL.createObjectURL(file)} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="Gallery" />
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); removeFile(i, setGalleryImages); }}
                                                                className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-destructive"
                                                            >
                                                                <X className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                    <button
                                                        onClick={() => galleryInputRef.current?.click()}
                                                        className="aspect-square rounded-xl border-2 border-dashed border-muted-foreground/20 hover:border-primary/50 hover:bg-primary/5 flex flex-col items-center justify-center gap-2 transition-all"
                                                    >
                                                        <Plus className="w-8 h-8 text-muted-foreground" />
                                                        <span className="text-xs font-medium text-muted-foreground">Add Photo</span>
                                                    </button>
                                                </div>
                                                <input type="file" multiple accept="image/*" ref={galleryInputRef} className="hidden" onChange={(e) => handleMultiFileChange(e, setGalleryImages)} />

                                                {/* Video & Docs */}
                                                <div className="pt-6 border-t grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <Label>Video Tour URL</Label>
                                                        <Input name="video" value={formData.video} onChange={handleInputChange} placeholder="https://youtube.com/..." className="h-12 bg-background/50" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Brochure (PDF)</Label>
                                                        <div className="flex gap-3">
                                                            <Button type="button" variant="outline" className="h-12 px-6 w-full justify-start" onClick={() => brochureInputRef.current?.click()}>
                                                                <Upload className="w-4 h-4 mr-2" />
                                                                {brochure ? <span className="truncate">{brochure.name}</span> : "Select PDF"}
                                                            </Button>
                                                            <input type="file" accept="application/pdf" ref={brochureInputRef} className="hidden" onChange={(e) => handleFileChange(e, setBrochure)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Footer / Navigation */}
                                <div className="p-6 md:p-10 border-t bg-muted/10 flex justify-between items-center backdrop-blur-sm">
                                    <Button
                                        variant="ghost"
                                        size="lg"
                                        onClick={currentStep === 1 ? () => router.back() : prevStep}
                                        className="text-muted-foreground hover:text-foreground"
                                    >
                                        <ArrowLeft className="w-4 h-4 mr-2" /> {currentStep === 1 ? "Cancel" : "Back"}
                                    </Button>

                                    <div className="flex items-center gap-4">
                                        <span className="text-sm text-muted-foreground hidden md:inline-block">Step {currentStep} of {STEPS.length}</span>
                                        {currentStep < STEPS.length ? (
                                            <Button size="lg" onClick={nextStep} className="px-8 shadow-lg shadow-primary/20 bg-gradient-to-r from-primary to-amber-600 hover:brightness-110 transition-all">
                                                Next Step <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        ) : (
                                            <Button size="lg" onClick={() => handleSubmit()} disabled={loading} className="px-8 shadow-lg shadow-green-500/20 bg-green-600 hover:bg-green-700 text-white transition-all">
                                                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <CheckCircle2 className="w-4 h-4 mr-2" />}
                                                Publish Listing
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
