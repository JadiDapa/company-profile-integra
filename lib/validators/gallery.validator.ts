import { Gallery, Media } from "@/generated/prisma/client";
import { z } from "zod";

export type GalleryType = Gallery & {
  image: Media | null;
};

export const GallerySearchSchema = z.object({
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(20),
  search: z.string().min(1).max(64).optional(), // for ssid
});

export const GalleryBaseSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  slug: z.string().min(1, "Slug wajib diisi"),
});

export const CreateGallerySchema = GalleryBaseSchema;
export const UpdateGallerySchema = GalleryBaseSchema.partial();

export type CreateGalleryDTO = z.infer<typeof GalleryBaseSchema>;
export type UpdateGalleryDTO = z.infer<typeof UpdateGallerySchema>;
