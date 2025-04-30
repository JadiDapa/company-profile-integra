import { ChevronsRight } from "lucide-react";
import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="relative my-24 flex w-full flex-col gap-24 lg:my-32 lg:flex-row lg:gap-0"
    >
      <div className="text-background via-primary order-2 flex h-[520px] flex-3 flex-col justify-center gap-4 bg-gradient-to-tl from-red-700 to-red-700 py-32 ps-4 lg:order-1 lg:py-0 lg:ps-28">
        <div className="flex items-center gap-2">
          <ChevronsRight className="text-background size-4" />
          <p className="text-background font-semibold tracking-[2px] uppercase">
            ABOUT US
          </p>
        </div>
        <h2 className="max-w-xl text-3xl font-medium lg:text-5xl">
          Innovation Shape The Future
        </h2>
        <p className="text-background max-w-xs text-sm lg:max-w-xl lg:text-base">
          Achieve seamless technology and advanced networks with IT solutions
          tailored for modern infrastructure. Each solution supports growth,
          control, and long-term reliability. We are committed to delivering
          top-notch service and support
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {[1, 2, 3, 4].map((_, i) => (
            <div key={i} className="flex items-center gap-2 lg:items-start">
              <div className="bg-background size-3 rounded-xs lg:mt-1 lg:size-4" />
              <p className="text-background text-sm lg:text-base">
                Provide top quality service backend
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="relative order-1 flex h-[520px] w-full flex-2 items-center justify-center px-12 lg:order-2 lg:w-auto">
        <Image
          src={"/images/illust-5.jpg"}
          alt="Illustration"
          fill
          className="object-cover object-center"
        />
      </div>
    </section>
  );
}
