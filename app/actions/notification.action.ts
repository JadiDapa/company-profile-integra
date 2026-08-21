"use server";

import { NotificationService } from "@/lib/services/notification.service";
import { getUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getMyNotifications() {
  const user = await getUser();
  if (!user) return [];

  return NotificationService.listForUser(user.id);
}

export async function getMyUnreadNotificationCount() {
  const user = await getUser();
  if (!user) return 0;

  return NotificationService.unreadCount(user.id);
}

export async function markNotificationRead(notificationId: number) {
  const user = await getUser();
  if (!user) throw new Error("Unauthorized");

  await NotificationService.markRead(notificationId, user.id);
  revalidatePath("/dashboard");
}

export async function markAllNotificationsRead() {
  const user = await getUser();
  if (!user) throw new Error("Unauthorized");

  await NotificationService.markAllRead(user.id);
  revalidatePath("/dashboard");
}
