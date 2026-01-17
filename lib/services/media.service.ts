import { MediaTable, MediaType, Prisma } from "@/generated/prisma/client";
import path from "path";
import { prisma } from "@/lib/prisma";
import { BASE_DIR, saveFile } from "@/lib/upload";
import fs from "fs/promises";

export type MediaListOptions = {
  page?: number;
  pageSize?: number;
  search?: string;
  orderBy?: Prisma.MediaOrderByWithRelationInput;
};

export const MediaService = {
  async upload({
    entityId,
    file,
    mediaTable,
    mediaType,
    description,
  }: {
    entityId: number;
    file: File;
    mediaTable: MediaTable;
    mediaType: MediaType;
    description?: string;
  }) {
    const dir = path.join(BASE_DIR, mediaTable.toLowerCase());

    const saved = await saveFile({
      baseDir: dir,
      file,
    });

    return prisma.media.create({
      data: {
        entityId: entityId,
        url: `/media/${mediaTable.toLowerCase()}/${saved.filename}`,
        filename: saved.filename,
        mimeType: saved.mimeType,
        size: saved.size,
        mediaTable,
        mediaType,
        description,
      },
    });
  },

  async uploadMany({
    entityId,
    files,
    mediaTable,
    mediaType,
    description,
  }: {
    entityId: number;
    files: File[];
    mediaTable: MediaTable;
    mediaType: MediaType;
    description?: string;
  }) {
    const dir = path.join(BASE_DIR, mediaTable.toLowerCase());

    const results = [];

    for (const file of files) {
      const saved = await saveFile({
        baseDir: dir,
        file,
      });

      const media = await prisma.media.create({
        data: {
          entityId,
          url: `/media/${mediaTable.toLowerCase()}/${saved.filename}`,
          filename: saved.filename,
          mimeType: saved.mimeType,
          size: saved.size,
          mediaTable,
          mediaType,
          description,
        },
      });

      results.push(media);
    }

    return results;
  },

  async delete(mediaId: number) {
    const media = await prisma.media.findUnique({
      where: { id: mediaId },
    });

    if (!media) {
      throw new Error("Media not found");
    }

    const filePath = path.join(
      BASE_DIR,
      media.mediaTable.toLowerCase(),
      media.filename as string,
    );

    await prisma.media.delete({
      where: { id: mediaId },
    });

    // 🔹 Delete file (ignore if missing)
    try {
      await fs.unlink(filePath);
    } catch (err: unknown) {
      if (err instanceof Error && "code" in err && err.code !== "ENOENT") {
        throw err;
      }
    }
  },
};
