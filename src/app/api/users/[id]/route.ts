import { NextRequest, NextResponse } from "next/server";
import { dummyUsers } from "@/lib/dummyData";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const user = dummyUsers.find(u => u.id === id || u._id === id || u.uuid === id);

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
}
