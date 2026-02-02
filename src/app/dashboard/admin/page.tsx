"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Users,
    Building2,
    TrendingUp,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    Activity,
    CalendarCheck,
    Eye,
    Star,
    ShieldCheck,
    Clock
} from 'lucide-react';
import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    CartesianGrid,
    BarChart,
    Bar,
    Legend
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

// Mock Data for Charts
const revenueData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
    { name: 'Jul', value: 3490 },
    { name: 'Aug', value: 4200 },
    { name: 'Sep', value: 5500 },
    { name: 'Oct', value: 6100 },
    { name: 'Nov', value: 5900 },
    { name: 'Dec', value: 7200 },
];

const categoryViewsData = [
    { name: 'Villas', views: 12500 },
    { name: 'Apartments', views: 8900 },
    { name: 'Plots', views: 5600 },
    { name: 'Commercial', views: 3200 },
    { name: 'Farm House', views: 1800 },
];

const mostViewedProperty = {
    id: 'PROP-009',
    title: 'Grand Palace Estate',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80',
    views: 4521,
    location: 'Mumbai, MH',
    price: '$2.5M'
};

const mostViewedProject = {
    id: 'PROJ-101',
    title: 'Skyline Heights',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
    views: 8900,
    location: 'Bangalore, KA',
    units: 156
};

const recentlyVerifiedData = [
    { id: '1', title: 'Sunshine Villa', agent: 'Alice Smith', date: '2 hrs ago' },
    { id: '2', title: 'Urban Loft 2BHK', agent: 'Bob Jones', date: '5 hrs ago' },
    { id: '3', title: 'Commercial Space', agent: 'Charlie Day', date: '1 day ago' },
];

const recentProjectsData = [
    { id: '1', title: 'Green Valley', builder: 'Prestige Group', status: 'Ongoing' },
    { id: '2', title: 'Oceanic Towers', builder: 'Lodha Group', status: 'New Launch' },
    { id: '3', title: 'Tech Park Plaza', builder: 'Brigade', status: 'Completed' },
];

const AdminDashboard = () => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard Overview</h1>
                <p className="text-slate-500">Welcome back, here's the pulse of your real estate platform.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-white border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <DollarSign className="w-24 h-24" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Revenue</CardTitle>
                        <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center">
                            <DollarSign className="w-4 h-4 text-green-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">$45,231.89</div>
                        <div className="flex items-center text-xs mt-1 text-green-600 font-medium">
                            <ArrowUpRight className="w-3 h-3 mr-1" />
                            +20.1% from last month
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <Users className="w-24 h-24" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Active Users</CardTitle>
                        <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                            <Users className="w-4 h-4 text-blue-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">+2350</div>
                        <div className="flex items-center text-xs mt-1 text-green-600 font-medium">
                            <ArrowUpRight className="w-3 h-3 mr-1" />
                            +180.1% from last month
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <Building2 className="w-24 h-24" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Properties</CardTitle>
                        <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center">
                            <Building2 className="w-4 h-4 text-purple-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">+12,234</div>
                        <div className="flex items-center text-xs mt-1 text-slate-500 font-medium">
                            +19 new today
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <Activity className="w-24 h-24" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Active Sessions</CardTitle>
                        <div className="w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center">
                            <Activity className="w-4 h-4 text-orange-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">+573</div>
                        <div className="flex items-center text-xs mt-1 text-red-500 font-medium">
                            <ArrowDownRight className="w-3 h-3 mr-1" />
                            -4% since last hour
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Charts & Highlights */}
            <div className="grid gap-6 md:grid-cols-7">
                {/* Revenue Chart */}
                <Card className="md:col-span-4 lg:col-span-5 border-slate-200 shadow-sm">
                    <CardHeader>
                        <CardTitle>Revenue Overview</CardTitle>
                        <CardDescription>
                            Monthly revenue performance for the current year.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-0">
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={revenueData}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="name"
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `$${value}`}
                                    />
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        itemStyle={{ color: '#1e293b' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#2563eb"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorValue)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Popularity Highlights */}
                <div className="md:col-span-3 lg:col-span-2 space-y-6">
                    {/* Most Viewed Property */}
                    <Card className="border-slate-200 shadow-sm overflow-hidden h-fit">
                        <div className="relative h-32 w-full">
                            <img src={mostViewedProperty.image} alt="Most Viewed" className="w-full h-full object-cover" />
                            <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-md">
                                Most Viewed Property
                            </div>
                        </div>
                        <CardContent className="p-4">
                            <h3 className="font-bold text-slate-900 line-clamp-1">{mostViewedProperty.title}</h3>
                            <p className="text-xs text-slate-500 mb-2">{mostViewedProperty.location}</p>
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-blue-600">{mostViewedProperty.price}</span>
                                <div className="flex items-center gap-1 text-xs font-semibold text-slate-700">
                                    <Eye className="w-3 h-3" /> {mostViewedProperty.views.toLocaleString()}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Most Viewed Project */}
                    <Card className="border-slate-200 shadow-sm overflow-hidden h-fit">
                        <div className="relative h-32 w-full">
                            <img src={mostViewedProject.image} alt="Most Viewed Project" className="w-full h-full object-cover" />
                            <div className="absolute top-2 left-2 bg-purple-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-md">
                                Trending Project
                            </div>
                        </div>
                        <CardContent className="p-4">
                            <h3 className="font-bold text-slate-900 line-clamp-1">{mostViewedProject.title}</h3>
                            <p className="text-xs text-slate-500 mb-2">{mostViewedProject.location}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium">{mostViewedProject.units} Units</span>
                                <div className="flex items-center gap-1 text-xs font-semibold text-slate-700">
                                    <Eye className="w-3 h-3" /> {mostViewedProject.views.toLocaleString()}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Secondary Metrics Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Category Views Chart */}
                <Card className="border-slate-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg">Category Performance</CardTitle>
                        <CardDescription>Most viewed property categories</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={categoryViewsData} layout="vertical">
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px' }} />
                                    <Bar dataKey="views" fill="#0f172a" radius={[0, 4, 4, 0]} barSize={20} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Recently Verified */}
                <Card className="border-slate-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <ShieldCheck className="w-5 h-5 text-green-600" />
                            Recently Verified
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentlyVerifiedData.map((item) => (
                                <div key={item.id} className="flex items-start justify-between border-b border-slate-50 last:border-0 pb-3 last:pb-0">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                                        <p className="text-xs text-slate-500">Ag. {item.agent}</p>
                                    </div>
                                    <span className="text-[10px] font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-full">{item.date}</span>
                                </div>
                            ))}
                            <Button variant="ghost" size="sm" className="w-full text-xs mt-2" asChild>
                                <Link href="/dashboard/admin/properties">View All Verified</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Projects */}
                <Card className="border-slate-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Building2 className="w-5 h-5 text-blue-600" />
                            New Projects
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentProjectsData.map((item) => (
                                <div key={item.id} className="flex items-center justify-between border-b border-slate-50 last:border-0 pb-3 last:pb-0">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs">
                                            {item.title[0]}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                                            <p className="text-xs text-slate-500">{item.builder}</p>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="text-[10px] font-normal">{item.status}</Badge>
                                </div>
                            ))}
                            <Button variant="ghost" size="sm" className="w-full text-xs mt-2">
                                View All Projects
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;
