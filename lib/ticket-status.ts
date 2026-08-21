import { TicketPriority, TicketStatus } from "@/generated/prisma";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

export function statusLabel(status: TicketStatus): string {
  const map: Record<TicketStatus, string> = {
    SUBMITTED: "Submitted",
    CONFIRMED: "Confirmed",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
    CANCELED: "Canceled",
  };
  return map[status] ?? status;
}

export function statusBadgeVariant(status: TicketStatus): BadgeVariant {
  switch (status) {
    case "COMPLETED":
      return "default";
    case "IN_PROGRESS":
      return "secondary";
    case "CANCELED":
      return "destructive";
    case "CONFIRMED":
    case "SUBMITTED":
    default:
      return "outline";
  }
}

export function priorityLabel(priority: TicketPriority): string {
  const map: Record<TicketPriority, string> = {
    LOW: "Low",
    NORMAL: "Normal",
    HIGH: "High",
  };
  return map[priority] ?? priority;
}

export function priorityBadgeVariant(priority: TicketPriority): BadgeVariant {
  switch (priority) {
    case "HIGH":
      return "destructive";
    case "LOW":
      return "outline";
    case "NORMAL":
    default:
      return "secondary";
  }
}

export const TERMINAL_STATUSES: TicketStatus[] = ["COMPLETED", "CANCELED"];
