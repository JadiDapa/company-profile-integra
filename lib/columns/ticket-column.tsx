import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import TableSorter from "@/components/dashboard/TableSorter";
import { TicketType } from "../validators/ticket.validator";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

function statusVariant(status: string) {
  switch (status) {
    case "COMPLETED":
      return "default";
    case "IN_PROGRESS":
      return "secondary";
    case "CANCELED":
      return "destructive";
    default:
      return "outline";
  }
}

export const ticketColumn: ColumnDef<TicketType>[] = [
  {
    id: "index",
    header: ({ column }) => <TableSorter isFirst column={column} header="#" />,
    cell: ({ row }) => (
      <div className="text-muted-foreground pl-3 text-sm">{row.index + 1}</div>
    ),
    size: 40,
  },

  {
    accessorKey: "code",
    header: ({ column }) => <TableSorter column={column} header="CODE" />,
    cell: ({ row }) => (
      <div className="space-y-1">
        <p className="text-primary font-medium">{row.original.code}</p>
        <p className="text-muted-foreground text-xs">
          {row.original.device.ssid}
        </p>
      </div>
    ),
  },

  {
    accessorKey: "handler",
    header: ({ column }) => <TableSorter column={column} header="HANDLER" />,
    cell: ({ row }) => (
      <span className="text-sm">
        {row.original.handler?.fullName ?? (
          <span className="text-muted-foreground">Unassigned</span>
        )}
      </span>
    ),
  },

  {
    accessorKey: "technician",
    header: ({ column }) => <TableSorter column={column} header="TECHNICIAN" />,
    cell: ({ row }) => (
      <span className="text-sm">
        {row.original.technician?.fullName ?? (
          <span className="text-muted-foreground">—</span>
        )}
      </span>
    ),
  },

  {
    accessorKey: "status",
    header: ({ column }) => <TableSorter column={column} header="STATUS" />,
    cell: ({ row }) => (
      <Badge
        variant={statusVariant(row.original.status)}
        className="capitalize"
      >
        {row.original.status.replace("_", " ").toLowerCase()}
      </Badge>
    ),
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => <TableSorter column={column} header="CREATED" />,
    cell: ({ row }) => (
      <div className="text-sm">
        <p>{format(row.original.createdAt, "dd MMM yyyy")}</p>
        <p className="text-muted-foreground text-xs">
          {format(row.original.createdAt, "HH:mm")}
        </p>
      </div>
    ),
  },

  {
    id: "actions",
    header: ({ column }) => <TableSorter column={column} header="ACTION" />,
    cell: ({ row }) => (
      <div className="">
        <Link
          href={`/dashboard/tickets/${row.original.code}`}
          className="text-primary hover:bg-muted inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium transition"
        >
          <Eye className="h-4 w-4" />
          View
        </Link>
      </div>
    ),
  },
];
