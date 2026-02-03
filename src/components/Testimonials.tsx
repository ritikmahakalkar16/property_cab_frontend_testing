// import { Star } from "lucide-react";
// import React from "react";

// const Testimonials = () => {

//   const testimonials = [
//     {
//       name: "Rajesh Sharma",
//       role: "Home Buyer",
//       content:
//         "PropertyCab made finding my dream home incredibly easy. The verified listings saved us so much time and the agent support was exceptional.",
//       rating: 5,
//       avatar: "RS",
//     },
//     {
//       name: "Priya Mehta",
//       role: "Property Investor",
//       content:
//         "I've invested in 3 properties through PropertyCab. Their market insights and professional guidance have been invaluable for my portfolio.",
//       rating: 5,
//       avatar: "PM",
//     },
//     {
//       name: "Amit Patel",
//       role: "First-time Buyer",
//       content:
//         "As a first-time buyer, I was nervous about the process. The team at PropertyCab walked me through every step with patience and expertise.",
//       rating: 5,
//       avatar: "AP",
//     },
//   ];

//   return (
//     <section className="py-16 bg-gray-900 text-white">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
//             What Our Clients Say
//           </h2>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {testimonials.map((testimonial, index) => (
//             <div
//               key={index}
//               className="bg-gray-800 p-8 rounded-xl border border-gray-700"
//             >
//               <div className="flex gap-1 mb-4">
//                 {[...Array(testimonial.rating)].map((_, i) => (
//                   <Star key={i} className="h-4 w-4 fill-accent text-accent" />
//                 ))}
//               </div>
//               <p className="text-gray-300 mb-6 italic">
//                 "{testimonial.content}"
//               </p>
//               <div className="flex items-center gap-4">
//                 <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bold">
//                   {testimonial.avatar}
//                 </div>
//                 <div>
//                   <h4 className="font-semibold">{testimonial.name}</h4>
//                   <p className="text-xs text-gray-400">{testimonial.role}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Testimonials;

"use client";

import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/v1/testimonials/featured`
        );

        if (!res.ok) return;

        const data = await res.json();
        setTestimonials(data.data || []);
      } catch (error) {
        console.error("Failed to fetch testimonials", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-900 text-white text-center">
        Loading testimonials...
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial._id}
              className="bg-gray-800 p-8 rounded-xl border border-gray-700"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-accent text-accent"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-300 mb-6 italic">
                "{testimonial.content}"
              </p>

              {/* User */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

