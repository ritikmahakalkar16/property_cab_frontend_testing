// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Search } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Slider } from "@/components/ui/slider";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// const PROPERTY_TYPES = [
//   'Shop', 'Office Space', 'Godown', 'Farm House', 'Resort',
//   'Plot', 'Flat', 'Row House', 'Bungalow',
//   'Agriculture Land', 'Non Agriculture/Developed Land'
// ];

// const HomeSearch = () => {
//   const router = useRouter();
//   const [searchType, setSearchType] = useState("buy");
//   const [location, setLocation] = useState("");
//   const [propertyType, setPropertyType] = useState("all");
//   const [bhk, setBhk] = useState("all");
//   const [priceRange, setPriceRange] = useState([0, 10000000]);

//   const handleSearch = () => {
//     const params = new URLSearchParams();

//     if (location) params.append("search", location);
//     if (propertyType !== "all") params.append("type", propertyType);
//     if (bhk !== "all") params.append("bhk", bhk);
//     params.append("listingType", searchType);

//     router.push(`/properties?${params.toString()}`);
//   };

//   return (
//     <div className="bg-background/95 backdrop-blur-sm p-6 rounded-lg shadow-2xl border border-border max-w-4xl mx-auto">
//       {/* Tabs for Buy/Rent/Post */}
//       <Tabs value={searchType} onValueChange={setSearchType} className="mb-6">
//         <TabsList className="grid w-full grid-cols-3">
//           <TabsTrigger value="buy">Buy</TabsTrigger>
//           <TabsTrigger value="rent">Rent</TabsTrigger>
//           <TabsTrigger value="post">Post Property</TabsTrigger>
//         </TabsList>
//       </Tabs>

//       {searchType === "post" ? (
//         <div className="text-center py-8">
//           <h3 className="text-2xl font-bold mb-4">List Your Property</h3>
//           <p className="text-muted-foreground mb-6">
//             Connect with thousands of potential buyers and renters
//           </p>
//           <Button size="lg" onClick={() => router.push("/properties")}>
//             Post Your Property
//           </Button>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           <div className="grid md:grid-cols-2 gap-4">
//             {/* Location Search */}
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Enter location, city..."
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 className="pl-10"
//               />
//             </div>

//             {/* Property Type */}
//             <Select value={propertyType} onValueChange={setPropertyType}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Property Type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Types</SelectItem>
//                 {PROPERTY_TYPES.map(type => (
//                   <SelectItem key={type} value={type}>{type}</SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="grid md:grid-cols-2 gap-4">
//             {/* BHK */}
//             <Select value={bhk} onValueChange={setBhk}>
//               <SelectTrigger>
//                 <SelectValue placeholder="BHK" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">Any BHK</SelectItem>
//                 <SelectItem value="1">1 BHK</SelectItem>
//                 <SelectItem value="2">2 BHK</SelectItem>
//                 <SelectItem value="3">3 BHK</SelectItem>
//                 <SelectItem value="4+">4+ BHK</SelectItem>
//               </SelectContent>
//             </Select>

//             {/* Budget Range */}
//             <div className="flex items-center gap-2">
//               <span className="text-sm text-muted-foreground whitespace-nowrap">
//                 ₹{(priceRange[0] / 100000).toFixed(0)}L - ₹{(priceRange[1] / 100000).toFixed(0)}L
//               </span>
//             </div>
//           </div>

//           {/* Price Slider */}
//           <div>
//             <Slider
//               value={priceRange}
//               onValueChange={setPriceRange}
//               max={10000000}
//               step={100000}
//               className="mb-2"
//             />
//           </div>

//           {/* Search Button */}
//           <Button onClick={handleSearch} className="w-full h-12 text-base" size="lg">
//             <Search className="mr-2 h-5 w-5" />
//             Search Properties
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HomeSearch;


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Building2, Wallet, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const PROPERTY_TYPES = [
  'Flat', 'Bungalow', 'Row House', 'Plot',
  'Commercial Office', 'Shop', 'Godown',
  'Farm House', 'Resort', 'Agricultural Land'
];

const HomeSearch = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("buy");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [bhk, setBhk] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 50000000]); // 0 to 5 Cr

  const handleSearch = () => {
    if (activeTab === "post") {
      router.push("/properties/post");
      return;
    }

    const params = new URLSearchParams();
    if (location) params.append("search", location);
    if (propertyType !== "all") params.append("type", propertyType);
    if (bhk !== "all") params.append("bhk", bhk);
    if (activeTab) params.append("listingType", activeTab);

    // Add price range only if modified from default
    if (priceRange[1] !== 50000000) {
      params.append("minPrice", priceRange[0].toString());
      params.append("maxPrice", priceRange[1].toString());
    }

    router.push(`/properties?${params.toString()}`);
  };

  const formatPrice = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(0)}L`;
    return `₹${value}`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto relative z-10">
      {/* Search Card */}
      <div className="bg-background/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 overflow-hidden ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-500">

        {/* Tabs Header */}
        <div className="bg-muted/30 border-b px-6 pt-6 pb-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full md:w-[300px] grid-cols-2 h-12 bg-background/50 p-1 rounded-full border shadow-sm">
              <TabsTrigger
                value="buy"
                className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
              >
                Buy
              </TabsTrigger>
              <TabsTrigger
                value="rent"
                className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
              >
                Rent
              </TabsTrigger>
              {/* <TabsTrigger
                value="post"
                className="rounded-full data-[state=active]:bg-amber-500 data-[state=active]:text-white transition-all duration-300"
              >
                Post Property
              </TabsTrigger> */}
            </TabsList>
          </Tabs>
        </div>

        {/* Content Area */}
        <div className="p-6 md:p-8 space-y-8">
          {activeTab === "post" ? (
            <div className="text-center py-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2">List Your Property for Free</h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Connect with over 10,000+ verified buyers and tenants. Get instant leads and close deals faster.
              </p>
              <Button
                size="lg"
                onClick={() => router.push("/properties/post")}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-full px-8 h-12 shadow-lg hover:shadow-xl transition-all"
              >
                Post Your Property Now <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-4">
                {/* Location Input */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  </div>
                  <Input
                    placeholder="Enter city, locality or project..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-11 h-14 text-lg bg-muted/20 border-border/60 focus:bg-background focus:border-primary/50 transition-all rounded-xl shadow-sm"
                  />
                </div>

                {/* Property Type */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    <Building2 className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger className="pl-11 h-14 text-base bg-muted/20 border-border/60 focus:bg-background focus:border-primary/50 transition-all rounded-xl shadow-sm">
                      <SelectValue placeholder="Property Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Properties</SelectItem>
                      {PROPERTY_TYPES.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Filters Row */}
                <div className="grid grid-cols-[1fr_2fr] gap-4">
                  <Select value={bhk} onValueChange={setBhk}>
                    <SelectTrigger className="h-12 bg-muted/20 border-border/60 rounded-xl">
                      <SelectValue placeholder="BHK" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any BHK</SelectItem>
                      {[1, 2, 3, 4, 5].map(n => <SelectItem key={n} value={String(n)}>{n} BHK</SelectItem>)}
                    </SelectContent>
                  </Select>

                  <div className="bg-muted/20 border border-border/60 rounded-xl px-4 h-12 flex items-center gap-3">
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-foreground">
                        {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Slider */}
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={50000000}
                    step={500000}
                    className="py-2"
                  />
                  <div className="flex justify-between mt-1.5 px-1">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Min Budget</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Max Budget</span>
                  </div>
                </div>
              </div>

              {/* Big Search Button */}
              <Button
                onClick={handleSearch}
                className="w-full h-14 text-lg font-semibold rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all mt-2 group"
              >
                <Search className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Search Properties
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeSearch;

