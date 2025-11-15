"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GalleryType } from "@/lib/types/gallery";
import Image from "next/image";
import Marquee from "react-fast-marquee";

type GalleryItemProps = {
  data: GalleryType[];
};

function repeatImages(images: GalleryType[], minCount = 30) {
  const repeated = [];
  while (repeated.length < minCount) {
    repeated.push(...images);
  }
  return repeated.slice(0, minCount);
}

export function MarqueeGallery({ data }: GalleryItemProps) {
  const rows = 3;

  return (
    <div className="w-full space-y-4 overflow-hidden">
      {[...Array(rows)].map((_, i) => (
        <Marquee
          key={i}
          direction={i % 2 === 0 ? "left" : "right"}
          speed={40 + i * 5}
          pauseOnHover
          pauseOnClick
          gradient={false}
        >
          {repeatImages(data, 30).map((item, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div className="relative mx-1 h-24 w-40 shrink-0 overflow-hidden rounded-sm lg:mx-2 lg:h-40 lg:w-72">
                  <Image
                    src={item.image as string}
                    alt={item.title}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="bg-background w-[600px] p-3">
                <div className="relative h-80 w-full overflow-hidden rounded-md">
                  <Image
                    src={item.image as string}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <DialogTitle>
                  <p className="text-muted-foreground text-center text-lg font-medium">
                    {item.title}
                  </p>
                </DialogTitle>
              </DialogContent>
            </Dialog>
          ))}
        </Marquee>
      ))}
    </div>
  );
}
