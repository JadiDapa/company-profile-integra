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
import { useTransition } from "react";
import { toast } from "sonner";
import { createDevice } from "@/app/actions/device.action";
import { CreateDeviceSchema } from "@/lib/validators/device.validator";
import { PlusCircle } from "lucide-react";

export default function CreateDeviceModal() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreateDeviceSchema>>({
    resolver: zodResolver(CreateDeviceSchema),
    defaultValues: {
      ssid: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof CreateDeviceSchema>) {
    startTransition(async () => {
      try {
        await createDevice({
          ssid: values.ssid,
          password: values.password,
        });
        toast.success("Device created!");
      } catch (err) {
        toast.error("Something went wrong");
      }
    });
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="flex w-full items-center gap-3">
          <PlusCircle size={20} />
          Create New Device
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium">
            Create a New Device
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
                      <FormLabel>Password Device</FormLabel>
                      <FormControl>
                        <Input className="w-full" {...field} />
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
