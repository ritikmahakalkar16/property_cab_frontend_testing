"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
    LayoutDashboard,
    Building2,
    Users,
    Calendar,
    MessageSquare,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronRight,
    Bell
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const sidebarItems = [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard/admin' },
    { icon: Building2, label: 'Properties', href: '/dashboard/admin/properties' },
    { icon: Users, label: 'Users & Agents', href: '/dashboard/admin/users' },
    { icon: Calendar, label: 'Events', href: '/dashboard/admin/events' },
    { icon: MessageSquare, label: 'Leads', href: '/dashboard/admin/leads' },
    { icon: Settings, label: 'Settings', href: '/dashboard/admin/settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, userRole, loading, signOut } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Initial Auth Check
    useEffect(() => {
        if (!loading && !user) {
            router.push('/'); // Redirect to login/home if not logged in
        }
        // In a real app, strict role checking should be here. 
        // For development/UI preview, we might be lenient or mock it.
        // if (!loading && userRole !== 'admin') { ... } 
    }, [user, userRole, loading, router]);

    if (loading) return null; // Or a loading spinner

    return (
        <div className="h-screen overflow-hidden bg-slate-50/50 flex">
            {/* Sidebar Desktop */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex flex-col h-full">
                    {/* Logo Area */}
                    <div className="h-16 flex items-center px-6 border-b border-white/10">
                        <div className="font-bold text-xl tracking-tight flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                                <span className="text-white font-bold">P</span>
                            </div>
                            PropertyCab
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="ml-auto lg:hidden text-white/70 hover:text-white"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-3 py-6 space-y-1">
                        <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Main Menu
                        </div>
                        {sidebarItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative overflow-hidden",
                                        isActive
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                                            : "text-slate-400 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <Icon className={cn("w-5 h-5 transition-colors", isActive ? "text-white" : "text-slate-400 group-hover:text-white")} />
                                    {item.label}
                                    {isActive && <ChevronRight className="w-4 h-4 ml-auto opacity-50" />}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Profile Snippet */}
                    <div className="p-4 border-t border-white/10 bg-slate-950/30">
                        <div className="flex items-center gap-3 mb-4">
                            <Avatar className="w-10 h-10 border border-white/10">
                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`} />
                                <AvatarFallback>AD</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">{user?.full_name || 'Admin User'}</p>
                                <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                            </div>
                        </div>
                        <Button
                            onClick={signOut}
                            variant="destructive"
                            className="w-full justify-start gap-2 bg-red-600/10 hover:bg-red-600/20 text-red-500 border border-red-900/50"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40 shadow-sm/50">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu className="w-5 h-5" />
                        </Button>
                        <h2 className="text-lg font-semibold text-slate-800 hidden sm:block">
                            {sidebarItems.find(i => i.href === pathname)?.label || 'Dashboard'}
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Notification Bell */}
                        <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-700">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
                        </Button>
                        <div className="text-sm text-slate-500 hidden sm:block">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {children}
                    </div>
                </main>
            </div>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
}
