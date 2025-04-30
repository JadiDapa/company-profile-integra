import { NextRequest, NextResponse } from "next/server";
import { fileUpload } from "@/lib/utils/file-upload";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const result = await prisma.activity.findMany({
      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!", error },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string;
    const image = formData.get("image") as File;

    let filePath: string | null = null;

    if (image && image.name) {
      const filename = await fileUpload(image, "uploads");
      filePath = `${process.env.NEXT_PUBLIC_BASE_URL}/api/images/${filename}`;
    }

    const result = await prisma.activity.create({
      data: {
        title: title,
        slug: slug,
        content: content,
        category: category,
        image: filePath as string,
      },
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
    }
    return NextResponse.json(
      { message: "Something went wrong!", error },
      { status: 500 },
    );
  }
}
