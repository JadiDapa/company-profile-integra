export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path: mediaPath } = await context.params;

  const filePath = path.join(process.cwd(), "media", ...mediaPath);

  try {
    const file = await fs.readFile(filePath);

    return new NextResponse(file, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (err) {
    console.error("FILE ERROR:", err);
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
