"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Lock, FileText, Info, Eye } from "lucide-react";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            {/* Hero Section */}
            <div className="relative pt-32 pb-32 md:pt-40 md:pb-40 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))]" />
                    <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
                    {/* Abstract decorations */}
                    <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[hsl(var(--accent))]/10 rounded-full blur-[120px] animate-pulse-glow" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[hsl(var(--primary))]/20 rounded-full blur-[100px]" />
                </div>

                <div className="container relative z-10 mx-auto px-4 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-white/90 text-sm font-medium backdrop-blur-sm mb-6 animate-fade-in opacity-0" style={{ animationDelay: "0.1s" }}>
                        <Shield className="w-4 h-4 text-[hsl(var(--accent))]" />
                        <span>Trust & Transparency</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in opacity-0" style={{ animationDelay: "0.2s" }}>
                        Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--accent))] to-amber-300">Policy</span>
                    </h1>

                    <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8 animate-fade-in opacity-0" style={{ animationDelay: "0.3s" }}>
                        We value your privacy and are committed to protecting your personal data.
                        <br className="hidden md:block" />
                        Please read this policy carefully to understand our practices.
                    </p>

                    <div className="animate-fade-in opacity-0" style={{ animationDelay: "0.4s" }}>
                        <span className="inline-block px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm">
                            Last Updated: {new Date().toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>

            <main className="container mx-auto px-4 -mt-20 relative z-20 pb-20">
                <div className="max-w-7xl mx-auto animate-fade-up opacity-0" style={{ animationDelay: "0.5s" }}>
                    <div className="bg-card border border-border/50 rounded-3xl p-8 md:p-12 shadow-xl">
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <section className="mb-12">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                        <Info className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground m-0">1. Introduction</h2>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    Welcome to Propertycab.in. We respect your privacy and are committed to protecting your personal data.
                                    This privacy policy will inform you about how we look after your personal data when you visit our
                                    website and tell you about your privacy rights and how the law protects you.
                                </p>
                            </section>

                            <section className="mb-12">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground m-0">2. Information We Collect</h2>
                                </div>
                                <p className="text-muted-foreground mb-4">We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
                                <div className="grid md:grid-cols-2 gap-4 not-prose">
                                    {[
                                        { title: "Identity Data", desc: "Name, username or similar identifier" },
                                        { title: "Contact Data", desc: "Email address, phone number, and postal address" },
                                        { title: "Technical Data", desc: "IP address, browser type, device info" },
                                        { title: "Usage Data", desc: "How you use our website and services" }
                                    ].map((item, idx) => (
                                        <div key={idx} className="p-4 rounded-xl bg-secondary/30 border border-border/50">
                                            <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="mb-12">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-lg bg-green-500/10 text-green-600">
                                        <Eye className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground m-0">3. How We Use Your Information</h2>
                                </div>
                                <p className="text-muted-foreground mb-3">We use your personal data for the following purposes:</p>
                                <ul className="list-none space-y-2 pl-0 text-muted-foreground">
                                    {["To register you as a new user and manage your account",
                                        "To process and deliver property listings",
                                        "To manage our relationship with you",
                                        "To improve our website and services"].map((item, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                </ul>
                            </section>

                            <section className="mb-12">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600">
                                        <Lock className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground m-0">4. Data Security</h2>
                                </div>
                                <p className="text-muted-foreground">
                                    We have implemented appropriate security measures to prevent your personal data from being accidentally
                                    lost, used, or accessed in an unauthorized way. We limit access to your personal data to employees and
                                    partners who have a business need to know.
                                </p>
                            </section>

                            <div className="mt-16 pt-8 border-t border-border">
                                <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
                                <p className="text-muted-foreground mb-6">
                                    If you have any questions about this privacy policy, please contact us:
                                </p>
                                <div className="grid md:grid-cols-3 gap-6 not-prose">
                                    <div className="text-center p-6 rounded-2xl bg-secondary/20">
                                        <div className="font-semibold text-foreground">Email</div>
                                        <a href="mailto:privacy@propertycab.in" className="text-primary hover:underline">privacy@propertycab.in</a>
                                    </div>
                                    <div className="text-center p-6 rounded-2xl bg-secondary/20">
                                        <div className="font-semibold text-foreground">Phone</div>
                                        <a href="tel:+911234567890" className="text-primary hover:underline">+91 1234567890</a>
                                    </div>
                                    <div className="text-center p-6 rounded-2xl bg-secondary/20">
                                        <div className="font-semibold text-foreground">Address</div>
                                        <div className="text-muted-foreground">Mumbai, Maharashtra, India</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
