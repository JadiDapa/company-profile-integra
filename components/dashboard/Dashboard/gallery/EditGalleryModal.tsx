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
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { updateGallery } from "@/app/actions/gallery.action";
import { Gallery } from "@/generated/prisma";
import slugify from "slugify";

const editGallerySchema = z.object({
  title: z.string().min(1, "Gallery Name is required"),
});

export default function EditGalleryModal({ gallery }: { gallery: Gallery }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof editGallerySchema>>({
    resolver: zodResolver(editGallerySchema),
    defaultValues: {
      title: gallery.title,
    },
  });

  async function onSubmit(values: z.infer<typeof editGallerySchema>) {
    startTransition(async () => {
      try {
        await updateGallery(gallery.id, {
          title: values.title,
          slug: slugify(values.title, { lower: true }),
        });
        toast.success("Gallery updated!");
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
        <button className="text-primary size-5" aria-label="Edit gallery">
          <Pencil className="size-full" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium">
            Edit Gallery
          </DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-wrap gap-6 pt-4 lg:gap-4"
            >
              <div className="flex-1 space-y-2 lg:space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title Picture</FormLabel>
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
