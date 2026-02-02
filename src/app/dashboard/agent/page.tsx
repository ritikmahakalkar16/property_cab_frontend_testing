"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Building, Eye, MessageSquare, PlusCircle } from 'lucide-react';
import AgentPropertiesManagement from '@/components/AgentPropertiesManagement';

const AgentDashboard = () => {
    const { user, userRole, loading, signOut } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth');
        } else if (!loading && userRole && userRole !== 'agent') {
            router.push('/dashboard');
        }
    }, [user, userRole, loading, router]);

    if (loading || !user || userRole !== 'agent') {
        return null;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Agent Dashboard</h1>
                        <p className="text-muted-foreground mt-2">Manage your property listings</p>
                    </div>
                    <Button onClick={signOut} variant="outline">Logout</Button>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">My Listings</CardTitle>
                            <Building className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12</div>
                            <p className="text-xs text-muted-foreground">3 pending approval</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                            <Eye className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">2,345</div>
                            <p className="text-xs text-muted-foreground">+180 this week</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Inquiries</CardTitle>
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">28</div>
                            <p className="text-xs text-muted-foreground">5 new today</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
                            <Building className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">4</div>
                            <p className="text-xs text-muted-foreground">2 closing soon</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Add New Property</CardTitle>
                                <CardDescription>List a new property for sale or rent</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full" onClick={() => router.push('/add-property')}>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Add Property
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Messages</CardTitle>
                                <CardDescription>Check inquiries from potential buyers</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full" variant="outline">
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    View Messages
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    <AgentPropertiesManagement />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AgentDashboard;
