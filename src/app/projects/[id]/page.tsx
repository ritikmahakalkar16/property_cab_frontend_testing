import { Metadata } from "next";
import ProjectClient, { Property, UnitConfiguration, ConnectivityItem, NearbyPlace } from "./ProjectClient";

// Helper to parse a raw BE project to FE Property type
// This duplicates logic from ProjectClient to ensure independent execution on server
const parseProject = (t: any): Property => ({
  id: t._id,
  title: t.title || t.name,
  description: t.description,
  price: t.startingPrice || 0,

  address: t.address,
  city: t.city,
  state: t.state,
  zip_code: t.zipCode || "",
  country: "India",

  // These are not relevant for projects but required by interface
  property_type: "Project",
  listing_type: "sale",
  bedrooms: 0,
  bathrooms: 0,
  area: t.totalArea || 0,

  images: t.images || [],
  floor_plans: t.floorPlans || [],
  features: [],

  latitude: t.latitude || null,
  longitude: t.longitude || null,
  views: 0,
  status: "active",
  created_at: t.createdAt,

  agent_id: t.agent,
  furnishing: null,
  facing: null,
  parking_spaces: null,
  rooms: null,
  floors: null,
  video_url: t.video || null,
  cover_image: t.coverImage || null,
  shops_count: null,
  office_spaces: null,
  age_of_property: null,


  is_project: true,
  project_name: t.name,
  total_towers: t.totalTowers || null,
  total_units: t.totalUnits || null,
  rera_number: t.reraNumber || null,
  possession_date: t.possessionDate || null,
  construction_status: t.constructionStatus || null,
  unit_configurations: t.unitConfigurations || [],
  connectivity: t.connectivity || [],
  nearby_places: t.nearbyPlaces || [],
  project_highlights: t.highlights || [],
});

async function getProjectData(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/township/${id}`,
      { cache: "no-store" } // Ensure we get fresh data
    );

    if (!res.ok) return null;

    const result = await res.json();
    const project = parseProject(result.data);

    return { project };
  } catch (error) {
    console.error("Error fetching project data:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const data = await getProjectData(id);

  if (!data || !data.project) {
    return {
      title: "Project Not Found | PropertyCab",
      description: "The requested project/township could not be found.",
    };
  }

  const { project } = data;
  const priceFormatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(project.price);

  const title = `${project.title} - New Project in ${project.city} | Starting ${priceFormatted} | PropertyCab`;
  const description = `Discover ${project.title}, a premium project in ${project.address}, ${project.city}. Offering ${project.unit_configurations && project.unit_configurations.length > 0 ? project.unit_configurations.map(u => u.type).join(', ') : 'luxury apartments'}. Price starts at ${priceFormatted}. RERA: ${project.rera_number || 'N/A'}. Details, Floor Plans & Location.`;

  const imageUrl = project.images && project.images.length > 0
    ? (project.images[0].startsWith('http') ? project.images[0] : `${process.env.NEXT_PUBLIC_API_BASE_URL}${project.images[0]}`)
    : "https://propertycab.in/og-image.jpg"; // Fallback

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://propertycab.in/projects/${project.id}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getProjectData(id);

  return <ProjectClient initialData={data?.project} />;
}
