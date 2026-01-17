import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import {
  TicketLogSearchSchema,
  type CreateTicketLogDTO,
  type UpdateTicketLogDTO,
} from "../validators/ticket-log.validator";

export type TicketLogListOptions = {
  page?: number;
  pageSize?: number;
  ticketId?: number;
  orderBy?: Prisma.TicketLogOrderByWithRelationInput;
};

export const TicketLogService = {
  async list(options: TicketLogListOptions) {
    const { page, pageSize, ticketId } = TicketLogSearchSchema.parse(options);

    const where: Prisma.TicketLogWhereInput = { ticketId };
    const orderBy = options.orderBy ?? { createdAt: "desc" };

    const [data, total] = await Promise.all([
      prisma.ticketLog.findMany({
        where,
        take: pageSize,
        skip: (page - 1) * pageSize,
        orderBy,
        include: { author: true },
      }),
      prisma.ticketLog.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  },

  async getByTicketId(ticketId: number) {
    return prisma.ticketLog.findMany({
      where: { ticketId },
      include: { author: true },
    });
  },

  async getById(id: number) {
    return prisma.ticketLog.findUnique({
      where: { id },
      include: { author: true, ticket: true },
    });
  },

  async create(data: CreateTicketLogDTO) {
    // ensure ticket exists
    const ticket = await prisma.ticket.findUnique({
      where: { id: data.ticketId },
      select: { id: true },
    });
    if (!ticket) throw new Error("Ticket not found");

    return prisma.ticketLog.create({ data });
  },

  async update(id: number, data: UpdateTicketLogDTO) {
    return prisma.ticketLog.update({ where: { id }, data });
  },

  async delete(id: number) {
    return prisma.ticketLog.delete({ where: { id } });
  },
};
