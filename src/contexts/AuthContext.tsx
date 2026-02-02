"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, AppRole } from "@/types";
import authApi from "@/lib/authApi";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  userRole: AppRole | null;
  loading: boolean;
  signUp: (
    email: string,
    name: string,
    role?: string,
    contact_no?: string
  ) => Promise<{ error: any }>;
  sendOtp: (email: string) => Promise<{ error: any }>;
  loginWithOtp: (email: string, otp: string, name?: string, role?: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  interestedPropIds: Set<string>;
  toggleInterest: (id: string) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [interestedPropIds, setInterestedPropIds] = useState<Set<string>>(new Set());
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const data = await authApi.me();

      if (data.data) {
        // Map the backend user format to our User type
        const mappedUser: User = {
          id: data.data.id,
          email: data.data.email,
          full_name: data.data.name || null,
          phone: data.data.contact_no || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          email_verified: !!data.data.email_verified,
        };
        setUser(mappedUser);

        // Set role from the user object (comes from JWT)
        if (data.data.role) {
          setUserRole(data.data.role as AppRole);
        }
      }
    } catch (error: any) {
      // Only log out if server truly says unauthorized after refresh
      if (error?.status === 401 || error?.status === 403) {
        setUser(null);
        setUserRole(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, name: string, role?: string, contact_no?: string) => {
    try {
      const response = await authApi.register({
        name,
        email,
        role,
        contact_no,
      });

      if (response.status === "success") {
        // Registration successful, user created and OTP sent
        // Don't set user state yet, user needs to verify OTP first
        return { error: null };
      }

      return { error: { message: response.message || "Failed to sign up" } };
    } catch (error: any) {
      return { error: { message: error.message || "Failed to sign up" } };
    }
  };

  const sendOtp = async (email: string) => {
    try {
      const response = await authApi.sendOtp({ email });

      if (response.status === "success") {
        return { error: null };
      }

      return { error: { message: response.message || "Failed to send OTP" } };
    } catch (error: any) {
      return { error: { message: error.message || "Failed to send OTP" } };
    }
  };

  const loginWithOtp = async (email: string, otp: string, name?: string, role?: string) => {
    try {
      const response = await authApi.loginWithOtp({
        email,
        otp,
        name,
        role,
      });

      // Successful authentication - user is now logged in
      if (response.status === "success" && response.data?.id) {
        const mappedUser: User = {
          id: response.data.id,
          email: response.data.email,
          full_name: name || response.data.name || null,
          phone: response.data.contact_no || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          email_verified: true,
        };

        setUser(mappedUser);

        if (response.data?.role) {
          setUserRole(response.data?.role as AppRole);
        }

        return { error: null };
      }

      return { error: { message: response.message || "Failed to sign in" } };
    } catch (error: any) {
      return { error: { message: error.message || "Failed to sign in" } };
    }
  };

  const signOut = async () => {
    try {
      await authApi.logout();
      setUser(null);
      setUserRole(null);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
      // Clear local state even if API call fails
      setUser(null);
      setUserRole(null);
      router.push("/");
    }
  };

  const fetchInterestedProperties = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/properties/interested/me`, {
        credentials: 'include'
      });
      if (res.ok) {
        const data = await res.json();
        // data.data is array of objects { property: { _id: "..." } }
        // Ensure property exists before accessing _id
        const ids = new Set(data.data.map((item: any) => item.property?._id).filter(Boolean));
        setInterestedPropIds(ids as Set<string>);
      }
    } catch (e) {
      console.error("Failed to fetch favorites", e);
    }
  };

  useEffect(() => {
    if (user) {
      fetchInterestedProperties();
    } else {
      setInterestedPropIds(new Set());
    }
  }, [user]);

  const toggleInterest = async (id: string) => {
    if (!user) {
      toast.error("Please log in to save properties");
      return;
    }

    const isLiked = interestedPropIds.has(id);
    const newSet = new Set(interestedPropIds);
    if (isLiked) newSet.delete(id);
    else newSet.add(id);
    setInterestedPropIds(newSet); // Optimistic

    try {
      const method = isLiked ? 'DELETE' : 'POST';
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/properties/interested/${id}`, {
        method,
        credentials: 'include'
      });
      if (!res.ok) throw new Error("Failed");

      toast.success(isLiked ? "Removed from favorites" : "Added to favorites");
    } catch (e) {
      setInterestedPropIds(interestedPropIds); // Revert
      toast.error("Failed to update favorite");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, userRole, loading, signUp, sendOtp, loginWithOtp, signOut, interestedPropIds, toggleInterest, refreshUser: checkUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
