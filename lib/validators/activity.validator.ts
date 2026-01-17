import { Activity, Media } from "@/generated/prisma/client";
import { z } from "zod";

export type ActivityType = Activity & {
  image: Media | null;
};

export const ActivitySearchSchema = z.object({
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(20),
  search: z.string().min(1).max(64).optional(), // for ssid
});

export const ActivityBaseSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  category: z.string().min(1, "Kategori wajib dipilih"),
  content: z.string().min(1, "Konten wajib diisi"),
  slug: z.string().min(1, "Slug wajib diisi"),
});

export const CreateActivitySchema = ActivityBaseSchema;
export const UpdateActivitySchema = ActivityBaseSchema.partial();

export type CreateActivityDTO = z.infer<typeof ActivityBaseSchema>;
export type UpdateActivityDTO = z.infer<typeof UpdateActivitySchema>;
