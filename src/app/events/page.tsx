import { Metadata } from "next";
import EventsClient, { Event } from "./EventsClient";

async function getEvents() {
    try {
        const [upRes, pastRes] = await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/v1/events/upcoming`, { cache: "no-store" }),
            fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/v1/events/past`, { cache: "no-store" })
        ]);

        const upData = await upRes.json();
        const pastData = await pastRes.json();

        return {
            upcoming: upData.data || [],
            past: pastData.data || []
        };
    } catch (error) {
        console.error("Failed to fetch events", error);
        return { upcoming: [], past: [] };
    }
}

export const metadata: Metadata = {
    title: "Real Estate Events & Expos | PropertyCab",
    description: "Join PropertyCab's exclusive real estate events, property expos, exhibitions, and customer meets. Discover new projects and expert insights.",
    keywords: ["real estate events", "property expo", "customer meet", "property exhibition", "real estate seminar", "home buying events"],
    openGraph: {
        title: "Real Estate Events & Expos | PropertyCab",
        description: "Attend premier real estate events and property expos. Connect with developers and find your dream home.",
        url: "https://propertycab.in/events",
        siteName: "PropertyCab",
        images: [
            {
                url: "https://propertycab.in/og-image-events.jpg",
                width: 1200,
                height: 630,
                alt: "PropertyCab Events",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Upcoming Real Estate Events | PropertyCab",
        description: "Don't miss out on the latest property expos and meets.",
    },
    alternates: {
        canonical: "/events",
    }
};

export default async function EventsPage() {
    const { upcoming, past } = await getEvents();

    return <EventsClient initialUpcomingEvents={upcoming} initialPastEvents={past} />;
}

// Force dynamic rendering since we are fetching from an API
export const dynamic = "force-dynamic";
