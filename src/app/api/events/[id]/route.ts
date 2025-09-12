import { NextRequest, NextResponse } from "next/server";
import eventApi from "~/apiRequest/event";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const cookie = request.headers.get("cookie");

    const { id } = await params;

    // Gọi backend API với cookie
    try {
        const res = await eventApi.getDetailEvent(+id, {
            Cookie: cookie || "",
        });
        return NextResponse.json(res.data, { status: res.status });
    } catch {
        return NextResponse.json({ error: "Failed to fetch event details" }, { status: 500 });
    }
}
