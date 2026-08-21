"use server";

import { UserService } from "@/lib/services/user.service";
import {
  AdminCreateUserSchema,
  CreateUserSchema,
  UpdateUserSchema,
} from "@/lib/validators/user.validator";
import { revalidatePath } from "next/cache";
import z from "zod";
import { clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@/generated/prisma";
import bcrypt from "bcryptjs";
import { getUser as getCurrentUser, requireRole } from "@/lib/auth";

export async function getUser() {
  return await getCurrentUser();
}

export async function signInUser(input: unknown) {
  const { username, password } = CreateUserSchema.parse(input);

  // 0) If user already exists in DB, skip device check
  const dbUserExisting = await prisma.user.findUnique({
    where: { username: username as string },
  });

  if (dbUserExisting) {
    const redirectTo =
      dbUserExisting.role === "ADMIN" || dbUserExisting.role === "TECHNICIAN"
        ? "/dashboard"
        : "/my-tickets";

    return { redirectTo };
  }

  // 1) User NOT exist -> must validate device credentials
  const device = await prisma.device.findUnique({
    where: { ssid: username as string },
  });

  if (!device) throw new Error("SSID tidak ditemukan");

  const passwordMatches = await bcrypt.compare(password, device.password);
  if (!passwordMatches) throw new Error("Password salah");

  // 2) Ensure Clerk user exists (create if missing)
  const clerk = await clerkClient();

  const existing = await clerk.users.getUserList({
    username: [username as string],
  });

  if (existing.totalCount === 0) {
    await clerk.users.createUser({
      username: username as string,
      password,
    });
  }

  // 3) Create Prisma user
  await prisma.user.create({
    data: {
      username: username as string,
      role: "USER",
      fullName: username as string,
    },
  });

  // 4) New device-based users always go to tickets
  return { redirectTo: "/my-tickets" };
}

export async function getAllUsers() {
  await requireRole("ADMIN");
  return await UserService.getAll();
}

export async function getUsersByRole(role: UserRole) {
  await requireRole("ADMIN", "TECHNICIAN");
  return await UserService.getManyByRole(role);
}

export async function getUserByUsername(username: string) {
  await requireRole("ADMIN");
  return await UserService.getByUsername(username);
}

export async function createUser(
  input: z.input<typeof AdminCreateUserSchema>,
) {
  await requireRole("ADMIN");

  const data = AdminCreateUserSchema.parse({ ...input });

  await UserService.create(data);

  revalidatePath("/dashboard/users");
}

export async function updateUser(
  userId: number,
  input: z.input<typeof UpdateUserSchema>,
) {
  await requireRole("ADMIN");

  const data = UpdateUserSchema.parse(input);

  await UserService.update(userId, {
    ...data,
  });

  revalidatePath("/dashboard/users");
}
