import {
  Prisma,
  TicketPriority,
  TicketStatus,
} from "@/generated/prisma/client";
import { z } from "zod";

export type TicketType = Prisma.TicketGetPayload<{
  include: {
    device: true;
    handler: true;
    technician: true;
    logs: true;
  };
}>;

export const TicketSearchSchema = z.object({
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(20),

  search: z.string().min(1).max(80).optional(), // code or reason contains
  status: z.nativeEnum(TicketStatus),
  priority: z.nativeEnum(TicketPriority),
  deviceId: z.number().int().optional(),
  handlerId: z.number().int().optional(),
  technicianId: z.number().int().optional(),
});

export const CreateTicketSchema = z.object({
  reason: z.string().min(1, "Reason wajib").max(200),
  detail: z.string().min(1, "Detail wajib").max(5000),
  deviceId: z.number().int(),
  status: z.nativeEnum(TicketStatus),
});

export const UpdateTicketSchema = CreateTicketSchema.partial().extend({
  code: z.string().min(3, "Code wajib").max(40),
  priority: z.nativeEnum(TicketPriority),
  technicianId: z.number().int().nullable().optional(),
  handlerId: z.number().int().nullable().optional(),
});

export type CreateTicketDTO = z.infer<typeof CreateTicketSchema>;
export type UpdateTicketDTO = z.infer<typeof UpdateTicketSchema>;
