"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    Home,
    KeyRound,
    Handshake,
    Building2,
    BarChart3,
    Calculator,
    CheckCircle2,
    ArrowRight,
    Sparkles
} from "lucide-react";

const ServicesClient = () => {
    const services = [
        {
            icon: Home,
            iconColor: "text-blue-600 dark:text-blue-400",
            bgGradient: "bg-blue-500/10",
            title: "Property Buying",
            description:
                "Discover your dream home from our handpicked, fully verified listings with seamless end-to-end guidance.",
            features: [
                "Fully verified properties",
                "Expert legal & documentation support",
                "Home loan & financing assistance",
                "Personalized property matching",
            ],
        },
        {
            icon: KeyRound,
            iconColor: "text-emerald-600 dark:text-emerald-400",
            bgGradient: "bg-emerald-500/10",
            title: "Property Renting",
            description:
                "Find the perfect rental that fits your lifestyle — trusted owners, clear terms, hassle-free move-in.",
            features: [
                "100% verified landlords & properties",
                "Interactive 360° virtual tours",
                "Customizable & flexible leases",
                "Priority move-in coordination",
            ],
        },
        {
            icon: Handshake,
            iconColor: "text-amber-600 dark:text-amber-400",
            bgGradient: "bg-amber-500/10",
            title: "Property Selling",
            description:
                "Maximize your property value with premium marketing, professional visuals, and expert pricing strategy.",
            features: [
                "Free premium listing & exposure",
                "Professional photography & drone footage",
                "Targeted buyer marketing campaigns",
                "Data-driven price optimization",
            ],
        },
        {
            icon: Calculator,
            iconColor: "text-purple-600 dark:text-purple-400",
            bgGradient: "bg-purple-500/10",
            title: "Property Valuation",
            description:
                "Receive precise, market-backed valuations with detailed reports and personalized expert consultation.",
            features: [
                "Current market trends analysis",
                "Comparable sales benchmarking",
                "One-on-one valuation session",
                "Comprehensive digital report",
            ],
        },
        {
            icon: Building2,
            iconColor: "text-cyan-600 dark:text-cyan-400",
            bgGradient: "bg-cyan-500/10",
            title: "Commercial Properties",
            description:
                "Premium commercial spaces in strategic locations — offices, retail, warehouses tailored to your business.",
            features: [
                "High-visibility prime locations",
                "Flexible & scalable layouts",
                "Business relocation support",
                "Commercial transaction guidance",
            ],
        },
        {
            icon: BarChart3,
            iconColor: "text-rose-600 dark:text-rose-400",
            bgGradient: "bg-rose-500/10",
            title: "Consultation Services",
            description:
                "Strategic guidance on investments, legal aspects, market timing, and long-term real estate planning.",
            features: [
                "Tailored investment roadmaps",
                "In-depth legal & compliance advice",
                "Real-time market intelligence",
                "Ongoing portfolio optimization",
            ],
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))]" />
                        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
                        {/* Decorative elements */}
                        <div className="absolute top-1/4 left-10 w-64 h-64 bg-[hsl(var(--accent))]/10 rounded-full blur-[80px]" />
                        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[hsl(var(--primary))]/20 rounded-full blur-[100px]" />
                    </div>

                    <div className="container relative z-10 mx-auto px-4 max-w-6xl text-center">
                        <div className="inline-block mb-6 animate-fade-in opacity-0" style={{ animationDelay: "0.1s" }}>
                            <span className="px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-white/90 text-sm font-medium backdrop-blur-sm flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-[hsl(var(--accent))]" />
                                World-Class Solutions
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in opacity-0" style={{ animationDelay: "0.2s" }}>
                            Comprehensive <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--accent))] to-amber-300">
                                Real Estate Services
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 animate-fade-in opacity-0" style={{ animationDelay: "0.3s" }}>
                            Tailored solutions for every stage of your property journey. From browsing to buying, and everything in between.
                        </p>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="relative -mt-20 pb-24 px-4 z-30">
                    <div className="container mx-auto max-w-7xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, index) => {
                                const Icon = service.icon;
                                return (
                                    <div
                                        key={index}
                                        className="animate-fade-up opacity-0"
                                        style={{ animationDelay: `${0.2 + (index * 0.1)}s` }}
                                    >
                                        <div className="group relative h-full bg-card border border-border/50 rounded-3xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-[hsl(var(--accent))/30] z-20 overflow-hidden">

                                            {/* Icon */}
                                            <div className={`w-16 h-16 rounded-2xl ${service.bgGradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                                <Icon className={`w-8 h-8 ${service.iconColor}`} />
                                            </div>

                                            <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-[hsl(var(--primary))] transition-colors">
                                                {service.title}
                                            </h3>

                                            <p className="text-muted-foreground mb-8 leading-relaxed">
                                                {service.description}
                                            </p>

                                            <ul className="space-y-3 mt-auto">
                                                {service.features.map((feature, idx) => (
                                                    <li key={idx} className="flex items-start gap-3 text-sm text-foreground/80">
                                                        <CheckCircle2 className="w-5 h-5 text-[hsl(var(--success))] flex-shrink-0 mt-0.5" />
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Hover Overlay Gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))/5] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none" />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-secondary/30 border-t border-border">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="relative overflow-hidden rounded-3xl bg-[hsl(var(--primary))] px-6 py-16 md:px-16 text-center shadow-2xl">
                            {/* Background pattern */}
                            <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[hsl(var(--accent))]/20 rounded-full blur-3xl" />

                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                                    Ready to Get Started?
                                </h2>
                                <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10">
                                    Contact us today to learn more about our services and how we can help you with your property needs.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link href="/contact">
                                        <Button size="lg" className="w-full sm:w-auto bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-hover))] text-white font-semibold h-12 px-8 text-base shadow-lg hover:shadow-xl transition-all hover:scale-105">
                                            Contact Us Now
                                            <ArrowRight className="ml-2 w-5 h-5" />
                                        </Button>
                                    </Link>
                                    <Link href="/about">
                                        <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-white/30 text-white hover:bg-white/10 h-12 px-8 text-base">
                                            Learn More About Us
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
};

export default ServicesClient;
