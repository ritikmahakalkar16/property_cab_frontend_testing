"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Heart,
    User as UserIcon,
    Mail,
    Calendar,
    Loader2,
    Building2,
    LogOut,
    Shield,
    CheckCircle2,
    Settings,
    BarChart3,
    Bell,
    Grid3x3,
    Sparkles,
    Phone,
    Pencil,
    X,
    Check
} from "lucide-react";
import { toast } from "sonner";

export default function ProfileClient() {
    const { user, signOut, loading: authLoading, refreshUser } = useAuth();
    const router = useRouter();
    const [favorites, setFavorites] = useState<any[]>([]);
    const [loadingFavorites, setLoadingFavorites] = useState(true);
    const [activeView, setActiveView] = useState<'favorites' | 'settings'>('favorites');

    const [isEditingName, setIsEditingName] = useState(false);
    const [newName, setNewName] = useState("");
    const [updatingName, setUpdatingName] = useState(false);

    const handleUpdateName = async () => {
        if (!newName.trim()) {
            toast.error("Name cannot be empty");
            return;
        }
        setUpdatingName(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/profile`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newName }),
                credentials: "include",
            });
            if (res.ok) {
                toast.success("Profile updated successfully");
                await refreshUser();
                setIsEditingName(false);
            } else {
                const data = await res.json();
                toast.error(data.message || "Failed to update profile");
            }
        } catch (error) {
            console.error("Update failed", error);
            toast.error("Something went wrong");
        } finally {
            setUpdatingName(false);
        }
    };

    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/");
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (user) {
            fetchFavorites();
        }
    }, [user]);

    const fetchFavorites = async () => {
        setLoadingFavorites(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/properties/interested/me`, {
                credentials: 'include'
            });
            if (res.ok) {
                const data = await res.json();
                setFavorites(data.data || []);
            }
        } catch (error) {
            console.error("Failed to fetch favorites", error);
            toast.error("Could not load favorites");
        } finally {
            setLoadingFavorites(false);
        }
    };

    const getAvatarGradient = (email: string) => {
        const gradients = [
            'from-orange-400 via-rose-400 to-pink-500',
            'from-cyan-400 via-blue-500 to-indigo-600',
            'from-emerald-400 via-teal-500 to-cyan-600',
            'from-purple-400 via-violet-500 to-indigo-600',
            'from-amber-400 via-orange-500 to-red-600',
            'from-lime-400 via-green-500 to-emerald-600',
        ];
        const index = email.charCodeAt(0) % gradients.length;
        return gradients[index];
    };

    if (authLoading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-neutral-900 mx-auto mb-4" />
                    <p className="text-neutral-600 font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    const userInitials = user.full_name
        ? user.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : user.email[0].toUpperCase();

    return (
        <div className="min-h-screen bg-neutral-50">
            <Header />

            <main className="container mx-auto px-4 py-6 mt-24 max-w-[1400px]">
                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Left Sidebar - Profile Card */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Main Profile Card */}
                        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-center mb-6">
                                <div className="relative inline-block mb-4">
                                    <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${getAvatarGradient(user.email)} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                                        {userInitials}
                                    </div>
                                    {user.email_verified && (
                                        <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                                            <CheckCircle2 className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                </div>

                                <h2 className="text-xl font-bold text-neutral-900 mb-1">
                                    {user.full_name || 'User'}
                                </h2>
                                <p className="text-sm text-neutral-500 mb-1">{user.email}</p>
                                <p className="text-sm text-neutral-500 mb-4 font-mono">{user.phone || 'No phone'}</p>


                                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 rounded-full text-xs font-medium text-neutral-700 capitalize">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    {user.role || 'User'} Account
                                </div>
                            </div>

                            {/* Navigation Menu */}
                            <nav className="space-y-1">
                                <button
                                    onClick={() => setActiveView('favorites')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeView === 'favorites'
                                        ? 'bg-neutral-900 text-white shadow-md'
                                        : 'text-neutral-600 hover:bg-neutral-100'
                                        }`}
                                >
                                    <Heart className="w-4 h-4" />
                                    <span className="font-medium text-sm">Saved Properties</span>
                                    <span className="ml-auto text-xs font-semibold bg-white/20 px-2 py-0.5 rounded-full">
                                        {favorites.length}
                                    </span>
                                </button>

                                <button
                                    onClick={() => setActiveView('settings')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeView === 'settings'
                                        ? 'bg-neutral-900 text-white shadow-md'
                                        : 'text-neutral-600 hover:bg-neutral-100'
                                        }`}
                                >
                                    <Settings className="w-4 h-4" />
                                    <span className="font-medium text-sm">Settings</span>
                                </button>
                            </nav>

                            <div className="mt-6 pt-6 border-t border-neutral-200">
                                <Button
                                    onClick={() => signOut()}
                                    variant="outline"
                                    className="w-full gap-2 border-neutral-300 text-neutral-700 hover:bg-red-50 hover:text-red-600 hover:border-red-300 rounded-xl"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </Button>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 gap-4">
                            <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center">
                                        <Heart className="w-5 h-5 text-rose-600" />
                                    </div>
                                    <span className="text-2xl font-bold text-neutral-900">{favorites.length}</span>
                                </div>
                                <p className="text-sm font-medium text-neutral-600">Favorites</p>
                            </div>

                            <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                        <BarChart3 className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <span className="text-2xl font-bold text-neutral-900">0</span>
                                </div>
                                <p className="text-sm font-medium text-neutral-600">Total Views</p>
                            </div>
                        </div>

                        {/* Member Since Card */}
                        <div className="bg-gradient-to-br from-neutral-900 to-neutral-700 border border-neutral-800 rounded-xl p-5 shadow-sm text-white">
                            <div className="flex items-center gap-2 mb-2">
                                <Calendar className="w-4 h-4 text-neutral-400" />
                                <p className="text-xs font-medium text-neutral-400 uppercase tracking-wide">Member Since</p>
                            </div>
                            <p className="text-lg font-bold">
                                {new Date(user.created_at || Date.now()).toLocaleDateString('en-US', {
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>

                    {/* Right Content Area */}
                    <div className="lg:col-span-9">
                        {activeView === 'favorites' && (
                            <div className="space-y-6">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h1 className="text-3xl font-bold text-neutral-900 mb-1">Saved Properties</h1>
                                        <p className="text-neutral-600">
                                            {favorites.length} {favorites.length === 1 ? 'property' : 'properties'} you've liked
                                        </p>
                                    </div>
                                    <Button
                                        onClick={() => router.push('/properties')}
                                        className="bg-neutral-900 text-white hover:bg-neutral-800 rounded-xl gap-2"
                                    >
                                        <Grid3x3 className="w-4 h-4" />
                                        Browse More
                                    </Button>
                                </div>

                                {/* Properties Grid */}
                                {loadingFavorites ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {[1, 2, 3, 4, 5, 6].map(i => (
                                            <div key={i} className="h-96 bg-white border border-neutral-200 rounded-2xl animate-pulse" />
                                        ))}
                                    </div>
                                ) : favorites.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {favorites.map((item) => {
                                            const prop = item.property;
                                            if (!prop) return null;
                                            return (
                                                <PropertyCard
                                                    key={prop._id}
                                                    id={prop._id}
                                                    title={prop.title}
                                                    price={`₹${prop.price?.toLocaleString('en-IN')}`}
                                                    location={`${prop.city}, ${prop.state}`}
                                                    bedrooms={prop.bedrooms || 0}
                                                    bathrooms={prop.bathrooms || 0}
                                                    area={prop.builtUpArea || prop.area || 0}
                                                    imageUrl={
                                                        prop.coverImage
                                                            ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${prop.coverImage}`
                                                            : prop.images?.[0]
                                                                ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${prop.images[0]}`
                                                                : "/placeholder.png"
                                                    }
                                                    type={prop.saleType === 'rent' ? 'rent' : 'sale'}
                                                    propertyType={prop.propertyType}
                                                />
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="bg-white border-2 border-dashed border-neutral-300 rounded-2xl p-16 text-center">
                                        <div className="w-20 h-20 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                            <Heart className="w-10 h-10 text-neutral-400" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                                            No saved properties yet
                                        </h3>
                                        <p className="text-neutral-600 mb-8 max-w-md mx-auto">
                                            Start exploring properties and save your favorites by clicking the heart icon
                                        </p>
                                        <Button
                                            onClick={() => router.push('/properties')}
                                            className="bg-neutral-900 text-white hover:bg-neutral-800 rounded-xl px-8 py-6 text-base font-semibold gap-2"
                                        >
                                            <Building2 className="w-5 h-5" />
                                            Explore Properties
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeView === 'settings' && (
                            <div className="space-y-6">
                                {/* Header */}
                                <div className="mb-8">
                                    <h1 className="text-3xl font-bold text-neutral-900 mb-1">Account Settings</h1>
                                    <p className="text-neutral-600">Manage your account information and preferences</p>
                                </div>

                                {/* Settings Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Personal Information */}
                                    <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
                                        <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                                            <UserIcon className="w-5 h-5" />
                                            Personal Information
                                        </h3>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">
                                                    Full Name
                                                </label>
                                                {isEditingName ? (
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="text"
                                                            value={newName}
                                                            onChange={(e) => setNewName(e.target.value)}
                                                            className="flex-1 px-4 py-3 bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-black"
                                                            autoFocus
                                                            disabled={updatingName}
                                                        />
                                                        <Button
                                                            size="icon"
                                                            className="h-10 w-10 shrink-0 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                                                            onClick={handleUpdateName}
                                                            disabled={updatingName}
                                                        >
                                                            {updatingName ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                                                        </Button>
                                                        <Button
                                                            size="icon"
                                                            variant="outline"
                                                            className="h-10 w-10 shrink-0 border-neutral-300 text-neutral-500 hover:text-neutral-700 rounded-lg"
                                                            onClick={() => setIsEditingName(false)}
                                                            disabled={updatingName}
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <div className="relative group">
                                                        <div className="px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 font-medium flex items-center justify-between">
                                                            {user.full_name || 'Not provided'}
                                                            <button
                                                                onClick={() => {
                                                                    setNewName(user.full_name || "");
                                                                    setIsEditingName(true);
                                                                }}
                                                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-neutral-200 rounded-md text-neutral-500"
                                                            >
                                                                <Pencil className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">
                                                    Email Address
                                                </label>
                                                <div className="px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 font-medium flex items-center gap-2">
                                                    <Mail className="w-4 h-4 text-neutral-400" />
                                                    {user.email}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">
                                                    Phone Number
                                                </label>
                                                <div className="px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 font-medium flex items-center gap-2">
                                                    <Phone className="w-4 h-4 text-neutral-400" />
                                                    {user.phone || 'Not provided'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Account Status */}
                                    <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
                                        <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                                            <Shield className="w-5 h-5" />
                                            Account Status
                                        </h3>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">
                                                    Verification
                                                </label>
                                                <div className={`px-4 py-3 rounded-lg border flex items-center gap-2 font-medium ${user.email_verified
                                                    ? 'bg-green-50 border-green-200 text-green-700'
                                                    : 'bg-amber-50 border-amber-200 text-amber-700'
                                                    }`}>
                                                    {user.email_verified ? (
                                                        <>
                                                            <CheckCircle2 className="w-5 h-5" />
                                                            Verified Account
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Bell className="w-5 h-5" />
                                                            Pending Verification
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">
                                                    Account Type
                                                </label>
                                                <div className="px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 font-bold capitalize flex items-center gap-2">
                                                    <Sparkles className="w-4 h-4 text-neutral-600" />
                                                    {user.role || 'User'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Account Timeline */}
                                    <div className="bg-gradient-to-br from-neutral-900 to-neutral-700 border border-neutral-800 rounded-2xl p-6 shadow-sm text-white md:col-span-2">
                                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                            <Calendar className="w-5 h-5" />
                                            Account Timeline
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                                <p className="text-sm text-neutral-400 mb-1">Joined On</p>
                                                <p className="text-xl font-bold">
                                                    {new Date(user.created_at || Date.now()).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </p>
                                            </div>

                                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                                <p className="text-sm text-neutral-400 mb-1">Properties Saved</p>
                                                <p className="text-xl font-bold">{favorites.length}</p>
                                            </div>

                                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                                <p className="text-sm text-neutral-400 mb-1">Account Status</p>
                                                <p className="text-xl font-bold">Active</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
