"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Search,
    MoreHorizontal,
    ShieldCheck,
    UserIcon,
    Ban,
    Check,
    Mail,
    Phone
} from 'lucide-react';
import { toast } from 'sonner';

// Mock Data
const mockUsers = [
    { id: 'USR-001', name: 'Alice Johnson', email: 'alice@example.com', role: 'Agent', status: 'Active', verified: true, joinDate: '2023-11-15', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice' },
    { id: 'USR-002', name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'Active', verified: false, joinDate: '2023-12-01', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob' },
    { id: 'USR-003', name: 'Charlie Brown', email: 'charlie@example.com', role: 'Agent', status: 'Pending Verification', verified: false, joinDate: '2024-01-10', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie' },
    { id: 'USR-004', name: 'David Lee', email: 'david@example.com', role: 'Admin', status: 'Active', verified: true, joinDate: '2023-08-20', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
    { id: 'USR-005', name: 'Eve Wilson', email: 'eve@example.com', role: 'User', status: 'Blocked', verified: false, joinDate: '2023-10-05', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Eve' },
    { id: 'USR-006', name: 'Frank Wright', email: 'frank@example.com', role: 'Agent', status: 'Active', verified: true, joinDate: '2024-01-05', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Frank' },
];

export default function AdminUsersPage() {
    const [users, setUsers] = useState(mockUsers);
    const [searchTerm, setSearchTerm] = useState('');

    const handleVerify = (id: string) => {
        setUsers(users.map(u => u.id === id ? { ...u, verified: true, status: 'Active' } : u));
        toast.success("Agent verified successfully");
    };

    const handleBlock = (id: string) => {
        setUsers(users.map(u => u.id === id ? { ...u, status: 'Blocked' } : u));
        toast.error("User blocked");
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Users & Agents</h1>
                    <p className="text-slate-500">Manage user roles, verify agents, and handle account statuses.</p>
                </div>
                <Button className="bg-slate-900 text-white hover:bg-slate-800">
                    <UserIcon className="w-4 h-4 mr-2" />
                    Invite User
                </Button>
            </div>

            <Card className="border-slate-200 shadow-sm">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search by name or email..."
                                className="pl-9 bg-slate-50 border-slate-200"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border border-slate-200 overflow-hidden">
                        <Table>
                            <TableHeader className="bg-slate-50">
                                <TableRow>
                                    <TableHead className="w-[300px]">User</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Joined</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers.map((user) => (
                                    <TableRow key={user.id} className="hover:bg-slate-50/50 transition-colors">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9 border border-slate-200">
                                                    <AvatarImage src={user.avatar} alt={user.name} />
                                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-slate-900 flex items-center gap-1">
                                                        {user.name}
                                                        {user.verified && <ShieldCheck className="w-3 h-3 text-blue-500" />}
                                                    </span>
                                                    <span className="text-xs text-slate-500">{user.email}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={user.role === 'Admin' ? 'default' : user.role === 'Agent' ? 'secondary' : 'outline'}>
                                                {user.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-green-500' :
                                                        user.status === 'Blocked' ? 'bg-red-500' : 'bg-amber-500'
                                                    }`} />
                                                <span className="text-sm font-medium text-slate-700">{user.status}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground text-sm">
                                            {user.joinDate}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        <Mail className="mr-2 h-4 w-4" /> Send Email
                                                    </DropdownMenuItem>

                                                    {user.role === 'Agent' && !user.verified && (
                                                        <DropdownMenuItem
                                                            className="cursor-pointer text-green-600 focus:text-green-700"
                                                            onClick={() => handleVerify(user.id)}
                                                        >
                                                            <Check className="mr-2 h-4 w-4" /> Verify Agent
                                                        </DropdownMenuItem>
                                                    )}

                                                    <DropdownMenuSeparator />

                                                    {user.status !== 'Blocked' && (
                                                        <DropdownMenuItem
                                                            className="cursor-pointer text-red-600 focus:text-red-700"
                                                            onClick={() => handleBlock(user.id)}
                                                        >
                                                            <Ban className="mr-2 h-4 w-4" /> Block Account
                                                        </DropdownMenuItem>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
