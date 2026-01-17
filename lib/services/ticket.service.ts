import { Prisma, TicketStatus } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import {
  TicketSearchSchema,
  type CreateTicketDTO,
  type UpdateTicketDTO,
} from "../validators/ticket.validator";

export type TicketListOptions = {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  priority?: string;
  deviceId?: number;
  handlerId?: number;
  technicianId?: number;
  orderBy?: Prisma.TicketOrderByWithRelationInput;
};

export const TicketService = {
  async list(options: TicketListOptions = {}) {
    const parsed = TicketSearchSchema.parse(options);
    const { page, pageSize } = parsed;

    const where: Prisma.TicketWhereInput = {
      ...(parsed.status ? { status: parsed.status } : {}),
      ...(parsed.priority ? { priority: parsed.priority } : {}),
      ...(parsed.deviceId ? { deviceId: parsed.deviceId } : {}),
      ...(parsed.handlerId ? { handlerId: parsed.handlerId } : {}),
      ...(parsed.technicianId ? { technicianId: parsed.technicianId } : {}),
      ...(parsed.search
        ? {
            OR: [
              { code: { contains: parsed.search, mode: "insensitive" } },
              { reason: { contains: parsed.search, mode: "insensitive" } },
            ],
          }
        : {}),
    };

    const orderBy = options.orderBy ?? { createdAt: "desc" };

    const [data, total] = await Promise.all([
      prisma.ticket.findMany({
        where,
        take: pageSize,
        skip: (page - 1) * pageSize,
        orderBy,
        include: {
          device: true,
          handler: true,
          technician: true,
          logs: { orderBy: { createdAt: "desc" } },
        },
      }),
      prisma.ticket.count({ where }),
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
    return prisma.ticket.findMany({
      include: {
        handler: true,
        technician: true,
        logs: true,
        device: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async getAssigned(technicianId: number) {
    return prisma.ticket.findMany({
      where: { technicianId: technicianId },
      include: {
        handler: true,
        technician: true,
        logs: true,
        device: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async getByDeviceId(deviceId: number) {
    return prisma.ticket.findMany({
      where: { deviceId: deviceId },
      orderBy: { createdAt: "desc" },
      include: {
        handler: true,
        technician: true,
        logs: true,
        device: true,
      },
    });
  },

  async getById(id: number) {
    return prisma.ticket.findUnique({
      where: { id },
      include: {
        device: true,
        handler: true,
        technician: true,
        logs: { orderBy: { createdAt: "desc" } },
      },
    });
  },

  async getByCode(code: string) {
    return prisma.ticket.findUnique({
      where: { code: code },
      include: {
        device: true,
        handler: true,
        technician: true,
        logs: {
          orderBy: { createdAt: "desc" },
        },
      },
    });
  },

  async create(data: CreateTicketDTO) {
    // create ticket + initial log in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const ticket = await tx.ticket.create({
        data: {
          code: `TK-${new Date().getTime()}`,
          reason: data.reason,
          detail: data.detail,
          deviceId: data.deviceId,
          status: data.status ?? "SUBMITTED",
        },
      });

      await tx.ticketLog.create({
        data: {
          ticketId: ticket.id,
          status: ticket.status,
          message: "Ticket submitted",
          authorId: null,
        },
      });

      return ticket;
    });

    return this.getById(result.id);
  },

  async update(id: number, data: UpdateTicketDTO) {
    return prisma.ticket.update({
      where: { id },
      data,
    });
  },

  // common admin action: set status + log it
  async setStatus(params: {
    ticketId: number;
    status: TicketStatus;
    message: string;
    authorId?: number | null;
  }) {
    const { ticketId, status, message, authorId = null } = params;

    return prisma.$transaction(async (tx) => {
      const ticket = await tx.ticket.update({
        where: { id: ticketId },
        data: { status },
        select: { id: true, status: true },
      });

      await tx.ticketLog.create({
        data: {
          ticketId: ticket.id,
          status,
          message,
          authorId,
        },
      });

      return ticket;
    });
  },

  // assign technician (single tech MVP) + log it
  async assignTechnician(params: {
    ticketId: number;
    technicianId: number | null; // null = unassign
    authorId?: number | null; // admin
  }) {
    const { ticketId, technicianId, authorId = null } = params;

    return prisma.$transaction(async (tx) => {
      const ticket = await tx.ticket.update({
        where: { id: ticketId },
        data: { technicianId },
        select: { id: true },
      });

      await tx.ticketLog.create({
        data: {
          ticketId: ticket.id,
          status: null,
          message:
            technicianId === null
              ? "Technician unassigned"
              : `Technician assigned (userId=${technicianId})`,
          authorId,
        },
      });

      return ticket;
    });
  },

  async delete(id: number) {
    return prisma.ticket.delete({ where: { id } });
  },
};
