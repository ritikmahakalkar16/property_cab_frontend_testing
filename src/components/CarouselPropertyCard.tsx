// import {
//   MapPin,
//   ArrowRight,
//   Maximize2,
// } from "lucide-react";
// import { Button } from "./ui/button";
// import Link from "next/link";

// const CarouselPropertyCard = ({ property }) => {

//   return (
//     <div className="relative h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group">
//       {/* Image Container with Overlay */}
//       <div className="relative h-80 overflow-hidden bg-slate-200">
//         <img
//           src={property.imageUrl}
//           alt={property.title}
//           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//         />

//         {/* Dark overlay on hover */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

//         {/* Status badge */}
//         {property.status && (
//           <div className="absolute top-4 left-4 px-4 py-2 bg-blue-600 text-white rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
//             {property.status}
//           </div>
//         )}

//         {/* Floating action button */}
//         <button className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-blue-600 hover:text-white shadow-xl transform group-hover:rotate-90">
//           <Maximize2 className="w-5 h-5" />
//         </button>

//         {/* Content overlay on image */}
//         <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-0 transition-transform duration-500">
//           <h3 className="text-2xl font-bold mb-2 line-clamp-1">
//             {property.title}
//           </h3>

//           {property.location && (
//             <div className="flex items-center gap-2 text-white/90 mb-4">
//               <MapPin className="w-4 h-4 flex-shrink-0" />
//               <span className="text-sm line-clamp-1">{property.location}</span>
//             </div>
//           )}

//           {/* Features */}
//           {property.features && (
//             <div className="flex items-center gap-4 text-sm mb-4 pb-4 border-b border-white/20">
//               {property.features.map((feature, idx) => (
//                 <span
//                   key={idx}
//                   className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full"
//                 >
//                   <span className="font-bold">{feature.value}</span>
//                   <span className="text-white/80">{feature.label}</span>
//                 </span>
//               ))}
//             </div>
//           )}

//           {/* Price and CTA */}
//           <div className="flex items-center justify-between">
//             <div>
//               {property.price && (
//                 <>
//                   <div className="text-xs text-white/70 font-medium uppercase tracking-wide mb-1">
//                     Starting from
//                   </div>
//                   <div className="text-3xl font-bold">{property.price}</div>
//                 </>
//               )}
//             </div>

//             <Button
//               asChild
//               size="sm"
//               className="bg-white text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl px-6 py-2 font-semibold transition-all duration-300 group-hover:translate-x-2 shadow-lg"
//             >
//               <Link href={`/properties/${property.id}`}>
//                 View Details
//                 <ArrowRight className="ml-2 w-4 h-4" />
//               </Link>
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CarouselPropertyCard;





import {
  MapPin,
  ArrowRight,
  Maximize2,
  Heart,
} from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

interface PropertyFeature {
  label: string;
  value: string | number;
}

interface Property {
  id: string | number;
  title: string;
  imageUrl: string;
  location?: string;
  status?: string;
  price?: string;
  features?: PropertyFeature[];
}

interface CarouselPropertyCardProps {
  property: Property;
}

const CarouselPropertyCard: React.FC<CarouselPropertyCardProps> = ({ property }) => {
  const { interestedPropIds, toggleInterest } = useAuth();
  const isLiked = interestedPropIds?.has(String(property.id)) || false;

  return (
    <div className="relative h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group">
      {/* Image Container with Overlay */}
      <div className="relative h-80 overflow-hidden bg-slate-200">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

        {/* Status badge */}
        {property.status && (
          <div className="absolute top-4 left-4 px-4 py-2 bg-blue-600 text-white rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
            {property.status}
          </div>
        )}

        {/* Floating action button */}
        <button
          type="button"
          onClick={(e) => {
             e.preventDefault();
             e.stopPropagation();
             toggleInterest(String(property.id));
          }}
          className={`absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full transition-all duration-300 shadow-xl ${
            isLiked ? "text-red-500 hover:text-red-600" : "text-slate-600 hover:text-blue-600"
          }`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
        </button>

        {/* Content overlay on image */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-0 transition-transform duration-500">
          <h3 className="text-2xl font-bold mb-2 line-clamp-1">
            {property.title}
          </h3>

          {property.location && (
            <div className="flex items-center gap-2 text-white/90 mb-4">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm line-clamp-1">{property.location}</span>
            </div>
          )}

          {/* Features */}
          {property.features && property.features.length > 0 && (
            <div className="flex items-center gap-4 text-sm mb-4 pb-4 border-b border-white/20">
              {property.features.map((feature, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full"
                >
                  <span className="font-bold">{feature.value}</span>
                  <span className="text-white/80">{feature.label}</span>
                </span>
              ))}
            </div>
          )}

          {/* Price and CTA */}
          <div className="flex items-center justify-between">
            <div>
              {property.price && (
                <>
                  <div className="text-xs text-white/70 font-medium uppercase tracking-wide mb-1">
                    Starting from
                  </div>
                  <div className="text-3xl font-bold">{property.price}</div>
                </>
              )}
            </div>

            <Button
              asChild
              size="sm"
              className="bg-white text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl px-6 py-2 font-semibold transition-all duration-300 group-hover:translate-x-2 shadow-lg"
            >
              <Link href={`/properties/${property.id}`}>
                View Details
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselPropertyCard;
