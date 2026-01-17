import { Prisma } from "@/generated/prisma/client";
import { z } from "zod";

export type DeviceType = Prisma.DeviceGetPayload<{
  include: { tickets: true };
}>;

export const DeviceSearchSchema = z.object({
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(20),
  search: z.string().min(1).max(64).optional(), // for ssid
});

const DeviceBaseSchema = z.object({
  ssid: z.string().min(1).max(64).optional(),
  password: z.string().min(1).max(128).optional(),
});

export const CreateDeviceSchema = DeviceBaseSchema.extend({
  ssid: z.string().min(1, "SSID wajib diisi").max(64),
  password: z.string().min(1, "Password wajib diisi").max(128),
});

export const UpdateDeviceSchema = DeviceBaseSchema.partial();

export const DeviceAuthSchema = z.object({
  ssid: z.string().min(1, "SSID wajib diisi").max(64),
  password: z.string().min(1, "Password wajib diisi").max(128),
});

export type CreateDeviceDTO = z.infer<typeof CreateDeviceSchema>;
export type UpdateDeviceDTO = z.infer<typeof UpdateDeviceSchema>;
export type DeviceAuthDTO = z.infer<typeof DeviceAuthSchema>;
