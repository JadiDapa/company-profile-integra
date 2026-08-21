import { ColumnDef } from "@tanstack/react-table";
import TableSorter from "@/components/dashboard/TableSorter";
import Image from "next/image";
import { GalleryType } from "../validators/gallery.validator";
import { getMediaUrl } from "../getMediaUrl";
import { deleteGallery } from "@/app/actions/gallery.action";
import ConfirmDeleteButton from "@/components/dashboard/ConfirmDeleteButton";
import EditGalleryModal from "@/components/dashboard/Dashboard/gallery/EditGalleryModal";

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
    cell: ({ row }) => (
      <div className="relative aspect-square h-32 w-40 overflow-hidden rounded-sm">
        <Image
          unoptimized
          src={getMediaUrl(row.original.image?.url as string)}
          className="object-cover object-center"
          alt={row.original.image?.filename as string}
          fill
        />
      </div>
    ),
  },
  {
    accessorKey: "title",
    accessorFn: (row) => row.title,
    header: ({ column }) => <TableSorter column={column} header="TITLE" />,
    cell: ({ getValue }) => <span>{getValue() as string}</span>,
  },
  {
    accessorKey: "function",
    header: ({ column }) => <TableSorter column={column} header="ACT" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <EditGalleryModal gallery={row.original} />
        <ConfirmDeleteButton
          itemLabel={`Gallery "${row.original.title}"`}
          onDelete={() => deleteGallery(row.original.id)}
        />
      </div>
    ),
  },
];
