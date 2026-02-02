export type AppRole = "admin" | "agent" | "user";

export interface User {
  id: string;
  email: string;
  full_name?: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
  role?: AppRole;
  email_verified: boolean;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  created_at: string;
}

export interface Location {
  addressLine1?: string;
  addressLine2?: string;
  city: string;
  state?: string;
  country?: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
}

export interface Property {
  _id: string;
  title: string;
  description?: string;
  price: number;
  saleType?: "sale" | "rent";
  propertyType?: "apartment" | "villa" | "independent_house" | "plot" | "office" | "shop" | "other";
  bedrooms?: number;
  bathrooms?: number;
  balconies?: number;
  furnishing?: "furnished" | "semi-furnished" | "unfurnished";
  builtUpArea?: number;
  carpetArea?: number;
  location?: Location;
  images?: string[];
  agent?: string;
  status?: "pending" | "approved" | "rejected";
  isFeatured?: boolean;
  amenities?: string[];
  postedAt?: string;
  updatedAt?: string;
  // Legacy fields for backward compatibility
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zip_code?: string;
  property_type?: string;
  listing_type?: string;
  area?: number;
  features?: string[] | null;
  floor_plans?: string[] | null;
  latitude?: number | null;
  longitude?: number | null;
  agent_id?: string;
  views?: number | null;
  age_of_property?: string | null;
  construction_status?: string | null;
  facing?: string | null;
  floors?: number | null;
  office_spaces?: number | null;
  parking_spaces?: number | null;
  rooms?: number | null;
  shops_count?: number | null;
  video_url?: string | null;
  overview?: string | null;
  highlights?: string[] | null;
  developers?: string | null;
  parking?: string | null;
  towers?: string | null;
  possession_status?: string | null;
  possession_date?: string | null;
  brochure_url?: string | null;
  cover_image?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface Agent {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  agencyName: string;
  avatar?: string;
  bio: string;
  experienceYears: number;
  specializations: string[];
  operatingCities: string[];
  languages: string[];
  reraNumber: string;
  officeAddress: string;
  verificationStatus: string;
  commissionRate: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AuthSession {
  user: User;
  access_token: string;
  expires_at: number;
}
