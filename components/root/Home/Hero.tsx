import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronsRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen border border-black">
      <Image
        src={"/images/illust-5.jpg"}
        alt="Grid Line"
        fill
        className="z-0 object-cover object-center"
      />
      <div className="absolute inset-0 z-10 bg-black/40" />

      <div className="absolute bottom-0 z-20 flex w-full flex-col items-end justify-between px-4 pb-16 lg:mt-32 lg:flex-row lg:px-24">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <ChevronsRight className="text-background size-4" />
            <p className="text-background font-semibold tracking-[2px] uppercase">
              INTERNET PROVIDER
            </p>
          </div>
          <h1 className="text-background mt-4">
            <span className="text-4xl font-medium lg:text-start lg:text-4xl/relaxed">
              Connecting Every Corner{" "}
            </span>
            <br className="hidden lg:block" />
            <span className="text-4xl font-medium lg:text-start lg:text-7xl">
              With #Reliable Internet
            </span>
          </h1>
          <p className="text-background mt-4 max-w-2xl text-sm lg:mt-8 lg:text-base">
            Achieve seamless technology and advanced networks with IT solutions
            tailored for modern infrastructure.
          </p>
        </div>
        <div className="flex flex-col items-end justify-end gap-12 pb-4">
          <div className="flex flex-col gap-4">
            <div className="bg-background h-6 w-1.5 rounded-full" />
            <div className="bg-background/50 size-1.5 rounded-full" />
            <div className="bg-background/50 size-1.5 rounded-full" />
          </div>
          <Button className="bg-background/20 text-background h-9 w-60 rounded-full border px-24 py-2">
            <Link href="/about" className="text-lg">
              Discover More
            </Link>
            <ChevronRight className="size-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
