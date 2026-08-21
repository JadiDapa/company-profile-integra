"use client";

import DataTable from "@/components/dashboard/DataTable";
import { deviceColumn } from "@/lib/columns/device-column";
import SearchDataTable from "@/components/dashboard/SearchDataTable";
import { Device } from "@/generated/prisma";

interface DeviceTableProps {
  devices: Device[];
}

export default function DeviceTable({ devices }: DeviceTableProps) {
  return (
    <DataTable
      columns={deviceColumn}
      data={devices}
      filters={(table) => (
        <div className="grid gap-4 p-4 lg:grid-cols-4 lg:gap-6">
          <SearchDataTable
            table={table}
            column="ssid"
            placeholder="Search SSID..."
          />
        </div>
      )}
    />
  );
}
