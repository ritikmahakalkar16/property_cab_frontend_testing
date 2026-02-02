// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { MapPin, Bed, Bath, Square, Building2, Heart, Eye } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";
// import { cn } from "@/lib/utils";
// import { StaticImageData } from "next/image";
// import { useAuth } from "@/contexts/AuthContext";

// interface PropertyCardProps {
//   id: string;
//   title: string;
//   price: string;
//   location: string;
//   bedrooms: number;
//   bathrooms: number;
//   area: number;
//   imageUrl: string | StaticImageData;
//   type: "buy" | "rent" | "sale";
//   featured?: boolean;
//   propertyType?: string;
// }

// const PropertyCard = ({
//   id,
//   title,
//   price,
//   location,
//   bedrooms,
//   bathrooms,
//   area,
//   imageUrl,
//   type,
//   featured = false,
//   propertyType,
// }: PropertyCardProps) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const { interestedPropIds, toggleInterest } = useAuth();
//   const isLiked = interestedPropIds?.has(id) || false;

//   const formatArea = (sqft: number) => {
//     if (sqft >= 43560) {
//       return `${(sqft / 43560).toFixed(2)} Acres`;
//     }
//     return `${sqft.toLocaleString()} sq.ft`;
//   };

//   const isNonResidential = propertyType && ['Shop', 'Office Space', 'Godown', 'Farm House', 'Resort', 'Agriculture Land', 'Non Agriculture/Developed Land', 'Plot'].includes(propertyType);
//   const listingTypeText = type === 'rent' ? 'Rent' : 'Sale';

//   return (
//     <Link href={`/properties/${id}`}>
//       <Card
//         className={cn(
//           "group overflow-hidden cursor-pointer border-border/50 bg-card",
//           "transition-all duration-500 ease-out",
//           "hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 hover:border-accent/30"
//         )}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <div className="relative overflow-hidden">
//           {/* Image with overlay */}
//           <div className="relative h-56 overflow-hidden">
//             <img
//               src={typeof imageUrl === 'string' ? imageUrl : imageUrl.src}
//               alt={title}
//               className={cn(
//                 "w-full h-full object-cover transition-transform duration-700",
//                 isHovered && "scale-110"
//               )}
//               onError={(e) => {
//                 e.currentTarget.src = '/placeholder.svg';
//               }}
//             />
//             {/* Gradient overlay */}
//             <div className={cn(
//               "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent",
//               "transition-opacity duration-300",
//               isHovered ? "opacity-80" : "opacity-60"
//             )} />
//           </div>

//           {/* Floating action button */}
//           <button
//             onClick={(e) => {
//               e.preventDefault();
//               e.stopPropagation(); // ensure Link doesn't trigger
//               toggleInterest(id);
//             }}
//             className={cn(
//               "absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-300",
//               isLiked
//                 ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
//                 : "bg-white/20 text-white hover:bg-white/30"
//             )}
//           >
//             <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
//           </button>

//           {/* Badges */}
//           <div className="absolute top-3 left-3 flex flex-col gap-2">
//             {featured && (
//               <Badge className="bg-gradient-to-r from-accent to-amber-500 text-accent-foreground shadow-lg border-0 font-sans">
//                 ⭐ Featured
//               </Badge>
//             )}
//             <Badge className={cn(
//               "backdrop-blur-md border-0 font-sans",
//               type === 'rent'
//                 ? "bg-blue-500/90 text-white"
//                 : "bg-emerald-500/90 text-white"
//             )}>
//               For {listingTypeText}
//             </Badge>
//           </div>

//           {/* Property type badge */}
//           {propertyType && (
//             <Badge className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md text-white border-0 font-sans">
//               {propertyType}
//             </Badge>
//           )}

//           {/* View indicator */}
//           <div className={cn(
//             "absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full",
//             "bg-black/50 backdrop-blur-md text-white text-xs font-sans",
//             "transition-all duration-300",
//             isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
//           )}>
//             <Eye className="h-3.5 w-3.5" />
//             <span>Quick View</span>
//           </div>
//         </div>

//         <div className="p-5">
//           <h3 className="font-semibold text-lg text-card-foreground mb-2 line-clamp-1 group-hover:text-accent transition-colors duration-300 font-sans">
//             {title}
//           </h3>

//           <div className="flex items-center gap-1.5 text-muted-foreground mb-4">
//             <MapPin className="h-4 w-4 text-accent flex-shrink-0" />
//             <span className="text-sm line-clamp-1 font-sans">{location}</span>
//           </div>

//           <div className="flex items-center gap-2 mb-4 flex-wrap">
//             {!isNonResidential && bedrooms > 0 && (
//               <div className="flex items-center gap-1.5 bg-secondary/70 px-3 py-1.5 rounded-full text-sm font-sans">
//                 <Bed className="h-3.5 w-3.5 text-muted-foreground" />
//                 <span className="text-muted-foreground">{bedrooms} BHK</span>
//               </div>
//             )}
//             {isNonResidential && (
//               <div className="flex items-center gap-1.5 bg-secondary/70 px-3 py-1.5 rounded-full text-sm font-sans">
//                 <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
//                 <span className="text-muted-foreground">Commercial</span>
//               </div>
//             )}
//             {bathrooms > 0 && (
//               <div className="flex items-center gap-1.5 bg-secondary/70 px-3 py-1.5 rounded-full text-sm font-sans">
//                 <Bath className="h-3.5 w-3.5 text-muted-foreground" />
//                 <span className="text-muted-foreground">{bathrooms}</span>
//               </div>
//             )}
//             <div className="flex items-center gap-1.5 bg-secondary/70 px-3 py-1.5 rounded-full text-sm font-sans">
//               <Square className="h-3.5 w-3.5 text-muted-foreground" />
//               <span className="text-muted-foreground">{formatArea(area)}</span>
//             </div>
//           </div>

//           <div className="flex items-center justify-between pt-4 border-t border-border/50">
//             <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent font-sans">
//               {price}
//             </span>
//             <span className={cn(
//               "text-sm text-accent font-medium transition-all duration-300 font-sans",
//               "flex items-center gap-1",
//               isHovered && "gap-2"
//             )}>
//               View Details
//               <span className={cn(
//                 "transition-transform duration-300",
//                 isHovered && "translate-x-1"
//               )}>→</span>
//             </span>
//           </div>
//         </div>
//       </Card>
//     </Link>
//   );
// };

// export default PropertyCard;


// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { MapPin, Bed, Bath, Square, Building2, Heart, Eye, ArrowRight } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";
// import { cn, formatPropertyType } from "@/lib/utils";
// import { StaticImageData } from "next/image";
// import { useAuth } from "@/contexts/AuthContext";

// interface PropertyCardProps {
//   id: string;
//   title: string;
//   price: string;
//   location: string;
//   bedrooms: number;
//   bathrooms: number;
//   area: number;
//   imageUrl: string | StaticImageData;
//   type: "buy" | "rent" | "sale";
//   featured?: boolean;
//   propertyType?: string;
//   views?: number;
// }

// const PropertyCard = ({
//   id,
//   title,
//   price,
//   location,
//   bedrooms,
//   bathrooms,
//   area,
//   imageUrl,
//   type,
//   featured = false,
//   propertyType,
//   views,
// }: PropertyCardProps) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const { interestedPropIds, toggleInterest, user } = useAuth();
//   const isLiked = interestedPropIds?.has(id) || false;
//   const requireAuth = process.env.NEXT_PUBLIC_REQUIRE_AUTH_DETAILS === "true";

//   const formatArea = (sqft: number) => {
//     if (sqft >= 43560) {
//       return `${(sqft / 43560).toFixed(2)} Acres`;
//     }
//     return `${sqft.toLocaleString()} sq.ft`;
//   };

//   const isNonResidential = propertyType && ['Shop', 'Office Space', 'Godown', 'Farm House', 'Resort', 'Agriculture Land', 'Non Agriculture/Developed Land', 'Plot'].includes(propertyType);
//   const listingTypeText = type === 'rent' ? 'Rent' : 'Sale';

//   return (
//     <Link href={`/properties/${id}`}>
//       <Card
//         className={cn(
//           "group relative overflow-hidden cursor-pointer bg-white border border-slate-100",
//           "rounded-[2rem] transition-all duration-500 ease-out",
//           "hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 hover:border-slate-200"
//         )}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         {/* Image Section */}
//         <div className="relative h-64 overflow-hidden">
//           <img
//             src={typeof imageUrl === 'string' ? imageUrl : imageUrl.src}
//             alt={title}
//             className={cn(
//               "w-full h-full object-cover transition-transform duration-700 ease-in-out",
//               isHovered && "scale-110"
//             )}
//             onError={(e) => {
//               e.currentTarget.src = '/placeholder.svg';
//             }}
//           />

//           {/* Refined overlaid gradient */}
//           <div className={cn(
//             "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent",
//             "transition-opacity duration-300",
//             isHovered ? "opacity-90" : "opacity-70"
//           )} />

//           {/* Top Badges */}
//           <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
//             {featured && (
//               <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/90 backdrop-blur-sm text-white text-xs font-bold shadow-lg shadow-amber-500/20">
//                 ⭐ Featured
//               </span>
//             )}
//             <span className={cn(
//               "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-lg",
//               type === 'rent'
//                 ? "bg-blue-600/90 text-white shadow-blue-500/20"
//                 : "bg-emerald-600/90 text-white shadow-emerald-500/20"
//             )}>
//               For {listingTypeText}
//             </span>
//           </div>

//           {/* Like Button */}
//           {(requireAuth || user) && (
//             <button
//               onClick={(e) => {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 toggleInterest(id);
//               }}
//               className={cn(
//                 "absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 z-20 group/heart",
//                 isLiked
//                   ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
//                   : "bg-white/20 text-white hover:bg-white/40"
//               )}
//             >
//               <Heart className={cn("h-4 w-4 transition-transform group-hover/heart:scale-125", isLiked && "fill-current")} />
//             </button>
//           )}

//           {/* Bottom Overlay Content (Property Type) */}
//           <div className="absolute bottom-4 left-4 z-10">
//             {propertyType && (
//               <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
//                 {formatPropertyType(propertyType)}
//               </span>
//             )}
//           </div>

//           {/* View Count Badge */}
//           {views !== undefined && views > 0 && (
//             <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-medium">
//               <Eye className="h-3 w-3 text-orange-400" />
//               <span>{views} Interested</span>
//             </div>
//           )}
//         </div>

//         {/* Details Section */}
//         <div className="p-6">
//           <div className="mb-4">
//             <div className="flex items-start justify-between gap-2 mb-2">
//               <h3 className="font-bold text-lg text-slate-900 leading-tight line-clamp-2 font-serif group-hover:text-primary transition-colors">
//                 {title}
//               </h3>
//             </div>
//             <div className="flex items-center gap-1.5 text-slate-500 text-sm">
//               <MapPin className="h-4 w-4 text-accent" />
//               <span className="line-clamp-1">{location}</span>
//             </div>
//           </div>

//           {/* Amenities - Clean horizontal layout */}
//           <div className="flex items-center gap-4 py-4 border-t border-slate-100 mb-4">
//             {!isNonResidential && bedrooms > 0 && (
//               <div className="flex items-center gap-2" title={`${bedrooms} Bedrooms`}>
//                 <Bed className="h-4 w-4 text-slate-400" />
//                 <span className="text-sm font-semibold text-slate-700">{bedrooms}</span>
//               </div>
//             )}

//             {!isNonResidential && bedrooms > 0 && bathrooms > 0 && (
//               <div className="h-4 w-px bg-slate-200" />
//             )}

//             {bathrooms > 0 && (
//               <div className="flex items-center gap-2" title={`${bathrooms} Bathrooms`}>
//                 <Bath className="h-4 w-4 text-slate-400" />
//                 <span className="text-sm font-semibold text-slate-700">{bathrooms}</span>
//               </div>
//             )}

//             {((bedrooms > 0) || (bathrooms > 0)) && (
//               <div className="h-4 w-px bg-slate-200" />
//             )}

//             <div className="flex items-center gap-2" title="Area">
//               <Square className="h-4 w-4 text-slate-400" />
//               <span className="text-sm font-semibold text-slate-700">{formatArea(area)}</span>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="flex items-center justify-between">
//             <div className="flex flex-col">
//               <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Price</span>
//               <span className="text-xl font-bold text-primary">
//                 {price}
//               </span>
//             </div>

//             <button className={cn(
//               "w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300",
//               isHovered
//                 ? "bg-primary border-primary text-white rotate-[-45deg]"
//                 : "bg-white border-slate-200 text-slate-400"
//             )}>
//               <ArrowRight className="h-4 w-4" />
//             </button>
//           </div>
//         </div>
//       </Card>
//     </Link>
//   );
// };

// export default PropertyCard;




// =============== version 1 ============= 

// import { Card } from "@/components/ui/card";
// import { MapPin, Bed, Bath, Square, Heart, Eye, ArrowUpRight } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";
// import { cn, formatPropertyType } from "@/lib/utils";
// import { StaticImageData } from "next/image";
// import { useAuth } from "@/contexts/AuthContext";

// interface PropertyCardProps {
//   id: string;
//   title: string;
//   price: string;
//   location: string;
//   bedrooms: number;
//   bathrooms: number;
//   area: number;
//   imageUrl: string | StaticImageData;
//   type: "buy" | "rent" | "sale";
//   featured?: boolean;
//   propertyType?: string;
//   views?: number;
// }

// const PropertyCard = ({
//   id,
//   title,
//   price,
//   location,
//   bedrooms,
//   bathrooms,
//   area,
//   imageUrl,
//   type,
//   featured = false,
//   propertyType,
//   views,
// }: PropertyCardProps) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const { interestedPropIds, toggleInterest, user } = useAuth();
//   const isLiked = interestedPropIds?.has(id) || false;

//   const formatArea = (sqft: number) => {
//     if (sqft >= 43560) return `${(sqft / 43560).toFixed(2)} Ac`;
//     return `${sqft.toLocaleString()} sq.ft`;
//   };

//   const isNonResidential = propertyType && ['Shop', 'Office Space', 'Godown', 'Farm House', 'Resort', 'Agriculture Land', 'Plot'].includes(propertyType);

//   return (
//     <Link href={`/properties/${id}`} className="block group">
//       <Card
//         className={cn(
//           "relative overflow-hidden bg-white border-none transition-all duration-500",
//           "rounded-[2.5rem] shadow-sm hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)]",
//           "hover:-translate-y-3"
//         )}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         {/* Image Container */}
//         <div className="relative h-72 overflow-hidden m-3 rounded-[2rem]">
//           <img
//             src={typeof imageUrl === 'string' ? imageUrl : imageUrl.src}
//             alt={title}
//             className={cn(
//               "w-full h-full object-cover transition-transform duration-1000 ease-out",
//               isHovered && "scale-110 rotate-1"
//             )}
//             onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
//           />
          
//           {/* Visual Overlay Shimmer */}
//           <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent opacity-60" />

//           {/* Top Left: Badges */}
//           <div className="absolute top-4 left-4 flex flex-col gap-2">
//             {featured && (
//               <div className="bg-amber-400 text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-xl">
//                 Featured
//               </div>
//             )}
//             <div className={cn(
//               "backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white border border-white/20",
//               type === 'rent' ? "bg-blue-500/60" : "bg-emerald-500/60"
//             )}>
//               For {type}
//             </div>
//           </div>

//           {/* Top Right: Heart */}
//           <button
//             onClick={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               toggleInterest(id);
//             }}
//             className={cn(
//               "absolute top-4 right-4 p-3 rounded-2xl backdrop-blur-md transition-all duration-300 z-20",
//               isLiked 
//                 ? "bg-red-500 text-white" 
//                 : "bg-white/10 text-white hover:bg-white/30 border border-white/20"
//             )}
//           >
//             <Heart className={cn("h-4 w-4 transition-transform", isLiked && "fill-current scale-110")} />
//           </button>

//           {/* Price Tag Overlay */}
//           <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
//             <div className="bg-white/90 backdrop-blur-xl px-4 py-2 rounded-2xl shadow-2xl">
//               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.1em] mb-0.5">Starting From</p>
//               <p className="text-lg font-black text-slate-900 leading-none">{price}</p>
//             </div>
            
//             {views !== undefined && views > 0 && (
//               <div className="bg-black/50 backdrop-blur-md text-white px-3 py-2 rounded-xl flex items-center gap-1.5 border border-white/10">
//                 <Eye className="h-3.5 w-3.5 text-blue-300" />
//                 <span className="text-[11px] font-medium">{views}</span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Info Section */}
//         <div className="px-6 pb-8 pt-2">
//           <div className="flex justify-between items-start mb-3">
//             <div>
//               <p className="text-primary font-bold text-[11px] uppercase tracking-widest mb-1 opacity-70">
//                 {propertyType ? formatPropertyType(propertyType) : 'Property'}
//               </p>
//               <h3 className="font-bold text-xl text-slate-800 leading-tight group-hover:text-primary transition-colors line-clamp-1">
//                 {title}
//               </h3>
//             </div>
//             <div className={cn(
//                "w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-500",
//                isHovered ? "bg-slate-900 border-slate-900 text-white rotate-45" : "bg-slate-50 border-slate-100 text-slate-400"
//             )}>
//               <ArrowUpRight className={cn("h-5 w-5 transition-transform", isHovered && "-rotate-45")} />
//             </div>
//           </div>

//           <div className="flex items-center gap-1 text-slate-400 mb-6">
//             <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
//             <span className="text-sm font-medium truncate italic">{location}</span>
//           </div>

//           {/* Amenities Grid */}
//           <div className="grid grid-cols-3 gap-2 p-2 bg-slate-50 rounded-2xl border border-slate-100">
//             {!isNonResidential && (
//               <>
//                 <div className="flex flex-col items-center justify-center py-2 border-r border-slate-200">
//                   <Bed className="h-4 w-4 text-slate-600 mb-1" />
//                   <span className="text-[11px] font-bold text-slate-800">{bedrooms} Bed</span>
//                 </div>
//                 <div className="flex flex-col items-center justify-center py-2 border-r border-slate-200">
//                   <Bath className="h-4 w-4 text-slate-600 mb-1" />
//                   <span className="text-[11px] font-bold text-slate-800">{bathrooms} Bath</span>
//                 </div>
//               </>
//             )}
//             <div className={cn(
//               "flex flex-col items-center justify-center py-2",
//               isNonResidential ? "col-span-3" : "col-span-1"
//             )}>
//               <Square className="h-4 w-4 text-slate-600 mb-1" />
//               <span className="text-[11px] font-bold text-slate-800">{formatArea(area)}</span>
//             </div>
//           </div>
//         </div>
//       </Card>
//     </Link>
//   );
// };

// export default PropertyCard;








// ===================== version 2 =====================

// import { Card } from "@/components/ui/card";
// import { Heart, ArrowUpRight, Maximize2, MapPin } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";
// import { cn } from "@/lib/utils";

// const PropertyCard = ({
//   id, title, price, location, bedrooms, bathrooms, area, imageUrl, type, propertyType,
// }: any) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <Link href={`/properties/${id}`} className="block group">
//       <div 
//         className="relative bg-white p-4 transition-all duration-700"
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         {/* The Frame */}
//         <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
//           <img
//             src={typeof imageUrl === 'string' ? imageUrl : imageUrl.src}
//             alt={title}
//             className={cn(
//               "w-full h-full object-cover transition-all duration-[1.2s] ease-in-out",
//               isHovered ? "scale-105" : "scale-100"
//             )}
//           />
          
//           {/* Minimalist Like Button */}
//           <button className="absolute top-4 right-4 z-20 mix-blend-difference text-white hover:scale-110 transition-transform">
//             <Heart className="h-5 w-5" />
//           </button>

//           {/* Type Tag - Vertical & Minimal */}
//           <div className="absolute top-0 left-0 bottom-0 w-1 bg-black z-10" />
//           <div className="absolute top-8 -left-2 rotate-90 origin-left">
//              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black bg-white px-3 py-1 shadow-sm">
//                 For {type}
//              </span>
//           </div>
//         </div>

//         {/* Content Section - Asymmetric Offset */}
//         <div className="relative mt-6 space-y-4">
//           <div className="flex justify-between items-start">
//             <div className="max-w-[70%]">
//               <h3 className="text-xl font-light text-slate-900 leading-tight uppercase tracking-tight italic">
//                 {title}
//               </h3>
//               <div className="flex items-center gap-1 mt-2 text-slate-400">
//                 <MapPin className="h-3 w-3" />
//                 <span className="text-[10px] uppercase tracking-widest font-medium">{location}</span>
//               </div>
//             </div>
//             <div className="text-right">
//               <p className="text-xs text-slate-400 font-medium tracking-tighter uppercase mb-1">Price</p>
//               <p className="text-xl font-bold text-slate-900">{price}</p>
//             </div>
//           </div>

//           {/* Hairline Divider */}
//           <div className="h-px w-full bg-slate-100 transform origin-left transition-transform duration-700 scale-x-100 group-hover:bg-black" />

//           {/* Specs Bar */}
//           <div className="flex items-center justify-between">
//             <div className="flex gap-6">
//               <div className="space-y-1">
//                 <p className="text-[9px] text-slate-400 uppercase tracking-widest">Beds</p>
//                 <p className="text-xs font-bold">{bedrooms}</p>
//               </div>
//               <div className="space-y-1">
//                 <p className="text-[9px] text-slate-400 uppercase tracking-widest">Baths</p>
//                 <p className="text-xs font-bold">{bathrooms}</p>
//               </div>
//               <div className="space-y-1">
//                 <p className="text-[9px] text-slate-400 uppercase tracking-widest">Area</p>
//                 <p className="text-xs font-bold">{area} <span className="font-light text-[8px]">SQFT</span></p>
//               </div>
//             </div>

//             {/* View Reveal Button */}
//             <div className={cn(
//                 "flex items-center gap-2 transition-all duration-500",
//                 isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
//             )}>
//                 <span className="text-[10px] font-black uppercase tracking-widest">Explore</span>
//                 <ArrowUpRight className="h-4 w-4" />
//             </div>
//           </div>
//         </div>

//         {/* Border Reveal - Only shows on hover around the whole card */}
//         <div className={cn(
//             "absolute inset-0 border border-black/5 pointer-events-none transition-all duration-500",
//             isHovered ? "opacity-100" : "opacity-0"
//         )} />
//       </div>
//     </Link>
//   );
// };

// export default PropertyCard;







// =================== version 3 =====================

// import { Card } from "@/components/ui/card";
// import { MapPin, Bed, Bath, Square, ShieldCheck } from "lucide-react";
// import Link from "next/link";
// import { cn } from "@/lib/utils";

// const PropertyCard = ({
//   id,
//   title,
//   price,
//   location,
//   bedrooms,
//   bathrooms,
//   area,
//   imageUrl,
//   featured,
//   propertyType,
// }: any) => {
  
//   const formatArea = (sqft: number) => {
//     if (sqft >= 43560) return `${(sqft / 43560).toFixed(2)} Acres`;
//     return `${sqft.toLocaleString()} sq.ft`;
//   };

//   return (
//     <div className="w-full max-w-[400px] font-sans group">
//       <Link href={`/properties/${id}`} className="block">
//         {/* Main Background Container using Theme Slate/Navy hue */}
//         <div className="bg-[#F0F4F8] rounded-[2.5rem] p-3 border border-slate-200/60 transition-all hover:shadow-xl hover:shadow-blue-900/10">
          
//           {/* Image Section */}
//           <div className="relative h-64 w-full rounded-[2rem] overflow-hidden">
//             <img
//               src={typeof imageUrl === 'string' ? imageUrl : (imageUrl as any).src}
//               alt={title}
//               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//             />
            
//             {/* RERA Badge - Using Theme Blue */}
//             <div className="absolute top-4 left-4 bg-[#1A365D] text-white px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg">
//               <ShieldCheck className="h-4 w-4" />
//               <span className="text-[10px] font-black uppercase tracking-wider">RERA</span>
//             </div>

//             {featured && (
//               <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-lg">
//                 Featured
//               </div>
//             )}
//           </div>

//           {/* Overlapping Info Card */}
//           <div className="bg-white rounded-[2rem] -mt-12 relative z-10 p-6 mx-2 border border-slate-100 shadow-lg shadow-slate-200/50">
            
//             {/* Price Row */}
//             <div className="flex justify-between items-baseline border-b border-dashed border-slate-100 pb-4 mb-4">
//               <span className="text-2xl font-black text-[#1A365D] tracking-tight">
//                 {price}
//               </span>
//               <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
//                 {propertyType || 'Residential'}
//               </span>
//             </div>

//             {/* Title & Location */}
//             <div className="mb-4">
//               <h3 className="text-lg font-bold text-slate-800 leading-tight line-clamp-1 group-hover:text-[#1A365D] transition-colors">
//                 {title}
//               </h3>
//               <div className="flex items-center gap-1 text-slate-500 mt-1">
//                 <MapPin className="h-3.5 w-3.5 text-blue-500" />
//                 <span className="text-sm font-medium">{location}</span>
//               </div>
//             </div>

//             {/* Property Stats (Original Details) */}
//             <div className="grid grid-cols-3 gap-2 py-3 bg-slate-50 rounded-2xl mb-6 px-2">
//               <div className="flex flex-col items-center border-r border-slate-200">
//                 <div className="flex items-center gap-1.5 mb-0.5">
//                    <Bed className="h-3.5 w-3.5 text-slate-400" />
//                    <span className="text-sm font-bold text-slate-700">{bedrooms}</span>
//                 </div>
//                 <span className="text-[9px] font-bold text-slate-400 uppercase">Beds</span>
//               </div>
//               <div className="flex flex-col items-center border-r border-slate-200">
//                 <div className="flex items-center gap-1.5 mb-0.5">
//                    <Bath className="h-3.5 w-3.5 text-slate-400" />
//                    <span className="text-sm font-bold text-slate-700">{bathrooms}</span>
//                 </div>
//                 <span className="text-[9px] font-bold text-slate-400 uppercase">Baths</span>
//               </div>
//               <div className="flex flex-col items-center">
//                 <div className="flex items-center gap-1.5 mb-0.5">
//                    <Square className="h-3.5 w-3.5 text-slate-400" />
//                    <span className="text-sm font-bold text-slate-700">{area}</span>
//                 </div>
//                 <span className="text-[9px] font-bold text-slate-400 uppercase">Sq.ft</span>
//               </div>
//             </div>

//             {/* Theme Consistent CTA */}
//             <button className="w-full bg-[#1A365D] hover:bg-[#2A4A7D] text-white font-black py-4 rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-blue-900/20 uppercase text-xs tracking-widest">
//               Get More Information
//             </button>
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default PropertyCard;






// ================ version 4 ======================

// import { Card } from "@/components/ui/card";
// import { MapPin, Bed, Bath, Square, ShieldCheck, ArrowRight } from "lucide-react";
// import Link from "next/link";
// import { cn } from "@/lib/utils";

// const PropertyCard = ({
//   id,
//   title,
//   price,
//   location,
//   bedrooms,
//   bathrooms,
//   area,
//   imageUrl,
//   featured,
//   propertyType,
// }: any) => {
  
//   const formatArea = (sqft: number) => {
//     if (sqft >= 43560) return `${(sqft / 43560).toFixed(1)} Ac`;
//     return `${sqft.toLocaleString()} sqft`;
//   };

//   return (
//     <div className="w-full max-w-[380px] group">
//       <Link href={`/properties/${id}`} className="block">
//         <div className="relative bg-white rounded-[2rem] p-2 transition-all duration-300 border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/10">
          
//           {/* Compressed Image Section */}
//           <div className="relative h-48 w-full rounded-[1.5rem] overflow-hidden">
//             <img
//               src={typeof imageUrl === 'string' ? imageUrl : (imageUrl as any).src}
//               alt={title}
//               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//             />
//             <div className="absolute top-3 left-3 bg-[#1A365D]/90 backdrop-blur-md text-white px-3 py-1 rounded-lg flex items-center gap-1.5 border border-white/10">
//               <ShieldCheck className="h-3 w-3 text-blue-300" />
//               <span className="text-[9px] font-black uppercase tracking-widest">RERA</span>
//             </div>
//           </div>

//           {/* Compact Content Section */}
//           <div className="pt-4 px-3 pb-2">
//             {/* Title & Location Row */}
//             <div className="mb-3">
//               <h3 className="text-base font-bold text-slate-800 leading-tight line-clamp-1 mb-1">
//                 {title}
//               </h3>
//               <div className="flex items-center gap-1 text-slate-400">
//                 <MapPin className="h-3 w-3 text-orange-500" />
//                 <span className="text-xs font-medium truncate">{location}</span>
//               </div>
//             </div>

//             {/* Flat Utility Bar - Reduced Height */}
//             <div className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-xl mb-4">
//               <div className="flex items-center gap-1">
//                 <Bed className="h-3.5 w-3.5 text-[#1A365D]" />
//                 <span className="text-xs font-bold text-slate-700">{bedrooms}</span>
//               </div>
//               <div className="w-px h-3 bg-slate-200" />
//               <div className="flex items-center gap-1">
//                 <Bath className="h-3.5 w-3.5 text-[#1A365D]" />
//                 <span className="text-xs font-bold text-slate-700">{bathrooms}</span>
//               </div>
//               <div className="w-px h-3 bg-slate-200" />
//               <div className="flex items-center gap-1">
//                 <Square className="h-3.5 w-3.5 text-[#1A365D]" />
//                 <span className="text-xs font-bold text-slate-700">{formatArea(area)}</span>
//               </div>
//             </div>

//             {/* Smart Integrated Footer */}
//             <div className="flex items-center justify-between bg-[#1A365D] rounded-2xl p-1.5 pl-4 transition-all group-hover:bg-[#234675]">
//               <div className="flex flex-col">
//                 <span className="text-[9px] text-blue-200 font-bold uppercase tracking-tighter">Price</span>
//                 <span className="text-lg font-black text-white leading-none tracking-tight">{price}</span>
//               </div>
              
//               <div className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors py-2 px-4 rounded-xl text-white">
//                 <span className="text-[10px] font-bold uppercase tracking-widest">Details</span>
//                 <ArrowRight className="h-4 w-4" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default PropertyCard;




import { Card } from "@/components/ui/card";
import { MapPin, Bed, Bath, Square, ShieldCheck, ArrowRight, Heart, Eye } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const PropertyCard = ({
  id,
  title,
  price,
  location,
  bedrooms,
  bathrooms,
  area,
  imageUrl,
  featured,
  propertyType,
  views,
}: any) => {
  const { interestedPropIds, toggleInterest, user } = useAuth();
  const isLiked = interestedPropIds?.has(id) || false;
  const requireAuth = process.env.NEXT_PUBLIC_REQUIRE_AUTH_DETAILS === "true";

  const formatArea = (sqft: number) => {
    if (sqft >= 43560) return `${(sqft / 43560).toFixed(1)} Ac`;
    return `${sqft.toLocaleString()} sqft`;
  };

  return (
    <div className="w-full max-w-[370px] group">
      <Link href={`/properties/${id}`} className="block">
        <div className={cn(
          "relative bg-white rounded-[2rem] p-2 transition-all duration-300",
          /* Distinct Thin Border */
          "border-[1px] border-[#1A365D]/20 shadow-sm",
          /* Hover Effect */
          "hover:border-[#1A365D]/60 hover:shadow-xl hover:shadow-blue-900/10"
        )}>
          
          {/* Image Section */}
          <div className="relative h-44 w-full rounded-[1.6rem] overflow-hidden">
            <img
              src={typeof imageUrl === 'string' ? imageUrl : (imageUrl as any).src}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* RERA / Featured Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              <div className="bg-[#1A365D] text-white px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-md">
                <ShieldCheck className="h-3 w-3 text-blue-300" />
                <span className="text-[9px] font-black uppercase tracking-wider">RERA</span>
              </div>
              {featured && (
                <div className="bg-orange-500 text-white px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider">
                  Featured
                </div>
              )}
            </div>

            {/* Like Button (Restored) */}
            {(requireAuth || user) && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleInterest(id);
                }}
                className={cn(
                  "absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 z-20",
                  isLiked 
                    ? "bg-red-500 text-white shadow-lg" 
                    : "bg-black/20 text-white hover:bg-white/40"
                )}
              >
                <Heart className={cn("h-4 w-4 transition-transform hover:scale-110", isLiked && "fill-current")} />
              </button>
            )}

            {/* Views / Interested Count (Restored) */}
            {views !== undefined && views > 0 && (
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-medium">
                <Eye className="h-3 w-3 text-orange-400" />
                <span>{views} Interested</span>
              </div>
            )}
          </div>

          {/* Content Area */}
          <div className="pt-4 px-3 pb-2">
            <div className="mb-3">
              <h3 className="text-[17px] font-bold text-slate-800 leading-tight line-clamp-1 mb-1 group-hover:text-[#1A365D] transition-colors">
                {title}
              </h3>
              <div className="flex items-center gap-1 text-slate-400">
                <MapPin className="h-3 w-3 text-[#1A365D]" />
                <span className="text-[11px] font-medium truncate">{location}</span>
              </div>
            </div>

            {/* Amenities Bar */}
            <div className="flex items-center justify-between py-2 px-4 bg-slate-50 rounded-xl mb-4 border border-slate-100">
              <div className="flex items-center gap-1.5">
                <Bed className="h-3.5 w-3.5 text-slate-400" />
                <span className="text-xs font-bold text-slate-700">{bedrooms}</span>
              </div>
              <div className="w-px h-3 bg-slate-200" />
              <div className="flex items-center gap-1.5">
                <Bath className="h-3.5 w-3.5 text-slate-400" />
                <span className="text-xs font-bold text-slate-700">{bathrooms}</span>
              </div>
              <div className="w-px h-3 bg-slate-200" />
              <div className="flex items-center gap-1.5">
                <Square className="h-3.5 w-3.5 text-slate-400" />
                <span className="text-xs font-bold text-slate-700">{formatArea(area)}</span>
              </div>
            </div>

            {/* Price & Integrated CTA */}
            <div className="flex items-center justify-between bg-[#1A365D] rounded-2xl p-1.5 pl-4 transition-colors group-hover:bg-[#142a4a]">
              <div className="flex flex-col">
                <span className="text-[8px] text-blue-300 font-bold uppercase tracking-tighter opacity-80">Price</span>
                <span className="text-lg font-black text-white leading-none tracking-tight">{price}</span>
              </div>
              
              <div className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-all py-2 px-4 rounded-xl text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest">Details</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;