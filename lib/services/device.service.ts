import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import {
  DeviceAuthSchema,
  DeviceSearchSchema,
  type CreateDeviceDTO,
  type DeviceAuthDTO,
  type UpdateDeviceDTO,
} from "../validators/device.validator";

export type DeviceListOptions = {
  page?: number;
  pageSize?: number;
  search?: string;
  orderBy?: Prisma.DeviceOrderByWithRelationInput;
};

export const DeviceService = {
  async list(options: DeviceListOptions = {}) {
    const { page, pageSize, search } = DeviceSearchSchema.parse(options);

    const where: Prisma.DeviceWhereInput | undefined = search
      ? { ssid: { contains: search, mode: "insensitive" } }
      : undefined;

    const orderBy = options.orderBy ?? { createdAt: "desc" };

    const [data, total] = await Promise.all([
      prisma.device.findMany({
        where,
        take: pageSize,
        skip: (page - 1) * pageSize,
        orderBy,
        include: { tickets: true },
      }),
      prisma.device.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  },

  async getAll() {
    return prisma.device.findMany();
  },

  async getById(id: number) {
    return prisma.device.findUnique({
      where: { id },
      include: { tickets: true },
    });
  },

  async getBySSID(ssid: string) {
    return prisma.device.findFirst({
      where: { ssid },
      include: { tickets: true },
    });
  },

  async create(data: CreateDeviceDTO) {
    if (data.ssid) {
      const exists = await prisma.device.findFirst({
        where: { ssid: data.ssid },
        select: { id: true },
      });

      if (exists) throw new Error("SSID already exists");
    }

    return prisma.device.create({
      data: {
        ssid: data.ssid,
        password: data.password,
      },
    });
  },

  async update(id: number, data: UpdateDeviceDTO) {
    return prisma.device.update({
      where: { id },
      data,
    });
  },

  async delete(id: number) {
    return prisma.device.delete({ where: { id } });
  },

  // For customer access (ssid + password)
  async authenticate(payload: DeviceAuthDTO) {
    const { ssid, password } = DeviceAuthSchema.parse(payload);

    const device = await prisma.device.findFirst({
      where: { ssid },
      select: { id: true, password: true, ssid: true },
    });

    if (!device) throw new Error("SSID tidak ditemukan");
    if (!device.password || device.password !== password)
      throw new Error("Password salah");

    return { id: device.id, ssid: device.ssid };
  },
};
