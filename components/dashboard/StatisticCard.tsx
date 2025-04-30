import { LucideIcon } from "lucide-react";
import Image from "next/image";

interface StatisticCardProps {
  Icon?: LucideIcon;
  title: string;
  value: number | string;
  image?: string | File;
}

export default function StatisticCard({
  Icon,
  title,
  value,
  image,
}: StatisticCardProps) {
  return (
    <div className="flex w-full flex-col items-center gap-3 rounded-xl bg-white p-4 shadow-sm lg:h-36 lg:flex-row lg:p-6">
      <div className="bg-primary grid size-10 place-items-center rounded-full lg:size-14">
        {Icon && <Icon className="size-5 text-white lg:size-7" />}
      </div>
      <div className="space-y-1 text-center lg:text-start">
        <p className="text-primary/50 font-medium">{title}</p>
        <p className="text-primary text-3xl font-bold">{value}</p>
      </div>
      {image && (
        <figure className="ize-12 relative lg:size-20">
          <Image
            src={image as string}
            alt=""
            fill
            className="object-cover object-center"
          />
        </figure>
      )}
    </div>
  );
}
