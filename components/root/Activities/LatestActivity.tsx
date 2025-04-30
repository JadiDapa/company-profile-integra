"use client";

import React from "react";
import { Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import { getAllActivities } from "@/lib/networks/activity";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";

interface LatestActivityProps {
  image: string;
  title: string;
  content: string;
  date: string;
  category: string;
}

export default function LatestActivity({}: LatestActivityProps) {
  const { data: activities } = useQuery({
    queryFn: getAllActivities,
    queryKey: ["activities"],
  });

  const latestActivity = activities?.[0];

  if (!latestActivity) return null;

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
            fill
            src={latestActivity.image as string}
            alt={latestActivity.title}
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
          <div className="absolute bottom-0 left-0 w-full p-8 md:w-2/3">
            <span className="mb-4 inline-block rounded-full border border-slate-200 bg-white/20 px-3 py-1 text-sm font-semibold text-slate-200 capitalize">
              {latestActivity.category}
            </span>
            <h3 className="mb-4 text-3xl text-slate-200 md:text-4xl">
              {latestActivity.title}
            </h3>
            <p className="mb-6 text-gray-300">{latestActivity.content}</p>
            <div className="mb-6 flex items-center text-sm text-gray-300">
              <span className="mr-4 capitalize">{latestActivity.category}</span>
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>{format(latestActivity.createdAt, "dd MMM yyyy")}</span>
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
