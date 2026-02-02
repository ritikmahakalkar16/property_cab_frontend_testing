import { Metadata } from "next";
import ProfileClient from "./ProfileClient";

export const metadata: Metadata = {
  title: "My Profile | PropertyCab - Manage Your Account",
  description: "Manage your PropertyCab account, view saved properties, and update your personal information.",
  keywords: ["user profile", "account settings", "saved properties", "property dashboard", "real estate account"],
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProfilePage() {
  return <ProfileClient />;
}