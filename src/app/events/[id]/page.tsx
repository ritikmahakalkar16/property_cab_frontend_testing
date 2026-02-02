// "use client";

// import { useSearchParams, notFound } from "next/navigation";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import Image from "next/image";
// import { Calendar, Clock, MapPin, Users } from "lucide-react";

// export default function EventDetailsPage() {
//     const searchParams = useSearchParams();
//     const data = searchParams.get("data");

//     if (!data) return notFound();

//     const event = JSON.parse(decodeURIComponent(data));

//     return (
//         <div className="min-h-screen flex flex-col">
//             <Header />

//             <section className="pt-24 pb-16 container mx-auto px-4">
//                 <h1 className="text-4xl font-bold mb-4">{event.title}</h1>

//                 <div className="flex flex-wrap gap-6 text-muted-foreground mb-6">
//                     <div className="flex items-center gap-2">
//                         <Calendar className="h-4 w-4" /> {event.date}
//                     </div>
//                     <div className="flex items-center gap-2">
//                         <Clock className="h-4 w-4" /> {event.time}
//                     </div>
//                     <div className="flex items-center gap-2">
//                         <MapPin className="h-4 w-4" /> {event.venue}
//                     </div>
//                     <div className="flex items-center gap-2">
//                         <Users className="h-4 w-4" /> {event.attendees}+ Attendees
//                     </div>
//                 </div>

//                 <p className="max-w-4xl mb-12 leading-relaxed">
//                     {event.fullDescription}
//                 </p>

//                 <h2 className="text-2xl font-semibold mb-6">Event Gallery</h2>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                     {event.gallery.slice(0, 10).map((img: string, idx: number) => (
//                         <div key={idx} className="relative h-64 rounded-xl overflow-hidden">
//                             <Image
//                                 src={img}
//                                 alt={`Event image ${idx + 1}`}
//                                 fill
//                                 className="object-cover"
//                                 unoptimized
//                             />
//                         </div>
//                     ))}
//                 </div>
//             </section>

//             <Footer />
//         </div>
//     );
// }




// "use client";

// import { useSearchParams, notFound } from "next/navigation";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import Image from "next/image";
// import { Calendar, Clock, MapPin, Users } from "lucide-react";

// export default function EventDetailsPage() {
//     const searchParams = useSearchParams();
//     const data = searchParams.get("data");

//     if (!data) return notFound();

//     const event = JSON.parse(decodeURIComponent(data));

//     return (
//         <div className="min-h-screen flex flex-col bg-background selection:bg-primary/10">
//             <Header />

//             <main className="flex-1">
//                 {/* Hero Section */}
//                 <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
//                     <div className="absolute inset-0">
//                         {event.image && event.image.length > 0 ? (
//                             <Image
//                                 src={event.image || "/placeholder-event.jpg"}
//                                 alt={event.title}
//                                 fill
//                                 className="object-cover brightness-50 duration-700 animate-scale-in"
//                                 priority
//                                 unoptimized
//                             />
//                         ) : (
//                             <div className="w-full h-full bg-slate-900" />
//                         )}
//                         <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
//                     </div>

//                     <div className="container relative mx-auto h-full px-4 flex flex-col justify-end pb-16">
//                         <div className="max-w-4xl space-y-6 animate-fade-up">
//                             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 backdrop-blur-md text-sm font-medium mb-2">
//                                 <Calendar className="w-4 h-4" />
//                                 {event.isPast ? <span>Passed Event</span> : <span>Upcoming Event</span>}


//                             </div>
//                             <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-blue-1000 tracking-tight leading-tight">
//                                 {event.title}
//                             </h1>
//                             <div className="flex flex-wrap items-center gap-6 text-blue/80 text-lg">
//                                 <div className="flex items-center gap-2">
//                                     <MapPin className="h-5 w-5 text-primary" />
//                                     <span>{event.venue}</span>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                     <Clock className="h-5 w-5 text-primary" />
//                                     <span>{event.time}</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 <div className="container mx-auto px-4 py-16 -mt-10 relative z-10">
//                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
//                         {/* Main Content */}
//                         <div className="lg:col-span-2 h-full">
//                             {/* Featured Gallery Image (Big Image) */}
//                             {event.gallery.length > 0 && (
//                                 <div className="relative w-full h-full min-h-[400px] rounded-xl overflow-hidden shadow-sm animate-fade-up" style={{ animationDelay: "0.3s" }}>
//                                     <Image
//                                         src={event.gallery[0]}
//                                         alt="Event featured image"
//                                         fill
//                                         className="object-cover hover:scale-105 transition-transform duration-700"
//                                         unoptimized
//                                     />
//                                 </div>
//                             )}
//                         </div>

//                         {/* Sidebar */}
//                         <div className="lg:col-span-1">
//                             {/* Removed sticky top-24 */}
//                             <div className="space-y-6 animate-slide-in-right" style={{ animationDelay: "0.3s" }}>
//                                 <div className="p-6 rounded-2xl border bg-card/50 backdrop-blur-sm shadow-sm space-y-6">
//                                     <h3 className="font-semibold text-xl">Event Details</h3>

//                                     <div className="space-y-4">
//                                         <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
//                                             <div className="p-2 rounded-md bg-primary/10 text-primary">
//                                                 <Calendar className="h-5 w-5" />
//                                             </div>
//                                             <div>
//                                                 <p className="text-sm font-medium text-muted-foreground">Date</p>
//                                                 <p className="font-medium">{event.date}</p>
//                                             </div>
//                                         </div>

//                                         <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
//                                             <div className="p-2 rounded-md bg-primary/10 text-primary">
//                                                 <Clock className="h-5 w-5" />
//                                             </div>
//                                             <div>
//                                                 <p className="text-sm font-medium text-muted-foreground">Time</p>
//                                                 <p className="font-medium">{event.time}</p>
//                                             </div>
//                                         </div>

//                                         <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
//                                             <div className="p-2 rounded-md bg-primary/10 text-primary">
//                                                 <MapPin className="h-5 w-5" />
//                                             </div>
//                                             <div>
//                                                 <p className="text-sm font-medium text-muted-foreground">Location</p>
//                                                 <p className="font-medium">{event.venue}</p>
//                                             </div>
//                                         </div>

//                                         <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
//                                             <div className="p-2 rounded-md bg-primary/10 text-primary">
//                                                 <Users className="h-5 w-5" />
//                                             </div>
//                                             <div>
//                                                 <p className="text-sm font-medium text-muted-foreground">Attendees</p>
//                                                 <p className="font-medium">{event.attendees}+ Registered</p>
//                                             </div>
//                                         </div>
//                                     </div>

//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Description - Moved here */}

//                     <div className="mt-12 max-w-4xl ">
//                         <div className="prose prose-lg dark:prose-invert max-w-none animate-fade-up" style={{ animationDelay: "0.2s" }}>
//                             <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
//                                 About the Event
//                             </h3>
//                             <p className="leading-relaxed text-muted-foreground whitespace-pre-line">
//                                 {event.fullDescription}
//                             </p>
//                         </div>
//                     </div>

//                     {/* Gallery - Moved below sidebar */}
//                     <div className="mt-16 space-y-8 animate-fade-up" style={{ animationDelay: "0.4s" }}>
//                         <h3 className="text-2xl font-semibold flex items-center gap-2">
//                             Event Gallery
//                             <span className="text-sm font-normal text-muted-foreground ml-2">
//                                 ({event.gallery.length} photos)
//                             </span>
//                         </h3>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                             {event.gallery.slice(1).map((img: string, idx: number) => (
//                                 <div
//                                     key={idx}
//                                     className="relative rounded-xl overflow-hidden group cursor-pointer aspect-[4/3]"
//                                 >
//                                     <Image
//                                         src={img}
//                                         alt={`Gallery image ${idx + 2}`}
//                                         fill
//                                         className="object-cover transition-transform duration-500 group-hover:scale-110"
//                                         sizes="(max-width: 768px) 100vw, 33vw"
//                                         unoptimized
//                                     />
//                                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </main >

//             <Footer />
//         </div >
//     );
// }



"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { formatDate } from "@/lib/formateDate";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function EventDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<any>(null);
    const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);


    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await fetch(`${API_URL}/api/v1/events/${id}`);
                if (!res.ok) return notFound();
                const data = await res.json();
                setEvent(data.data);
            } catch {
                notFound();
            }
        };

        fetchEvent();
    }, [id]);

    if (!event) return <div className="py-40 text-center">Loading event...</div>;

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
                    <div className="absolute inset-0">
                        {event.image && event.image.length > 0 ? (
                            <Image
                                src={`${API_URL}${event.image}`}
                                alt={event.title}
                                fill
                                className="object-cover brightness-50 duration-700 animate-scale-in"
                                priority
                                unoptimized
                            />
                        ) : (
                            <div className="w-full h-full bg-slate-900" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                    </div>

                    <div className="container relative mx-auto h-full px-4 flex flex-col justify-end pb-16">
                        <div className="max-w-4xl space-y-6 animate-fade-up">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 backdrop-blur-md text-sm font-medium mb-2">
                                <Calendar className="w-4 h-4" />
                                {event.isPast ? <span>Passed Event</span> : <span>Upcoming Event</span>}


                            </div>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-blue-1000 tracking-tight leading-tight">
                                {event.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-blue/80 text-lg">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-primary" />
                                    <span>{event.venue}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-primary" />
                                    <span>{event.time}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container mx-auto px-4 py-16 -mt-10 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 h-full">
                            {/* Featured Gallery Image (Big Image) */}
                            {event.gallery.length > 0 && (
                                <div className="relative w-full h-full min-h-[400px] rounded-xl overflow-hidden shadow-sm animate-fade-up" style={{ animationDelay: "0.3s" }}>
                                    <Image
                                        src={`${API_URL}${event.gallery[0]}`}
                                        alt="Event featured image"
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-700"
                                        unoptimized
                                    />
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            {/* Removed sticky top-24 */}
                            <div className="space-y-6 animate-slide-in-right" style={{ animationDelay: "0.3s" }}>
                                <div className="p-6 rounded-2xl border bg-card/50 backdrop-blur-sm shadow-sm space-y-6">
                                    <h3 className="font-semibold text-xl">Event Details</h3>

                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                                            <div className="p-2 rounded-md bg-primary/10 text-primary">
                                                <Calendar className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Date</p>
                                                <p className="font-medium">{formatDate(event.date)}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                                            <div className="p-2 rounded-md bg-primary/10 text-primary">
                                                <Clock className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Time</p>
                                                <p className="font-medium">{event.time}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                                            <div className="p-2 rounded-md bg-primary/10 text-primary">
                                                <MapPin className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Location</p>
                                                <p className="font-medium">{event.venue}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                                            <div className="p-2 rounded-md bg-primary/10 text-primary">
                                                <Users className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Attendees</p>
                                                <p className="font-medium">{event.attendees}+ {event.isPast ? "Attends" : "Registered"}</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description - Moved here */}

                    <div className="mt-12 max-w-4xl ">
                        <div className="prose prose-lg dark:prose-invert max-w-none animate-fade-up" style={{ animationDelay: "0.2s" }}>
                            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                                About the Event
                            </h3>
                            <p className="leading-relaxed text-muted-foreground whitespace-pre-line">
                                {event.fullDescription}
                            </p>
                        </div>
                    </div>

                    {/* Gallery - Moved below sidebar */}
                    <div className="mt-16 space-y-8 animate-fade-up" style={{ animationDelay: "0.4s" }}>
                        <h3 className="text-2xl font-semibold flex items-center gap-2">
                            Event Gallery
                            <span className="text-sm font-normal text-muted-foreground ml-2">
                                ({event.gallery.length} photos)
                            </span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {event.gallery.slice(1).map((img: string, idx: number) => (
                                <div
                                    key={idx}
                                    className="relative w-full aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer"
                                    onClick={() => setSelectedGalleryImage(`${API_URL}${img}`)}>
                                    <Image
                                        src={`${API_URL}${img}`}
                                        alt={`${API_URL}${img}`}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main >
            {selectedGalleryImage && (
                <div
                    className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center px-4"
                    onClick={() => setSelectedGalleryImage(null)}
                >
                    <button
                        className="absolute top-6 right-6 text-white text-3xl font-bold"
                        onClick={() => setSelectedGalleryImage(null)}
                    >
                        ✕
                    </button>

                    <div
                        className="relative w-full max-w-6xl aspect-[16/9]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={selectedGalleryImage}
                            alt="Gallery full view"
                            fill
                            className="object-contain"
                            unoptimized
                            priority
                        />
                    </div>
                </div>
            )}



            <Footer />
        </div>
    );
}
