import { Metadata } from "next";
import ProjectsClient, { Project } from "./ProjectsClient";

async function getProjects() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/township`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch projects");
      return [];
    }

    const data = await response.json();

    const typedData: Project[] = (data?.data || []).map((item: any) => ({
      id: item._id,
      title: item.title,
      name: item.name,

      price: item.startingPrice,

      address: item.address,
      city: item.city,
      state: item.state,

      images: item.images || [],

      coverImage: item.coverImage
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.coverImage}`
        : "/placeholder.svg",

      created_at: item.createdAt,
      is_project: true,

      totalTowers: item.totalTowers,
      totalUnits: item.totalUnits,

      rera_number: item.reraNumber,
      possessionDate: item.possessionDate,
      constructionStatus: item.constructionStatus,

      unitConfigurations: (item.unitConfigurations || []).map(
        (config: any) => ({
          type: config.type || "",
          area: config.area || config.size || "",
          price: config.price || "",
        }),
      ),
      highlights: item.highlights || [],
      listing_type: "sale" // Default for projects
    }));

    return typedData;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export const metadata: Metadata = {
  title: "Premium Residential Projects & Townships | PropertyCab",
  description: "Explore top-rated residential projects, townships, and new building developments. Find your dream home with world-class amenities and verified listings.",
  keywords: ["residential projects", "new townships", "apartments for sale", "real estate projects", "property investment", "housing societies"],
  openGraph: {
    title: "Premium Residential Projects & Townships | PropertyCab",
    description: "Discover exclusive residential projects and integrated townships. Verified listings, transparent pricing, and expert guidance.",
    url: "https://propertycab.in/projects",
    siteName: "PropertyCab",
    images: [
      {
        url: "https://propertycab.in/og-image-projects.jpg", // You might want to replace this with a real dynamic image or a static asset URL
        width: 1200,
        height: 630,
        alt: "PropertyCab Projects",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "New Projects & Townships | PropertyCab",
    description: "Find the best residential projects and townships in your city.",
  },
  alternates: {
    canonical: "/projects",
  }
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return <ProjectsClient initialProjects={projects} />;
}

// Force dynamic rendering since we are fetching data
export const dynamic = "force-dynamic";
