import { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Our Services | PropertyCab - Real Estate Solutions",
  description: "Explore our comprehensive real estate services including property buying, selling, renting, valuation, and investment consultation.",
  keywords: ["real estate services", "property buying", "property selling", "rental services", "property valuation", "real estate consultation", "commercial property"],
  openGraph: {
    title: "Our Services | PropertyCab - Real Estate Solutions",
    description: "Comprehensive real estate solutions tailored to your needs. From buying and selling to valuation and consultation.",
    url: "https://propertycab.in/services",
    siteName: "PropertyCab",
    images: [
      {
        url: "https://propertycab.in/og-image-services.jpg", // Replace with actual image URL if available
        width: 1200,
        height: 630,
        alt: "PropertyCab Services",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Services | PropertyCab",
    description: "Comprehensive real estate solutions tailored to your needs.",
  },
  alternates: {
    canonical: "/services",
  }
};

export default function ServicesPage() {
  return <ServicesClient />;
}