"use server";

import { TicketService } from "@/lib/services/ticket.service";
import { CreateTicketSchema } from "@/lib/validators/ticket.validator";
import { revalidatePath } from "next/cache";
import z from "zod";
import { createManyMedia } from "./media.action";
import { MediaTable, MediaType, TicketStatus } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { getUser } from "./user.actions";

export async function getAllTickets() {
  return await TicketService.getAll();
}

export async function getAssignedTickets(technicianId: number) {
  return await TicketService.getAssigned(technicianId);
}

export async function getTicketById(id: number) {
  return await TicketService.getById(id);
}

export async function getTicketByCode(code: string) {
  return await TicketService.getByCode(code);
}

export async function getTicketByDeviceId(id: number) {
  return await TicketService.getByDeviceId(id);
}

export async function createTicket({
  ticket,
  images,
}: {
  ticket: z.input<typeof CreateTicketSchema>;
  images: File[];
}) {
  const data = CreateTicketSchema.parse({ ...ticket });

  const created = await TicketService.create({
    ...data,
    deviceId: data.deviceId,
  });

  await createManyMedia({
    entityId: created!.id,
    files: images,
    mediaTable: MediaTable.TICKET,
    mediaType: MediaType.SUBMISSION,
    description: "Evidence Submission",
  });

  revalidatePath("/galleries");
}

type UpdateTicketProps = {
  ticketId: number;
  nextStatus: TicketStatus;
  message: string;
  technicianId?: number;
};

export async function updateTicket({
  ticketId,
  nextStatus,
  message,
  technicianId,
}: UpdateTicketProps) {
  const user = await getUser();
  if (!user) throw new Error("Unauthorized");

  await prisma.$transaction(async (tx) => {
    const ticket = await tx.ticket.findUnique({
      where: { id: ticketId },
    });
    if (!ticket) throw new Error("Ticket not found");

    const data: any = {
      status: nextStatus,
    };

    // Assign handler when admin takes ticket
    if (nextStatus === "CONFIRMED") {
      data.handlerId = user.id;
    }

    // Assign technician when executing
    if (nextStatus === "IN_PROGRESS") {
      if (!technicianId) throw new Error("Technician required");
      data.technicianId = technicianId;
    }

    await tx.ticket.update({
      where: { id: ticketId },
      data,
    });

    await tx.ticketLog.create({
      data: {
        ticketId,
        status: nextStatus,
        message,
        authorId: user.id,
      },
    });
  });

  revalidatePath(`/my-tickets`);
  revalidatePath(`/dashboard/tickets/${ticketId}`);
}
