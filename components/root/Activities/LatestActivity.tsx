import React from "react";
import { Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import { ActivityType } from "@/lib/validators/activity.validator";
import { getMediaUrl } from "@/lib/getMediaUrl";

export default async function LatestActivity({
  activity,
}: {
  activity: ActivityType;
}) {
  return (
    <div className="text-primary bg-primary/5 relative px-4 pt-24 pb-4 lg:px-28">
      {/* Header */}

      {/* News Hero Section */}
      <div className="relative z-10">
        <h2 className="text-primary text-4xl font-medium">Latest Activity</h2>
      </div>

      {/* News Content */}

      {/* Featured Post */}
      <div className="mt-4">
        <div className="relative h-[500px] w-full overflow-hidden rounded-lg shadow-xl">
          <Image
            unoptimized
            fill
            src={getMediaUrl(activity.image?.url as string)}
            alt={activity.title}
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
          <div className="absolute bottom-0 left-0 w-full p-8 md:w-2/3">
            <span className="mb-4 inline-block rounded-full border border-slate-200 bg-white/20 px-3 py-1 text-sm font-semibold text-slate-200 capitalize">
              {activity.category}
            </span>
            <h3 className="mb-4 text-3xl text-slate-200 md:text-4xl">
              {activity.title}
            </h3>
            <p className="mb-6 text-gray-300">{activity.content}</p>
            <div className="mb-6 flex items-center text-sm text-gray-300">
              <span className="mr-4 capitalize">{activity.category}</span>
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>{format(activity.createdAt, "dd MMM yyyy")}</span>
              </div>
            </div>
            <button className="flex items-center text-white transition-colors hover:text-gray-300">
              <span className="mr-2 font-medium">Read More</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Recent Posts */}
    </div>
  );
}
