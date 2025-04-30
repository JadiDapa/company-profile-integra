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
import { PlusCircle, Upload, XCircle } from "lucide-react";
import { useState } from "react";
import slugify from "slugify";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGallery } from "@/lib/networks/gallery";
import { CreateGalleryType } from "@/lib/types/gallery";

const gallerySchema = z.object({
  title: z.string().min(1, "Gallery Name is required"),
});

export default function CreateGalleryModal() {
  const [picture, setPicture] = useState<File>();
  const [pictureUrl, setPictureUrl] = useState<string>();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: onCreateGallery, isPending } = useMutation({
    mutationFn: (values: CreateGalleryType) => createGallery(values),
    onSuccess: () => {
      toast.success("Data Created Successfully!");
      queryClient.invalidateQueries({ queryKey: ["galleries"] });
      router.refresh();
    },
    onError: () => toast.error("Something Went Wrong!"),
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

  const form = useForm<z.infer<typeof gallerySchema>>({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof gallerySchema>) {
    if (!picture) {
      toast.error("Foto Peserta harus diinput");
      return;
    }

    onCreateGallery({
      image: picture,
      slug: slugify(values.title, { lower: true }),
      ...values,
    });
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="flex w-full items-center gap-3">
          <PlusCircle size={20} />
          Create New Gallery
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium">
            Create a New Gallery
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

                <div className="flex-1">
                  <div className="text-lg font-medium">Gallery Picture</div>
                  {pictureUrl ? (
                    <div className="relative flex h-[134px] w-full flex-col rounded-md border-[3px] border-dashed">
                      <div className="relative h-full w-full items-center justify-center p-1">
                        <Image
                          src={pictureUrl}
                          className="border-2 border-double object-contain object-center p-1"
                          alt=""
                          fill
                        />
                      </div>
                      <div
                        onClick={removePicture}
                        className="absolute right-2 bottom-2 flex cursor-pointer items-center justify-end gap-2 text-red-400"
                      >
                        <XCircle size={18} />
                        <span className="text-lg font-medium">Remove</span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative flex h-[134px] w-full flex-col items-center justify-center gap-3 rounded-md border-[3px] border-dashed">
                      <div className="bg-muted text-muted-foreground flex size-10 items-center justify-center rounded-md">
                        <Upload size={24} strokeWidth={1.75} />
                      </div>
                      <div className="flex flex-col items-center gap-2 text-center">
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
