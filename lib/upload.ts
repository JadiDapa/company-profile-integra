import path from "path";
import crypto from "crypto";
import fs from "fs/promises";
import sharp from "sharp";

export const BASE_DIR = path.join(process.cwd(), "media");

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
]);

export async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

function isImage(mimeType: string) {
  return mimeType.startsWith("image/");
}

export async function saveFile({
  baseDir,
  file,
}: {
  baseDir: string; // absolute
  file: File;
}) {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File is too large (max 10MB)");
  }

  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    throw new Error(`File type "${file.type}" is not allowed`);
  }

  await ensureDir(baseDir);

  const isImg = isImage(file.type);
  const ext = isImg ? ".jpg" : path.extname(file.name);
  const filename = `${crypto.randomUUID()}${ext}`;
  const filepath = path.join(baseDir, filename);

  const buffer = Buffer.from(await file.arrayBuffer());

  let finalBuffer: Buffer = buffer;
  let mimeType = file.type;

  if (isImg) {
    finalBuffer = await sharp(buffer)
      .rotate()
      .resize({ width: 1920, withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toBuffer();

    mimeType = "image/jpeg";
  }

  await fs.writeFile(filepath, finalBuffer);

  return {
    filename,
    path: path.relative(BASE_DIR, filepath),
    mimeType,
    size: finalBuffer.length,
  };
}
