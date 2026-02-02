"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
    Save,
    Shield,
    Bell,
    User,
    Globe,
    Mail,
    Smartphone,
    Building
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSettingsPage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            toast.success("Settings saved successfully");
        }, 1000);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Platform Settings</h1>
                <p className="text-slate-500">Manage global configurations, security preferences, and notifications.</p>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <TabsList className="mb-4 bg-white border border-slate-200 p-1 rounded-xl">
                    <TabsTrigger value="general" className="data-[state=active]:bg-slate-100">
                        <Globe className="w-4 h-4 mr-2" /> General
                    </TabsTrigger>
                    <TabsTrigger value="profile" className="data-[state=active]:bg-slate-100">
                        <User className="w-4 h-4 mr-2" /> Admin Profile
                    </TabsTrigger>
                    <TabsTrigger value="security" className="data-[state=active]:bg-slate-100">
                        <Shield className="w-4 h-4 mr-2" /> Security
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="data-[state=active]:bg-slate-100">
                        <Bell className="w-4 h-4 mr-2" /> Notifications
                    </TabsTrigger>
                </TabsList>

                {/* General Platform Settings */}
                <TabsContent value="general" className="mt-0 space-y-6">
                    <Card className="border-slate-200">
                        <CardHeader>
                            <CardTitle>Platform Information</CardTitle>
                            <CardDescription>Basic details about the PropertyCab platform visible to users.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="siteName">Site Name</Label>
                                    <Input id="siteName" defaultValue="PropertyCab" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="supportEmail">Support Email</Label>
                                    <Input id="supportEmail" defaultValue="support@propertycab.in" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="contactPhone">Contact Phone</Label>
                                    <Input id="contactPhone" defaultValue="+91 98765 43210" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Office Address</Label>
                                    <Input id="address" defaultValue="123 Tech Park, Bangalore" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="bg-slate-50 border-t border-slate-100 flex justify-end py-4">
                            <Button onClick={handleSave} disabled={isLoading}>
                                {isLoading ? "Saving..." : <><Save className="w-4 h-4 mr-2" /> Save Changes</>}
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="border-slate-200">
                        <CardHeader>
                            <CardTitle>Feature Toggles</CardTitle>
                            <CardDescription>Enable or disable specific platform features.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <div className="font-semibold text-slate-900">User Registration</div>
                                    <div className="text-sm text-slate-500">Allow new users to create accounts</div>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <div className="font-semibold text-slate-900">Agent Auto-Approval</div>
                                    <div className="text-sm text-slate-500">Automatically verify new agent accounts (Not Recommended)</div>
                                </div>
                                <Switch />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <div className="font-semibold text-slate-900">Maintenance Mode</div>
                                    <div className="text-sm text-slate-500">Disable platform access for all non-admin users</div>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notifications Settings */}
                <TabsContent value="notifications" className="mt-0">
                    <Card className="border-slate-200">
                        <CardHeader>
                            <CardTitle>Email Notifications</CardTitle>
                            <CardDescription>Manage when the admins receive email alerts.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    New User Registration
                                </label>
                                <Switch defaultChecked />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    New Property Listing Pending Approval
                                </label>
                                <Switch defaultChecked />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    New Support Ticket / Lead
                                </label>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                        <CardFooter className="bg-slate-50 border-t border-slate-100 flex justify-end py-4">
                            <Button onClick={handleSave}>Save Preferences</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* Security Settings */}
                <TabsContent value="security" className="mt-0">
                    <Card className="border-slate-200">
                        <CardHeader>
                            <CardTitle>Access Control</CardTitle>
                            <CardDescription>Manage password policies and API access.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Minimum Password Length</Label>
                                <Input type="number" defaultValue="8" />
                            </div>
                            <div className="space-y-2">
                                <Label>Session Timeout (Minutes)</Label>
                                <Input type="number" defaultValue="30" />
                            </div>
                            <div className="pt-4">
                                <Button variant="outline" className="w-full sm:w-auto text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                                    Reset All User Sessions
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Profile Settings */}
                <TabsContent value="profile" className="mt-0">
                    <Card className="border-slate-200">
                        <CardHeader>
                            <CardTitle>Admin Profile</CardTitle>
                            <CardDescription>Update your personal admin account details.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Full Name</Label>
                                    <Input defaultValue="Admin User" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Email</Label>
                                    <Input defaultValue="admin@propertycab.in" disabled />
                                </div>
                                <div className="space-y-2">
                                    <Label>Current Password</Label>
                                    <Input type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label>New Password</Label>
                                    <Input type="password" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="bg-slate-50 border-t border-slate-100 flex justify-end py-4">
                            <Button onClick={handleSave}>Update Profile</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
