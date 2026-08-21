"use server";

import { DeviceService } from "@/lib/services/device.service";
import {
  CreateDeviceSchema,
  UpdateDeviceSchema,
} from "@/lib/validators/device.validator";
import { revalidatePath } from "next/cache";
import z from "zod";
import { requireRole } from "@/lib/auth";

export async function getAllDevices() {
  return await DeviceService.getAll();
}

export async function getDeviceById(id: number) {
  return await DeviceService.getById(id);
}

export async function getDeviceBySSID(ssid: string) {
  return await DeviceService.getBySSID(ssid);
}

export async function createDevice(input: z.input<typeof CreateDeviceSchema>) {
  await requireRole("ADMIN");

  const data = CreateDeviceSchema.parse({ ...input });

  await DeviceService.create(data);

  revalidatePath("/dashboard/devices");
}

export async function updateDevice(
  deviceId: number,
  input: z.input<typeof UpdateDeviceSchema>,
) {
  await requireRole("ADMIN");

  const data = UpdateDeviceSchema.parse(input);

  await DeviceService.update(deviceId, {
    ...data,
  });

  revalidatePath("/dashboard/devices");
}

export async function deleteDevice(deviceId: number) {
  await requireRole("ADMIN");

  await DeviceService.delete(deviceId);

  revalidatePath("/dashboard/devices");
}
