import { Ticket, Clock, CheckCircle2, Server } from "lucide-react";
import StatisticCard from "@/components/dashboard/StatisticCard";
import { getTicketStats } from "@/app/actions/ticket.action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  statusBadgeVariant,
  statusLabel,
  priorityBadgeVariant,
  priorityLabel,
  TERMINAL_STATUSES,
} from "@/lib/ticket-status";
import { TicketPriority, TicketStatus } from "@/generated/prisma";

const ALL_STATUSES: TicketStatus[] = [
  "SUBMITTED",
  "CONFIRMED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELED",
];

const ALL_PRIORITIES: TicketPriority[] = ["HIGH", "NORMAL", "LOW"];

export default async function DashboardPage() {
  const stats = await getTicketStats();

  const openTickets = ALL_STATUSES.filter(
    (s) => !TERMINAL_STATUSES.includes(s),
  ).reduce((sum, s) => sum + (stats.byStatus[s] ?? 0), 0);

  return (
    <section className="flex w-full flex-col gap-6 py-6">
      <div>
        <h1 className="text-4xl font-medium">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of ticket activity across the helpdesk.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        <StatisticCard
          Icon={Ticket}
          title="Total Tickets"
          value={stats.totalTickets}
        />
        <StatisticCard Icon={Clock} title="Open Tickets" value={openTickets} />
        <StatisticCard
          Icon={CheckCircle2}
          title="Completed"
          value={stats.byStatus.COMPLETED ?? 0}
        />
        <StatisticCard
          Icon={Server}
          title="Registered Devices"
          value={stats.deviceCount}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">By Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {ALL_STATUSES.map((status) => (
              <div key={status} className="flex items-center justify-between">
                <Badge variant={statusBadgeVariant(status)}>
                  {statusLabel(status)}
                </Badge>
                <span className="text-sm font-medium">
                  {stats.byStatus[status] ?? 0}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">By Priority</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {ALL_PRIORITIES.map((priority) => (
              <div
                key={priority}
                className="flex items-center justify-between"
              >
                <Badge variant={priorityBadgeVariant(priority)}>
                  {priorityLabel(priority)}
                </Badge>
                <span className="text-sm font-medium">
                  {stats.byPriority[priority] ?? 0}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Avg. Resolution Time</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.avgResolutionHours === null ? (
              <p className="text-muted-foreground text-sm">
                No completed tickets yet.
              </p>
            ) : (
              <p className="text-primary text-3xl font-bold">
                {stats.avgResolutionHours < 1
                  ? `${Math.round(stats.avgResolutionHours * 60)}m`
                  : `${stats.avgResolutionHours.toFixed(1)}h`}
              </p>
            )}
            <p className="text-muted-foreground mt-1 text-xs">
              From submission to completion, across{" "}
              {stats.byStatus.COMPLETED ?? 0} completed ticket(s).
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
