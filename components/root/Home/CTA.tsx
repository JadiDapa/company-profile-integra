import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CTA() {
  return (
    <section
      id="CTA"
      className="relative w-full px-4 py-24 lg:flex-row lg:px-28"
    >
      <div className="via-primary relative flex w-full flex-col items-center justify-between overflow-hidden rounded-2xl border bg-gradient-to-tl from-red-700 to-red-700 px-6 py-12 text-center text-white lg:flex-row lg:px-24 lg:py-24 lg:text-start">
        <div className="relative z-20 flex w-full flex-col gap-5">
          <h2 className="text-4xl font-medium">Want To Get Started?</h2>
          <p className="text-background max-w-2xl">
            Achieve seamless technology and advanced networks with IT solutions
            tailored for modern infrastructure. Each solution supports growth,
            control.
          </p>
          <div className="flex items-center justify-center gap-4 lg:justify-start">
            <Button className="text-primary hover:bg-primary flex h-10 w-36 items-center rounded-full border border-white bg-transparent px-6 py-2 hover:text-white">
              <Link href="/about" className="text-white">
                Learn More
              </Link>
              <ChevronRight className="size-4 text-white" />
            </Button>
          </div>
        </div>
        <div className="relative mx-auto h-40 w-60 lg:h-32 lg:w-[520px]">
          <Image
            fill
            src={"/images/logo.png"}
            alt="Logo of Integra"
            className="object-contain object-center brightness-0 invert"
          />
        </div>
      </div>
    </section>
  );
}
