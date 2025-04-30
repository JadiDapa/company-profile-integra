import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import TableSorter from "@/components/dashboard/TableSorter";
import Image from "next/image";
import { GalleryType } from "../types/gallery";
import { Eye, Pencil, Trash } from "lucide-react";

export const galleryColumn: ColumnDef<GalleryType>[] = [
  {
    accessorKey: "id",
    accessorFn: (row) => row.id,
    header: ({ column }) => <TableSorter isFirst column={column} header="#" />,
    cell: ({ row }) => (
      <div className="text-primary translate-x-4">{row.index + 1}</div>
    ),
  },
  {
    accessorKey: "image",
    accessorFn: (row) => row.image,
    header: ({ column }) => <TableSorter column={column} header="IMAGE" />,
    cell: ({ getValue }) => (
      <div className="relative aspect-square h-32 w-40 overflow-hidden rounded-sm">
        <Image
          src={getValue() as string}
          className="object-cover object-center"
          alt={(getValue() as string) + " Image"}
          fill
        />
      </div>
    ),
  },
  {
    accessorKey: "title",
    accessorFn: (row) => row.title,
    header: ({ column }) => <TableSorter column={column} header="TITLE" />,
    cell: ({ getValue }) => <Link href={""}>{getValue() as string}</Link>,
  },
  {
    accessorKey: "function",
    header: ({ column }) => <TableSorter column={column} header="ACT" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Link
          href={`/activities/${row.original.slug}`}
          className="text-primary size-5"
        >
          <Eye />
        </Link>
        <Link
          href={`/dashboard/activities/update/${row.original.slug}`}
          className="text-primary size-5"
        >
          <Pencil />
        </Link>
        <Link href={`${row.original.slug}`} className="text-primary size-5">
          <Trash />
        </Link>
      </div>
    ),
  },
];
