import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import TableSorter from "@/components/dashboard/TableSorter";
import { Eye, Pencil, Trash } from "lucide-react";
import { DeviceType } from "../validators/device.validator";

export const deviceColumn: ColumnDef<DeviceType>[] = [
  {
    accessorKey: "id",
    accessorFn: (row) => row.id,
    header: ({ column }) => <TableSorter isFirst column={column} header="#" />,
    cell: ({ row }) => (
      <div className="text-primary translate-x-4">{row.index + 1}</div>
    ),
  },
  {
    accessorKey: "ssid",
    accessorFn: (row) => row.ssid,
    header: ({ column }) => <TableSorter column={column} header="SSID" />,
    cell: ({ getValue }) => <div>{getValue() as string}</div>,
  },

  {
    accessorKey: "password",
    accessorFn: (row) => row.password,
    header: ({ column }) => <TableSorter column={column} header="PASSWORD" />,
    cell: ({ getValue }) => <div>{getValue() as string}</div>,
  },
  {
    accessorKey: "function",
    header: ({ column }) => <TableSorter column={column} header="ACT" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-5">
        <Link
          href={`/devices/${row.original.ssid}`}
          className="text-primary size-3"
        >
          <Eye />
        </Link>
        <Link
          href={`/dashboard/devices/update/${row.original.ssid}`}
          className="text-primary size-3"
        >
          <Pencil />
        </Link>
        <Link href={`${row.original.ssid}`} className="text-primary size-3">
          <Trash />
        </Link>
      </div>
    ),
  },
];
