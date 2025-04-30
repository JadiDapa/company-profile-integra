import { Button } from "@/components/ui/button";
import { ChevronRight, Stars } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  return (
    <section
      id="about"
      className="bg-primary/5 relative flex w-full flex-col items-center justify-between px-4 py-36 lg:flex-row lg:px-28"
    >
      <div className="flex-1 space-y-4">
        <div className="text-primary border-primary flex max-w-fit items-center gap-2 rounded-full border-2 px-4 py-0.5">
          <h3 className="font-medium">About</h3>
          <Stars className="size-4" />
        </div>
        <h2 className="text-5xl font-medium">Innovation Shape The Future</h2>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          Achieve seamless technology and advanced networks with IT solutions
          tailored for modern infrastructure. Each solution supports growth,
          control, and long-term reliability.
        </p>
        <div className="flex items-center gap-4">
          <Button className="flex h-10 w-36 items-center rounded-full px-6 py-2">
            <Link href="/about">Read More</Link>
            <ChevronRight className="size-5" />
          </Button>
        </div>
      </div>
      <div className="relative flex flex-1 items-center justify-center px-12">
        <div className="border-primary absolute -bottom-4 left-0 z-20 flex size-36 flex-col items-center justify-center gap-0.5 rounded-full border-6 bg-white p-4 text-center shadow-2xl">
          <p className="text-primary text-4xl font-medium">100%</p>
          <p className="text-sm">Customer Satisfaction</p>
        </div>

        <div className="relative z-10 h-80 w-[480px] overflow-hidden rounded-md shadow-xl">
          <Image
            src={"/images/illust-1.jpg"}
            alt="Illustration"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="absolute -top-12 right-0 z-0 h-60 w-[400px] rounded-md bg-red-200" />
      </div>
    </section>
  );
}
