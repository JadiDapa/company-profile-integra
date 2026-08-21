import { Prisma } from "@/generated/prisma/client";
import { z } from "zod";

export type UserType = Prisma.UserGetPayload<{
  include: {
    ticketHandler: true;
    ticketLogs: true;
    ticketTechnician: true;
  };
}>;

export const UserSearchSchema = z.object({
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(20),
  search: z.string().min(1).max(50).optional(),
});

export const UserRoleEnum = z.enum(["ADMIN", "TECHNICIAN", "USER"]);

const UserBaseSchema = z.object({
  username: z.string().min(8).max(30).optional(),
  password: z.string().min(4).optional(),
});

export const CreateUserSchema = UserBaseSchema.extend({
  password: z.string().min(8, "Password minimal 8 karakter"),
});

export const UpdateUserSchema = UserBaseSchema.partial().extend({
  fullName: z.string().min(1),
});

// Used by admins creating internal (Clerk-less) accounts, e.g. technicians.
export const AdminCreateUserSchema = z.object({
  username: z.string().min(3).max(30),
  fullName: z.string().min(1),
  role: UserRoleEnum,
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>;
export type AdminCreateUserDTO = z.infer<typeof AdminCreateUserSchema>;
