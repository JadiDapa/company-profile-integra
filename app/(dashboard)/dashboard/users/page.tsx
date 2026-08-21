import { redirect } from "next/navigation";
import { getAllUsers, getUser } from "@/app/actions/user.actions";
import RoleSelect from "@/components/dashboard/users/RoleSelect";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default async function UsersPage() {
  const currentUser = await getUser();

  if (currentUser?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const users = await getAllUsers();

  return (
    <section className="flex h-full w-full flex-col gap-4 rounded-md border p-6 lg:gap-6">
      <div>
        <h1 className="text-4xl font-medium">User Management</h1>
        <p className="text-muted-foreground">
          Promote a customer to Technician or Admin, or manage existing staff
          roles.
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.username}</TableCell>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{format(user.createdAt, "dd MMM yyyy")}</TableCell>
              <TableCell>
                {user.id === currentUser?.id ? (
                  <Badge variant="outline">{user.role} (you)</Badge>
                ) : (
                  <RoleSelect userId={user.id} role={user.role} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
