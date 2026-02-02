"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Heart, Search, Bell, User } from 'lucide-react';

const UserDashboard = () => {
    const { user, userRole, loading, signOut } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth');
        } else if (!loading && userRole && userRole !== 'user') {
            router.push('/dashboard');
        }
    }, [user, userRole, loading, router]);

    if (loading || !user || userRole !== 'user') {
        return null;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">My Dashboard</h1>
                        <p className="text-muted-foreground mt-2">Welcome back! Find your dream property</p>
                    </div>
                    <Button onClick={signOut} variant="outline">Logout</Button>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Saved Properties</CardTitle>
                            <Heart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">8</div>
                            <p className="text-xs text-muted-foreground">2 new matches</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Saved Searches</CardTitle>
                            <Search className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">3</div>
                            <p className="text-xs text-muted-foreground">15 new results</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
                            <Bell className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12</div>
                            <p className="text-xs text-muted-foreground">3 unread</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Profile</CardTitle>
                            <User className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm font-medium">Complete</div>
                            <p className="text-xs text-muted-foreground">100% profile strength</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Saved Properties</CardTitle>
                            <CardDescription>Properties you've marked as favorites</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full">
                                <Heart className="mr-2 h-4 w-4" />
                                View Saved
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Search Properties</CardTitle>
                            <CardDescription>Find your dream home</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full" variant="outline" onClick={() => router.push('/properties')}>
                                <Search className="mr-2 h-4 w-4" />
                                Browse Properties
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Views</CardTitle>
                            <CardDescription>Properties you've recently viewed</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full" variant="outline">View History</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Settings</CardTitle>
                            <CardDescription>Update your preferences and information</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full" variant="outline">
                                <User className="mr-2 h-4 w-4" />
                                Edit Profile
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default UserDashboard;
