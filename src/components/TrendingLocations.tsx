import Link from "next/link";
import React from "react";
import Image from "next/image";

import mumbaiImg from "@/assets/locations/mumbai.jpg";
import bangaloreImg from "@/assets/locations/bangalore.jpg";
import puneImg from "@/assets/locations/pune.jpg";
import delhiImg from "@/assets/locations/delhi.jpg";

const TrendingLocations = () => {
  const trendingLocations = [
    {
      name: "Mumbai",
      properties: 450,
      growth: "+12%",
      image: mumbaiImg,
      description: "Financial Capital",
    },
    {
      name: "Bangalore",
      properties: 380,
      growth: "+18%",
      image: bangaloreImg,
      description: "Silicon Valley of India",
    },
    {
      name: "Pune",
      properties: 290,
      growth: "+15%",
      image: puneImg,
      description: "Oxford of the East",
    },
    {
      name: "Delhi NCR",
      properties: 520,
      growth: "+10%",
      image: delhiImg,
      description: "National Capital Region",
    },
  ];
  return (
    <section className="py-0 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">
            Trending Locations
          </h2>
          <p className="text-gray-500">
            Discover the most sought-after property markets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingLocations.map((location, index) => (
            <Link
              key={index}
              href={`/properties?city=${encodeURIComponent(location.name)}`}
            >
              <div className="group relative h-64 rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all">
                <Image
                  src={location.image}
                  alt={location.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">{location.name}</h3>
                  <p className="text-sm text-white/80">
                    {location.properties} Properties
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingLocations;
