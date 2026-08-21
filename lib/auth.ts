import "server-only";

import { UserRole } from "@/generated/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { UserService } from "@/lib/services/user.service";

export async function getUser() {
  const clerkUser = await currentUser();
  if (!clerkUser?.username) return null;

  return await UserService.getByUsername(clerkUser.username);
}

export async function requireRole(...roles: UserRole[]) {
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  if (!roles.includes(user.role)) {
    throw new Error("Forbidden");
  }

  return user;
}
