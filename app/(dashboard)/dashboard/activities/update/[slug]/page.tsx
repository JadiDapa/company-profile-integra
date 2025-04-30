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
import { Button } from "@/components/ui/button";
import { Plus, Upload, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import slugify from "slugify";
import { toast } from "sonner";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getActivityBySlug, updateActivity } from "@/lib/networks/activity";
import { CreateActivityType } from "@/lib/types/activity";

const formSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export default function UpdateActivity() {
  const [picture, setPicture] = useState<File>();
  const [pictureUrl, setPictureUrl] = useState<string>();
  const router = useRouter();
  const { slug } = useParams();

  const queryClient = useQueryClient();

  const { data: activity } = useQuery({
    queryFn: () => getActivityBySlug(slug as string),
    queryKey: ["activities", slug],
  });

  useEffect(() => {
    if (activity?.image) {
      setPictureUrl(activity.image as string);
      setPicture(activity.image as File);
    }
  }, [activity]);

  const { mutate: onUpdateActivity, isPending } = useMutation({
    mutationFn: (values: CreateActivityType) =>
      updateActivity(slug as string, values),
    onSuccess: () => {
      toast.success("Activities Successfully Modified!");
      queryClient.invalidateQueries({ queryKey: ["activities", slug] });
      router.push("/dashboard/activities");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Update Failed! Something Went Wrong");
    },
  });

  function handlePicture(e: React.ChangeEvent<HTMLInputElement>) {
    const picture = e.target.files?.[0];
    setPicture(picture);
    setPictureUrl(URL.createObjectURL(picture!));
  }

  function removePicture() {
    setPicture(undefined);
    setPictureUrl(undefined);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      title: activity?.title || "",
      content: activity?.content || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!picture) {
      toast.error("Activity Image Shoul Be Uploaded!");
      return;
    }

    onUpdateActivity({
      image: picture as File,
      category: "all",
      slug: slugify(values.title, { lower: true }),
      ...values,
    });
  }

  return (
    <section className="flex w-full flex-col gap-6 py-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <header className="items-center justify-between lg:flex">
            <div className="">
              <h1 className="text-primary text-2xl font-medium">
                Update New Activity
              </h1>
              <p className="mt-1 text-gray-400">
                Update an existing activity for displaying to our clients
              </p>
            </div>
            <div className="mt-6 flex justify-end gap-4 lg:mt-0 lg:justify-start">
              <Button variant="secondary">Discard</Button>
              <Button variant="default" type="submit" className="gap-2">
                <Plus />
                Submit
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

              {/* <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="h-72">
                    <FormLabel>Activity Content</FormLabel>
                    <FormControl className="h-[216px]">
                      <ReactQuill theme="snow" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>

            <div className="space-y-6 lg:flex-[3]">
              <div className="box-shadow flex flex-col gap-6 rounded-md bg-white p-6">
                <h2 className="text-xl font-medium">Activity Picture</h2>
                {pictureUrl ? (
                  <div className="relative flex h-60 w-full flex-col rounded-md border-[3px] border-dashed">
                    <div className="relative h-5/6 w-full items-center justify-center p-1">
                      <Image
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
                        className="text-primary max-w-fit bg-sky-100"
                      >
                        Upload Picture
                        <FormLabel className="absolute top-0 left-0 h-full w-full border opacity-0">
                          {'""'}
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="absolute top-0 left-0 opacity-0"
                            type="file"
                            accept="image/*"
                            onChange={handlePicture}
                          />
                        </FormControl>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <div className="box-shadow flex w-full flex-col items-center justify-between gap-3 rounded-md bg-white p-6">
                <Button
                  disabled={isPending}
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
    </section>
  );
}
