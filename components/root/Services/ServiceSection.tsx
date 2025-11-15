import { CheckCircle2, Wrench } from "lucide-react";
import Image from "next/image";
import React from "react";

interface ServiceSectionProps {
  product: { icon: string; title: string; description: string; list: string[] };
  index: number; // <-- NEW
}

export default function ServiceSection({
  product,
  index,
}: ServiceSectionProps) {
  const isEven = index % 2 === 0;

  return (
    <section
      id={`service-${index}`}
      className={`relative flex w-full flex-col items-center justify-between gap-12 px-4 py-36 lg:px-28 ${isEven ? "bg-primary/5 lg:flex-row" : "lg:flex-row-reverse"}`}
    >
      {/* Content */}
      <div className="flex-1 space-y-6">
        {/* Tag */}
        <div className="text-primary border-primary flex max-w-fit items-center gap-2 rounded-full border bg-white/80 px-4 py-1 text-sm font-medium shadow-sm backdrop-blur">
          <Wrench className="size-4" />
          <span>Service</span>
        </div>

        {/* Title + Description */}
        <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
          {product.title}
        </h2>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          {product.description}
        </p>

        {/* Feature list */}
        <div className="grid gap-3 sm:grid-cols-2">
          {product.list.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 overflow-hidden rounded-md bg-white shadow-sm transition hover:shadow-md"
            >
              <div className="bg-primary/70 h-full w-4"></div>
              <div className="flex gap-3 p-2">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-green-500" />
                <p className="text-sm font-medium text-gray-700 md:text-base">
                  {item}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image */}
      <div className="relative flex flex-1 items-center justify-center px-12">
        <div
          className={`border-primary absolute ${isEven ? "left-0" : "right-0"} -top-8 z-20 flex size-36 flex-col items-center justify-center gap-0.5 rounded-full border-6 bg-white p-4 text-center shadow-2xl`}
        >
          <div className="relative size-14 lg:size-24">
            <Image
              src={product.icon}
              alt={"Illustration"}
              fill
              className="object-contain object-center"
            />
          </div>
        </div>

        <div className="relative z-10 h-80 w-[480px] overflow-hidden rounded-md shadow-xl">
          <Image
            src={"/images/illust-1.jpg"}
            alt="Illustration"
            fill
            className="object-cover object-center"
          />
        </div>

        {/* Background accent */}
        {!isEven && (
          <div className="absolute -top-12 right-0 z-0 h-60 w-[400px] rounded-md" />
        )}
      </div>
    </section>
  );
}
