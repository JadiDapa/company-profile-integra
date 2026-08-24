import { Stars } from "lucide-react";
import Image from "next/image";

import AnimatedWords from "@/components/root/AnimatedWords";
import FadeIn from "@/components/root/FadeIn";

interface PageHeaderProps {
  page: string;
  title: string;
  accent: string;
  subtitle: string;
}

export default function PageHeader({
  page,
  title,
  subtitle,
  accent,
}: PageHeaderProps) {
  return (
    <section id="hero" className="relative h-[70vh] border-t">
      <Image
        src={"/elements/grid.svg"}
        alt="Grid Line"
        fill
        className="z-0 object-cover object-center opacity-50"
      />

      <div className="relative z-10 mt-32 flex w-full flex-col items-center justify-center gap-7 px-4 lg:px-28">
        <div className="flex flex-col items-center space-y-2">
          <FadeIn className="text-primary border-primary flex max-w-fit items-center gap-2 rounded-full border-2 px-4 py-0.5">
            <p className="font-medium">{page}</p>
            <Stars className="size-4" />
          </FadeIn>
          <h1 className="text-center">
            <AnimatedWords
              text={title}
              className="text-3xl font-medium lg:text-start lg:text-4xl/relaxed"
              delay={0.1}
            />
            <br />
            <AnimatedWords
              text={accent}
              className="text-primary text-5xl font-medium lg:text-start lg:text-7xl"
              delay={0.35}
            />
          </h1>
        </div>
        <FadeIn
          as="p"
          delay={0.5}
          className="max-w-2xl text-center text-sm text-slate-700 lg:text-base"
        >
          {subtitle}
        </FadeIn>
      </div>
    </section>
  );
}
