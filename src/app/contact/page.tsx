import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | PropertyCab - Get in Touch",
  description: "Contact PropertyCab.in for all your real estate needs. Whether you're buying, selling, or renting, our team is here to assist you.",
  keywords: ["Contact PropertyCab", "Real Estate Support", "Property Enquiry", "Real Estate Agent Contact", "Buy Property Help", "Sell Property Help"],
  openGraph: {
    title: "Contact Us | PropertyCab - Get in Touch",
    description: "Have questions about buying, selling, or renting? Contact PropertyCab.in today. We're here to help you every step of the way.",
    url: "https://propertycab.in/contact",
    siteName: "PropertyCab",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | PropertyCab",
    description: "Get in touch with PropertyCab for expert real estate assistance.",
  },
  alternates: {
    canonical: "/contact",
  }
};

export default function ContactPage() {
  return <ContactClient />;
}
