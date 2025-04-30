import { ChevronsLeft, ChevronsRight, MapPin, Search } from "lucide-react";
import Image from "next/image";

export default function LocationCheck() {
  return (
    <section
      id="statistic"
      className="relative flex w-full flex-col items-center justify-between gap-16 px-4 py-12 lg:flex-row lg:px-24 lg:py-32"
    >
      <div className="flex-2">
        <div className="relative mx-auto size-80 overflow-hidden lg:size-96">
          <Image
            src={"/images/loca-illust.jpg"}
            alt="Illustration"
            fill
            className="object-contain object-center"
          />
        </div>
      </div>
      <div className="flex flex-3 flex-col items-end space-y-4">
        <div className="flex w-full items-center justify-center gap-2 lg:w-auto lg:justify-start">
          <ChevronsRight className="text-primary size-4 lg:hidden" />
          <p className="text-secondary font-semibold tracking-[2px] uppercase">
            LOCATION CHECK
          </p>
          <ChevronsLeft className="text-primary size-4" />
        </div>
        <h2 className="max-w-2xl text-center text-3xl font-medium lg:text-end lg:text-5xl">
          Enjoy Best Unlimited Internet Connection In Your Area
        </h2>
        <p className="text-muted-foreground max-w-3xl text-center text-sm lg:text-end lg:text-base">
          Achieve seamless technology and advanced networks with IT solutions
          tailored for modern infrastructure. Lorem ipsum dolor sit amet
          consectetur.
        </p>
        <div className="via-primary mt-8 w-full rounded-lg border bg-gradient-to-tl from-red-700 to-red-700 p-4">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="text-background size-5" />
              <h3 className="text-background text-lg font-semibold">
                Check Your Area
              </h3>
            </div>

            <p className="text-background hidden max-w-80 text-end text-sm lg:block lg:text-base">
              Enter your address to check if our service is available in your
              area.
            </p>
          </div>
          <div className="mt-4 flex flex-col items-center justify-between gap-4 lg:flex-row">
            <div className="relative w-full rounded-md border px-4 py-2">
              <Search className="text-background absolute top-1/2 left-4 size-5 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Provice, City, or District"
                className="text-background placeholder:text-background h-full w-full border-0 border-none ps-8"
              />
            </div>
            <div className="relative w-full rounded-md border px-4 py-2">
              <Search className="text-background absolute top-1/2 left-4 size-5 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Your Complete Address"
                className="text-background placeholder:text-background h-full w-full border-0 border-none ps-8"
              />
            </div>
            <button className="bg-background text-primary w-full rounded-full px-4 py-2 lg:w-fit">
              Check
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

interface StatisticCardProps {
  value: string;
  content: string;
}

export function StatisticCard({ value, content }: StatisticCardProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      <p className="text-primary text-5xl font-semibold">{value}</p>
      <p className="text-muted-foreground max-w-80">{content}</p>
    </div>
  );
}

export function DottedSeparator({ dots }: { dots?: number }) {
  return (
    <div className="flex flex-col gap-2">
      {[...Array(dots || 6)].map((_, i) => (
        <div key={i} className="bg-primary/50 h-3 w-[3px] rounded-full" />
      ))}
    </div>
  );
}
