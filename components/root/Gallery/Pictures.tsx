"use client";

import { format } from "date-fns";
import Image from "next/image";
import SearchGalleryBar from "./SearchGalleryBar";
import { useEffect, useState } from "react";
import { getAllGalleries } from "@/app/actions/gallery.action";
import { GalleryWithImage } from "@/lib/validators/gallery.validator";

export default function Pictures() {
  const [query, setQuery] = useState("");
  const [galleries, setGalleries] = useState<GalleryWithImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllGalleries();
      setGalleries(data ?? []);
      setLoading(false);
    }

    fetchData();
  }, []);

  const filteredGalleries = galleries.filter((gallery) =>
    gallery.title.toLowerCase().includes(query.toLowerCase()),
  );

  if (loading) {
    return <p className="px-4 py-24">Loading...</p>;
  }

  return (
    <section className="bg-primary/5 w-full space-y-12 px-4 py-24 lg:px-28">
      <SearchGalleryBar setQuery={setQuery} />

      <section className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3">
        {filteredGalleries.map((gallery) => (
          <div
            key={gallery.id}
            className="group relative w-full overflow-hidden rounded-lg"
          >
            <div className="relative h-56 w-full overflow-hidden shadow-md">
              <Image
                src={gallery.image?.url as string}
                alt={gallery.title}
                fill
                className="object-cover object-center"
              />
            </div>

            <div className="absolute bottom-0 left-0 h-full w-full p-4 transition-all duration-500 lg:translate-y-full lg:group-hover:translate-y-0">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="relative z-10">
                <h2 className="line-clamp-2 text-xl font-medium text-white">
                  {gallery.title}
                </h2>
                <p className="text-white">
                  {format(new Date(gallery.createdAt), "dd MMM yyyy")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
}
