"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Upload, XCircle } from "lucide-react";
import { useState, useTransition } from "react";
import slugify from "slugify";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createActivity, updateActivity } from "@/app/actions/activity.action";
import { getMediaUrl } from "@/lib/getMediaUrl";
import { ActivityType } from "@/lib/validators/activity.validator";

const formSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  category: z.string().min(1, "Kategori wajib diisi"),
  content: z.string().min(1, "Konten wajib diisi"),
});

export default function ActivityForm({
  activity,
}: {
  activity?: ActivityType;
}) {
  const isEdit = !!activity;
  const [picture, setPicture] = useState<File>();
  const [pictureUrl, setPictureUrl] = useState<string | undefined>(
    activity?.image?.url ? getMediaUrl(activity.image.url) : undefined,
  );
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: activity?.title ?? "",
      category: activity?.category ?? "",
      content: activity?.content ?? "",
    },
  });

  function handlePicture(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPicture(file);
    setPictureUrl(URL.createObjectURL(file));
  }

  function removePicture() {
    setPicture(undefined);
    setPictureUrl(undefined);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!isEdit && !picture) {
      toast.error("Activity image is required");
      return;
    }

    startTransition(async () => {
      try {
        const slug = slugify(values.title, { lower: true, strict: true });

        if (isEdit && activity) {
          await updateActivity(activity.id, {
            activity: { ...values, slug },
            file: picture,
          });
          toast.success("Activity updated!");
        } else {
          await createActivity({
            activity: { ...values, slug },
            file: picture,
          });
          toast.success("Activity created!");
        }

        router.push("/dashboard/activities");
        router.refresh();
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Something went wrong",
        );
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <header className="items-center justify-between lg:flex">
          <div>
            <h1 className="text-primary text-2xl font-medium">
              {isEdit ? "Update Activity" : "Create New Activity"}
            </h1>
            <p className="mt-1 text-gray-400">
              {isEdit
                ? "Update an existing activity for displaying to our clients"
                : "Create a new activity for displaying to our clients"}
            </p>
          </div>
          <div className="mt-6 flex justify-end gap-4 lg:mt-0 lg:justify-start">
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.push("/dashboard/activities")}
            >
              Discard
            </Button>
            <Button
              variant="default"
              type="submit"
              className="gap-2"
              disabled={isPending}
            >
              <Plus />
              {isPending ? "Saving..." : "Submit"}
            </Button>
          </div>
        </header>

        <div className="flex flex-col flex-wrap gap-6 lg:flex-row">
          <div className="box-shadow flex w-full flex-col gap-6 rounded-md bg-white p-6 lg:flex-[4]">
            <h2 className="text-xl font-medium">Activity Details</h2>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Activity Title</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: Lift-Up Monitor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: Infrastruktur" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="h-72">
                  <FormLabel>Activity Content</FormLabel>
                  <FormControl className="h-[216px]">
                    <Textarea className="h-full resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6 lg:flex-[3]">
            <div className="box-shadow flex flex-col gap-6 rounded-md bg-white p-6">
              <h2 className="text-xl font-medium">Activity Picture</h2>
              {pictureUrl ? (
                <div className="relative flex h-60 w-full flex-col rounded-md border-[3px] border-dashed">
                  <div className="relative h-5/6 w-full items-center justify-center p-1">
                    <Image
                      unoptimized
                      src={pictureUrl}
                      className="border-2 border-double object-contain object-center p-1"
                      alt=""
                      fill
                    />
                  </div>
                  <div
                    onClick={removePicture}
                    className="flex w-full cursor-pointer items-center justify-end gap-2 p-2 text-red-400"
                  >
                    <XCircle size={18} />
                    <span className="text-lg font-medium">
                      Remove Picture
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative flex h-52 w-full flex-col items-center justify-center rounded-md border-[3px] border-dashed">
                  <div className="bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-md">
                    <Upload size={28} strokeWidth={1.75} />
                  </div>
                  <div className="mt-8 flex flex-col items-center gap-2 text-center">
                    <Button
                      type="button"
                      className="text-primary relative max-w-fit bg-sky-100"
                    >
                      Upload Picture
                      <Input
                        className="absolute top-0 left-0 h-full w-full opacity-0"
                        type="file"
                        accept="image/*"
                        onChange={handlePicture}
                      />
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <div className="box-shadow flex w-full flex-col items-center justify-between gap-3 rounded-md bg-white p-6">
              <Button
                disabled={isPending}
                type="submit"
                className="flex w-full items-center gap-3"
              >
                Submit
              </Button>
              <div className="text-center">
                <div className="text-primary lg:text-lg">
                  Make sure data is correctly filled
                </div>
                <small className="text-xs lg:text-sm">
                  You can modify this data later*
                </small>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
