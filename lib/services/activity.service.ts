import { MediaType, Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import {
  ActivitySearchSchema,
  ActivityType,
  type CreateActivityDTO,
  type UpdateActivityDTO,
} from "../validators/activity.validator";
import { attachMedia } from "../attachMedia";

export type ActivityListOptions = {
  page?: number;
  pageSize?: number;
  search?: string;
  orderBy?: Prisma.ActivityOrderByWithRelationInput;
};

export const ActivityService = {
  async list(options: ActivityListOptions = {}) {
    const { page, pageSize, search } = ActivitySearchSchema.parse(options);

    const where: Prisma.ActivityWhereInput | undefined = search
      ? { id: { contains: search, mode: "insensitive" } }
      : undefined;

    const orderBy = options.orderBy ?? { createdAt: "desc" };

    const [data, total] = await Promise.all([
      prisma.activity.findMany({
        where,
        take: pageSize,
        skip: (page - 1) * pageSize,
        orderBy,
      }),
      prisma.activity.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  },

  async getAll(): Promise<ActivityType[]> {
    const activities = await prisma.activity.findMany();

    const activitiesWithMedia = await attachMedia(activities, "ACTIVITY");

    return activitiesWithMedia.map((a) => ({
      ...a,
      image: a.media.find((m) => m.mediaType === MediaType.IMAGE) ?? null,
    }));
  },

  async getById(id: number): Promise<ActivityType | null> {
    const activity = await prisma.activity.findUnique({ where: { id } });
    if (!activity) return null;

    const [activityWithMedia] = await attachMedia([activity], "ACTIVITY");

    return {
      ...activityWithMedia,
      image:
        activityWithMedia.media.find((m) => m.mediaType === MediaType.IMAGE) ??
        null,
    };
  },

  async create(data: CreateActivityDTO) {
    return prisma.activity.create({
      data: {
        category: data.category,
        content: data.content,
        title: data.title,
        slug: data.slug,
      },
    });
  },

  async update(id: number, data: UpdateActivityDTO) {
    return prisma.activity.update({
      where: { id },
      data,
    });
  },

  async delete(id: number) {
    return prisma.activity.delete({ where: { id } });
  },
};
