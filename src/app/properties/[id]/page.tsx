import { Metadata } from "next";
import PropertyClient, { Property, UnitConfiguration, ConnectivityItem, NearbyPlace } from "./PropertyClient";

// Helper to parse a raw BE property to FE Property type
// This duplicates logic from PropertyClient to ensure independent execution on server
const parseProperty = (prop: any): Property => ({
  id: prop._id,
  _id: prop._id,
  title: prop.title,
  description: prop.description,
  price: prop.price,
  address: prop.address,
  city: prop.city,
  state: prop.state,
  zip_code: prop.zipCode || "",
  country: "India",
  property_type: prop.propertySubType || prop.propertyType,
  listing_type: prop.saleType,
  bedrooms: prop.bedrooms || 0,
  bathrooms: prop.bathrooms || 0,
  area: prop.builtUpArea || 0,
  images: prop.images || [],
  floor_plans: prop.floorPlans || [],
  features: prop.amenities || [],
  latitude: prop.latitude || null,
  longitude: prop.longitude || null,
  views: prop.viewsCount || 0,
  status: prop.status,
  created_at: prop.createdAt,
  agent_id: prop.agent?._id || prop.agent,
  furnishing: prop.furnishing || undefined,
  facing: null,
  parking_spaces: prop.parking || null,
  rooms: null,
  floors: prop.floors || null,
  video_url: prop.video || null,
  cover_image: `${process.env.NEXT_PUBLIC_API_BASE_URL}${prop.coverImage}` || null,
  shops_count: null,
  office_spaces: null,
  age_of_property: null,
  is_project: false,
  project_name: null,
  total_towers: null,
  total_units: null,
  rera_number: null,
  possession_date: prop.possessionDate || null,
  construction_status: prop.possessionStatus || null,
  unit_configurations: [],
  connectivity: [],
  nearby_places: [],
  project_highlights: prop.highlights || [],
});

async function getPropertyData(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/properties/${id}`,
      { cache: "no-store" } // Ensure we get fresh data
    );

    if (!res.ok) return null;

    const result = await res.json();
    const property = parseProperty(result.data);

    let recentProperties: Property[] = [];
    if (result.recentProperties && Array.isArray(result.recentProperties)) {
      recentProperties = result.recentProperties.map(parseProperty);
    }

    return { property, recentProperties };
  } catch (error) {
    console.error("Error fetching property data:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const data = await getPropertyData(id);

  if (!data || !data.property) {
    return {
      title: "Property Not Found | PropertyCab",
      description: "The requested property could not be found.",
    };
  }

  const { property } = data;
  const priceFormatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(property.price);

  const title = `${property.title} in ${property.city} | ${property.listing_type === 'rent' ? 'Rent' : 'Buy'} for ${priceFormatted} - PropertyCab`;
  const description = `${property.bedrooms ? property.bedrooms + ' BHK ' : ''}${property.property_type} available for ${property.listing_type} in ${property.address}, ${property.city}. Price: ${priceFormatted}. View details, photos, and contact agent on PropertyCab.`;

  const imageUrl = property.images && property.images.length > 0
    ? (property.images[0].startsWith('http') ? property.images[0] : `${process.env.NEXT_PUBLIC_API_BASE_URL}${property.images[0]}`)
    : "https://propertycab.in/og-image.jpg"; // Fallback

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://propertycab.in/properties/${property.id}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: property.title,
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

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getPropertyData(id);

  return <PropertyClient initialData={data} />;
}