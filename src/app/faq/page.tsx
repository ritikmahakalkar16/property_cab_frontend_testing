"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { HelpCircle, MessageCircle, ArrowRight } from "lucide-react";

const FAQ = () => {
    const faqs = [
        {
            question: "How do I search for properties on Propertycab.in?",
            answer: "You can search for properties using our search bar on the homepage. Enter your preferred location, select whether you want to buy or rent, and apply filters like BHK, price range, and property type to find properties that match your requirements."
        },
        {
            question: "Are all properties on your platform verified?",
            answer: "Yes, we verify all properties before listing them on our platform. Our team conducts thorough checks to ensure the authenticity of the property details, ownership documents, and contact information provided by the sellers and landlords."
        },
        {
            question: "How can I post my property for sale or rent?",
            answer: "To post your property, click on the 'Post Property' button in the navigation menu. You'll need to create an account, fill in the property details, upload photos, and submit the listing. Our team will verify the information and publish your listing within 24-48 hours."
        },
        {
            question: "Is there any charge for posting a property?",
            answer: "Basic property listings are completely free on Propertycab.in. However, we offer premium listing options with additional features like priority placement, featured listing badges, and enhanced visibility for a nominal fee."
        },
        {
            question: "Can I schedule property visits?",
            answer: "Yes, once you find a property you're interested in, you can contact the seller or landlord directly through our platform to schedule a visit. We recommend visiting the property in person before making any decisions."
        },
        {
            question: "How do I contact property owners?",
            answer: "After registering on our platform, you can view the contact details of property owners. You can call them directly or send them a message through our platform to express your interest and arrange further discussions."
        },
        {
            question: "Do you provide home loan assistance?",
            answer: "Yes, we partner with leading financial institutions to help you secure home loans at competitive interest rates. Contact our support team for more information about home loan options and assistance."
        },
        {
            question: "What should I check before buying a property?",
            answer: "Before buying, verify the property documents, check for clear title ownership, conduct a physical inspection, assess the locality and amenities, verify approval plans and building permissions, and consult with legal experts if needed. Our team can guide you through this process."
        },
        {
            question: "Can I get property valuation services?",
            answer: "Yes, we offer professional property valuation services. Our experts analyze market trends, comparable properties, and various factors to provide an accurate valuation of your property. Contact us to request a valuation."
        },
        {
            question: "How do I report a suspicious listing?",
            answer: "If you come across a suspicious or fraudulent listing, please report it immediately by clicking the 'Report' button on the property page or contact our support team at support@propertycab.in. We take such reports seriously and investigate them promptly."
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            {/* Hero Section - Clean & Separated */}
            <div className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-background border-b border-border/40">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))]" />
                    <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
                    {/* Decorative elements */}
                    <div className="absolute top-1/3 left-10 w-20 h-20 bg-white/10 rounded-full blur-[40px] animate-pulse" />
                    <div className="absolute bottom-1/4 right-20 w-40 h-40 bg-[hsl(var(--accent))]/20 rounded-full blur-[60px]" />
                </div>

                <div className="container relative z-10 mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-white/90 text-sm font-medium mb-6 animate-fade-in">
                        <HelpCircle className="w-4 h-4 text-[hsl(var(--accent))]" />
                        <span>Help & Support</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in">
                        Frequently Asked Questions
                    </h1>

                    <p className="text-xl text-white/80 max-w-2xl mx-auto animate-fade-in">
                        Everything you need to know about navigating Propertycab.in via our help center.
                    </p>
                </div>
            </div>

            {/* Main Content - Full Width Grid */}
            <main className="container mx-auto px-4 py-12 md:py-20 max-w-7xl">
                <div className="grid md:grid-cols-2 gap-6 items-start">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-card hover:bg-secondary/20 border border-border/50 rounded-2xl p-1 transition-all duration-300 hover:shadow-md animate-fade-up"
                            style={{ animationDelay: `${0.1 + (index * 0.05)}s` }}
                        >
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem
                                    value={`item-${index}`}
                                    className="border-none px-4"
                                >
                                    <AccordionTrigger className="text-left py-5 hover:no-underline gap-4 [&[data-state=open]>div]:text-primary">
                                        <div className="font-semibold text-lg leading-snug text-foreground transition-colors">
                                            {faq.question}
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground pb-5 leading-relaxed text-base pt-0">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    ))}
                </div>

                {/* Support CTA - Full Width Strip */}
                <div className="mt-20 relative overflow-hidden rounded-3xl bg-[hsl(var(--primary))] text-primary-foreground p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl animate-fade-up" style={{ animationDelay: "0.4s" }}>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
                    <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl opacity-50" />

                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Still can't find the answer?</h2>
                        <p className="text-primary-foreground/80 text-lg">
                            Our support team is just a click away to assist you with any inquiries.
                        </p>
                    </div>

                    <div className="relative z-10">
                        <Link
                            href="/contact"
                            className="inline-flex items-center bg-white text-[hsl(var(--primary))] hover:bg-gray-100 px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 group"
                        >
                            <MessageCircle className="w-5 h-5 mr-2" />
                            Contact Support
                            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default FAQ;
