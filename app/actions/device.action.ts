"use server";

import { DeviceService } from "@/lib/services/device.service";
import {
  CreateDeviceSchema,
  UpdateDeviceSchema,
} from "@/lib/validators/device.validator";
import { revalidatePath } from "next/cache";
import z from "zod";

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
  const data = CreateDeviceSchema.parse({ ...input });

  await DeviceService.create(data);

  revalidatePath("/devices");
}

export async function updateDevice(
  deviceId: number,
  input: z.input<typeof UpdateDeviceSchema>,
) {
  const data = UpdateDeviceSchema.parse(input);

  await DeviceService.update(deviceId, {
    ...data,
  });

  revalidatePath("/devices/" + input.ssid);
  revalidatePath("/devices");
}
