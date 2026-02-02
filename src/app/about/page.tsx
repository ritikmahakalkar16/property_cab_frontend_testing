
import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
    Building2,
    Target,
    Shield,
    Search,
    BarChart,
    MapPin,
    Mail,
    Phone,
    CheckCircle2,
    TrendingUp,
    Users
} from "lucide-react";

export const metadata: Metadata = {
    title: "About Us | PropertyCab - Redefining Real Estate in India",
    description: "Discover PropertyCab.in's mission to maximize real estate opportunities in India. We connect buyers, sellers, and renters with verified listings, transparent pricing, and expert support.",
    keywords: ["About PropertyCab", "Real Estate India", "Property Search", "Real Estate Platform", "Buy Home", "Rent Property", "Property Management"],
    openGraph: {
        title: "About Us | PropertyCab - Redefining Real Estate in India",
        description: "Discover PropertyCab.in's mission to maximize real estate opportunities in India. We connect buyers, sellers, and renters with verified listings.",
        url: "https://propertycab.in/about",
        siteName: "PropertyCab",
        locale: "en_IN",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "About Us | PropertyCab",
        description: "Redefining Real Estate Integration in India. Verified listings, transparent pricing, and expert support.",
    },
    alternates: {
        canonical: "/about",
    }
};

export default function About() {
    const stats = [
        { label: "Active Listings", value: "5000+", icon: Building2 },
        { label: "Happy Customers", value: "2000+", icon: Users },
        { label: "Cities Covered", value: "15+", icon: MapPin },
    ];

    const features = [
        {
            title: "Verified Listings",
            description: "Every property on our platform is verified for authenticity to ensure a safe transaction.",
            icon: Shield,
        },
        {
            title: "Wide Range",
            description: "From budget apartments to luxury villas, we curate properties for every need.",
            icon: Building2,
        },
        {
            title: "Expert Support",
            description: "Our team of real estate experts is available to guide you through every step.",
            icon: Users,
        },
        {
            title: "Easy Search",
            description: "Advanced filters and map-based search to help you find exactly what you need.",
            icon: Search,
        },
        {
            title: "Transparent Pricing",
            description: "No hidden charges. We believe in complete transparency with all costs upfront.",
            icon: BarChart,
        },
        {
            title: "Market Insights",
            description: "Get detailed market trends and insights to make informed investment decisions.",
            icon: TrendingUp,
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
                    </div>

                    <div className="container relative z-10 mx-auto px-4 max-w-6xl text-center">
                        <div className="inline-block mb-6 animate-fade-in opacity-0" style={{ animationDelay: "0.1s" }}>
                            <span className="px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-white/90 text-sm font-medium backdrop-blur-sm">
                                About Propertycab.in
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in opacity-0" style={{ animationDelay: "0.2s" }}>
                            Redefining Real Estate <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--accent))] to-amber-300">
                                Integration in India
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12 animate-fade-in opacity-0" style={{ animationDelay: "0.3s" }}>
                            Your trusted partner in finding the perfect property. We combine technology with human expertise to make property transactions seamless.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in opacity-0" style={{ animationDelay: "0.4s" }}>
                            {stats.map((stat, index) => (
                                <div key={index} className="glass-card p-6 rounded-2xl bg-white/5 border-white/10 text-white">
                                    <stat.icon className="w-8 h-8 mb-4 text-[hsl(var(--accent))]" />
                                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                                    <div className="text-sm text-white/60">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="py-20 md:py-32 bg-secondary/30">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1 relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-3xl opacity-20 blur-2xl dark:opacity-40" />
                                <div className="relative glass-card p-8 md:p-12 rounded-3xl border border-border/50 bg-card">
                                    <Target className="w-12 h-12 text-[hsl(var(--primary))] mb-6" />
                                    <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
                                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                        We aim to simplify the property search process by providing a comprehensive platform where buyers,
                                        sellers, and renters can connect seamlessly.
                                    </p>
                                    <ul className="space-y-4">
                                        {[
                                            "Transparency in every transaction",
                                            "Technology-driven solutions",
                                            "Customer-centric approach"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center gap-3 text-foreground/80">
                                                <CheckCircle2 className="w-5 h-5 text-[hsl(var(--success))]" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="order-1 md:order-2 md:pl-10">
                                <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                                    Building the Future of <span className="gradient-text">Property Search</span>
                                </h2>
                                <p className="text-lg text-muted-foreground mb-8">
                                    Founded in 2024, Propertycab.in has quickly become one of India's leading property platforms.
                                    We started with a simple vision: to make property search easy and reliable.
                                </p>
                                <div className="pl-6 border-l-4 border-[hsl(var(--accent))]">
                                    <p className="italic text-foreground/80 font-medium text-lg">
                                        "Our goal is to assist thousands of customers across major cities, helping them find their
                                        dream homes and investment properties with confidence."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="py-20 md:py-32">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">Why Choose Us?</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                We bring a fresh approach to real estate with features designed to give you the best experience.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="group p-8 rounded-2xl bg-card border border-border/50 hover:border-[hsl(var(--accent))/50] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-[hsl(var(--primary))/10] flex items-center justify-center mb-6 group-hover:bg-[hsl(var(--primary))] transition-colors duration-300">
                                        <feature.icon className="w-6 h-6 text-[hsl(var(--primary))] group-hover:text-white transition-colors duration-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact CTA */}
                <section className="py-20 bg-secondary/30 border-t border-border">
                    <div className="container mx-auto px-4 max-w-4xl text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Get in Touch</h2>
                        <div className="glass-card p-8 md:p-12 rounded-3xl border border-border shadow-sm bg-background">
                            <p className="text-lg text-muted-foreground mb-8">
                                Have questions? We'd love to hear from you. Reach out to our team directly.
                            </p>

                            <div className="grid md:grid-cols-3 gap-8">
                                <a href="mailto:info@propertycab.in" className="flex flex-col items-center group">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <span className="font-medium text-foreground">info@propertycab.in</span>
                                </a>

                                <a href="tel:+911234567890" className="flex flex-col items-center group">
                                    <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
                                    </div>
                                    <span className="font-medium text-foreground">+91 1234567890</span>
                                </a>

                                <div className="flex flex-col items-center group">
                                    <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <span className="font-medium text-foreground">Mumbai, India</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
