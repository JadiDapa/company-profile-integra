import { Button } from "@/components/ui/button";
import { CheckSquare2, ChevronRight, Stars } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    title: "Advanced Technology",
    description:
      "Harness the power of cutting-edge technology to drive innovation and efficiency in your business.",
  },
  {
    title: "Seamless Integration",
    description:
      "Integrate our solutions seamlessly into your existing infrastructure for a smooth transition.",
  },
  {
    title: "Scalability",
    description:
      "Our solutions are designed to grow with your business, ensuring long-term success.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-primary/5 relative flex w-full flex-col items-center justify-between gap-12 px-4 py-24 lg:flex-row lg:px-28"
    >
      <div className="relative order-2 flex flex-1 scale-75 items-center justify-center gap-2 px-12 sm:scale-100 lg:order-1">
        <div className="absolute -top-6 left-0 z-0 h-96 w-[440px] rounded-xl bg-white shadow-xl" />
        <div className="relative z-10 flex flex-col gap-2">
          <div className="relative z-10 h-40 w-52 overflow-hidden rounded-md">
            <Image
              src={"/images/illust-1.jpg"}
              alt="Illustration"
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="relative z-10 h-40 w-52 overflow-hidden rounded-md">
            <Image
              src={"/images/illust-2.jpeg"}
              alt="Illustration"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>

        <div className="relative z-10 h-[324px] w-60 overflow-hidden rounded-md">
          <Image
            src={"/images/illust-3.jpg"}
            alt="Illustration"
            fill
            className="object-cover object-center"
          />
        </div>
      </div>
      <div className="order-1 flex-1 space-y-4 lg:order-2 lg:px-12">
        <div className="text-primary border-primary flex max-w-fit items-center gap-2 rounded-full border-2 px-4 py-0.5">
          <h3 className="font-medium">Features</h3>
          <Stars className="size-4" />
        </div>
        <h2 className="text-3xl font-medium lg:text-5xl">
          Innovation Shape The Future
        </h2>
        <div className="">
          {features.map((feature) => (
            <div key={feature.title} className="mt-4 flex items-center gap-4">
              <CheckSquare2 className="text-primary size-4 lg:size-6" />
              <p className="text-muted-foreground flex-1 text-sm lg:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Button className="flex h-10 w-36 items-center rounded-full px-6 py-2">
            <Link href="/about">Read More</Link>
            <ChevronRight className="size-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
