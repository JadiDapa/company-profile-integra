"use server";

import { MediaTable, MediaType } from "@/generated/prisma";
import { MediaService } from "@/lib/services/media.service";
import { revalidatePath } from "next/cache";

// export async function getAllMedia() {
//   return await MediaService.getAll();
// }

// export async function getMediaById(id: string) {
//   return await MediaService.getById(id);
// }

export async function createMedia({
  entityId,
  file,
  mediaTable,
  mediaType,
  description,
  revalidate,
}: {
  entityId: number;
  file: File;
  mediaTable: MediaTable;
  mediaType: MediaType;
  description?: string;
  revalidate?: string;
}) {
  if (!file) throw new Error("No file provided");

  const media = await MediaService.upload({
    entityId: entityId,
    file,
    mediaTable,
    mediaType,
    description,
  });

  if (revalidate) {
    revalidatePath(revalidate);
  }

  return media;
}

export async function createManyMedia({
  entityId,
  files,
  mediaTable,
  mediaType,
  description,
  revalidate,
}: {
  entityId: number;
  files: File[];
  mediaTable: MediaTable;
  mediaType: MediaType;
  description?: string;
  revalidate?: string;
}) {
  if (!files || files.length === 0) {
    throw new Error("No files provided");
  }

  const results = [];

  for (const file of files) {
    const media = await MediaService.upload({
      entityId: entityId,
      file,
      mediaTable,
      mediaType,
      description,
    });

    results.push(media);
  }

  if (revalidate) {
    revalidatePath(revalidate);
  }

  return results;
}

export async function deleteMedia({
  mediaId,
  revalidate,
}: {
  mediaId: number;
  revalidate?: string;
}) {
  await MediaService.delete(mediaId);

  if (revalidate) {
    revalidatePath(revalidate);
  }

  return true;
}
