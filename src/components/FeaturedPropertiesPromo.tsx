// import Link from "next/link";
// import Image, { StaticImageData } from "next/image";
// import { ArrowRight, Sparkles } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";

// // Import property images
// import flat1 from "@/assets/properties/flat-1.jpg";
// import bungalow1 from "@/assets/properties/bungalow-1.jpg";
// import office1 from "@/assets/properties/office-1.jpg";
// import farmhouse1 from "@/assets/properties/farmhouse-1.jpg";

// interface FeaturedProperty {
//   id: string;
//   title: string;
//   price: string;
//   location: string;
//   image: string | StaticImageData;
//   type: string;
// }

// const featuredProperties: FeaturedProperty[] = [
//   {
//     id: "featured-1",
//     title: "Premium 3BHK Flat",
//     price: "₹2.5 Cr",
//     location: "Bandra, Mumbai",
//     image: flat1,
//     type: "Residential",
//   },
//   {
//     id: "featured-2",
//     title: "Luxury Bungalow",
//     price: "₹4.8 Cr",
//     location: "Koregaon Park, Pune",
//     image: bungalow1,
//     type: "Residential",
//   },
//   {
//     id: "featured-3",
//     title: "Modern Office Space",
//     price: "₹85K/month",
//     location: "Cyber City, Gurgaon",
//     image: office1,
//     type: "Commercial",
//   },
//   {
//     id: "featured-4",
//     title: "Luxury Farm House",
//     price: "₹3.5 Cr",
//     location: "Lonavala",
//     image: farmhouse1,
//     type: "Commercial",
//   },
// ];

// interface FeaturedPropertiesPromoProps {
//   title?: string;
//   subtitle?: string;
//   variant?: "default" | "compact";
//   maxItems?: number;
// }

// const FeaturedPropertiesPromo = ({
//   title = "Featured Properties",
//   subtitle = "Hand-picked premium listings for you",
//   variant = "default",
//   maxItems = 4,
// }: FeaturedPropertiesPromoProps) => {
//   const displayProperties = featuredProperties.slice(0, maxItems);

//   if (variant === "compact") {
//     return (
//       <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
//         <CardContent className="p-6">
//           <div className="flex items-center gap-2 mb-4">
//             <Sparkles className="h-5 w-5 text-accent" />
//             <h3 className="font-semibold text-foreground">{title}</h3>
//           </div>
//           <div className="space-y-3">
//             {displayProperties.slice(0, 3).map((property) => (
//               <Link
//                 key={property.id}
//                 href="/properties"
//                 className="flex items-center gap-3 p-2 rounded-lg hover:bg-background/50 transition-colors group"
//               >
//                 <div className="relative w-12 h-12 shrink-0">
//                   <Image
//                     src={property.image}
//                     alt={property.title}
//                     fill
//                     className="rounded-lg object-cover"
//                   />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
//                     {property.title}
//                   </p>
//                   <p className="text-xs text-muted-foreground">{property.location}</p>
//                 </div>
//                 <span className="text-sm font-semibold text-primary">{property.price}</span>
//               </Link>
//             ))}
//           </div>
//           <Button variant="ghost" size="sm" className="w-full mt-4" asChild>
//             <Link href="/properties">
//               View All <ArrowRight className="ml-2 h-4 w-4" />
//             </Link>
//           </Button>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <section className="py-12 bg-gradient-to-br from-primary/5 via-background to-accent/5 rounded-2xl">
//       <div className="px-6">
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <div className="flex items-center gap-2 mb-2">
//               <Sparkles className="h-5 w-5 text-accent" />
//               <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
//                 Premium
//               </Badge>
//             </div>
//             <h2 className="text-2xl font-bold text-foreground">{title}</h2>
//             <p className="text-muted-foreground">{subtitle}</p>
//           </div>
//           <Button variant="outline" asChild className="hidden md:flex">
//             <Link href="/properties">
//               View All <ArrowRight className="ml-2 h-4 w-4" />
//             </Link>
//           </Button>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {displayProperties.map((property) => (
//             <Link
//               key={property.id}
//               href="/properties"
//               className="group"
//             >
//               <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all h-full">
//                 <div className="relative h-32 md:h-40">
//                   <Image
//                     src={property.image}
//                     alt={property.title}
//                     fill
//                     className="object-cover group-hover:scale-110 transition-transform duration-500"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
//                   <div className="absolute bottom-0 left-0 right-0 p-3">
//                     <Badge variant="secondary" className="mb-1 text-xs bg-white/20 text-white border-0">
//                       {property.type}
//                     </Badge>
//                     <p className="font-semibold text-white text-sm truncate">{property.title}</p>
//                     <p className="text-white/80 text-xs">{property.location}</p>
//                   </div>
//                 </div>
//                 <CardContent className="p-3 bg-background">
//                   <p className="font-bold text-primary">{property.price}</p>
//                 </CardContent>
//               </Card>
//             </Link>
//           ))}
//         </div>

//         <Button variant="outline" className="w-full mt-6 md:hidden" asChild>
//           <Link href="/properties">
//             View All Properties <ArrowRight className="ml-2 h-4 w-4" />
//           </Link>
//         </Button>
//       </div>
//     </section>
//   );
// };

// export default FeaturedPropertiesPromo;


import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { ArrowRight, Sparkles, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Property images
import flat1 from "@/assets/properties/flat-1.jpg";
import bungalow1 from "@/assets/properties/bungalow-1.jpg";
import office1 from "@/assets/properties/office-1.jpg";
import farmhouse1 from "@/assets/properties/farmhouse-1.jpg";

// --------------------
// Types
// --------------------
interface FeaturedProperty {
  id: string;
  title: string;
  price: string;
  location: string;
  image?: StaticImageData;     // local
  cover_image?: string;       // API
  type: "Residential" | "Commercial";
  views?: number;
}

interface FeaturedPropertiesPromoProps {
  title?: string;
  subtitle?: string;
  variant?: "default" | "compact";
  maxItems?: number;
  properties?: FeaturedProperty[];
}

// --------------------
// Data
// --------------------
const featuredProperties: FeaturedProperty[] = [
  {
    id: "featured-1",
    title: "Premium 3BHK Flat",
    price: "₹2.5 Cr",
    location: "Bandra, Mumbai",
    image: flat1,
    type: "Residential",
  },
  {
    id: "featured-2",
    title: "Luxury Bungalow",
    price: "₹4.8 Cr",
    location: "Koregaon Park, Pune",
    image: bungalow1,
    type: "Residential",
  },
  {
    id: "featured-3",
    title: "Modern Office Space",
    price: "₹85K / month",
    location: "Cyber City, Gurgaon",
    image: office1,
    type: "Commercial",
  },
  {
    id: "featured-4",
    title: "Luxury Farm House",
    price: "₹3.5 Cr",
    location: "Lonavala",
    image: farmhouse1,
    type: "Residential",
  },
];

// --------------------
// Small reusable card
// --------------------
const PropertyCard = ({ property }: { property: FeaturedProperty }) => {
  const imageSrc = property.cover_image || property.image || "/placeholder.svg";

  return (
    <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all h-full">
      <div className="relative h-32 md:h-40 bg-slate-100">
        <img
          src={typeof imageSrc === 'string' ? imageSrc : (imageSrc as any).src}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {property.views !== undefined && property.views > 0 && (
          <div className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-medium z-10">
            <Eye className="h-2.5 w-2.5 text-orange-400" />
            <span>{property.views}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <Badge className="mb-1 text-xs bg-white/20 text-white border-0">
            {property.type}
          </Badge>
          <p className="font-semibold text-white text-sm truncate">
            {property.title}
          </p>
          <p className="text-white/80 text-xs">{property.location}</p>
        </div>
      </div>
      <CardContent className="p-3 bg-background">
        <p className="font-bold text-primary">{property.price}</p>
      </CardContent>
    </Card>
  );
};

// --------------------
// Component
// --------------------
const FeaturedPropertiesPromo = ({
  title = "More Properties",
  subtitle = "Find your next perfect place",
  variant = "default",
  maxItems = 4,
  properties,
}: FeaturedPropertiesPromoProps) => {
  // Use passed properties if available, otherwise fallback to internal data (or empty)
  // For the purpose of this request, we prioritize the passed properties prop.
  // If 'properties' is provided, we use it. If not, we fall back to 'featuredProperties' constant.

  const sourceProperties = properties && properties.length > 0 ? properties : featuredProperties;
  const displayProperties = sourceProperties.slice(0, maxItems);

  // -------- Compact Variant --------
  if (variant === "compact") {
    return (
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-accent" />
            <h3 className="font-semibold text-foreground">{title}</h3>
          </div>

          <div className="space-y-3">
            {displayProperties.map((property) => {
              const imageSrc = property.cover_image || property.image || "/placeholder.svg";
              return (
                <Link
                  key={property.id}
                  href={`/properties/${property.id}`}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-background/50 transition-colors group"
                >
                  <div className="relative w-12 h-12 shrink-0 bg-slate-100 rounded-lg overflow-hidden">
                    <img
                      src={typeof imageSrc === 'string' ? imageSrc : (imageSrc as any).src}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                      {property.title}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                      <p className="truncate">{property.location}</p>
                      {property.views !== undefined && property.views > 0 && (
                        <span className="flex items-center gap-1 text-[10px] text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded-full border border-orange-100 whitespace-nowrap">
                          <Eye className="h-2.5 w-2.5" /> {property.views}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-primary">
                    {property.price}
                  </span>
                </Link>
              )
            })}
          </div>

          <Button variant="ghost" size="sm" className="w-full mt-4" asChild>
            <Link href="/properties">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  // -------- Default Variant --------
  return (
    <section className="py-12 bg-gradient-to-br from-primary/5 via-background to-accent/5 rounded-2xl">
      <div className="px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-accent" />
              <Badge className="bg-accent/10 text-accent border-accent/20">
                Premium
              </Badge>
            </div>
            <h2 className="text-2xl font-bold text-foreground">{title}</h2>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>

          <Button variant="outline" asChild className="hidden md:flex">
            <Link href="/properties">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2  gap-4">
          {displayProperties.map((property) => (
            <Link
              key={property.id}
              href={`/properties/${property.id}`}
              className="group"
            >
              <PropertyCard property={property} />
            </Link>
          ))}
        </div>

        <Button variant="outline" className="w-full mt-6 md:hidden" asChild>
          <Link href="/properties">
            View All Properties <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default FeaturedPropertiesPromo;

