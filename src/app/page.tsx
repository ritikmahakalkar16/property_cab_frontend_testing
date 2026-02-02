// "use client";

// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import {
//   Search,
//   TrendingUp,
//   Users,
//   MapPin,
//   Home,
//   FileCheck,
//   Building,
//   Wrench,
//   Star,
//   Quote,
//   ArrowRight,
//   Sparkles,
//   Shield,
//   Clock,
//   Store,
//   Briefcase,
//   Warehouse,
//   Trees,
//   Hotel,
//   LandPlot,
//   Building2,
//   HomeIcon,
//   Loader2,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import PropertyCard from "@/components/PropertyCard";
// import HomeSearch from "@/components/HomeSearch";
// import heroImage from "@/assets/hero-property.jpg";

// // Location images
// import Image from "next/image";
// import { property } from "zod";
// import CarouselPropertyCard from "@/components/CarouselPropertyCard";
// import Testimonials from "@/components/Testimonials";
// import TrendingLocations from "@/components/TrendingLocations";

// const Index = () => {
//   const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
//   // Property Categories
//   const propertyCategories = [
//     {
//       icon: Store,
//       name: "Shop",
//       count: 150,
//       category: "Commercial",
//       gradient: "from-orange-500 to-red-500",
//     },
//     {
//       icon: Briefcase,
//       name: "Office Space",
//       count: 89,
//       category: "Commercial",
//       gradient: "from-blue-500 to-indigo-500",
//     },
//     {
//       icon: Warehouse,
//       name: "Godown",
//       count: 45,
//       category: "Commercial",
//       gradient: "from-slate-500 to-gray-600",
//     },
//     {
//       icon: Trees,
//       name: "Farm House",
//       count: 32,
//       category: "Commercial",
//       gradient: "from-green-500 to-emerald-500",
//     },
//     {
//       icon: Hotel,
//       name: "Resort",
//       count: 18,
//       category: "Commercial",
//       gradient: "from-purple-500 to-pink-500",
//     },
//     {
//       icon: LandPlot,
//       name: "Plot",
//       count: 234,
//       category: "Residential",
//       gradient: "from-amber-500 to-yellow-500",
//     },
//     {
//       icon: Building2,
//       name: "Flat",
//       count: 567,
//       category: "Residential",
//       gradient: "from-cyan-500 to-blue-500",
//     },
//     {
//       icon: Home,
//       name: "Row House",
//       count: 123,
//       category: "Residential",
//       gradient: "from-rose-500 to-red-500",
//     },
//     {
//       icon: HomeIcon,
//       name: "Bungalow",
//       count: 78,
//       category: "Residential",
//       gradient: "from-teal-500 to-green-500",
//     },
//     {
//       icon: Trees,
//       name: "Agriculture Land",
//       count: 156,
//       category: "Agriculture",
//       gradient: "from-lime-500 to-green-600",
//     },
//     {
//       icon: LandPlot,
//       name: "NA/Developed Land",
//       count: 89,
//       category: "Agriculture",
//       gradient: "from-stone-500 to-amber-600",
//     },
//   ];

//   // Featured Properties State
//   const [featuredProperties, setFeaturedProperties] = useState<any[]>([]);
//   const [allProperties, setAllProperties] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchFeatured = async () => {
//       try {
//         const response = await fetch(
//           `${API_BASE_URL}/api/v1/properties/featured`,
//           { cache: "no-store" },
//         );

//         if (!response.ok) throw new Error("Failed to fetch");

//         const result = await response.json();

//         const mapped = result.data.map((p: any) => ({
//           id: p._id,
//           title: p.title,
//           price:
//             p.saleType === "rent"
//               ? `₹${p.price.toLocaleString()}/month`
//               : `₹${(p.price / 100000).toFixed(2)} Lacs`,
//           location: `${p.city}, ${p.state}`,
//           bedrooms: p.bedrooms || 0,
//           bathrooms: p.bathrooms || 0,
//           area: p.builtUpArea,
//           imageUrl: `${API_BASE_URL}${p.coverImage}`,
//           type: p.saleType,
//           featured: p.isFeatured,
//           propertyType: p.propertyType,
//         }));

//         setFeaturedProperties(mapped);
//       } catch (error) {
//         console.error("Failed to fetch featured properties", error);
//       }
//     };

//     fetchFeatured();
//   }, []);

//   useEffect(() => {
//     const fetchAllProperties = async () => {
//       try {
//         const response = await fetch(`${API_BASE_URL}/api/v1/properties/all`, {
//           cache: "no-store",
//         });

//         if (!response.ok) throw new Error("Failed to fetch");

//         const result = await response.json();

//         const mapped = result.data.map((p: any) => ({
//           id: p._id,
//           title: p.title,
//           price:
//             p.saleType === "rent"
//               ? `₹${p.price.toLocaleString()}/month`
//               : `₹${(p.price / 100000).toFixed(2)} Lacs`,
//           location: `${p.city}, ${p.state}`,
//           bedrooms: p.bedrooms || 0,
//           bathrooms: p.bathrooms || 0,
//           area: p.builtUpArea,
//           imageUrl: `${API_BASE_URL}${p.coverImage}`,
//           type: p.saleType,
//           featured: p.isFeatured,
//           propertyType: p.propertyType,
//           propertySubType: p.propertySubType,
//         }));

//         setAllProperties(mapped);
//       } catch (error) {
//         console.error("Failed to fetch featured properties", error);
//       }
//     };

//     fetchAllProperties();
//   }, []);

//   const residentialProperties = allProperties.filter(
//     (p: any) => p.propertyType === "residential",
//   );

//   const commercialProperties = allProperties.filter(
//     (p: any) => p.propertyType === "commercial",
//   );

//   const agricultureProperties = allProperties.filter(
//     (p: any) => p.propertyType === "agricultural",
//   );

//   const shopProperties = allProperties.filter(
//     (p: any) => p.propertySubType === "shop",
//   );

//   const bungalowProperties = allProperties.filter(
//     (p: any) => p.propertySubType === "bungalow",
//   );

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

//   const [shopCurrentIndex, setShopCurrentIndex] = useState(0);
//   const [shopIsAutoPlaying, setShopIsAutoPlaying] = useState(true);
//   const shopAutoPlayRef = useRef<NodeJS.Timeout | null>(null);

//   const itemsPerView = {
//     mobile: 1,
//     tablet: 2,
//     desktop: 3,
//   };

//   const [itemsToShow, setItemsToShow] = useState(3);

//   // Handle responsive items per view
//   useEffect(() => {
//     const updateItemsPerView = () => {
//       if (window.innerWidth < 640) {
//         setItemsToShow(itemsPerView.mobile);
//       } else if (window.innerWidth < 1024) {
//         setItemsToShow(itemsPerView.tablet);
//       } else {
//         setItemsToShow(itemsPerView.desktop);
//       }
//     };

//     updateItemsPerView();
//     window.addEventListener("resize", updateItemsPerView);
//     return () => window.removeEventListener("resize", updateItemsPerView);
//   }, []);

//   const maxIndex = Math.max(0, featuredProperties.length - itemsToShow);

//   // Auto-play functionality
//   useEffect(() => {
//     if (!isAutoPlaying || maxIndex === 0) return;

//     autoPlayRef.current = setInterval(() => {
//       setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
//     }, 2000);

//     return () => {
//       if (autoPlayRef.current !== null) {
//         clearInterval(autoPlayRef.current);
//       }
//     };
//   }, [isAutoPlaying, maxIndex]);

//   // Shop carousel auto-play logic
//   const shopMaxIndex = Math.max(0, shopProperties.length - itemsToShow);
//   const shouldAutoPlayShop = shopProperties.length > itemsToShow;

//   useEffect(() => {
//     if (
//       !shopIsAutoPlaying ||
//       !shouldAutoPlayShop ||
//       shopProperties.length === 0
//     )
//       return;

//     shopAutoPlayRef.current = setInterval(() => {
//       setShopCurrentIndex((prev) => (prev >= shopMaxIndex ? 0 : prev + 1));
//     }, 2000);

//     return () => {
//       if (shopAutoPlayRef.current !== null) {
//         clearInterval(shopAutoPlayRef.current);
//       }
//     };
//   }, [
//     shopIsAutoPlaying,
//     shopMaxIndex,
//     shouldAutoPlayShop,
//     shopProperties.length,
//   ]);

//   // Create looped items for shop carousel if needed
//   const loopedShopProperties =
//     shopProperties.length > 0 && shopProperties.length < itemsToShow
//       ? [...shopProperties, ...shopProperties].slice(
//           0,
//           Math.max(itemsToShow, shopProperties.length),
//         )
//       : shopProperties;

//   const handlePrevious = () => {
//     setIsAutoPlaying(false);
//     setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
//   };

//   const handleNext = () => {
//     setIsAutoPlaying(false);
//     setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
//   };

//   const goToSlide = (index: number) => {
//     setIsAutoPlaying(false);
//     setCurrentIndex(index);
//   };

//   const handleShopPrevious = () => {
//     setShopIsAutoPlaying(false);
//     setShopCurrentIndex((prev) => (prev <= 0 ? shopMaxIndex : prev - 1));
//   };

//   const handleShopNext = () => {
//     setShopIsAutoPlaying(false);
//     setShopCurrentIndex((prev) => (prev >= shopMaxIndex ? 0 : prev + 1));
//   };

//   const goToShopSlide = (index: number) => {
//     setShopIsAutoPlaying(false);
//     setShopCurrentIndex(index);
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-background pb-20 lg:pb-0">
//       <Header />

//       {/* Hero Section - Enhanced with Modern Design */}
//       <section className="relative min-h-[90vh] flex items-center justify-center pt-16 overflow-hidden">
//         <div
//           className="absolute inset-0 z-0"
//           style={{
//             backgroundImage: `linear-gradient(135deg, hsla(220, 70%, 12%, 0.92) 0%, hsla(220, 80%, 8%, 0.88) 100%), url(${heroImage.src})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         />

//         {/* Animated decorative elements */}
//         <div className="absolute inset-0 z-0 overflow-hidden">
//           <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-accent/15 rounded-full blur-[150px] animate-float" />
//           <div
//             className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[180px] animate-float"
//             style={{ animationDelay: "2s" }}
//           />
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full animate-spin-slow" />
//           <div
//             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full animate-spin-slow"
//             style={{ animationDirection: "reverse", animationDuration: "30s" }}
//           />
//         </div>

//         <div className="container mx-auto mt-2 md:mt-4 px-4 z-10 text-center">
//           <Badge className="mb-8 bg-accent/20 text-accent border-accent/30 backdrop-blur-md px-5 py-2.5 text-sm animate-fade-up font-sans">
//             <Sparkles className="w-4 h-4 mr-2" />
//             India's Most Trusted Property Platform
//           </Badge>

//           <h1
//             className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-8 animate-fade-up font-sans"
//             style={{ animationDelay: "0.15s" }}
//           >
//             Find Your Perfect
//             <span className="block mt-3 bg-gradient-to-r from-accent via-amber-400 to-accent bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
//               Property Today
//             </span>
//           </h1>

//           <p
//             className="text-lg md:text-xl text-primary-foreground/85 mb-10 max-w-2xl mx-auto animate-fade-up font-sans font-light leading-relaxed"
//             style={{ animationDelay: "0.25s" }}
//           >
//             Discover 2,000+ verified properties across Commercial, Residential &
//             Agricultural segments
//           </p>

//           {/* Live Stats Counter with glass effect */}
//           <div
//             className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-4 md:gap-8 mb-12 animate-fade-up"
//             style={{ animationDelay: "0.35s" }}
//           >
//             {[
//               { icon: Building, value: "2,000+", label: "Properties" },
//               { icon: Users, value: "100+", label: "Verified Agents" },
//               { icon: MapPin, value: "15+", label: "Cities" },
//               { icon: Shield, value: "500+", label: "Happy Clients" },
//             ].map((stat, index) => (
//               <div
//                 key={index}
//                 className="w-full md:w-auto flex items-center justify-center md:justify-start gap-3 text-primary-foreground px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-default"
//               >
//                 <div className="p-2.5 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
//                   <stat.icon className="h-5 w-5 text-accent" />
//                 </div>

//                 <div className="text-center md:text-left leading-tight">
//                   <div className="text-lg md:text-2xl font-bold font-sans">
//                     {stat.value}
//                   </div>
//                   <div className="text-xs opacity-70 font-sans">
//                     {stat.label}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Enhanced Search Module */}
//           <div
//             className="animate-fade-up mb-4"
//             style={{ animationDelay: "0.45s" }}
//           >
//             <HomeSearch />
//           </div>
//         </div>

//         {/* Scroll indicator */}
//         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle">
//           <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
//             <div
//               className="w-1.5 h-3 bg-white/50 rounded-full animate-fade-up"
//               style={{
//                 animationDuration: "1.5s",
//                 animationIterationCount: "infinite",
//               }}
//             />
//           </div>
//         </div>
//       </section>

//       {/* Property Categories Carousel - Enhanced */}
//       <section className="py-8 md:py-20 bg-background relative">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-between mb-12">
//             <div className="section-fade-in">
//               <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 font-sans">
//                 Browse by Category
//               </h2>
//               <p className="text-muted-foreground font-sans">
//                 Explore properties across all segments
//               </p>
//             </div>
//             <Button
//               variant="outline"
//               asChild
//               className="hidden md:flex hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 font-sans"
//             >
//               <Link href="/properties">
//                 View All <ArrowRight className="ml-2 h-4 w-4" />
//               </Link>
//             </Button>
//           </div>

//           <Carousel className="w-full">
//             <CarouselContent className="-ml-4">
//               {propertyCategories.map((category, index) => (
//                 <CarouselItem
//                   key={index}
//                   className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
//                 >
//                   <Link
//                     href={`/properties?type=${encodeURIComponent(category.name)}`}
//                   >
//                     <Card className="group cursor-pointer border-border/50 bg-card hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
//                       <CardContent className="p-6 relative">
//                         <div
//                           className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500"
//                           style={{
//                             background: `linear-gradient(135deg, ${category.gradient.split(" ")[0].replace("from-", "")}, ${category.gradient.split(" ")[1].replace("to-", "")})`,
//                           }}
//                         />
//                         <div
//                           className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}
//                         >
//                           <category.icon className="h-7 w-7 text-white" />
//                         </div>
//                         <h3 className="font-semibold text-foreground text-lg mb-1 group-hover:text-accent transition-colors font-sans">
//                           {category.name}
//                         </h3>
//                         <p className="text-sm text-muted-foreground font-sans">
//                           {category.count} Properties
//                         </p>
//                         <Badge
//                           variant="secondary"
//                           className="mt-3 text-xs font-sans"
//                         >
//                           {category.category}
//                         </Badge>
//                       </CardContent>
//                     </Card>
//                   </Link>
//                 </CarouselItem>
//               ))}
//             </CarouselContent>
//             <CarouselPrevious className="hidden md:flex -left-4 hover:bg-accent hover:text-accent-foreground hover:border-accent" />
//             <CarouselNext className="hidden md:flex -right-4 hover:bg-accent hover:text-accent-foreground hover:border-accent" />
//           </Carousel>
//         </div>
//       </section>

//       {/* Featured Properties Grid - Clean */}
//       <section className="py-0 md:py-16 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <Badge variant="outline" className="mb-3 border-accent text-accent">
//               Featured Properties
//             </Badge>
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">
//               New & Featured
//             </h2>
//             <p className="text-gray-500 max-w-2xl mx-auto">
//               Premium listings verified by our expert team for quality and
//               authenticity
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {featuredProperties.length > 0 ? (
//               featuredProperties.map((property) => (
//                 <PropertyCard key={property.id} {...property} />
//               ))
//             ) : (
//               <div className="col-span-full text-center py-10 text-muted-foreground">
//                 <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
//                 <p>Loading specific properties...</p>
//               </div>
//             )}
//             {/* Fallback to dummy data if API fails locally during dev without DB */}
//           </div>

//           <div className="text-center mt-10">
//             <Button
//               size="lg"
//               asChild
//               className="bg-primary hover:bg-primary/90 text-white px-8"
//             >
//               <Link href="/properties">
//                 Explore All Properties <ArrowRight className="ml-2 h-4 w-4" />
//               </Link>
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Residential Properties Section - Clean */}
//       {residentialProperties.length > 0 && (
//         <section className="py-16 bg-white">
//           <div className="container mx-auto px-4">
//             <div className="flex items-center justify-between mb-10">
//               <div>
//                 <div className="flex items-center gap-2 mb-2 text-blue-600 font-medium">
//                   <Briefcase className="w-4 h-4" /> Residential
//                 </div>
//                 <h2 className="text-3xl font-bold text-gray-900 font-serif">
//                   Residential Properties
//                 </h2>
//               </div>
//               <Button
//                 variant="ghost"
//                 asChild
//                 className="hidden md:flex text-blue-600 hover:text-blue-700 hover:bg-blue-50"
//               >
//                 <Link href="/properties?category=Residential">
//                   View All <ArrowRight className="ml-2 h-4 w-4" />
//                 </Link>
//               </Button>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {residentialProperties.map((property) => (
//                 <PropertyCard key={property.id} {...property} />
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Commercial Properties Section - Clean */}
//       {commercialProperties.length > 0 && (
//         <section className="py-16 bg-white">
//           <div className="container mx-auto px-4">
//             <div className="flex items-center justify-between mb-10">
//               <div>
//                 <div className="flex items-center gap-2 mb-2 text-blue-600 font-medium">
//                   <Briefcase className="w-4 h-4" /> Commercial
//                 </div>
//                 <h2 className="text-3xl font-bold text-gray-900 font-serif">
//                   Commercial Properties
//                 </h2>
//               </div>
//               <Button
//                 variant="ghost"
//                 asChild
//                 className="hidden md:flex text-blue-600 hover:text-blue-700 hover:bg-blue-50"
//               >
//                 <Link href="/properties?category=Commercial">
//                   View All <ArrowRight className="ml-2 h-4 w-4" />
//                 </Link>
//               </Button>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {commercialProperties.map((property) => (
//                 <PropertyCard key={property.id} {...property} />
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Agricultural Properties - Clean */}
//       {agricultureProperties.length > 0 && (
//         <section className="py-16 bg-white">
//           <div className="container mx-auto px-4">
//             <div className="flex items-center justify-between mb-10">
//               <div>
//                 <div className="flex items-center gap-2 mb-2 text-green-600 font-medium">
//                   <Trees className="w-4 h-4" /> Agriculture
//                 </div>
//                 <h2 className="text-3xl font-bold text-gray-900 font-serif">
//                   Agricultural Land
//                 </h2>
//               </div>
//               <Button
//                 variant="ghost"
//                 asChild
//                 className="hidden md:flex text-green-600 hover:text-green-700 hover:bg-green-50"
//               >
//                 <Link href="/properties?category=Agriculture">
//                   View All <ArrowRight className="ml-2 h-4 w-4" />
//                 </Link>
//               </Button>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {agricultureProperties.map((property) => (
//                 <PropertyCard key={property.id} {...property} />
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {shopProperties.length > 0 && (
//         <section className="relative py-24 bg-slate-900 text-white overflow-hidden">
//           {/* Subtle texture */}
//           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,#3b82f6_0%,transparent_40%),radial-gradient(circle_at_80%_80%,#f59e0b_0%,transparent_40%)]" />

//           <div className="container mx-auto px-4 relative z-10">
//             {/* Header */}
//             <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
//               <div className="max-w-2xl">
//                 <span className="inline-block mb-4 text-xs tracking-widest uppercase text-amber-400">
//                   Commercial Spaces
//                 </span>

//                 <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
//                   Grow Your Brand in
//                   <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
//                     Prime Locations
//                   </span>
//                 </h2>

//                 <p className="mt-4 text-slate-300">
//                   Handpicked retail shops designed for visibility, footfall, and
//                   long-term business success.
//                 </p>
//               </div>

//               <Button
//                 asChild
//                 variant="outline"
//                 className="border-white/30 text-black hover:bg-white hover:text-slate-900"
//               >
//                 <Link href="/properties?category=Commercial">
//                   Explore All
//                   <ArrowRight className="ml-2 w-4 h-4" />
//                 </Link>
//               </Button>
//             </div>

//             {/* Carousel */}
//             <div className="relative">
//               <div className="overflow-hidden">
//                 <div
//                   className="flex transition-transform duration-700 ease-out"
//                   style={{
//                     transform: `translateX(-${shopCurrentIndex * (100 / itemsToShow)}%)`,
//                   }}
//                 >
//                   {loopedShopProperties.map((property, index) => (
//                     <div
//                       key={`${property.id}-${index}`}
//                       className="flex-shrink-0 px-4"
//                       style={{ width: `${100 / itemsToShow}%` }}
//                     >
//                       <div className="group relative rounded-3xl overflow-hidden bg-slate-800 border border-white/10 hover:border-amber-400/40 transition-all duration-500">
//                         <img
//                           src={property.imageUrl}
//                           alt={property.title}
//                           className="h-72 w-full object-cover group-hover:scale-110 transition-transform duration-700"
//                         />

//                         <div className="p-6">
//                           <h3 className="text-xl font-bold mb-2 line-clamp-1">
//                             {property.title}
//                           </h3>

//                           {property.location && (
//                             <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
//                               <MapPin className="w-4 h-4" />
//                               <span className="line-clamp-1">
//                                 {property.location}
//                               </span>
//                             </div>
//                           )}

//                           {property.price && (
//                             <div className="text-lg font-semibold text-amber-400 mb-4">
//                               {property.price}
//                             </div>
//                           )}

//                           <Button
//                             asChild
//                             size="sm"
//                             className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
//                           >
//                             <Link href={`/properties/${property.id}`}>
//                               View Property
//                             </Link>
//                           </Button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {shopMaxIndex > 0 && (
//                 <>
//                   <button
//                     onClick={handleShopPrevious}
//                     className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 p-3 rounded-full bg-white/10 hover:bg-amber-500 text-white hover:text-slate-900 transition-all"
//                   >
//                     <ChevronLeft className="w-5 h-5" />
//                   </button>

//                   <button
//                     onClick={handleShopNext}
//                     className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 p-3 rounded-full bg-white/10 hover:bg-amber-500 text-white hover:text-slate-900 transition-all"
//                   >
//                     <ChevronRight className="w-5 h-5" />
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </section>
//       )}

//       {bungalowProperties.length > 0 && (
//         <section className="relative py-24 bg-gradient-to-b from-white to-slate-50">
//           <div className="container mx-auto px-4">
//             {/* Header */}
//             <div className="max-w-3xl mb-16">
//               <span className="inline-block mb-3 text-xs tracking-widest uppercase text-amber-600">
//                 Bungalow Collection
//               </span>

//               <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
//                 Timeless Homes for
//                 <span className="block bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
//                   Refined Living
//                 </span>
//               </h2>

//               <p className="mt-4 text-lg text-slate-600">
//                 Handcrafted bungalow residences offering privacy, elegance, and space—
//                 designed for families who value comfort and class.
//               </p>
//             </div>

//             {/* Grid */}
//             <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//               {bungalowProperties.slice(0, 6).map((property) => (
//                 <div
//                   key={property.id}
//                   className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-amber-400/40 shadow-sm hover:shadow-xl transition-all duration-500"
//                 >
//                   <div className="relative h-56 overflow-hidden">
//                     <img
//                       src={property.imageUrl}
//                       alt={property.title}
//                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
//                   </div>

//                   <div className="p-6">
//                     <h3 className="text-xl font-bold text-slate-900 mb-1 line-clamp-1">
//                       {property.title}
//                     </h3>

//                     {property.location && (
//                       <div className="text-sm text-slate-500 mb-3">
//                         {property.location}
//                       </div>
//                     )}

//                     <p className="text-sm text-slate-600 line-clamp-2 mb-4">
//                       {property.description ||
//                         "Elegant independent bungalow designed for comfort, privacy, and modern family living."}
//                     </p>

//                     {property.highlights && (
//                       <div className="flex flex-wrap gap-2 mb-4">
//                         {property.highlights.slice(0, 3).map((h: string, i: number) => (
//                           <span
//                             key={i}
//                             className="text-xs px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-medium"
//                           >
//                             {h}
//                           </span>
//                         ))}
//                       </div>
//                     )}

//                     <div className="flex items-center justify-between">
//                       {property.price && (
//                         <div className="text-lg font-semibold text-slate-900">
//                           {property.price}
//                         </div>
//                       )}

//                       <Button
//                         asChild
//                         size="sm"
//                         className="bg-slate-900 hover:bg-amber-600 text-white rounded-xl"
//                       >
//                         <Link href={`/properties/${property.id}`}>
//                           View Details
//                         </Link>
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Footer CTA */}
//             <div className="mt-14 flex justify-center">
//               <Button
//                 asChild
//                 size="lg"
//                 className="px-10 py-6 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white shadow-lg"
//               >
//                 <Link href="/properties?category=Residential&&type=bungalow">
//                   Explore All Bungalows
//                 </Link>
//               </Button>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Trending Locations - Clean Cards */}
//       <TrendingLocations />

//       {/* Commercial Shop Properties Section - Clean */}
//       {shopProperties.length > 0 && (
//         <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
//           {/* Decorative background elements */}
//           <div className="absolute inset-0 opacity-40">
//             <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-float" />
//             <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-float-delayed" />
//           </div>

//           {/* Grid pattern overlay */}
//           <div
//             className="absolute inset-0 opacity-[0.03]"
//             style={{
//               backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
//                            linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)`,
//               backgroundSize: "48px 48px",
//             }}
//           />

//           <div className="container mx-auto px-4 relative z-10">
//             {/* Header */}
//             <div className="mb-16">
//               <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
//                 <div className="max-w-2xl">
//                   <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-white/80 backdrop-blur-sm rounded-full border border-blue-100 shadow-sm">
//                     <Briefcase className="w-4 h-4 text-blue-600" />
//                     <span className="text-sm font-semibold text-blue-600 tracking-wide uppercase">
//                       Commercial Collection
//                     </span>
//                   </div>

//                   <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 leading-tight">
//                     <span className="block">Find Your Perfect</span>
//                     <span className="block bg-gradient-to-r from-amber-600 via-amber-500 to-amber-800 bg-clip-text text-transparent">
//                       Business Space
//                     </span>
//                   </h2>

//                   <p className="text-lg text-slate-600 leading-relaxed">
//                     Premium commercial shops in high-footfall locations, crafted
//                     to elevate your brand and drive business growth.
//                   </p>
//                 </div>

//                 <Button
//                   variant="ghost"
//                   asChild
//                   className="hidden md:flex items-center gap-2 px-6 py-6 text-base text-blue-500 hover:text-white"
//                 >
//                   <Link href="/properties?category=Residential">
//                     View All
//                     <ArrowRight className="w-5 h-5" />
//                   </Link>
//                 </Button>
//               </div>
//             </div>

//             {/* Carousel Container */}
//             <div className="relative">
//               {/* Carousel Wrapper */}
//               <div className="overflow-hidden rounded-3xl">
//                 <div
//                   className="flex transition-transform duration-700 ease-out"
//                   style={{
//                     transform: `translateX(-${shopCurrentIndex * (100 / itemsToShow)}%)`,
//                   }}
//                 >
//                   {loopedShopProperties.map((property, index) => (
//                     <div
//                       key={`${property.id}-${index}`}
//                       className="flex-shrink-0 px-3"
//                       style={{ width: `${100 / itemsToShow}%` }}
//                     >
//                       <CarouselPropertyCard property={property} />
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Navigation Arrows - Only show if more than itemsToShow items */}
//               {shopMaxIndex > 0 && (
//                 <>
//                   <button
//                     onClick={handleShopPrevious}
//                     className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 z-20 p-4 bg-white/95 backdrop-blur-sm hover:bg-blue-600 text-slate-700 hover:text-white rounded-full shadow-xl transition-all duration-300 hover:scale-110 group"
//                     aria-label="Previous properties"
//                   >
//                     <ChevronLeft className="w-6 h-6" />
//                   </button>

//                   <button
//                     onClick={handleShopNext}
//                     className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 z-20 p-4 bg-white/95 backdrop-blur-sm hover:bg-blue-600 text-slate-700 hover:text-white rounded-full shadow-xl transition-all duration-300 hover:scale-110 group"
//                     aria-label="Next properties"
//                   >
//                     <ChevronRight className="w-6 h-6" />
//                   </button>
//                 </>
//               )}
//             </div>

//             {/* Dots Indicator - Only show if more than itemsToShow items */}
//             {shopMaxIndex > 0 && (
//               <div className="flex items-center justify-center gap-2 mt-8">
//                 {Array.from({ length: shopMaxIndex + 1 }).map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => goToShopSlide(index)}
//                     className={`transition-all duration-300 rounded-full ${
//                       shopCurrentIndex === index
//                         ? "w-8 h-2 bg-blue-600"
//                         : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
//                     }`}
//                     aria-label={`Go to slide ${index + 1}`}
//                   />
//                 ))}
//               </div>
//             )}

//             {/* Mobile View All Button */}
//             <div className="mt-12 md:hidden flex justify-center">
//               <Button
//                 asChild
//                 className="w-full sm:w-auto px-8 py-6 text-base bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg"
//               >
//                 <Link href="/properties?category=Residential">
//                   View All Properties
//                   <ArrowRight className="ml-2 w-5 h-5" />
//                 </Link>
//               </Button>
//             </div>
//           </div>

//           {/* CSS Animations */}
//           <style jsx>{`
//             @keyframes float {
//               0%,
//               100% {
//                 transform: translateY(0px);
//               }
//               50% {
//                 transform: translateY(-20px);
//               }
//             }

//             @keyframes float-delayed {
//               0%,
//               100% {
//                 transform: translateY(0px);
//               }
//               50% {
//                 transform: translateY(20px);
//               }
//             }

//             .animate-float {
//               animation: float 6s ease-in-out infinite;
//             }

//             .animate-float-delayed {
//               animation: float-delayed 8s ease-in-out infinite;
//             }
//           `}</style>
//         </section>
//       )}

//       {/* Testimonials Section */}
//       <Testimonials />

//       {/* CTA Section - Simple Gradient */}
//       <section className="py-20 bg-accent text-white text-center">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">
//             Ready to Find Your Dream Property?
//           </h2>
//           <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
//             Join thousands of satisfied customers who found their perfect home
//             with PropertyCab
//           </p>
//           <div className="flex justify-center gap-4">
//             <Button
//               size="lg"
//               variant="secondary"
//               className="px-8 font-bold text-accent hover:bg-white/90"
//             >
//               <Link href="/properties">Start Search</Link>
//             </Button>
//             <Button
//               size="lg"
//               variant="secondary"
//               className="px-8 font-bold text-accent hover:bg-white/90"
//             >
//               <Link href="/contact">Contact Us</Link>
//             </Button>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default Index;




"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Search,
  TrendingUp,
  Users,
  MapPin,
  Home,
  FileCheck,
  Building,
  Wrench,
  Star,
  Quote,
  ArrowRight,
  Sparkles,
  Shield,
  Clock,
  Store,
  Briefcase,
  Warehouse,
  Trees,
  Hotel,
  LandPlot,
  Building2,
  HomeIcon,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import HomeSearch from "@/components/HomeSearch";
import heroImage from "@/assets/hero-property.jpg";

// Location images
import Image from "next/image";
import { property } from "zod";
import CarouselPropertyCard from "@/components/CarouselPropertyCard";
import Testimonials from "@/components/Testimonials";
import TrendingLocations from "@/components/TrendingLocations";

const Index = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  // Property Categories
  const propertyCategories = [
    {
      icon: Store,
      name: "Shop",
      count: 150,
      category: "Commercial",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Briefcase,
      name: "Office Space",
      count: 89,
      category: "Commercial",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      icon: Warehouse,
      name: "Godown",
      count: 45,
      category: "Commercial",
      gradient: "from-slate-500 to-gray-600",
    },
    {
      icon: Trees,
      name: "Farm House",
      count: 32,
      category: "Commercial",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Hotel,
      name: "Resort",
      count: 18,
      category: "Commercial",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: LandPlot,
      name: "Plot",
      count: 234,
      category: "Residential",
      gradient: "from-amber-500 to-yellow-500",
    },
    {
      icon: Building2,
      name: "Flat",
      count: 567,
      category: "Residential",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      icon: Home,
      name: "Row House",
      count: 123,
      category: "Residential",
      gradient: "from-rose-500 to-red-500",
    },
    {
      icon: HomeIcon,
      name: "Bungalow",
      count: 78,
      category: "Residential",
      gradient: "from-teal-500 to-green-500",
    },
    {
      icon: Trees,
      name: "Agriculture Land",
      count: 156,
      category: "Agriculture",
      gradient: "from-lime-500 to-green-600",
    },
    {
      icon: LandPlot,
      name: "NA/Developed Land",
      count: 89,
      category: "Agriculture",
      gradient: "from-stone-500 to-amber-600",
    },
  ];

  // Featured Properties State
  const [featuredProperties, setFeaturedProperties] = useState<any[]>([]);
  const [allProperties, setAllProperties] = useState<any[]>([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/v1/properties/featured`,
          { cache: "no-store" },
        );

        if (!response.ok) throw new Error("Failed to fetch");

        const result = await response.json();

        const mapped = result.data.map((p: any) => ({
          id: p._id,
          title: p.title,
          price:
            p.saleType === "rent"
              ? `₹${p.price.toLocaleString()}/month`
              : `₹${(p.price / 100000).toFixed(2)} Lacs`,
          location: `${p.city}, ${p.state}`,
          bedrooms: p.bedrooms || 0,
          bathrooms: p.bathrooms || 0,
          area: p.builtUpArea,
          imageUrl: `${API_BASE_URL}${p.coverImage}`,
          type: p.saleType,
          featured: p.isFeatured,
          propertyType: p.propertyType,
          views: p.viewsCount || 0,
        }));

        setFeaturedProperties(mapped);
      } catch (error) {
        console.error("Failed to fetch featured properties", error);
      }
    };

    fetchFeatured();
  }, []);

  useEffect(() => {
    const fetchAllProperties = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/properties/all`, {
          cache: "no-store",
        });

        if (!response.ok) throw new Error("Failed to fetch");

        const result = await response.json();

        const mapped = result.data.map((p: any) => ({
          id: p._id,
          title: p.title,
          price:
            p.saleType === "rent"
              ? `₹${p.price.toLocaleString()}/month`
              : `₹${(p.price / 100000).toFixed(2)} Lacs`,
          location: `${p.city}, ${p.state}`,
          bedrooms: p.bedrooms || 0,
          bathrooms: p.bathrooms || 0,
          area: p.builtUpArea,
          imageUrl: `${API_BASE_URL}${p.coverImage}`,
          type: p.saleType,
          featured: p.isFeatured,
          propertyType: p.propertyType,
          propertySubType: p.propertySubType,
          views: p.viewsCount || 0,
        }));

        setAllProperties(mapped);
      } catch (error) {
        console.error("Failed to fetch featured properties", error);
      }
    };

    fetchAllProperties();
  }, []);

  const residentialProperties = allProperties.filter(
    (p: any) => p.propertyType === "residential",
  );

  const commercialProperties = allProperties.filter(
    (p: any) => p.propertyType === "commercial",
  );

  const agricultureProperties = allProperties.filter(
    (p: any) => p.propertyType === "agricultural",
  );

  const shopProperties = allProperties.filter(
    (p: any) => p.propertySubType === "shop",
  );

  const bungalowProperties = allProperties.filter(
    (p: any) => p.propertySubType === "bungalow",
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const [shopCurrentIndex, setShopCurrentIndex] = useState(0);
  const [shopIsAutoPlaying, setShopIsAutoPlaying] = useState(true);
  const shopAutoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  };

  const [itemsToShow, setItemsToShow] = useState(3);

  // Handle responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsToShow(itemsPerView.mobile);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(itemsPerView.tablet);
      } else {
        setItemsToShow(itemsPerView.desktop);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, featuredProperties.length - itemsToShow);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || maxIndex === 0) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 2000);

    return () => {
      if (autoPlayRef.current !== null) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, maxIndex]);

  // Shop carousel auto-play logic
  const shopMaxIndex = Math.max(0, shopProperties.length - itemsToShow);
  const shouldAutoPlayShop = shopProperties.length > itemsToShow;

  useEffect(() => {
    if (
      !shopIsAutoPlaying ||
      !shouldAutoPlayShop ||
      shopProperties.length === 0
    )
      return;

    shopAutoPlayRef.current = setInterval(() => {
      setShopCurrentIndex((prev) => (prev >= shopMaxIndex ? 0 : prev + 1));
    }, 2000);

    return () => {
      if (shopAutoPlayRef.current !== null) {
        clearInterval(shopAutoPlayRef.current);
      }
    };
  }, [
    shopIsAutoPlaying,
    shopMaxIndex,
    shouldAutoPlayShop,
    shopProperties.length,
  ]);

  // Create looped items for shop carousel if needed
  const loopedShopProperties =
    shopProperties.length > 0 && shopProperties.length < itemsToShow
      ? [...shopProperties, ...shopProperties].slice(
        0,
        Math.max(itemsToShow, shopProperties.length),
      )
      : shopProperties;

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const handleShopPrevious = () => {
    setShopIsAutoPlaying(false);
    setShopCurrentIndex((prev) => (prev <= 0 ? shopMaxIndex : prev - 1));
  };

  const handleShopNext = () => {
    setShopIsAutoPlaying(false);
    setShopCurrentIndex((prev) => (prev >= shopMaxIndex ? 0 : prev + 1));
  };

  const goToShopSlide = (index: number) => {
    setShopIsAutoPlaying(false);
    setShopCurrentIndex(index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background pb-20 lg:pb-0">
      <Header />

      {/* Hero Section - Enhanced with Modern Design */}
      <section className="relative min-h-[90vh] h-auto flex items-center justify-center pt-24 pb-24 overflow-hidden bg-slate-950">
        {/* Animated Background Mesh - Futuristic (Subtle) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/80 to-slate-950/95 z-[1]" />

          {/* Toned down animations for background */}
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDuration: '10s' }} />

          <div className="absolute inset-0 z-0 opacity-40"
            style={{
              backgroundImage: `url(${heroImage.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>

        <div className="container mx-auto px-4 z-10 text-center relative flex flex-col items-center justify-center">
          {/* Badge */}
          <Badge className="mb-6 bg-white/5 text-amber-300 border-amber-500/20 backdrop-blur-md px-4 py-1.5 text-xs font-bold tracking-widest uppercase shadow-[0_0_10px_rgba(251,191,36,0.1)] animate-fade-up">
            <Sparkles className="w-3 h-3 mr-2" />
            Discover The Future
          </Badge>

          {/* Headline - Slightly tighter */}
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 animate-fade-up font-serif tracking-tight leading-none drop-shadow-xl"
            style={{ animationDelay: "0.1s" }}
          >
            Find Your
            <span className="inline-block ml-3 md:ml-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-300 animate-gradient-shift">
              Dream Space
            </span>
          </h1>

          <p
            className="text-base md:text-lg text-slate-400 mb-8 max-w-xl mx-auto animate-fade-up font-light"
            style={{ animationDelay: "0.2s" }}
          >
            Experience the next generation of property search. Premium listings, verified agents, seamless process.
          </p>

          {/* Search Module - Compact Container */}
          <div
            className="w-full max-w-4xl animate-fade-up mb-10 relative z-20"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="p-1.5 rounded-[1.5rem] bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl shadow-blue-950/50">
              <HomeSearch />
            </div>
          </div>

          {/* Stats - Compact Single Row */}
          <div
            className="flex flex-wrap justify-center gap-3 md:gap-8 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            {[
              { icon: Building, value: "2K+", label: "Properties", color: "text-cyan-400" },
              { icon: Users, value: "100+", label: "Agents", color: "text-purple-400" },
              { icon: MapPin, value: "15+", label: "Cities", color: "text-amber-400" },
              { icon: Shield, value: "500+", label: "Clients", color: "text-emerald-400" },
            ].map((stat, index) => (
              <div
                key={index}
                className="group flex items-center gap-2 text-white/80 px-4 py-2 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-default"
              >
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-bold text-white">{stat.value}</span>
                  <span className="text-xs uppercase tracking-wider opacity-60">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator - Compact */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce-subtle opacity-30">
          <div className="w-4 h-7 rounded-full border border-white/30 flex items-start justify-center p-1">
            <div className="w-0.5 h-1.5 bg-white rounded-full animate-fade-up" />
          </div>
        </div>
      </section>


      {/* Featured Properties Grid - Clean */}
      <section className="py-0 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-3 border-accent text-accent">
              Featured Properties
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">
              New & Featured
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Premium listings verified by our expert team for quality and
              authenticity
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProperties.length > 0 ? (
              featuredProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                <p>Loading specific properties...</p>
              </div>
            )}
            {/* Fallback to dummy data if API fails locally during dev without DB */}
          </div>

          <div className="text-center mt-10">
            <Button
              size="lg"
              asChild
              className="bg-primary hover:bg-primary/90 text-white px-8"
            >
              <Link href="/properties">
                Explore All Properties <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      {/* Property Categories Carousel - Futuristic */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        {/* Animated Background Mesh */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDuration: '10s' }} />
          <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDuration: '12s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="text-center md:text-left">
              <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-amber-300 text-xs font-bold tracking-widest uppercase mb-4 shadow-lg shadow-amber-500/10">
                Explore The Future
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-sm font-serif">
                Browse by Category
              </h2>
              <p className="text-slate-400 text-lg max-w-xl font-light leading-relaxed">
                Immersive spaces designed for the modern era. Find your perfect match from our curated collections.
              </p>
            </div>

            <Button
              asChild
              variant="outline"
              className="hidden md:flex rounded-full px-8 py-6 bg-transparent border-white/20 text-white hover:bg-white hover:text-slate-900 transition-all duration-300 backdrop-blur-sm group"
            >
              <Link href="/properties">
                View All Categories <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <Carousel className="w-full" opts={{ align: "start", loop: true }}>
            <CarouselContent className="-ml-6 py-12">
              {propertyCategories.map((category, index) => (
                <CarouselItem
                  key={index}
                  className="pl-6 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <Link
                    href={`/properties?type=${encodeURIComponent(category.name)}`}
                    className="block h-full group perspective-1000"
                  >
                    <div className="relative h-full p-8 rounded-[2rem] bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.1)] hover:-translate-y-2 overflow-hidden flex flex-col items-center text-center">

                      {/* Inner Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      {/* Icon Container with Neon Glow */}
                      <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 bg-gradient-to-br ${category.gradient} shadow-lg`}>
                        {/* Glow behind icon */}
                        <div className={`absolute inset-0 blur-xl opacity-40 bg-gradient-to-br ${category.gradient} group-hover:opacity-70 transition-opacity duration-300`} />
                        <category.icon className="relative z-10 h-9 w-9 text-white" />
                      </div>

                      {/* Text Content */}
                      <h3 className="text-xl font-bold text-white  tracking-wide group-hover:text-amber-200 transition-colors">
                        {category.name}
                      </h3>

                      {/* <div className="mt-auto pt-4 flex flex-col items-center gap-3 w-full">
                        <div className="h-px w-12 bg-white/20 group-hover:w-full transition-all duration-500" />
                        <p className="text-slate-400 font-medium text-sm group-hover:text-white transition-colors">
                          {category.count} Properties
                        </p>
                      </div> */}

                      {/* Interactive Corner Accent */}
                      <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]" />
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-end gap-4 mt-10 md:hidden px-4">
              <CarouselPrevious className="static translate-y-0 border-white/20 bg-white/10 text-white hover:bg-white hover:text-slate-900" />
              <CarouselNext className="static translate-y-0 border-white/20 bg-white/10 text-white hover:bg-white hover:text-slate-900" />
            </div>
          </Carousel>
        </div>
      </section>


      {/* Residential Properties Section - Clean */}
      {residentialProperties.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <div className="flex items-center gap-2 mb-2 text-blue-600 font-medium">
                  <Briefcase className="w-4 h-4" /> Residential
                </div>
                <h2 className="text-3xl font-bold text-gray-900 font-serif">
                  Residential Properties
                </h2>
              </div>
              <Button
                variant="ghost"
                asChild
                className="hidden md:flex text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <Link href="/properties?category=Residential">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {residentialProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Commercial Properties Section - Clean */}
      {commercialProperties.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <div className="flex items-center gap-2 mb-2 text-blue-600 font-medium">
                  <Briefcase className="w-4 h-4" /> Commercial
                </div>
                <h2 className="text-3xl font-bold text-gray-900 font-serif">
                  Commercial Properties
                </h2>
              </div>
              <Button
                variant="ghost"
                asChild
                className="hidden md:flex text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <Link href="/properties?category=Commercial">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {commercialProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Agricultural Properties - Clean */}
      {agricultureProperties.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <div className="flex items-center gap-2 mb-2 text-green-600 font-medium">
                  <Trees className="w-4 h-4" /> Agriculture
                </div>
                <h2 className="text-3xl font-bold text-gray-900 font-serif">
                  Agricultural Land
                </h2>
              </div>
              <Button
                variant="ghost"
                asChild
                className="hidden md:flex text-green-600 hover:text-green-700 hover:bg-green-50"
              >
                <Link href="/properties?category=Agriculture">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {agricultureProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          </div>
        </section>
      )}

      {shopProperties.length > 0 && (
        <section className="relative py-24 bg-slate-900 text-white overflow-hidden">
          {/* Subtle texture */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,#3b82f6_0%,transparent_40%),radial-gradient(circle_at_80%_80%,#f59e0b_0%,transparent_40%)]" />

          <div className="container mx-auto px-4 relative z-10">
            {/* Header */}
            <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div className="max-w-2xl">
                <span className="inline-block mb-4 text-xs tracking-widest uppercase text-amber-400">
                  Commercial Spaces
                </span>

                <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
                  Grow Your Brand in
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                    Prime Locations
                  </span>
                </h2>

                <p className="mt-4 text-slate-300">
                  Handpicked retail shops designed for visibility, footfall, and
                  long-term business success.
                </p>
              </div>

              <Button
                asChild
                variant="outline"
                className="border-white/30 text-black hover:bg-white hover:text-slate-900"
              >
                <Link href="/properties?category=Commercial">
                  Explore All
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            {/* Carousel */}
            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-700 ease-out"
                  style={{
                    transform: `translateX(-${shopCurrentIndex * (100 / itemsToShow)}%)`,
                  }}
                >
                  {loopedShopProperties.map((property, index) => (
                    <div
                      key={`${property.id}-${index}`}
                      className="flex-shrink-0 px-4"
                      style={{ width: `${100 / itemsToShow}%` }}
                    >
                      <div className="group relative rounded-3xl overflow-hidden bg-slate-800 border border-white/10 hover:border-amber-400/40 transition-all duration-500">
                        <img
                          src={property.imageUrl}
                          alt={property.title}
                          className="h-72 w-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />

                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-2 line-clamp-1">
                            {property.title}
                          </h3>

                          {property.location && (
                            <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
                              <MapPin className="w-4 h-4" />
                              <span className="line-clamp-1">
                                {property.location}
                              </span>
                            </div>
                          )}

                          {property.price && (
                            <div className="text-lg font-semibold text-amber-400 mb-4">
                              {property.price}
                            </div>
                          )}

                          <Button
                            asChild
                            size="sm"
                            className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
                          >
                            <Link href={`/properties/${property.id}`}>
                              View Property
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {shopMaxIndex > 0 && (
                <>
                  <button
                    onClick={handleShopPrevious}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 p-3 rounded-full bg-white/10 hover:bg-amber-500 text-white hover:text-slate-900 transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handleShopNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 p-3 rounded-full bg-white/10 hover:bg-amber-500 text-white hover:text-slate-900 transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {bungalowProperties.length > 0 && (
        <section className="relative py-24 bg-gradient-to-b from-white to-slate-50">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="max-w-3xl mb-16">
              <span className="inline-block mb-3 text-xs tracking-widest uppercase text-amber-600">
                Bungalow Collection
              </span>

              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                Timeless Homes for
                <span className="block bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Refined Living
                </span>
              </h2>

              <p className="mt-4 text-lg text-slate-600">
                Handcrafted bungalow residences offering privacy, elegance, and space—
                designed for families who value comfort and class.
              </p>
            </div>

            {/* Grid */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {bungalowProperties.slice(0, 6).map((property) => (
                <div
                  key={property.id}
                  className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-amber-400/40 shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={property.imageUrl}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-1 line-clamp-1">
                      {property.title}
                    </h3>

                    {property.location && (
                      <div className="text-sm text-slate-500 mb-3">
                        {property.location}
                      </div>
                    )}

                    <p className="text-sm text-slate-600 line-clamp-2 mb-4">
                      {property.description ||
                        "Elegant independent bungalow designed for comfort, privacy, and modern family living."}
                    </p>

                    {property.highlights && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {property.highlights.slice(0, 3).map((h: string, i: number) => (
                          <span
                            key={i}
                            className="text-xs px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-medium"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      {property.price && (
                        <div className="text-lg font-semibold text-slate-900">
                          {property.price}
                        </div>
                      )}

                      <Button
                        asChild
                        size="sm"
                        className="bg-slate-900 hover:bg-amber-600 text-white rounded-xl"
                      >
                        <Link href={`/properties/${property.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer CTA */}
            <div className="mt-14 flex justify-center">
              <Button
                asChild
                size="lg"
                className="px-10 py-6 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white shadow-lg"
              >
                <Link href="/properties?category=Residential&&type=bungalow">
                  Explore All Bungalows
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Trending Locations - Clean Cards */}
      <TrendingLocations />

      {/* Commercial Shop Properties Section - Clean */}
      {shopProperties.length > 0 && (
        <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
          {/* Decorative background elements */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-float-delayed" />
          </div>

          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)`,
              backgroundSize: "48px 48px",
            }}
          />

          <div className="container mx-auto px-4 relative z-10">
            {/* Header */}
            <div className="mb-16">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-white/80 backdrop-blur-sm rounded-full border border-blue-100 shadow-sm">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-600 tracking-wide uppercase">
                      Commercial Collection
                    </span>
                  </div>

                  <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 leading-tight">
                    <span className="block">Find Your Perfect</span>
                    <span className="block bg-gradient-to-r from-amber-600 via-amber-500 to-amber-800 bg-clip-text text-transparent">
                      Business Space
                    </span>
                  </h2>

                  <p className="text-lg text-slate-600 leading-relaxed">
                    Premium commercial shops in high-footfall locations, crafted
                    to elevate your brand and drive business growth.
                  </p>
                </div>

                <Button
                  variant="ghost"
                  asChild
                  className="hidden md:flex items-center gap-2 px-6 py-6 text-base text-blue-500 hover:text-white"
                >
                  <Link href="/properties?category=Residential">
                    View All
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Carousel Container */}
            <div className="relative">
              {/* Carousel Wrapper */}
              <div className="overflow-hidden rounded-3xl">
                <div
                  className="flex transition-transform duration-700 ease-out"
                  style={{
                    transform: `translateX(-${shopCurrentIndex * (100 / itemsToShow)}%)`,
                  }}
                >
                  {loopedShopProperties.map((property, index) => (
                    <div
                      key={`${property.id}-${index}`}
                      className="flex-shrink-0 px-3"
                      style={{ width: `${100 / itemsToShow}%` }}
                    >
                      <CarouselPropertyCard property={property} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows - Only show if more than itemsToShow items */}
              {shopMaxIndex > 0 && (
                <>
                  <button
                    onClick={handleShopPrevious}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 z-20 p-4 bg-white/95 backdrop-blur-sm hover:bg-blue-600 text-slate-700 hover:text-white rounded-full shadow-xl transition-all duration-300 hover:scale-110 group"
                    aria-label="Previous properties"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={handleShopNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 z-20 p-4 bg-white/95 backdrop-blur-sm hover:bg-blue-600 text-slate-700 hover:text-white rounded-full shadow-xl transition-all duration-300 hover:scale-110 group"
                    aria-label="Next properties"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Dots Indicator - Only show if more than itemsToShow items */}
            {shopMaxIndex > 0 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                {Array.from({ length: shopMaxIndex + 1 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToShopSlide(index)}
                    className={`transition-all duration-300 rounded-full ${shopCurrentIndex === index
                      ? "w-8 h-2 bg-blue-600"
                      : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Mobile View All Button */}
            <div className="mt-12 md:hidden flex justify-center">
              <Button
                asChild
                className="w-full sm:w-auto px-8 py-6 text-base bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg"
              >
                <Link href="/properties?category=Residential">
                  View All Properties
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* CSS Animations */}
          <style jsx>{`
            @keyframes float {
              0%,
              100% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-20px);
              }
            }

            @keyframes float-delayed {
              0%,
              100% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(20px);
              }
            }

            .animate-float {
              animation: float 6s ease-in-out infinite;
            }

            .animate-float-delayed {
              animation: float-delayed 8s ease-in-out infinite;
            }
          `}</style>
        </section>
      )}

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section - Simple Gradient */}
      <section className="py-20 bg-accent text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
            Join thousands of satisfied customers who found their perfect home
            with PropertyCab
          </p>
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              className="px-8 font-bold text-accent hover:bg-white/90"
            >
              <Link href="/properties">Start Search</Link>
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="px-8 font-bold text-accent hover:bg-white/90"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
