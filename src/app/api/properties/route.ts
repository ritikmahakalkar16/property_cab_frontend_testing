import { NextRequest, NextResponse } from "next/server";
import { dummyProperties } from "@/lib/dummyData";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const type = searchParams.get("type");
    const listingType = searchParams.get("listingType");
    const bhk = searchParams.get("bhk");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const city = searchParams.get("city");
    const status = searchParams.get("status");
    const agentId = searchParams.get("agent_id");
    const isProject = searchParams.get("is_project") === 'true';

    let filteredProperties = [...dummyProperties];

    // Apply filters
    if (status) {
        filteredProperties = filteredProperties.filter(p => p.status === status);
    }

    if (agentId) {
        filteredProperties = filteredProperties.filter(p => p.agent_id === agentId);
    }

    if (isProject) {
        filteredProperties = filteredProperties.filter(p => p.is_project === true);
    }

    if (listingType && listingType !== "all") {
        filteredProperties = filteredProperties.filter(p => p.listing_type === listingType);
    }

    if (type && type !== "all") {
        filteredProperties = filteredProperties.filter(p => p.property_type === type);
    }

    if (city && city !== "all") {
        filteredProperties = filteredProperties.filter(p => p.city.toLowerCase() === city.toLowerCase());
    }

    if (bhk && bhk !== "all") {
        if (bhk === "4+") {
            filteredProperties = filteredProperties.filter(p => p.bedrooms && p.bedrooms >= 4);
        } else {
            const bedroomCount = parseInt(bhk);
            filteredProperties = filteredProperties.filter(p => p.bedrooms === bedroomCount);
        }
    }

    if (minPrice || maxPrice) {
        filteredProperties = filteredProperties.filter(p => {
            const price = p.price;
            const min = minPrice ? parseInt(minPrice) : 0;
            const max = maxPrice ? parseInt(maxPrice) : Infinity;
            return price >= min && price <= max;
        });
    }

    const excludeId = searchParams.get("exclude");
    if (excludeId) {
        filteredProperties = filteredProperties.filter(p => p.id !== excludeId && p._id !== excludeId);
    }

    // Search filter
    if (search) {
        const searchLower = search.toLowerCase();
        filteredProperties = filteredProperties.filter(p =>
            p.title.toLowerCase().includes(searchLower) ||
            p.address.toLowerCase().includes(searchLower) ||
            p.city.toLowerCase().includes(searchLower) ||
            (p.project_name && p.project_name.toLowerCase().includes(searchLower))
        );
    }

    const limitIdx = parseInt(searchParams.get("limit") || "0");
    if (limitIdx > 0) {
        filteredProperties = filteredProperties.slice(0, limitIdx);
    }

    // Sort by createdAt descending
    filteredProperties.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json(filteredProperties);
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        // Simulate creating a new property
        const newProperty = {
            ...body,
            id: Date.now().toString(),
            _id: Date.now().toString(),
            status: 'pending',
            views: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        return NextResponse.json(newProperty, { status: 201 });
    } catch (error) {
        console.error("Error creating property:", error);
        return NextResponse.json({ error: "Failed to create property" }, { status: 500 });
    }
}
