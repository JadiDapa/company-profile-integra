"use server";

import { ActivityService } from "@/lib/services/activity.service";
import {
  CreateActivitySchema,
  UpdateActivitySchema,
} from "@/lib/validators/activity.validator";
import { revalidatePath } from "next/cache";
import z from "zod";

export async function getAllActivities() {
  return await ActivityService.getAll();
}

export async function getActivityById(id: number) {
  return await ActivityService.getById(id);
}

export async function createActivity(
  input: z.input<typeof CreateActivitySchema>,
) {
  const data = CreateActivitySchema.parse({ ...input });

  await ActivityService.create(data);

  revalidatePath("/activitys");
}

export async function updateActivity(
  activityId: number,
  input: z.input<typeof UpdateActivitySchema>,
) {
  const data = UpdateActivitySchema.parse(input);

  await ActivityService.update(activityId, {
    ...data,
  });

  revalidatePath("/activitys/" + input.slug);
  revalidatePath("/activitys");
}
