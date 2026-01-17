import { redirect } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { TicketType } from "@/lib/validators/ticket.validator";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/app/actions/user.actions";
import { getTicketByDeviceId } from "@/app/actions/ticket.action";
import { TicketPriority, TicketStatus } from "@/generated/prisma";
import CreateTicketModal from "@/components/ticket/CreateTicketModal";

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d);
}

function statusLabel(s: TicketStatus) {
  const map: Record<TicketStatus, string> = {
    SUBMITTED: "Submitted",
    CONFIRMED: "Confirmed",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
    CANCELED: "Canceled",
  };
  return map[s] ?? s;
}

function priorityLabel(p: TicketPriority) {
  const map: Record<TicketPriority, string> = {
    LOW: "Low",
    NORMAL: "Normal",
    HIGH: "High",
  };
  return map[p] ?? p;
}

function statusBadgeVariant(s: TicketStatus) {
  switch (s) {
    case "COMPLETED":
      return "default";
    case "CANCELED":
      return "destructive";
    case "IN_PROGRESS":
      return "secondary";
    default:
      return "secondary";
  }
}

function priorityBadgeVariant(p: TicketPriority) {
  switch (p) {
    case "HIGH":
      return "destructive";
    case "LOW":
      return "outline";
    default:
      return "secondary";
  }
}

function clamp(text: string, max = 140) {
  if (!text) return "";
  return text.length > max ? text.slice(0, max).trimEnd() + "…" : text;
}

export default async function MyTicketsPage() {
  const user = await getUser();
  if (!user?.username) redirect("/sign-in");

  const device = await prisma.device.findUnique({
    where: { ssid: user.username },
    select: { id: true, ssid: true },
  });

  if (!device) {
    redirect("/sign-in");
  }

  const tickets = await getTicketByDeviceId(device.id);

  // 3) Count attachments per ticket (Media table uses (mediaTable, entityId))
  const mediaCounts = await prisma.media.groupBy({
    by: ["entityId"],
    where: {
      mediaTable: "TICKET",
      entityId: { in: tickets.map((t) => t.id) },
    },
    _count: { _all: true },
  });

  const mediaCountByTicketId = new Map<number, number>(
    mediaCounts.map((m) => [m.entityId, m._count._all]),
  );

  const activeTicket = tickets.find((t) => t.status !== "COMPLETED") ?? null;

  return (
    <div className="relative w-full bg-white px-4 py-32 lg:px-24">
      <header className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">My Tickets</h1>
          <p className="text-muted-foreground text-sm">
            Device: <span className="font-medium">{device.ssid}</span> • Total:{" "}
            <span className="font-medium">{tickets.length}</span>
          </p>
        </div>

        {/* Optional: create ticket button (adjust route) */}
        <div className="flex items-center gap-4 lg:gap-6">
          <CreateTicketModal deviceId={device.id} />
        </div>
      </header>

      {/* Latest Ticket */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Active Ticket</h2>
          {activeTicket ? (
            <span className="text-muted-foreground text-xs">
              Created {formatDate(activeTicket.createdAt)}
            </span>
          ) : null}
        </div>

        {activeTicket ? (
          <TicketCard
            ticket={activeTicket}
            attachments={mediaCountByTicketId.get(activeTicket.id) ?? 0}
            highlight
          />
        ) : (
          <Card>
            <CardContent className="py-8">
              <div className="space-y-2 text-center">
                <p className="font-medium">No tickets yet</p>
                <p className="text-muted-foreground text-sm">
                  Create your first ticket when you have an issue.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </section>

      <Separator className="my-12" />

      {/* All Tickets */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Previous Tickets</h2>

        {tickets.length === 0 ? (
          <Card>
            <CardContent className="py-8">
              <div className="space-y-2 text-center">
                <p className="font-medium">Nothing to show</p>
                <p className="text-muted-foreground text-sm">
                  Your tickets will appear here.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {tickets
              .filter((t) => t.status === "COMPLETED")
              .map((t) => (
                <TicketCard
                  key={t.id}
                  ticket={t}
                  attachments={mediaCountByTicketId.get(t.id) ?? 0}
                />
              ))}
          </div>
        )}
      </section>
    </div>
  );
}

function TicketCard({
  ticket,
  attachments,
  highlight,
}: {
  ticket: TicketType; // keep simple; replace with your Prisma type if you want
  attachments: number;
  highlight?: boolean;
}) {
  const latestLog = ticket.logs?.[0] ?? null;

  return (
    <Card className={highlight ? "border-primary/40 shadow-sm" : ""}>
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="text-base">
              <span className="font-semibold">{ticket.code}</span>{" "}
              <span className="text-muted-foreground font-normal">
                • {ticket.reason}
              </span>
            </CardTitle>
            <p className="text-muted-foreground mt-1 text-xs">
              Created {formatDate(ticket.createdAt)} • Updated{" "}
              {formatDate(ticket.updatedAt)}
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-2">
            <Badge variant={statusBadgeVariant(ticket.status)}>
              {statusLabel(ticket.status)}
            </Badge>
            <Badge variant={priorityBadgeVariant(ticket.priority)}>
              {priorityLabel(ticket.priority)}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="space-y-1">
          <p className="text-sm font-medium">Detail</p>
          <p className="text-muted-foreground text-sm">
            {clamp(ticket.detail, 180)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg border p-3">
            <p className="text-muted-foreground text-xs">Handler</p>
            <p className="font-medium">
              {ticket.handler?.fullName ?? "Unassigned"}
            </p>
          </div>
          <div className="rounded-lg border p-3">
            <p className="text-muted-foreground text-xs">Technician</p>
            <p className="font-medium">
              {ticket.technician?.fullName ?? "Unassigned"}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border p-3 text-sm">
          <div className="min-w-0">
            <p className="text-muted-foreground text-xs">Latest update</p>
            {latestLog ? (
              <p className="truncate font-medium">
                {latestLog.message}
                <span className="text-muted-foreground font-normal">
                  {" "}
                  • {formatDate(latestLog.createdAt)}
                </span>
              </p>
            ) : (
              <p className="text-muted-foreground font-medium">
                No updates yet
              </p>
            )}
          </div>

          <div className="shrink-0 text-right">
            <p className="text-muted-foreground text-xs">Attachments</p>
            <p className="font-medium">{attachments}</p>
          </div>
        </div>

        {/* Optional: detail link (adjust route) */}
        <div className="flex justify-end">
          <Link
            href={`/my-tickets/${ticket.id}`}
            className="text-sm underline underline-offset-4"
          >
            View details
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
