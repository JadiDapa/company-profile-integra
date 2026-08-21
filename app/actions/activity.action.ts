"use server";

import { ActivityService } from "@/lib/services/activity.service";
import {
  CreateActivitySchema,
  UpdateActivitySchema,
} from "@/lib/validators/activity.validator";
import { revalidatePath } from "next/cache";
import z from "zod";
import { requireRole } from "@/lib/auth";
import { createMedia } from "./media.action";
import { MediaTable, MediaType } from "@/generated/prisma";

export async function getAllActivities() {
  return await ActivityService.getAll();
}

export async function getActivityById(id: number) {
  return await ActivityService.getById(id);
}

export async function getActivityBySlug(slug: string) {
  return await ActivityService.getBySlug(slug);
}

export async function createActivity({
  activity,
  file,
}: {
  activity: z.input<typeof CreateActivitySchema>;
  file?: File;
}) {
  await requireRole("ADMIN");

  const data = CreateActivitySchema.parse({ ...activity });

  const created = await ActivityService.create(data);

  if (file) {
    await createMedia({
      entityId: created.id,
      file,
      mediaTable: MediaTable.ACTIVITY,
      mediaType: MediaType.IMAGE,
      description: "Activity cover image",
    });
  }

  revalidatePath("/activities");
  revalidatePath("/dashboard/activities");
}

export async function updateActivity(
  activityId: number,
  {
    activity,
    file,
  }: {
    activity: z.input<typeof UpdateActivitySchema>;
    file?: File;
  },
) {
  await requireRole("ADMIN");

  const data = UpdateActivitySchema.parse(activity);

  await ActivityService.update(activityId, {
    ...data,
  });

  if (file) {
    await createMedia({
      entityId: activityId,
      file,
      mediaTable: MediaTable.ACTIVITY,
      mediaType: MediaType.IMAGE,
      description: "Activity cover image",
    });
  }

  revalidatePath("/activities");
  revalidatePath("/dashboard/activities");
}

export async function deleteActivity(activityId: number) {
  await requireRole("ADMIN");

  await ActivityService.delete(activityId);

  revalidatePath("/activities");
  revalidatePath("/dashboard/activities");
}
