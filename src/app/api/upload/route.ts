import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
        return NextResponse.json({ error: "No file" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Thư mục lưu file
    const uploadDir = path.join(process.cwd(), "public", "images", "events");
    await mkdir(uploadDir, { recursive: true });

    // Tạo tên file an toàn (tránh đụng)
    const ext = path.extname(file.name);
    const fileName = `${randomUUID()}${ext}`;
    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, buffer);

    return NextResponse.json({ url: `/images/events/${fileName}` });
}
