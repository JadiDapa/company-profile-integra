import { ColumnDef } from "@tanstack/react-table";
import TableSorter from "@/components/dashboard/TableSorter";
import { DeviceType } from "../validators/device.validator";
import { deleteDevice } from "@/app/actions/device.action";
import ConfirmDeleteButton from "@/components/dashboard/ConfirmDeleteButton";
import EditDeviceModal from "@/components/dashboard/devices/EditDeviceModal";

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
    header: ({ column }) => <TableSorter column={column} header="PASSWORD" />,
    cell: () => <div className="tracking-widest">••••••••</div>,
  },
  {
    accessorKey: "function",
    header: ({ column }) => <TableSorter column={column} header="ACT" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-5">
        <EditDeviceModal device={row.original} />
        <ConfirmDeleteButton
          itemLabel={`Device "${row.original.ssid}"`}
          onDelete={() => deleteDevice(row.original.id)}
        />
      </div>
    ),
  },
];
