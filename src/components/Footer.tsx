"use client";

import Link from "next/link";
import { Building2, Mail, Phone, MapPin, ArrowRight, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/properties", label: "Properties" },
    { to: "/projects", label: "Projects" },
    // { to: "/services", label: "Services" },
    { to: "/about", label: "About Us" },
  ];

  const legalLinks = [
    { to: "/privacy-policy", label: "Privacy Policy" },
    { to: "/faq", label: "FAQ" },
    { to: "/contact", label: "Contact" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-primary/95" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[150px] translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 py-16 relative">
        {/* Newsletter Section */}
        {/* <div className="glass-card rounded-2xl p-8 md:p-10 mb-16 bg-white/5 border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2 font-sans">
                Stay Updated
              </h3>
              <p className="text-primary-foreground/70 font-sans">
                Get the latest property listings and market insights
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Input
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/50 min-w-[250px] font-sans"
              />
              <Button className="bg-gradient-to-r from-accent to-amber-500 hover:from-accent-hover hover:to-amber-600 text-accent-foreground shadow-lg shadow-accent/25 font-sans">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-6 group">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/30 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Building2 className="h-10 w-10 text-accent relative transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-primary-foreground font-sans">Propertycab</span>
                <span className="text-xs text-primary-foreground/60 -mt-0.5 tracking-widest">.in</span>
              </div>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6 font-sans">
              Your trusted partner in finding the perfect property. Buy, rent, or sell with confidence across India.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2.5 rounded-full bg-white/10 text-primary-foreground/80 hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-5 text-primary-foreground font-sans">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    href={link.to}
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-sm inline-flex items-center gap-2 group font-sans"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-accent transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-lg mb-5 text-primary-foreground font-sans">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    href={link.to}
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-sm inline-flex items-center gap-2 group font-sans"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-accent transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-5 text-primary-foreground font-sans">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-accent/20 mt-0.5">
                  <Mail className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <span className="text-xs text-primary-foreground/50 block font-sans">Email</span>
                  <span className="text-primary-foreground/90 text-sm font-sans">info@propertycab.in</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-accent/20 mt-0.5">
                  <Phone className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <span className="text-xs text-primary-foreground/50 block font-sans">Phone</span>
                  <span className="text-primary-foreground/90 text-sm font-sans">+91 1234567890</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-accent/20 mt-0.5">
                  <MapPin className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <span className="text-xs text-primary-foreground/50 block font-sans">Address</span>
                  <span className="text-primary-foreground/90 text-sm font-sans">Mumbai, Maharashtra, India</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/50 text-sm font-sans">
              © {new Date().getFullYear()} Propertycab.in. All rights reserved.
            </p>
            <p className="text-primary-foreground/50 text-sm font-sans">
              Design & Developed by <a href="https://elan-tech.net/" target="_blank" rel="noopener noreferrer" className="text-accent "> eLan Technology</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;