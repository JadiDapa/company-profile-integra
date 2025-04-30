"use client";

import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  search: z.string(),
  filter: z.string(),
});

interface SearchGalleryBarProps {
  setQuery: (value: string) => void;
}

export default function SearchGalleryBar({ setQuery }: SearchGalleryBarProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
      filter: "Select Category",
    },
  });

  useEffect(() => {
    const subscription = form.watch((values) => {
      setQuery(values.search as string);
    });

    return () => subscription.unsubscribe();
  }, [form.watch, setQuery, form]);

  return (
    <div className="text-primary relative flex justify-center">
      <FormField
        control={form.control}
        name="search"
        render={({ field }) => (
          <div className="border-primary relative w-full overflow-hidden border-b-2 lg:w-96">
            <Search
              className="text-primary absolute top-1/2 left-4 -translate-y-1/2"
              size={20}
              strokeWidth={1.4}
            />
            <Input
              className="border-none ps-12"
              placeholder="Search for Gallery"
              {...field}
            />
          </div>
        )}
      />
    </div>
  );
}
