import { MediaType, Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import {
  GallerySearchSchema,
  GalleryWithImage,
  type CreateGalleryDTO,
  type UpdateGalleryDTO,
} from "../validators/gallery.validator";
import { attachMedia } from "../attachMedia";

export type GalleryListOptions = {
  page?: number;
  pageSize?: number;
  search?: string;
  orderBy?: Prisma.GalleryOrderByWithRelationInput;
};

export const GalleryService = {
  async list(options: GalleryListOptions = {}) {
    const { page, pageSize, search } = GallerySearchSchema.parse(options);

    const where: Prisma.GalleryWhereInput | undefined = search
      ? { id: { contains: search, mode: "insensitive" } }
      : undefined;

    const orderBy = options.orderBy ?? { createdAt: "desc" };

    const [data, total] = await Promise.all([
      prisma.gallery.findMany({
        where,
        take: pageSize,
        skip: (page - 1) * pageSize,
        orderBy,
      }),
      prisma.gallery.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  },

  async getAll(): Promise<GalleryWithImage[]> {
    const galleries = await prisma.gallery.findMany();

    const galleriesWithMedia = await attachMedia(galleries, "GALLERY");

    return galleriesWithMedia.map((g) => ({
      ...g,
      image: g.media.find((m) => m.mediaType === MediaType.IMAGE) ?? null,
    }));
  },

  async getById(id: number): Promise<GalleryWithImage | null> {
    const gallery = await GalleryService.getById(id);
    if (!gallery) return null;

    const [galleryWithMedia] = await attachMedia([gallery], "GALLERY");

    return {
      ...galleryWithMedia,
      image:
        galleryWithMedia.media.find((m) => m.mediaType === MediaType.IMAGE) ??
        null,
    };
  },

  async create(data: CreateGalleryDTO) {
    return prisma.gallery.create({ data });
  },

  async update(id: number, data: UpdateGalleryDTO) {
    return prisma.gallery.update({
      where: { id },
      data,
    });
  },

  async delete(id: number) {
    return prisma.gallery.delete({ where: { id } });
  },
};
