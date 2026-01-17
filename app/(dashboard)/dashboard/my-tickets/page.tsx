import { getAssignedTickets } from "@/app/actions/ticket.action";
import { getUser } from "@/app/actions/user.actions";
import TicketTable from "@/components/dashboard/tickets/TicketTable";
import { UserRole } from "@/generated/prisma";
import { redirect } from "next/navigation";

export default async function TicketsPage() {
  const user = await getUser();
  const role = user?.role as UserRole;

  if (role !== "ADMIN" && role !== "TECHNICIAN") return redirect("/");

  const tickets = await getAssignedTickets(user?.id as number);
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
