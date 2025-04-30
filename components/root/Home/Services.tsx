import { Cctv, Computer, Globe, Stars } from "lucide-react";
import Image from "next/image";

export default function Services() {
  return (
    <section
      id="services"
      className="relative flex w-full flex-col items-center justify-between px-4 py-24 lg:px-28"
    >
      <div className="mb-12 flex flex-col items-center gap-4 text-center">
        <div className="text-primary border-primary flex max-w-fit items-center gap-2 rounded-full border-2 px-4 py-0.5">
          <h3 className="font-medium">Services</h3>
          <Stars className="size-4" />
        </div>
        <h2 className="max-w-xs text-3xl font-medium lg:max-w-none lg:text-5xl">
          We Provide
          <span className="text-primary"> Innovative Solutions</span>
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-sm lg:text-base">
          Achieve seamless technology and advanced networks with IT solutions
          tailored for modern infrastructure. Each solution supports growth,
          control, and long-term reliability.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="h-full rounded-2xl border p-6 md:row-span-2">
          <div className="relative h-32 w-full lg:h-[410px]">
            <Image
              src="/images/hero.png"
              alt="Hero"
              className="object-cover object-center"
              fill
            />
          </div>
          <div className="flex gap-6">
            <div className="bg-primary mt-2 flex size-14 items-center justify-center rounded-full">
              <Cctv className="size-8 text-white" />
            </div>
            <div className="flex flex-1 flex-col justify-end">
              <h3 className="mb-2 text-xl font-semibold">
                Hardware Installation
              </h3>
              <p className="text-muted-foreground text-sm">
                Providing hardware installation services for all your IT needs,
                including servers, workstations, and network devices.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border p-6">
          <div className="relative h-32 w-full lg:h-[410px]">
            <Image
              src="/images/hero.png"
              alt="Hero"
              className="object-cover object-center"
              fill
            />
          </div>
          <div className="flex gap-6">
            <div className="bg-primary mt-2 flex size-14 items-center justify-center rounded-full">
              <Globe className="size-8 text-white" />
            </div>
            <div className="flex flex-1 flex-col justify-end">
              <h3 className="mb-2 text-xl font-semibold">
                Nework Configuration
              </h3>
              <p className="text-muted-foreground text-sm">
                Providing hardware installation services for all your IT needs,
                including servers, workstations, and network devices.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border p-6">
          <div className="relative h-32 w-full lg:h-[410px]">
            <Image
              src="/images/hero.png"
              alt="Hero"
              className="object-cover object-center"
              fill
            />
          </div>
          <div className="flex gap-6">
            <div className="bg-primary mt-2 flex size-14 items-center justify-center rounded-full">
              <Computer className="size-8 text-white" />
            </div>
            <div className="flex flex-1 flex-col justify-end">
              <h3 className="mb-2 text-xl font-semibold">Other IT Services</h3>
              <p className="text-muted-foreground text-sm">
                Providing hardware installation services for all your IT needs,
                including servers, workstations, and network devices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
