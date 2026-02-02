import { NextRequest, NextResponse } from "next/server";
import { dummyProperties } from "@/lib/dummyData";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const property = dummyProperties.find(p => p.id === id || p._id === id);

    if (!property) {
        return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }
    return NextResponse.json(property);
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const body = await req.json();
        const propertyIndex = dummyProperties.findIndex(p => p.id === id || p._id === id);

        if (propertyIndex === -1) {
            return NextResponse.json({ error: "Property not found" }, { status: 404 });
        }

        // Simulate updating the property
        const updatedProperty = {
            ...dummyProperties[propertyIndex],
            ...body,
            updatedAt: new Date().toISOString()
        };

        return NextResponse.json(updatedProperty);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update property" }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const propertyIndex = dummyProperties.findIndex(p => p.id === id || p._id === id);

    if (propertyIndex === -1) {
        return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    // Simulate deletion
    return NextResponse.json({ message: "Property deleted successfully" });
}
