"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Building2,
  Menu,
  User,
  Sparkles,
  LogOut,
  Home,
  Building,
  KeyRound,
  Users,
  Briefcase,
  Calendar,
  Info,
  Phone,
  LayoutGrid,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const requireAuth = process.env.NEXT_PUBLIC_REQUIRE_AUTH_DETAILS === "true";

  const [scrolled, setScrolled] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const transparentPages = [
    "/",
    "/about",
    "/contact",
    "/services",
    "/events",
    "/agents",
    "/privacy-policy",
    "/faq",
    "/projects",
    "/properties",
  ];

  const isTransparentPage = transparentPages.includes(pathname);
  const showWhiteText = isTransparentPage && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/properties", label: "Properties", icon: Building },
    { to: "/projects", label: "Projects", icon: KeyRound },
    { to: "/agents", label: "Agents", icon: Users },
    { to: "/services", label: "Services", icon: Briefcase },
    { to: "/events", label: "Events", icon: Calendar },
    { to: "/about", label: "About", icon: Info },
    { to: "/contact", label: "Contact", icon: Phone },
  ];

  const mainLinks = navLinks.slice(0, 4);
  const moreLinks = navLinks.slice(4);

  const handleLogout = async () => {
    setIsMoreOpen(false);
    await signOut();
    router.push("/auth");
  };

  const getAvatarGradient = (email: string) => {
    const gradients = [
      "from-orange-400 via-rose-400 to-pink-500",
      "from-cyan-400 via-blue-500 to-indigo-600",
      "from-emerald-400 via-teal-500 to-cyan-600",
      "from-purple-400 via-violet-500 to-indigo-600",
      "from-amber-400 via-orange-500 to-red-600",
      "from-lime-400 via-green-500 to-emerald-600",
    ];
    const index = email.charCodeAt(0) % gradients.length;
    return gradients[index];
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] border-b border-transparent",
          scrolled
            ? "bg-background/70 backdrop-blur-2xl shadow-sm border-border/40 py-2 sm:py-3 support-[backdrop-filter]:bg-background/60"
            : showWhiteText
              ? "bg-transparent py-4 sm:py-5"
              : "bg-background/80 backdrop-blur-xl shadow-sm border-border/40 py-2 sm:py-3"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* LOGO */}
            <Link
              href="/"
              className="flex items-center gap-3 mx-auto lg:mx-0 group relative z-10"
            >
              <div
                className={cn(
                  "p-2.5 rounded-xl transition-all duration-300 shadow-sm",
                  showWhiteText
                    ? "bg-white/10 group-hover:bg-white/20 ring-1 ring-white/20"
                    : "bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10 ring-1 ring-primary/20"
                )}
              >
                <Building2
                  className={cn(
                    "h-6 w-6 transition-colors duration-300",
                    showWhiteText ? "text-white" : "text-primary"
                  )}
                />
              </div>
              <div className="leading-none">
                <div
                  className={cn(
                    "text-xl font-bold tracking-tight transition-colors duration-300",
                    showWhiteText ? "text-white" : "text-foreground"
                  )}
                >
                  PropertyCab
                </div>
                <div
                  className={cn(
                    "text-[10px] font-bold tracking-[0.2em] uppercase mt-1 transition-colors duration-300",
                    showWhiteText ? "text-white/70" : "text-muted-foreground"
                  )}
                >
                  Real Estate
                </div>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 px-2">
              <div
                className={cn(
                  "flex items-center gap-1 rounded-full p-1.5 transition-all duration-300",
                  !showWhiteText &&
                  "bg-secondary/40 border border-border/40 backdrop-blur-md"
                )}
              >
                {navLinks.map((link) => {
                  const isActive = pathname === link.to;
                  return (
                    <Link
                      key={link.to}
                      href={link.to}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative",
                        isActive
                          ? "text-primary-foreground shadow-sm bg-primary"
                          : showWhiteText
                            ? "text-white/80 hover:text-white hover:bg-white/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-background/80"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* DESKTOP AUTH (WITH PROFILE DROPDOWN) */}
            <div className="hidden lg:flex items-center gap-2 relative z-10">
              {(requireAuth || user) && (
                user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-10 w-10 rounded-full p-0"
                      >
                        <Avatar className="h-10 w-10 aspect-square rounded-full overflow-hidden border-2 border-white shadow-sm">
                          <AvatarFallback
                            className={`h-full w-full rounded-full flex items-center justify-center text-white font-semibold bg-gradient-to-br ${getAvatarGradient(
                              user.email
                            )}`}
                          >
                            {(user.full_name || user.email || "U")
                              .charAt(0)
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {user.full_name || "User"}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => router.push("/profile")}
                        className="cursor-pointer"
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile & Favorites</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={signOut}
                        className="text-red-600 cursor-pointer"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button
                    variant="ghost"
                    className={cn(
                      "font-medium rounded-full px-5 transition-colors",
                      showWhiteText
                        ? "text-white hover:bg-white/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                    )}
                    asChild
                  >
                    <Link href="/auth">Login</Link>
                  </Button>
                )
              )}

              {/* Primary CTA */}
              <Button
                asChild
                className="ml-2 rounded-full px-6 bg-gradient-to-r from-[hsl(var(--accent))] to-amber-500 hover:to-amber-600 text-white shadow-lg hover:shadow-amber-500/25 transition-all duration-300 hover:scale-[1.02] border-0"
              >
                <Link href={user ? "/properties/post" : "/auth"}>
                  <Sparkles className="h-4 w-4 mr-2 fill-white/20" />
                  Post Property
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE NAV + SHEET (unchanged) */}
      {/* … keep your existing mobile nav and sheet code here … */}

      <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background/80 backdrop-blur-xl border-t border-border/50 pb-safe transition-all shadow-lg">
        <div className="flex justify-around items-center h-16 px-2">
          {mainLinks.map((link) => {
            const active = pathname === link.to;
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                href={link.to}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 w-16 h-14 rounded-2xl transition-all duration-300",
                  active
                    ? "text-[hsl(var(--primary))]"
                    : "text-muted-foreground hover:text-foreground active:scale-95"
                )}
              >
                <div className={cn(
                  "p-1.5 rounded-xl transition-all",
                  active ? "bg-[hsl(var(--primary))]/10" : "bg-transparent"
                )}>
                  <Icon className={cn("h-5 w-5 transition-transform duration-300", active && "-translate-y-0.5")} />
                </div>
                <span className={cn("text-[10px] font-medium transition-opacity", active ? "opacity-100" : "opacity-70")}>{link.label}</span>
              </Link>
            );
          })}

          {/* MORE */}
          <button
            onClick={() => setIsMoreOpen(true)}
            className="flex flex-col items-center justify-center gap-1 w-16 h-14 rounded-2xl text-muted-foreground hover:text-foreground active:scale-95 transition-all"
          >
            <div className={`p-1.5 rounded-xl ${isMoreOpen ? "bg-secondary text-foreground" : "bg-transparent"}`}>
              <LayoutGrid className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-medium opacity-70">More</span>
          </button>
        </div>
        {/* iOS safe area */}
        <div className="h-safe-area-inset-bottom" />
      </nav>

      {/* ----------------------------- MORE SHEET ----------------------------- */}

      <Sheet open={isMoreOpen} onOpenChange={setIsMoreOpen}>
        <SheetContent side="bottom" className="rounded-t-3xl border-t border-border/50 max-h-[85vh] overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-xl font-bold flex items-center gap-2">
              <Menu className="w-5 h-5 text-[hsl(var(--primary))]" />
              Menu
            </SheetTitle>
          </SheetHeader>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {moreLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.to;
              return (
                <button
                  key={link.to}
                  onClick={() => {
                    router.push(link.to);
                    setIsMoreOpen(false);
                  }}
                  className={cn(
                    "flex flex-col items-start p-4 rounded-2xl border transition-all text-left group",
                    isActive
                      ? "bg-[hsl(var(--primary))]/5 border-[hsl(var(--primary))]/20"
                      : "bg-background border-border/60 hover:border-border hover:bg-secondary/50"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-xl mb-3 transition-colors",
                    isActive
                      ? "bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]"
                      : "bg-secondary text-muted-foreground group-hover:text-foreground"
                  )}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className={cn("font-semibold text-sm", isActive ? "text-[hsl(var(--primary))]" : "text-foreground")}>{link.label}</span>
                </button>
              )
            })}
          </div>

          <Separator className="my-6 opacity-50" />

          <div className="space-y-3 pb-8">
            {user ? (
              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 px-4 py-4 rounded-xl text-white font-medium bg-red-500 hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {(requireAuth) && (
                  <Button
                    variant="outline"
                    className="h-12 rounded-xl text-base"
                    onClick={() => {
                      router.push('/auth');
                      setIsMoreOpen(false);
                    }}
                  >
                    Login
                  </Button>
                )}
                <Button
                  className={cn(
                    "h-12 rounded-xl text-base bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-hover))] text-white shadow-lg shadow-amber-500/20",
                    !requireAuth && "col-span-2"
                  )}
                  onClick={() => {
                    router.push('/auth');
                    setIsMoreOpen(false);
                  }}
                >
                  Post Property
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Header;