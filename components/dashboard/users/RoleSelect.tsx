"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole } from "@/generated/prisma";
import { updateUserRole } from "@/app/actions/user.actions";

const ROLES: UserRole[] = ["USER", "TECHNICIAN", "ADMIN"];

export default function RoleSelect({
  userId,
  role,
  disabled,
}: {
  userId: number;
  role: UserRole;
  disabled?: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleChange(value: string) {
    startTransition(async () => {
      try {
        await updateUserRole(userId, { role: value as UserRole });
        toast.success("Role updated");
        router.refresh();
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Failed to update role",
        );
      }
    });
  }

  return (
    <Select
      value={role}
      onValueChange={handleChange}
      disabled={disabled || isPending}
    >
      <SelectTrigger className="w-36">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {ROLES.map((r) => (
          <SelectItem key={r} value={r}>
            {r}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
