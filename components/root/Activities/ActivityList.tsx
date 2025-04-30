"use client";

import { getAllActivities } from "@/lib/networks/activity";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Image from "next/image";
import SearchActivityBar from "./SearchActivityBar";
import { useState } from "react";

export default function ActivityList() {
  const [query, setQuery] = useState<string>("");

  const { data: activities } = useQuery({
    queryFn: getAllActivities,
    queryKey: ["activities"],
  });

  const filteredActivities = activities?.filter((activity) =>
    activity.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <section id="activity-list" className="bg-primary/5 px-28 py-12 pb-24">
      <SearchActivityBar setQuery={setQuery} />
      <div className="grid grid-cols-1 gap-12 pt-6 lg:grid-cols-3">
        {filteredActivities?.map((activity) => (
          <div key={activity.id}>
            <div className="relative h-64 w-full overflow-hidden rounded-lg shadow-md">
              <Image
                src={activity.image as string}
                alt={activity.title}
                fill
                className="object-cover object-center"
              />
            </div>
            <h2 className="mt-1 line-clamp-2 text-xl font-semibold">
              {activity.title}
            </h2>
            <div className="flex items-center justify-between">
              <p className="text-secondary capitalize">{activity.category}</p>
              <p className="text-primary">
                {format(activity.createdAt, "dd MMM yyyy")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
