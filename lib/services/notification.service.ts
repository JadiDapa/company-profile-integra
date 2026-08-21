import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export const NotificationService = {
  async listForUser(userId: number, limit = 20) {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  },

  async unreadCount(userId: number) {
    return prisma.notification.count({
      where: { userId, read: false },
    });
  },

  async markRead(id: number, userId: number) {
    return prisma.notification.updateMany({
      where: { id, userId },
      data: { read: true },
    });
  },

  async markAllRead(userId: number) {
    return prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true },
    });
  },

  async createMany(
    notifications: Prisma.NotificationCreateManyInput[],
    tx: Prisma.TransactionClient | typeof prisma = prisma,
  ) {
    if (notifications.length === 0) return;
    await tx.notification.createMany({ data: notifications });
  },
};
