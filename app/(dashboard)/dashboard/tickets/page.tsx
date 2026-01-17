import { getAllTickets } from "@/app/actions/ticket.action";
import TicketTable from "@/components/dashboard/tickets/TicketTable";

export default async function TicketsPage() {
  const tickets = await getAllTickets();
  return (
    <section className="flex h-full w-full flex-col gap-4 rounded-md border p-6 lg:gap-6">
      {/* Header Title */}
      <div className="flex w-full flex-col justify-between gap-4 lg:flex-row lg:gap-6">
        <div className="">
          <h1 className="text-4xl font-medium">Ticket List</h1>
          <p className="hidden lg:inline">
            These are the Items that Consist in the Inventory
          </p>
        </div>
      </div>
      <TicketTable tickets={tickets} />
    </section>
  );
}
