export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth";

const MEDIA_ROOT = path.join(process.cwd(), "media");

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path: mediaPath } = await context.params;

  if (mediaPath.some((segment) => segment.includes("..") || segment === "")) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  const filePath = path.join(MEDIA_ROOT, ...mediaPath);

  if (!filePath.startsWith(MEDIA_ROOT + path.sep)) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  const url = "/media/" + mediaPath.join("/");

  const media = await prisma.media.findFirst({ where: { url } });

  if (!media) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  // Gallery/Activity images are public marketing content; anything attached
  // to a ticket (customer submissions, technician evidence) is only visible
  // to signed-in staff/the ticket's owner-adjacent flows, so gate on auth.
  if (media.mediaTable === "TICKET") {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const file = await fs.readFile(filePath);

    const cacheControl =
      media.mediaTable === "TICKET"
        ? "private, max-age=86400"
        : "public, max-age=86400";

    return new NextResponse(file, {
      headers: {
        "Content-Type": media.mimeType || "application/octet-stream",
        "Cache-Control": cacheControl,
      },
    });
  } catch (err) {
    console.error("FILE ERROR:", err);
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
