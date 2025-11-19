"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronsRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const images = [
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1661715955019-89f39802cd4d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1661095699423-d6ccb41e211f?q=80&w=1983&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      {/* Image Carousel */}
      {images.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt={`Slide ${index + 1}`}
          fill
          className={cn(
            "absolute inset-0 object-cover transition-opacity duration-1000 ease-in-out",
            index === activeIndex ? "z-0 opacity-100" : "z-0 opacity-0",
          )}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-black/40" />

      {/* Content */}
      <div className="absolute bottom-0 z-20 flex w-full flex-col items-end justify-between px-4 pb-16 lg:mt-32 lg:flex-row lg:px-24">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <ChevronsRight className="text-background size-4" />
            <p className="text-background font-semibold tracking-[2px] uppercase">
              INTERNET PROVIDER
            </p>
          </div>
          <h1 className="text-background mt-4">
            <span className="text-4xl font-medium lg:text-4xl/relaxed">
              Connecting Every Corner{" "}
            </span>
            <br className="hidden lg:block" />
            <span className="text-4xl font-medium lg:text-7xl">
              With #Reliable Internet
            </span>
          </h1>
          <p className="text-background mt-4 max-w-2xl lg:mt-8 lg:text-base">
            Discover a new level of connectivity with high-speed, reliable
            internet built to support every aspect of your digital lifestyle
          </p>
        </div>

        {/* Indicators + CTA */}
        <div className="flex flex-col items-end justify-end gap-12 pb-4">
          {/* Dots */}
          <div className="flex flex-col gap-4">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "rounded-full transition-all",
                  i === activeIndex
                    ? "bg-background h-6 w-1.5"
                    : "bg-background/50 size-1.5",
                )}
              />
            ))}
          </div>

          {/* Button */}
          <Button className="bg-background/20 text-background h-9 w-60 rounded-full border px-24 py-2 transition hover:bg-white hover:text-black">
            <Link href="/about" className="flex items-center gap-2 text-lg">
              Discover More <ChevronRight className="size-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
