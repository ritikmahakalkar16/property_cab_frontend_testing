// "use client";

// import { useState, useEffect, Suspense } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import PropertyCard from "@/components/PropertyCard";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Slider } from "@/components/ui/slider";
// import { Checkbox } from "@/components/ui/checkbox";
// import { SlidersHorizontal, Search, Loader2 } from "lucide-react";

// import { Skeleton } from "@/components/ui/skeleton";
// import FeaturedPropertiesPromo from "@/components/FeaturedPropertiesPromo";
// import Image from "next/image";

// // Import property images
// import flat1 from "@/assets/properties/flat-1.jpg";
// import flat2 from "@/assets/properties/flat-2.jpg";
// import bungalow1 from "@/assets/properties/bungalow-1.jpg";
// import office1 from "@/assets/properties/office-1.jpg";
// import office2 from "@/assets/properties/office-2.jpg";
// import agriLand1 from "@/assets/properties/agri-land-1.jpg";
// import rowhouse1 from "@/assets/properties/rowhouse-1.jpg";
// import shop1 from "@/assets/properties/shop-1.jpg";
// import plot1 from "@/assets/properties/plot-1.jpg";
// import godown1 from "@/assets/properties/godown-1.jpg";
// import farmhouse1 from "@/assets/properties/farmhouse-1.jpg";
// import resort1 from "@/assets/properties/resort-1.jpg";

// // Image mapping for property types
// const propertyImages: Record<string, any> = {
//   Flat: flat1,
//   Bungalow: bungalow1,
//   "Row House": rowhouse1,
//   Plot: plot1,
//   Shop: shop1,
//   "Office Space": office1,
//   Godown: godown1,
//   "Farm House": farmhouse1,
//   Resort: resort1,
//   "Agriculture Land": agriLand1,
//   "Non Agriculture/Developed Land": plot1,
// };

// const PROPERTY_CATEGORIES = {
//   RESIDENTIAL: [
//     { name: "Flat", value: "flat" },
//     { name: "Bungalow", value: "bungalow" },
//     { name: "Row House", value: "raw_house" },
//     { name: "Plot", value: "plot" },
//   ],

//   COMMERCIAL: [
//     { name: "Shop", value: "shop" },
//     { name: "Office Space", value: "office" },
//     { name: "Godown", value: "godown" },
//     { name: "Farm House", value: "farm_house" },
//     { name: "Resort", value: "resort" },
//   ],

//   AGRICULTURE: [
//     { name: "Agriculture Land", value: "agriculture_land" },
//     { name: "Agricultural Land", value: "agricultural_land" },
//   ],
// };

// interface Property {
//   id: string;
//   title: string;
//   price: number;
//   property_type: string;
//   listing_type: string;
//   bedrooms: number;
//   bathrooms: number;
//   area: number;
//   address: string;
//   city: string;
//   state: string;
//   coverImage: string | null;
//   images: string[] | null;
//   features: string[] | null;
//   status: string;
//   created_at: string | null;
// }

// const PropertiesContent = () => {
//   const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
//   const searchParams = useSearchParams();
//   const [showFilters, setShowFilters] = useState(true);
//   const [properties, setProperties] = useState<Property[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Filter states
//   const [searchQuery, setSearchQuery] = useState(
//     searchParams.get("search") || "",
//   );
//   const [propertyType, setPropertyType] = useState(
//     searchParams.get("type") || "all",
//   );
//   const [propertyCategory, setPropertyCategory] = useState(
//     searchParams.get("category") || "all",
//   );
//   const [location, setLocation] = useState(
//     searchParams.get("city") || searchParams.get("location") || "all",
//   );
//   const [bhk, setBhk] = useState(searchParams.get("bhk") || "all");
//   const [listingType, setListingType] = useState(
//     searchParams.get("listingType") || "all",
//   );
//   const [priceRange, setPriceRange] = useState([0, 100000000]);
//   const [areaRange, setAreaRange] = useState([0, 100000]);
//   const [sortBy, setSortBy] = useState("newest");
//   const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

//   const availableAmenities = [
//     "Swimming Pool",
//     "Gym",
//     "Parking",
//     "Garden",
//     "Security",
//     "Power Backup",
//     "Lift",
//     "Club House",
//   ];

//   // Fetch properties from database
//   useEffect(() => {
//     const fetchProperties = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(
//           `${API_BASE_URL}/api/v1/properties/all`,
//         );
//         if (!response.ok) throw new Error("Failed to fetch properties");

//         const result = await response.json();

//         const mapped = (result.data || []).map((p: any) => ({
//           id: p._id,
//           title: p.title,
//           price: p.price,
//           property_type: p.propertySubType,
//           listing_type: p.saleType,
//           bedrooms: p.bedrooms || 0,
//           bathrooms: p.bathrooms || 0,
//           area: p.builtUpArea || 0,
//           address: p.address,
//           city: p.city,
//           state: p.state,
//           images: p.images || [],
//           features: p.amenities || [],
//           status: p.status,
//           created_at: p.createdAt,
//           //   coverImage: p.coverImage,
//           coverImage: p.coverImage
//             ? `${API_BASE_URL}${p.coverImage}`
//             : "/placeholder.svg",
//         }));

//         setProperties(mapped);
//       } catch (error) {
//         console.error("Error fetching properties:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProperties();
//   }, []);

//   // Format price for display
//   const formatPrice = (price: number, listingType: string) => {
//     if (listingType === "rent") {
//       return `₹${price.toLocaleString()}/month`;
//     }
//     if (price >= 10000000) {
//       return `₹${(price / 10000000).toFixed(2)} Cr`;
//     }
//     if (price >= 100000) {
//       return `₹${(price / 100000).toFixed(2)} Lacs`;
//     }
//     return `₹${price.toLocaleString()}`;
//   };

//   // Get image for property
//   const getPropertyImage = (property: Property) => {
//     // if (property.coverImage) {
//     //     const image = property.coverImage;
//     //     if (image.startsWith('http') || image.startsWith('/uploads')) {
//     //         return image;
//     //     }
//     //     // Fallback for old Supabase stored images
//     //     return `${process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jnrnlsqqujjqspaqyumw.supabase.co'}/storage/v1/object/public/property-images/${image}`;
//     // }
//     // return propertyImages[property.property_type] || '/placeholder.svg';

//     if (property?.coverImage && property?.coverImage.length > 0) {
//       return property?.coverImage;
//     }
//     return "/placeholder.svg";
//   };

//   // Get unique cities from properties
//   const cities = [...new Set(properties.map((p) => p.city))].filter(Boolean);

//   // Live filtering logic
//   const filteredProperties = properties.filter((property) => {
//     // Search query filter
//     const matchesSearch =
//       searchQuery === "" ||
//       property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       property.city.toLowerCase().includes(searchQuery.toLowerCase());

//     // Property type filter
//     const matchesPropertyType =
//       propertyType === "all" || property.property_type === propertyType;

//     // Property category filter
//     let matchesCategory = propertyCategory === "all";

//     if (propertyCategory === "Commercial") {
//       matchesCategory = PROPERTY_CATEGORIES.COMMERCIAL.some(
//         (c) => c.value === property.property_type,
//       );
//     } else if (propertyCategory === "Residential") {
//       matchesCategory = PROPERTY_CATEGORIES.RESIDENTIAL.some(
//         (c) => c.value === property.property_type,
//       );
//     } else if (propertyCategory === "Agriculture") {
//       matchesCategory = PROPERTY_CATEGORIES.AGRICULTURE.some(
//         (c) => c.value === property.property_type,
//       );
//     }

//     // Location filter
//     // const matchesLocation = location === "all" || property.city === location;
//     const matchesLocation =
//       location === "all" ||
//       property.city?.trim().toLowerCase() === location.trim().toLowerCase();

//     // BHK filter
//     const matchesBhk =
//       bhk === "all" ||
//       (bhk === "1" && property.bedrooms === 1) ||
//       (bhk === "2" && property.bedrooms === 2) ||
//       (bhk === "3" && property.bedrooms === 3) ||
//       (bhk === "4+" && property.bedrooms >= 4);

//     // Listing type filter
//     const matchesListingType =
//       listingType === "all" || property.listing_type === listingType;

//     // Price range filter
//     const matchesPrice =
//       property.price >= priceRange[0] && property.price <= priceRange[1];

//     // Area range filter
//     const matchesArea =
//       property.area >= areaRange[0] && property.area <= areaRange[1];

//     // Amenities filter
//     const matchesAmenities =
//       selectedAmenities.length === 0 ||
//       selectedAmenities.every((amenity) =>
//         property.features?.includes(amenity),
//       );

//     return (
//       matchesSearch &&
//       matchesPropertyType &&
//       matchesCategory &&
//       matchesLocation &&
//       matchesBhk &&
//       matchesListingType &&
//       matchesPrice &&
//       matchesArea &&
//       matchesAmenities
//     );
//   });

//   // Sorting logic
//   const sortedProperties = [...filteredProperties].sort((a, b) => {
//     switch (sortBy) {
//       case "price-low":
//         return a.price - b.price;
//       case "price-high":
//         return b.price - a.price;
//       case "area-low":
//         return a.area - b.area;
//       case "area-high":
//         return b.area - a.area;
//       case "newest":
//       default:
//         return (
//           new Date(b.created_at || 0).getTime() -
//           new Date(a.created_at || 0).getTime()
//         );
//     }
//   });

//   // Clear all filters
//   const clearFilters = () => {
//     setSearchQuery("");
//     setPropertyType("all");
//     setPropertyCategory("all");
//     setLocation("all");
//     setBhk("all");
//     setListingType("all");
//     setPriceRange([0, 100000000]);
//     setAreaRange([0, 100000]);
//     setSortBy("newest");
//     setSelectedAmenities([]);
//   };

//   const toggleAmenity = (amenity: string) => {
//     setSelectedAmenities((prev) =>
//       prev.includes(amenity)
//         ? prev.filter((a) => a !== amenity)
//         : [...prev, amenity],
//     );
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />

//       <main className="flex-1 pt-24 pb-16">
//         <div className="container mx-auto px-4">
//           {/* Page Header */}
//           <div className="mb-8">
//             <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
//               Properties for Sale & Rent
//             </h1>
//             <p className="text-muted-foreground">
//               {loading
//                 ? "Loading properties..."
//                 : `Found ${sortedProperties.length} properties matching your criteria`}
//             </p>
//           </div>

//           {/* Search Bar */}
//           <div className="mb-6">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
//               <Input
//                 placeholder="Search by location, property name, or city..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-10 h-12 text-base"
//               />
//             </div>
//           </div>

//           <div className="flex flex-col lg:flex-row gap-8">
//             {/* Filters Sidebar */}
//             <aside
//               className={`lg:w-80 ${showFilters ? "block" : "hidden lg:block"}`}
//             >
//               <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
//                 <div className="flex items-center justify-between mb-6">
//                   <h2 className="text-xl font-semibold text-card-foreground">
//                     Filters
//                   </h2>
//                   <Button variant="ghost" size="sm" onClick={clearFilters}>
//                     Clear All
//                   </Button>
//                 </div>

//                 <div className="space-y-6">
//                   {/* Property Category */}
//                   <div>
//                     <Label className="mb-2 block">Category</Label>
//                     <Select
//                       value={propertyCategory}
//                       onValueChange={setPropertyCategory}
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select category" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="all">All Categories</SelectItem>
//                         <SelectItem value="Residential">Residential</SelectItem>
//                         <SelectItem value="Commercial">Commercial</SelectItem>
//                         <SelectItem value="Agriculture">Agriculture</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   {/* Property Type */}
//                   <div>
//                     <Label className="mb-2 block">Property Type</Label>
//                     <Select
//                       value={propertyType}
//                       onValueChange={setPropertyType}
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select type" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="all">All Types</SelectItem>
//                         <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
//                           RESIDENTIAL
//                         </div>
//                         {PROPERTY_CATEGORIES.RESIDENTIAL.map((type) => (
//                           <SelectItem key={type.name} value={type.value}>
//                             {type.name}
//                           </SelectItem>
//                         ))}
//                         <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
//                           COMMERCIAL
//                         </div>
//                         {PROPERTY_CATEGORIES.COMMERCIAL.map((type) => (
//                           <SelectItem key={type.name} value={type.value}>
//                             {type.name}
//                           </SelectItem>
//                         ))}
//                         <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
//                           AGRICULTURE
//                         </div>
//                         {PROPERTY_CATEGORIES.AGRICULTURE.map((type) => (
//                           <SelectItem key={type.name} value={type.value}>
//                             {type.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   {/* Location */}
//                   <div>
//                     <Label className="mb-2 block">City</Label>
//                     <Select value={location} onValueChange={setLocation}>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select city" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="all">All Cities</SelectItem>
//                         {cities.map((city) => (
//                           <SelectItem key={city} value={city}>
//                             {city}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   {/* BHK */}
//                   <div>
//                     <Label className="mb-2 block">BHK</Label>
//                     <Select value={bhk} onValueChange={setBhk}>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select BHK" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="all">Any</SelectItem>
//                         <SelectItem value="1">1 BHK</SelectItem>
//                         <SelectItem value="2">2 BHK</SelectItem>
//                         <SelectItem value="3">3 BHK</SelectItem>
//                         <SelectItem value="4+">4+ BHK</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   {/* Listing Type */}
//                   <div>
//                     <Label className="mb-2 block">Listing Type</Label>
//                     <Select value={listingType} onValueChange={setListingType}>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select type" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="all">Buy & Rent</SelectItem>
//                         <SelectItem value="sale">Buy</SelectItem>
//                         <SelectItem value="rent">Rent</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   {/* Price Range */}
//                   <div>
//                     <Label className="mb-2 block">
//                       Price: {formatPrice(priceRange[0], "sale")} -{" "}
//                       {formatPrice(priceRange[1], "sale")}
//                     </Label>
//                     <Slider
//                       min={0}
//                       max={100000000}
//                       step={500000}
//                       value={priceRange}
//                       onValueChange={setPriceRange}
//                       className="mt-4"
//                     />
//                   </div>

//                   {/* Area Range */}
//                   <div>
//                     <Label className="mb-2 block">
//                       Area: {areaRange[0].toLocaleString()} -{" "}
//                       {areaRange[1].toLocaleString()} sq.ft
//                     </Label>
//                     <Slider
//                       min={0}
//                       max={100000}
//                       step={500}
//                       value={areaRange}
//                       onValueChange={setAreaRange}
//                       className="mt-4"
//                     />
//                   </div>

//                   {/* Amenities */}
//                   <div>
//                     <Label className="mb-3 block">Amenities</Label>
//                     <div className="space-y-3">
//                       {availableAmenities.map((amenity) => (
//                         <div
//                           key={amenity}
//                           className="flex items-center space-x-2"
//                         >
//                           <Checkbox
//                             id={amenity}
//                             checked={selectedAmenities.includes(amenity)}
//                             onCheckedChange={() => toggleAmenity(amenity)}
//                           />
//                           <label
//                             htmlFor={amenity}
//                             className="text-sm font-medium leading-none cursor-pointer"
//                           >
//                             {amenity}
//                           </label>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Featured Properties Promo in Sidebar */}
//               {/* <div className="mt-6">
//                                 <FeaturedPropertiesPromo variant="compact" maxItems={3} title="Featured Picks" />
//                             </div> */}
//             </aside>

//             {/* Property Grid */}
//             <div className="flex-1">
//               {/* Mobile Filter Toggle & Sort */}
//               <div className="flex flex-col sm:flex-row gap-4 mb-6">
//                 <Button
//                   variant="outline"
//                   className="lg:hidden gap-2"
//                   onClick={() => setShowFilters(!showFilters)}
//                 >
//                   <SlidersHorizontal className="h-4 w-4" />
//                   {showFilters ? "Hide Filters" : "Show Filters"}
//                 </Button>

//                 <div className="flex items-center gap-2 ml-auto">
//                   <Label className="text-sm whitespace-nowrap">Sort by:</Label>
//                   <Select value={sortBy} onValueChange={setSortBy}>
//                     <SelectTrigger className="w-40">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="newest">Newest First</SelectItem>
//                       <SelectItem value="price-low">
//                         Price: Low to High
//                       </SelectItem>
//                       <SelectItem value="price-high">
//                         Price: High to Low
//                       </SelectItem>
//                       <SelectItem value="area-low">
//                         Area: Low to High
//                       </SelectItem>
//                       <SelectItem value="area-high">
//                         Area: High to Low
//                       </SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               {/* Loading State */}
//               {loading && (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
//                   {[...Array(6)].map((_, i) => (
//                     <div key={i} className="rounded-lg overflow-hidden">
//                       <Skeleton className="h-52 w-full" />
//                       <div className="p-4 space-y-3">
//                         <Skeleton className="h-6 w-3/4" />
//                         <Skeleton className="h-4 w-1/2" />
//                         <Skeleton className="h-4 w-full" />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Properties Grid */}
//               {!loading && sortedProperties.length > 0 && (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
//                   {sortedProperties.map((property) => (
//                     <PropertyCard
//                       key={property.id}
//                       id={property.id}
//                       title={property.title}
//                       price={formatPrice(property.price, property.listing_type)}
//                       location={`${property.address}, ${property.city}`}
//                       bedrooms={property.bedrooms}
//                       bathrooms={property.bathrooms}
//                       area={property.area}
//                       imageUrl={getPropertyImage(property)}
//                       type={property.listing_type as "buy" | "rent" | "sale"}
//                       propertyType={property.property_type}
//                       featured={false}
//                     />
//                   ))}
//                 </div>
//               )}

//               {/* Empty State */}
//               {!loading && sortedProperties.length === 0 && (
//                 <div className="text-center py-16">
//                   <div className="text-muted-foreground mb-4">
//                     <Search className="h-16 w-16 mx-auto mb-4 opacity-50" />
//                     <h3 className="text-xl font-semibold mb-2">
//                       No properties found
//                     </h3>
//                     <p>Try adjusting your filters or search criteria</p>
//                   </div>
//                   <Button onClick={clearFilters}>Clear All Filters</Button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// const Properties = () => {
//   return (
//     <Suspense
//       fallback={
//         <div className="flex h-screen w-full items-center justify-center">
//           <Loader2 className="h-8 w-8 animate-spin" />
//         </div>
//       }
//     >
//       <PropertiesContent />
//     </Suspense>
//   );
// };

// export default Properties;

// // Force dynamic rendering to avoid prerendering issues with useSearchParams
// export const dynamic = "force-dynamic";





"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  SlidersHorizontal,
  Search,
  Loader2,
  Building2,
  MapPin,
  Filter,
  ArrowUpDown,
  X,
  Sparkles,
  Home,
  CheckCircle2,
} from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import heroImage from "@/assets/hero-property.jpg";

// Constants
const PROPERTY_CATEGORIES = {
  RESIDENTIAL: [
    { name: "Flat", value: "flat" },
    { name: "Bungalow", value: "bungalow" },
    { name: "Row House", value: "raw_house" },
    { name: "Plot", value: "plot" },
  ],
  COMMERCIAL: [
    { name: "Shop", value: "shop" },
    { name: "Office Space", value: "office" },
    { name: "Godown", value: "godown" },
    { name: "Farm House", value: "farm_house" },
    { name: "Resort", value: "resort" },
  ],
  AGRICULTURE: [
    { name: "Agriculture Land", value: "agriculture_land" },
    { name: "Agricultural Land", value: "agricultural_land" },
  ],
};

interface Property {
  id: string;
  title: string;
  price: number;
  property_type: string;
  listing_type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  address: string;
  city: string;
  state: string;
  coverImage: string | null;
  images: string[] | null;
  features: string[] | null;
  status: string;
  created_at: string | null;
  views: number | null;
}

const PropertiesContent = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(true);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Mobile filter drawer state
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [propertyType, setPropertyType] = useState(searchParams.get("type") || "all");
  const [propertyCategory, setPropertyCategory] = useState(searchParams.get("category") || "all");
  const [location, setLocation] = useState(searchParams.get("city") || searchParams.get("location") || "all");
  const [bhk, setBhk] = useState(searchParams.get("bhk") || "all");
  const [listingType, setListingType] = useState(searchParams.get("listingType") || "all");
  const [priceRange, setPriceRange] = useState([0, 100000000]);
  const [areaRange, setAreaRange] = useState([0, 100000]);
  const [sortBy, setSortBy] = useState("newest");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const availableAmenities = [
    "Pool",
    "Gym",
    "Parking",
    "Garden",
    "Security",
    "Power Backup",
    "Lift",
    "Club House",
  ];

  // Fetch properties from database
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/properties/all`);
        if (!response.ok) throw new Error("Failed to fetch properties");

        const result = await response.json();

        const mapped = (result.data || []).map((p: any) => ({
          id: p._id,
          title: p.title,
          price: p.price,
          property_type: p.propertySubType,
          listing_type: p.saleType,
          bedrooms: p.bedrooms || 0,
          bathrooms: p.bathrooms || 0,
          area: p.builtUpArea || 0,
          address: p.address,
          city: p.city,
          state: p.state,
          images: p.images || [],
          features: p.amenities || [],
          status: p.status,
          created_at: p.createdAt,
          views: p.viewsCount || 0,
          coverImage: p.coverImage
            ? `${API_BASE_URL}${p.coverImage}`
            : "/placeholder.svg",
        }));
        setProperties(mapped);

      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Format price for display
  const formatPrice = (price: number, listingType: string) => {
    if (listingType === "rent") {
      return `₹${price.toLocaleString()}/month`;
    }
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    }
    if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lacs`;
    }
    return `₹${price.toLocaleString()}`;
  };

  // Get image for property
  const getPropertyImage = (property: Property) => {
    if (property?.coverImage && property?.coverImage.length > 0) {
      return property?.coverImage;
    }
    return "/placeholder.svg";
  };

  // Get unique cities from properties
  const cities = [...new Set(properties.map((p) => p.city))].filter(Boolean);

  // Live filtering logic
  const filteredProperties = properties.filter((property) => {
    // Search query filter
    const matchesSearch =
      searchQuery === "" ||
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.city.toLowerCase().includes(searchQuery.toLowerCase());

    // Property type filter
    const matchesPropertyType =
      propertyType === "all" || property.property_type === propertyType;

    // Property category filter
    let matchesCategory = propertyCategory === "all";

    if (propertyCategory === "Commercial") {
      matchesCategory = PROPERTY_CATEGORIES.COMMERCIAL.some(
        (c) => c.value === property.property_type,
      );
    } else if (propertyCategory === "Residential") {
      matchesCategory = PROPERTY_CATEGORIES.RESIDENTIAL.some(
        (c) => c.value === property.property_type,
      );
    } else if (propertyCategory === "Agriculture") {
      matchesCategory = PROPERTY_CATEGORIES.AGRICULTURE.some(
        (c) => c.value === property.property_type,
      );
    }

    // Location filter
    const matchesLocation =
      location === "all" ||
      property.city?.trim().toLowerCase() === location.trim().toLowerCase();

    // BHK filter
    const matchesBhk =
      bhk === "all" ||
      (bhk === "1" && property.bedrooms === 1) ||
      (bhk === "2" && property.bedrooms === 2) ||
      (bhk === "3" && property.bedrooms === 3) ||
      (bhk === "4+" && property.bedrooms >= 4);

    // Listing type filter
    const matchesListingType =
      listingType === "all" || property.listing_type === listingType;

    // Price range filter
    const matchesPrice =
      property.price >= priceRange[0] && property.price <= priceRange[1];

    // Area range filter
    const matchesArea =
      property.area >= areaRange[0] && property.area <= areaRange[1];

    // Amenities filter
    const matchesAmenities =
      selectedAmenities.length === 0 ||
      selectedAmenities.every((amenity) =>
        property.features?.includes(amenity),
      );

    return (
      matchesSearch &&
      matchesPropertyType &&
      matchesCategory &&
      matchesLocation &&
      matchesBhk &&
      matchesListingType &&
      matchesPrice &&
      matchesArea &&
      matchesAmenities
    );
  });

  // Sorting logic
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "area-low":
        return a.area - b.area;
      case "area-high":
        return b.area - a.area;
      case "newest":
      default:
        return (
          new Date(b.created_at || 0).getTime() -
          new Date(a.created_at || 0).getTime()
        );
    }
  });

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setPropertyType("all");
    setPropertyCategory("all");
    setLocation("all");
    setBhk("all");
    setListingType("all");
    setPriceRange([0, 100000000]);
    setAreaRange([0, 100000]);
    setSortBy("newest");
    setSelectedAmenities([]);
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity],
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={heroImage}
              alt="Properties Hero"
              fill
              className="object-cover"
              priority
            />
            {/* Dark Gradient Overlay */}
            {/* <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-900/40 mix-blend-multiply" />
            <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay" /> */}

            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-900/40" />
            <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 container mx-auto px-4 text-center mt-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-6 animate-fade-in-up">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span>Find Your Dream Property</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight font-serif animate-fade-in-up delay-100">
              Explore Premium
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 animate-gradient-shift">
                Properties
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed font-light animate-fade-in-up delay-200">
              Discover a wide range of residential, commercial, and agricultural properties tailored to your needs.
            </p>

            {/* Floating Search Bar */}
            <div className="max-w-3xl mx-auto bg-white p-2 rounded-full shadow-2xl animate-fade-in-up delay-300 flex items-center">
              <div className="pl-6 pr-2 flex-grow">
                <Input
                  type="text"
                  placeholder="Search by location, property type, or name..."
                  className="border-0 shadow-none focus-visible:ring-0 text-lg px-0 h-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button size="lg" className="rounded-full px-8 h-12 bg-primary hover:bg-primary/90 text-white text-base font-semibold shadow-lg hover:shadow-primary/25 transition-all">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section Overlap */}
        {/* Stats Section */}
        <section className="relative z-20 container mx-auto px-4 -mt-10 mb-12">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-4 md:p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Total Properties", value: properties.length || "100+", icon: Home, color: "text-blue-500", bg: "bg-blue-50" },
              { label: "Cities Covered", value: cities.length || "10+", icon: MapPin, color: "text-emerald-500", bg: "bg-emerald-50" },
              { label: "New Listings", value: "25+", icon: Sparkles, color: "text-amber-500", bg: "bg-amber-50" },
              { label: "Verified Agents", value: "50+", icon: CheckCircle2, color: "text-purple-500", bg: "bg-purple-50" },
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

        <div className="container mx-auto px-4 pb-20">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar - Desktop */}
            <aside className={`lg:w-80 hidden lg:block`}>
              <div className="bg-white border border-slate-100 shadow-xl shadow-slate-200/50 rounded-3xl p-6 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                  <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <Filter className="h-5 w-5 text-primary" />
                    Filters
                  </h2>
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full px-4">
                    Clear All
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Property Category */}
                  <div>
                    <Label className="mb-2 block text-sm font-semibold text-slate-700">Category</Label>
                    <Select value={propertyCategory} onValueChange={setPropertyCategory}>
                      <SelectTrigger className="rounded-xl border-slate-200 bg-slate-50/50 hover:border-primary/50 focus:ring-primary/20 transition-all">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Residential">Residential</SelectItem>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                        <SelectItem value="Agriculture">Agriculture</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Property Type */}
                  <div>
                    <Label className="mb-2 block text-sm font-semibold text-slate-700">Property Type</Label>
                    <Select value={propertyType} onValueChange={setPropertyType}>
                      <SelectTrigger className="rounded-xl border-slate-200 bg-slate-50/50 hover:border-primary/50 focus:ring-primary/20 transition-all">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-slate-100 shadow-xl max-h-[300px]">
                        <SelectItem value="all">All Types</SelectItem>
                        <div className="px-2 py-1.5 text-xs font-bold text-muted-foreground bg-slate-50">RESIDENTIAL</div>
                        {PROPERTY_CATEGORIES.RESIDENTIAL.map((type) => (
                          <SelectItem key={type.name} value={type.value}>{type.name}</SelectItem>
                        ))}
                        <div className="px-2 py-1.5 text-xs font-bold text-muted-foreground bg-slate-50">COMMERCIAL</div>
                        {PROPERTY_CATEGORIES.COMMERCIAL.map((type) => (
                          <SelectItem key={type.name} value={type.value}>{type.name}</SelectItem>
                        ))}
                        <div className="px-2 py-1.5 text-xs font-bold text-muted-foreground bg-slate-50">AGRICULTURE</div>
                        {PROPERTY_CATEGORIES.AGRICULTURE.map((type) => (
                          <SelectItem key={type.name} value={type.value}>{type.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location */}
                  <div>
                    <Label className="mb-2 block text-sm font-semibold text-slate-700">City</Label>
                    <Select value={location} onValueChange={setLocation}>
                      <SelectTrigger className="rounded-xl border-slate-200 bg-slate-50/50 hover:border-primary/50 focus:ring-primary/20 transition-all">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                        <SelectItem value="all">All Cities</SelectItem>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* BHK */}
                  <div>
                    <Label className="mb-2 block text-sm font-semibold text-slate-700">BHK</Label>
                    <Select value={bhk} onValueChange={setBhk}>
                      <SelectTrigger className="rounded-xl border-slate-200 bg-slate-50/50 hover:border-primary/50 focus:ring-primary/20 transition-all">
                        <SelectValue placeholder="Select BHK" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                        <SelectItem value="all">Any</SelectItem>
                        <SelectItem value="1">1 BHK</SelectItem>
                        <SelectItem value="2">2 BHK</SelectItem>
                        <SelectItem value="3">3 BHK</SelectItem>
                        <SelectItem value="4+">4+ BHK</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Listing Type */}
                  <div>                     <Label className="mb-2 block">Listing Type</Label>
                    <Select value={listingType} onValueChange={setListingType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Buy & Rent</SelectItem>
                        <SelectItem value="sale">Buy</SelectItem>
                        <SelectItem value="rent">Rent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>


                  {/* Price Range */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <Label className="text-sm font-semibold text-slate-700">Price Range</Label>
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                        {formatPrice(priceRange[0], "sale")} - {formatPrice(priceRange[1], "sale")}
                      </span>
                    </div>
                    <Slider
                      min={0}
                      max={100000000}
                      step={500000}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="py-4"
                    />
                  </div>

                  <div>
                    <Label className="mb-2 block">
                      Area: {areaRange[0].toLocaleString()} -{" "}
                      {areaRange[1].toLocaleString()} sq.ft
                    </Label>
                    <Slider
                      min={0}
                      max={100000}
                      step={500}
                      value={areaRange}
                      onValueChange={setAreaRange}
                      className="mt-4"
                    />
                  </div>

                  {/* Amenities */}
                  <div>
                    <Label className="mb-3 block text-sm font-semibold text-slate-700">Amenities</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {availableAmenities.map((amenity) => (
                        <div key={amenity} className="flex items-center space-x-2">
                          <Checkbox
                            id={amenity}
                            checked={selectedAmenities.includes(amenity)}
                            onCheckedChange={() => toggleAmenity(amenity)}
                            className="rounded-md border-slate-300 data-[state=checked]:bg-primary data-[state=checked]:text-white"
                          />
                          <label htmlFor={amenity} className="text-sm text-slate-600 leading-none cursor-pointer select-none">
                            {amenity}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Property Grid Content */}
            <div className="flex-1">

              {/* Header & Controls */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">All Listings</h2>
                  <p className="text-slate-500">
                    {loading ? "Searching..." : `Showing ${sortedProperties.length} results`}
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Button variant="outline" className="lg:hidden flex-1 rounded-xl" onClick={() => setShowFilters(!showFilters)}>
                    <Filter className="h-4 w-4 mr-2" /> Filters
                  </Button>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-[180px] rounded-xl border-slate-200 bg-white">
                      <div className="flex items-center gap-2 text-slate-600">
                        <ArrowUpDown className="h-4 w-4" />
                        <span className="truncate">Sort by: {sortBy === 'newest' ? 'Newest' : sortBy}</span>
                      </div>
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="area-low">Area: Low to High</SelectItem>
                      <SelectItem value="area-high">Area: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="rounded-3xl overflow-hidden bg-white shadow-sm border border-slate-100">
                      <Skeleton className="h-64 w-full" />
                      <div className="p-6 space-y-4">
                        <Skeleton className="h-8 w-3/4 rounded-lg" />
                        <Skeleton className="h-4 w-1/2 rounded-full" />
                        <div className="flex gap-2 pt-2">
                          <Skeleton className="h-8 w-20 rounded-lg" />
                          <Skeleton className="h-8 w-20 rounded-lg" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Properties Grid */}
              {!loading && sortedProperties.length > 0 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {sortedProperties.map((property) => (
                      <PropertyCard
                        key={property.id}
                        id={property.id}
                        title={property.title}
                        price={formatPrice(property.price, property.listing_type)}
                        location={`${property.address}, ${property.city}`}
                        bedrooms={property.bedrooms}
                        bathrooms={property.bathrooms}
                        area={property.area}
                        imageUrl={getPropertyImage(property)}
                        type={property.listing_type as "buy" | "rent" | "sale"}
                        propertyType={property.property_type}
                        featured={false}
                        views={property.views || 0}
                      />
                    ))}
                  </div>

                  {/* Load More Button */}
                  {/* <div className="mt-16 text-center">
                    <Button variant="outline" size="lg" className="rounded-full px-8 py-6 h-auto border-slate-200 hover:bg-white hover:border-primary hover:text-primary transition-all shadow-sm">
                      Load More Properties
                    </Button>
                  </div> */}
                </>
              )}

              {/* Empty State */}
              {!loading && sortedProperties.length === 0 && (
                <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200">
                  <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">No properties found</h3>
                  <p className="text-slate-500 mb-8 max-w-md mx-auto">
                    We couldn't find any properties matching your current filters. Try adjusting your search criteria.
                  </p>
                  <Button onClick={clearFilters} className="rounded-full px-8 bg-slate-900 text-white hover:bg-slate-800">
                    Clear All Filters
                  </Button>
                </div>
              )}

              {/* CTA Section */}
              <div className="mt-20 relative rounded-[2.5rem] overflow-hidden bg-slate-900 text-white p-10 md:p-16 text-center shadow-2xl shadow-slate-900/20">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-blue-600/20 to-transparent opacity-50" />
                <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent opacity-40" />

                <div className="relative z-10 max-w-3xl mx-auto">
                  <h3 className="text-3xl md:text-4xl font-bold mb-6 font-serif">Can't find what you're looking for?</h3>
                  <p className="text-slate-300 mb-10 text-lg leading-relaxed">
                    Let us help you find your dream property. Tell us your requirements and we'll connect you with the best options available in the market.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    {/* <Button size="lg" className="rounded-full bg-white text-slate-900 hover:bg-slate-100 px-10 py-7 h-auto text-lg font-bold w-full sm:w-auto shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                      Post Your Requirement
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full border-white/20 text-white hover:bg-white/10 px-10 py-7 h-auto text-lg font-medium w-full sm:w-auto backdrop-blur-sm">
                      Contact Support
                    </Button> */}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const Properties = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center bg-slate-50">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      }
    >
      <PropertiesContent />
    </Suspense>
  );
};

export default Properties;

export const dynamic = "force-dynamic";