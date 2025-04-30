"use client";

import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import DataTable from "@/components/dashboard/DataTable";
import { activityColumn } from "@/lib/columns/activity-column";
import SearchDataTable from "@/components/dashboard/SearchDataTable";
import { getAllGalleries } from "@/lib/networks/gallery";

export default function DashboardGalleryPage() {
  const { data: galleries } = useQuery({
    queryFn: getAllGalleries,
    queryKey: ["galleries"],
  });

  if (galleries) {
    return (
      <section className="flex w-full flex-col gap-4 py-6 lg:gap-6">
        {/* Header Title */}
        <div className="flex w-full flex-col justify-between gap-4 lg:flex-row lg:gap-6">
          <div className="">
            <h1 className="text-4xl font-medium">Gallery List</h1>
            <p className="hidden lg:inline">
              These are the Items that Consist in the Inventory
            </p>
          </div>
          <div className="flex items-center gap-4 lg:gap-6">
            <Link href="/items/create">
              <div className="bg-primary text-tertiary grid size-10 place-items-center gap-4 rounded-md text-lg shadow-sm">
                <Plus size={24} />
              </div>
            </Link>
          </div>
        </div>

        <DataTable
          columns={activityColumn}
          data={galleries}
          filters={(table) => (
            <div className="grid gap-4 p-4 lg:grid-cols-4 lg:gap-6">
              <SearchDataTable
                table={table}
                column="name"
                placeholder="Search Item Type..."
              />
            </div>
          )}
        />
      </section>
    );
  }
}
