"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ConfirmDeleteButton({
  itemLabel,
  onDelete,
}: {
  itemLabel: string;
  onDelete: () => Promise<unknown>;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    startTransition(async () => {
      try {
        await onDelete();
        toast.success(`${itemLabel} deleted`);
        router.refresh();
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Failed to delete",
        );
      }
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-destructive size-5" aria-label={`Delete ${itemLabel}`}>
          <Trash className="size-full" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {itemLabel}?</DialogTitle>
        </DialogHeader>
        <p className="text-muted-foreground text-sm">
          This action cannot be undone.
        </p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={handleDelete}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
