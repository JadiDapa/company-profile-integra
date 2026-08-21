"use server";

import { GalleryService } from "@/lib/services/gallery.service";
import {
  CreateGallerySchema,
  UpdateGallerySchema,
} from "@/lib/validators/gallery.validator";
import { revalidatePath } from "next/cache";
import z from "zod";
import { createMedia } from "./media.action";
import { MediaTable, MediaType } from "@/generated/prisma";
import { requireRole } from "@/lib/auth";

export async function getAllGalleries() {
  return await GalleryService.getAll();
}

export async function getGalleryById(id: number) {
  return await GalleryService.getById(id);
}

export async function createGallery({
  gallery,
  file,
}: {
  gallery: z.input<typeof CreateGallerySchema>;
  file: File;
}) {
  await requireRole("ADMIN");

  const data = CreateGallerySchema.parse({ ...gallery });

  const created = await GalleryService.create(data);

  await createMedia({
    entityId: created.id,
    file,
    mediaTable: MediaTable.GALLERY,
    mediaType: MediaType.IMAGE,
    description: "Evidence Submission",
  });

  revalidatePath("/gallery");
  revalidatePath("/dashboard/galleries");
}

export async function updateGallery(
  galleryId: number,
  input: z.input<typeof UpdateGallerySchema>,
) {
  await requireRole("ADMIN");

  const data = UpdateGallerySchema.parse(input);

  await GalleryService.update(galleryId, {
    ...data,
  });

  revalidatePath("/gallery");
  revalidatePath("/dashboard/galleries");
}

export async function deleteGallery(galleryId: number) {
  await requireRole("ADMIN");

  await GalleryService.delete(galleryId);

  revalidatePath("/gallery");
  revalidatePath("/dashboard/galleries");
}
