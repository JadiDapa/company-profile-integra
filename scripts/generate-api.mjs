#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get CLI args
const [routeName, modelName, parameterName] = process.argv.slice(2);

if (!routeName || !modelName || !parameterName) {
  console.error("❌ Usage: <routeName> <modelName> <parameterName>");
  process.exit(1);
}

// Paths
const apiDir = path.resolve(__dirname, `../app/api/${routeName}s`);
const libDir = path.resolve(__dirname, `../lib`);

const paths = {
  normalRoute: path.join(apiDir, "route.ts"),
  parameterRoute: path.join(apiDir, `[${parameterName}]`, "route.ts"),
  networkFile: path.join(libDir, "networks", `${routeName}.tsx`),
  typeFile: path.join(libDir, "types", `${routeName}.ts`),
};

const normalRouteTemplate = () => `
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET() {
  try {
    const result = await prisma.${modelName}.findMany({
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
    const data = await req.json();

    if (!Array.isArray(data)) {
      return NextResponse.json(
        { message: "Invalid data format. Expected an array." },
        { status: 400 },
      );
    }

    const result = await prisma.${modelName}.createMany({
      data,
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
`;

const parameterRouteTemplate = () => `
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { ${routeName}: string } },
) {
  try {
    const ${routeName} = params.${routeName};
    const result = await prisma.${modelName}.findUnique({
      where: {
        id: ${routeName},
      },
      include: {
        Item: true,
      },
    });
    return NextResponse.json(result, { status: 200 });
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

export async function PUT(
  req: Request,
  { params }: { params: { ${routeName}: string } },
) {
  try {
    const ${routeName} = params.${routeName};
    const data = await req.json();

    const result = await prisma.${modelName}.update({
      where: {
        id: ${routeName},
      },
      data: data,
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

export async function DELETE(
  request: Request,
  { params }: { params: { ${routeName}: string } },
) {
  try {
    const ${routeName} = params.${routeName};
    const result = await prisma.${modelName}.delete({
      where: {
        id: ${routeName},
      },
    });
    return NextResponse.json(result, { status: 200 });
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
`;

const networkTemplate = () => `
import { ${modelName}Type, Create${modelName}Type } from "../types/${routeName}";
import { axiosInstance } from "./axiosInstance";

export async function getAll${modelName}s() {
  const { data } = await axiosInstance.get<${modelName}Type[]>("/${routeName}s");
  return data;
}

export async function get${modelName}ById(id: string) {
  const { data } = await axiosInstance.get<${modelName}Type>("/${routeName}s/" + id);
  return data;
}

export async function create${modelName}(values: Create${modelName}Type) {
  const { data } = await axiosInstance.post("/${routeName}s", values);
  return data;
}

export async function update${modelName}(id: string, values: Create${modelName}Type) {
  const { data } = await axiosInstance.put("/${routeName}s/" + id, values);

  return data;
}

export async function delete${modelName}(id: string) {
  const { data } = await axiosInstance.delete("/${routeName}s/" + id);
  return data;
}

`;

const typeTemplate = () => `import { ItemType } from "./item";

export interface BrandType {
  id: string;
  field: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBrandType {
  name: string;
  slug: string;
  image?: string | File;
  detail?: string;
}
`;

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content.trimStart(), "utf8");
  console.log(`✅ Created: ${filePath.replace(__dirname + "/../", "")}`);
}

// --- Main Execution ---
function generateApiFiles() {
  writeFile(paths.normalRoute, normalRouteTemplate());
  writeFile(paths.parameterRoute, parameterRouteTemplate());
  writeFile(paths.networkFile, networkTemplate());
  writeFile(paths.typeFile, typeTemplate());
}

generateApiFiles();
