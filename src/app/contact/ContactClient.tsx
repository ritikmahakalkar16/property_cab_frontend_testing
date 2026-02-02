"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Mail,
    Phone,
    MapPin,
    Send,
    MessageSquare,
    Loader2,
    CheckCircle2,
    AlertCircle,
    Building2,
    ArrowRight
} from "lucide-react";

const Base_Url = process.env.NEXT_PUBLIC_API_URL || "https://propertycab-backend-loginless.onrender.com";
const API_URL = `${Base_Url}/api/v1/contact`;

const ContactClient = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
    const [statusMessage, setStatusMessage] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        // Clear error when user starts typing
        if (errors[id]) {
            setErrors((prev) => ({ ...prev, [id]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) newErrors.name = "Full name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }
        if (!formData.subject.trim()) newErrors.subject = "Subject is required";
        if (!formData.message.trim()) newErrors.message = "Message is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        setSubmitStatus("idle");
        setStatusMessage("");

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to send message");
            }

            // Success
            setSubmitStatus("success");
            setStatusMessage("Thank you! Your message has been sent successfully.");
            setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        } catch (err: any) {
            setSubmitStatus("error");
            setStatusMessage(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

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
                                Get in Touch
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in opacity-0" style={{ animationDelay: "0.2s" }}>
                            Let's Start a <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--accent))] to-amber-300">
                                Conversation
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12 animate-fade-in opacity-0" style={{ animationDelay: "0.3s" }}>
                            Have questions about buying, selling, or renting? We're here to help you every step of the way.
                        </p>
                    </div>
                </section>

                <section className="relative -mt-20 pb-20 px-4 z-20">
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">

                            {/* Contact Form */}
                            <div className="glass-card h-full rounded-3xl p-8 md:p-10 bg-card border border-border shadow-xl animate-slide-in-left opacity-0" style={{ animationDelay: "0.4s" }}>
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                                        <MessageSquare className="w-6 h-6 text-[hsl(var(--primary))]" />
                                        Send us a Message
                                    </h2>
                                    <p className="text-muted-foreground">Fill out the form below and we'll reply within 24 hours.</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-5  flex flex-col">
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-sm font-medium">Full Name <span className="text-red-500">*</span></Label>
                                            <Input
                                                id="name"
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className={`h-11 bg-background/50 focus:bg-background transition-colors ${errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                            />
                                            {errors.name && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                placeholder="+91 98765 43210"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="h-11 bg-background/50 focus:bg-background transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-sm font-medium">Email Address <span className="text-red-500">*</span></Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`h-11 bg-background/50 focus:bg-background transition-colors ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                        />
                                        {errors.email && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="subject" className="text-sm font-medium">Subject <span className="text-red-500">*</span></Label>
                                        <Input
                                            id="subject"
                                            placeholder="Property Enquiry / General Question"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className={`h-11 bg-background/50 focus:bg-background transition-colors ${errors.subject ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                        />
                                        {errors.subject && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.subject}</p>}
                                    </div>

                                    <div className="space-y-2 flex-grow">
                                        <Label htmlFor="message" className="text-sm font-medium">Message <span className="text-red-500">*</span></Label>
                                        <Textarea
                                            id="message"
                                            placeholder="Tell us more about your requirements..."
                                            value={formData.message}
                                            onChange={handleChange}
                                            className={`min-h-24  bg-background/50 focus:bg-background transition-colors resize-none ${errors.message ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                                        />
                                        {errors.message && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.message}</p>}
                                    </div>

                                    {/* Status message */}
                                    {submitStatus === "success" && (
                                        <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 rounded-xl flex items-center gap-3 animate-fade-in">
                                            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                                            <p className="text-sm font-medium">{statusMessage}</p>
                                        </div>
                                    )}
                                    {submitStatus === "error" && (
                                        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400 rounded-xl flex items-center gap-3 animate-fade-in">
                                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                            <p className="text-sm font-medium">{statusMessage}</p>
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))/90] text-white h-12 text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 "
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                Sending Message...
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <Send className="w-5 h-5 ml-2" />
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </div>

                            {/* Contact Information */}
                            <div className="space-y-6 flex flex-col justify-between animate-slide-in-right opacity-0" style={{ animationDelay: "0.5s" }}>

                                <div className="grid gap-6">
                                    {/* Info Cards */}
                                    {[
                                        {
                                            icon: Mail,
                                            title: "Email Us",
                                            lines: ["info@propertycab.in", "support@propertycab.in"],
                                            color: "text-blue-500",
                                            bg: "bg-blue-500/10",
                                            link: "mailto:info@propertycab.in"
                                        },
                                        {
                                            icon: Phone,
                                            title: "Call Us",
                                            lines: ["+91 1234567890", "Mon-Sat: 9:00 AM - 6:00 PM"],
                                            color: "text-green-500",
                                            bg: "bg-green-500/10",
                                            link: "tel:+911234567890"
                                        },
                                        {
                                            icon: MapPin,
                                            title: "Visit Us",
                                            lines: ["123 Real Estate Plaza, Bandra West,", "Mumbai, Maharashtra 400050"],
                                            color: "text-purple-500",
                                            bg: "bg-purple-500/10",
                                            link: "#"
                                        }
                                    ].map((item, index) => (
                                        <a
                                            key={index}
                                            href={item.link}
                                            className="group flex items-start gap-4 p-6 rounded-2xl bg-card border border-border/50 hover:border-[hsl(var(--accent))/50] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                                        >
                                            <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 duration-300`}>
                                                <item.icon className={`h-7 w-7 ${item.color}`} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-[hsl(var(--primary))] transition-colors">{item.title}</h3>
                                                {item.lines.map((line, i) => (
                                                    <p key={i} className="text-muted-foreground leading-relaxed">{line}</p>
                                                ))}
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-[hsl(var(--accent))] ml-auto self-center transition-colors opacity-0 group-hover:opacity-100" />
                                        </a>
                                    ))}
                                </div>

                                {/* Business Inquiries */}
                                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--hero-gradient-end))] p-8 text-white shadow-xl">
                                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-32 h-32 bg-[hsl(var(--accent))]/20 rounded-full blur-2xl" />

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-4 text-[hsl(var(--accent))]">
                                            <Building2 className="w-6 h-6" />
                                            <h3 className="text-lg font-bold uppercase tracking-wider">Business Inquiries</h3>
                                        </div>
                                        <p className="mb-6 text-white/80 leading-relaxed">
                                            For partnerships, real estate collaborations, or media inquiries, please contact our dedicated business team.
                                        </p>
                                        <a href="mailto:business@propertycab.in" className="inline-flex items-center font-bold text-white hover:text-[hsl(var(--accent))] transition-colors">
                                            business@propertycab.in
                                            <Send className="w-4 h-4 ml-2" />
                                        </a>
                                    </div>
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

export default ContactClient;
