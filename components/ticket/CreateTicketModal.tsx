"use client";

import { useState, useTransition } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

import { CreateTicketSchema } from "@/lib/validators/ticket.validator";
import { createTicket } from "@/app/actions/ticket.action";
import Image from "next/image";
import { Input } from "../ui/input";
import { TicketStatus } from "@/generated/prisma";

type TicketFormType = z.infer<typeof CreateTicketSchema>;

export default function CreateTicketModal({ deviceId }: { deviceId: number }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [pictures, setPictures] = useState<File[]>([]);

  const form = useForm<TicketFormType>({
    resolver: zodResolver(CreateTicketSchema),
    mode: "onChange",
    values: {
      reason: "",
      detail: "",
      deviceId,
      status: "SUBMITTED",
    },
  });

  async function onSubmit(values: TicketFormType) {
    if (pictures.length === 0) {
      toast.error("Foto harus diinput");
      return;
    }

    const formData = new FormData();
    formData.append("reason", values.reason);
    formData.append("detail", values.detail);
    formData.append("status", values.status);
    formData.append("deviceId", String(values.deviceId));

    pictures.forEach((file) => {
      formData.append("images", file);
    });

    startTransition(async () => {
      try {
        const reason = formData.get("reason") as string;
        const detail = formData.get("detail") as string;
        const status = formData.get("status") as TicketStatus;
        const images = formData.getAll("images") as File[];

        await createTicket({
          ticket: { reason, detail, deviceId, status },
          images,
        });
        toast.success("Ticket created!");
        setOpen(false);
      } catch {
        toast.error("Something went wrong");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full px-4 py-2">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Ticket
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Ticket</DialogTitle>
          <p className="text-muted-foreground -mt-1 text-sm">
            Tambahkan baru ke sistem
          </p>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
          <FieldGroup {...form}>
            <div className="grid gap-4">
              <Controller
                name="reason"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Alasan</FieldLabel>
                    <InputGroup>
                      <InputGroupInput {...field} />
                    </InputGroup>
                    <FieldError>
                      {form.formState.errors.reason?.message}
                    </FieldError>
                  </Field>
                )}
              />

              <Controller
                name="detail"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Detail</FieldLabel>
                    <InputGroup>
                      <InputGroupInput {...field} />
                    </InputGroup>
                    <FieldError>
                      {form.formState.errors.reason?.message}
                    </FieldError>
                  </Field>
                )}
              />

              <Field>
                <FieldLabel>Upload Images</FieldLabel>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    if (!e.target.files) return;
                    setPictures(Array.from(e.target.files));
                  }}
                  className="block w-full text-sm"
                />
                <FieldError>{form.formState.errors.reason?.message}</FieldError>
              </Field>
              {pictures.length > 0 && (
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {pictures.map((file, index) => (
                    <div
                      key={index}
                      className="relative h-24 w-full overflow-hidden rounded-md"
                    >
                      <Image
                        unoptimized
                        fill
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        className="object-contain object-center"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={isPending || !form.formState.isValid}
              >
                {isPending ? <Spinner /> : "Tambahkan"}
              </Button>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
