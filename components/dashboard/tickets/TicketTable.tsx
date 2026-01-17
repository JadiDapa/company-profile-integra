"use client";

import DataTable from "@/components/dashboard/DataTable";
import { ticketColumn } from "@/lib/columns/ticket-column";
import SearchDataTable from "@/components/dashboard/SearchDataTable";
import { Ticket } from "@/generated/prisma";

interface TicketTableProps {
  tickets: Ticket[];
}

export default function TicketTable({ tickets }: TicketTableProps) {
  return (
    <DataTable
      columns={ticketColumn}
      data={tickets}
      filters={(table) => (
        <div className="grid gap-4 p-4 lg:grid-cols-4 lg:gap-6">
          <SearchDataTable
            table={table}
            column="code"
            placeholder="Search Ticket Code..."
          />
        </div>
      )}
    />
  );
}
