import { Prisma, TicketStatus } from "@/generated/prisma/client";
import { z } from "zod";

export type TicketLogType = Prisma.TicketLogGetPayload<{
  include: { author: true; ticket: true };
}>;

export const TicketLogSearchSchema = z.object({
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(20),
  ticketId: z.number().int(),
});

const TicketLogBaseSchema = z.object({
  ticketId: z.number().int().optional(),
  status: z.nativeEnum(TicketStatus),
  message: z.string().min(1).max(2000).optional(),
  authorId: z.number().int().nullable().optional(),
});

export const CreateTicketLogSchema = TicketLogBaseSchema.extend({
  ticketId: z.number().int(),
  message: z.string().min(1, "Message wajib diisi").max(2000),
});

export const UpdateTicketLogSchema = TicketLogBaseSchema.partial();

export type CreateTicketLogDTO = z.infer<typeof CreateTicketLogSchema>;
export type UpdateTicketLogDTO = z.infer<typeof UpdateTicketLogSchema>;
