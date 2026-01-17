import { Stars } from "lucide-react";
import Image from "next/image";
import { MarqueeGallery } from "./GalleryMarquee";
import { getAllGalleries } from "@/app/actions/gallery.action";

export default async function Gallery() {
  const galleries = await getAllGalleries();
  return (
    <section id="services" className="relative w-full py-24">
      <Image
        src={"/elements/grid.svg"}
        alt="Grid Line"
        fill
        className="z-0 object-cover object-center opacity-30"
      />
      <div className="mb-12 flex w-full flex-col items-center justify-between gap-4 px-4 text-center lg:px-28">
        <div className="text-primary border-primary flex max-w-fit items-center gap-2 rounded-full border-2 px-4 py-0.5">
          <h3 className="font-medium">Gallery</h3>
          <Stars className="size-4" />
        </div>
        <h2 className="text-3xl font-medium lg:text-5xl">
          Every Customer Is
          <span className="text-primary"> Special</span>
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-sm lg:text-base">
          Achieve seamless technology and advanced networks with IT solutions
          tailored for modern infrastructure. Each solution supports growth,
          control, and long-term reliability.
        </p>
      </div>

      <MarqueeGallery data={galleries} />
    </section>
  );
}

// only needed if used in app directory
