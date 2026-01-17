"use client";

import DataTable from "@/components/dashboard/DataTable";
import { galleryColumn } from "@/lib/columns/gallery-column";
import SearchDataTable from "@/components/dashboard/SearchDataTable";
import { Gallery } from "@/generated/prisma";

interface GalleryTableProps {
  galleries: Gallery[];
}

export default function GalleryTable({ galleries }: GalleryTableProps) {
  return (
    <DataTable
      columns={galleryColumn}
      data={galleries}
      filters={(table) => (
        <div className="grid gap-4 p-4 lg:grid-cols-4 lg:gap-6">
          <SearchDataTable
            table={table}
            column="overtimeNumber"
            placeholder="Search Document Name..."
          />
        </div>
      )}
    />
  );
}
