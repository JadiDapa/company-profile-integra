"use server";

import { TicketLogService } from "@/lib/services/ticket-log.service";
import {
  CreateTicketLogSchema,
  UpdateTicketLogSchema,
} from "@/lib/validators/ticket-log.validator";
import { revalidatePath } from "next/cache";
import z from "zod";

export async function getTicketLogById(id: number) {
  return await TicketLogService.getById(id);
}

export async function getByTicketId(ticketId: number) {
  return await TicketLogService.getByTicketId(ticketId);
}

export async function createTicketLog(
  input: z.input<typeof CreateTicketLogSchema>,
) {
  const data = CreateTicketLogSchema.parse({ ...input });

  await TicketLogService.create(data);

  revalidatePath("/ticket-logs");
}

export async function updateTicketLog(
  logId: number,
  input: z.input<typeof UpdateTicketLogSchema>,
) {
  const data = UpdateTicketLogSchema.parse(input);

  await TicketLogService.update(logId, {
    ...data,
  });

  revalidatePath("/ticket-logs/" + input.ticketId);
  revalidatePath("/ticket-logs");
}
