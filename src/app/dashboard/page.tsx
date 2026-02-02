"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
    const { user, userRole, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth');
            return;
        }

        if (!loading && userRole) {
            switch (userRole) {
                case 'admin':
                    router.push('/dashboard/admin');
                    break;
                case 'agent':
                    router.push('/dashboard/agent');
                    break;
                case 'user':
                    router.push('/dashboard/user');
                    break;
            }
        }
    }, [user, userRole, loading, router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    );
};

export default Dashboard;
