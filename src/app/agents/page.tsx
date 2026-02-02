import { Metadata } from "next";
import AgentsClient, { Agent } from "./AgentsClient";

async function getAgents() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/agents`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch agents");
      return [];
    }

    const data = await response.json();

    // Helper to handle avatar URL logic
    const getAvatarUrl = (avatarPath: string | null | undefined, seed: string) => {
      if (!avatarPath) return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
      if (avatarPath.startsWith('http')) return avatarPath;
      return `${process.env.NEXT_PUBLIC_API_BASE_URL}/${avatarPath}`;
    };

    const mappedAgents: Agent[] = (data.data || []).map((agent: any) => ({
      id: agent._id,
      name: agent.user?.name || agent.user?.email || "Agent",
      avatar: getAvatarUrl(agent.avatar, agent.user?.name || "Agent"),
      city: agent.operatingCities?.[0] || "Unknown",
      experience: agent.experienceYears ? `${agent.experienceYears} Years` : "N/A",
      rating: agent.verificationStatus === "approved" ? 5 : 4.5,
      reviews: 50 + Math.floor(parseInt(agent._id.substring(agent._id.length - 2), 16) / 2), // Deterministic pseudo-random based on ID
      specialization: agent.specializations || [],
      verified: agent.verificationStatus === "approved",
      phone: agent.phone || "+91 00000 00000",
      email: agent.user?.email || "",
      propertiesSold: 10 + Math.floor(parseInt(agent._id.substring(agent._id.length - 3), 16) / 5), // Deterministic pseudo-random
      description: agent.bio || agent.description || "Experienced real estate agent dedicated to helping you find your perfect property."
    }));

    return mappedAgents;
  } catch (error) {
    console.error("Error fetching agents:", error);
    return [];
  }
}

export const metadata: Metadata = {
  title: "Verified Real Estate Agents | PropertyCab",
  description: "Connect with top-rated and verified real estate agents in your city. Get expert guidance for buying, selling, and renting properties.",
  keywords: ["real estate agents", "property brokers", "buy property help", "sell property agent", "verified agents", "property consultants"],
  openGraph: {
    title: "Verified Real Estate Agents | PropertyCab",
    description: "Find trusted real estate professionals to help you navigate the property market with ease.",
    url: "https://propertycab.in/agents",
    siteName: "PropertyCab",
    images: [
      {
        url: "https://propertycab.in/og-image-agents.jpg",
        width: 1200,
        height: 630,
        alt: "PropertyCab Agents",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Top Real Estate Agents | PropertyCab",
    description: "Connect with verified agents for your real estate needs.",
  },
  alternates: {
    canonical: "/agents",
  }
};

export default async function AgentsPage() {
  const agents = await getAgents();

  return <AgentsClient initialAgents={agents} />;
}

// Force dynamic rendering since we are fetching data
export const dynamic = "force-dynamic";
