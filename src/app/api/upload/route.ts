import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    // Simulate file upload - return a dummy URL
    return NextResponse.json({
        url: `/uploads/dummy_${Date.now()}.jpg`,
        success: true
    });
}
