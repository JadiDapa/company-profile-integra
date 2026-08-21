"use client";

import { DialogClose, DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { updateDevice } from "@/app/actions/device.action";
import { UpdateDeviceSchema } from "@/lib/validators/device.validator";
import { Pencil } from "lucide-react";
import { Device } from "@/generated/prisma";

export default function EditDeviceModal({ device }: { device: Device }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof UpdateDeviceSchema>>({
    resolver: zodResolver(UpdateDeviceSchema),
    defaultValues: {
      ssid: device.ssid,
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof UpdateDeviceSchema>) {
    startTransition(async () => {
      try {
        await updateDevice(device.id, {
          ssid: values.ssid,
          // Leave password untouched unless the admin explicitly typed a new one.
          password: values.password ? values.password : undefined,
        });
        toast.success("Device updated!");
        router.refresh();
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Something went wrong",
        );
      }
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-primary size-5" aria-label="Edit device">
          <Pencil className="size-full" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium">
            Edit Device
          </DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-wrap gap-6 pt-4 lg:gap-4"
            >
              <div className="flex-1 space-y-2 lg:space-y-4">
                <FormField
                  control={form.control}
                  name="ssid"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SSID Device</FormLabel>
                      <FormControl>
                        <Input className="w-full" {...field} />
                      </FormControl>
                      <FormMessage className="text-start" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password (optional)</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          placeholder="Leave blank to keep current password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-start" />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                disabled={isPending}
                className="flex w-full items-center gap-3"
              >
                <DialogClose className="w-full">Submit</DialogClose>
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
