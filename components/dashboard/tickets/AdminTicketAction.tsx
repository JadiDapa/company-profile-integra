"use client";

import { useTransition, useState } from "react";
import { Ticket, TicketStatus, User } from "@/generated/prisma";
import { updateTicket } from "@/app/actions/ticket.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function AdminTicketActions({
  ticket,
  technicians,
}: {
  ticket: Ticket;
  technicians: User[];
}) {
  const [message, setMessage] = useState("");
  const [technicianId, setTechnicianId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const canSubmit = message.trim().length > 3;

  function handle(nextStatus: TicketStatus) {
    startTransition(async () => {
      try {
        await updateTicket({
          ticketId: ticket.id,
          nextStatus,
          message,
          technicianId: technicianId ?? undefined,
        });

        toast.success("Ticket updated");
        setMessage("");
      } catch (e: any) {
        toast.error(e.message || "Failed to update ticket");
      }
    });
  }

  return (
    <div className="space-y-5 rounded-lg border p-5">
      <h3 className="text-lg font-semibold">Ticket Handling</h3>

      {/* LOG MESSAGE */}
      {ticket.status !== "COMPLETED" && ticket.status !== "CANCELED" && (
        <div className="space-y-1">
          <label className="text-sm font-medium">Log message</label>
          <Input
            placeholder="Explain what you are doing (required)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      )}

      {/* SUBMITTED → CONFIRMED */}
      {ticket.status === "SUBMITTED" && (
        <ActionBlock
          title="🟡 New ticket"
          description="Take ownership of this ticket."
          button="Take Ticket"
          onClick={() => handle("CONFIRMED")}
          disabled={!canSubmit || isPending}
        />
      )}

      {/* CONFIRMED → IN_PROGRESS */}
      {ticket.status === "CONFIRMED" && (
        <div className="bg-muted/40 space-y-3 rounded-md p-4">
          <p className="font-medium">🟠 Assign technician</p>
          <p className="text-muted-foreground text-sm">
            Select a technician to start working on this ticket.
          </p>

          <select
            className="w-full rounded-md border px-3 py-2 text-sm"
            defaultValue=""
            onChange={(e) => setTechnicianId(Number(e.target.value))}
          >
            <option value="" disabled>
              Select technician
            </option>
            {technicians.map((tech) => (
              <option key={tech.id} value={tech.id}>
                {tech.fullName} - {tech.username}
              </option>
            ))}
          </select>

          <Button
            className="w-full"
            disabled={!canSubmit || !technicianId || isPending}
            onClick={() => handle("IN_PROGRESS")}
          >
            Start Work
          </Button>
        </div>
      )}

      {/* IN_PROGRESS → COMPLETED */}
      {ticket.status === "IN_PROGRESS" && (
        <ActionBlock
          title="🟢 Close ticket"
          description="Confirm work completion and close the ticket."
          button="Close Ticket"
          onClick={() => handle("COMPLETED")}
          disabled={!canSubmit || isPending}
        />
      )}

      {/* Any non-terminal status → CANCELED */}
      {(ticket.status === "SUBMITTED" ||
        ticket.status === "CONFIRMED" ||
        ticket.status === "IN_PROGRESS") && (
        <ActionBlock
          title="🔴 Cancel ticket"
          description="Cancel this ticket. This cannot be undone."
          button="Cancel Ticket"
          variant="destructive"
          onClick={() => handle("CANCELED")}
          disabled={!canSubmit || isPending}
        />
      )}
    </div>
  );
}

function ActionBlock({
  title,
  description,
  button,
  onClick,
  disabled,
  variant,
}: {
  title: string;
  description: string;
  button: string;
  onClick: () => void;
  disabled: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <div className="bg-muted/40 space-y-2 rounded-md p-4">
      <p className="font-medium">{title}</p>
      <p className="text-muted-foreground text-sm">{description}</p>
      <Button
        variant={variant}
        className="w-full"
        onClick={onClick}
        disabled={disabled}
      >
        {button}
      </Button>
    </div>
  );
}
