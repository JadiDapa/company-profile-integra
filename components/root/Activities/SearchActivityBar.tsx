"use client";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategories } from "@/lib/networks/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { ArrowDownNarrowWide, Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";

const formSchema = z.object({
  search: z.string(),
  filter: z.string(),
});

type SearchActivityBarProps = {
  setQuery: (value: string) => void;
};

export default function SearchActivityBar({
  setQuery,
}: SearchActivityBarProps) {
  const { data: categories } = useQuery({
    queryFn: getAllCategories,
    queryKey: ["categories"],
  });

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
    <div className="flex w-full flex-col justify-between gap-4 lg:flex-row">
      <FormField
        control={form.control}
        name="search"
        render={({ field }) => (
          <div className="border-primary relative w-full overflow-hidden rounded-full border-2 lg:w-96">
            <Search
              className="text-primary absolute top-1/2 left-4 -translate-y-1/2"
              size={20}
              strokeWidth={1.4}
            />
            <Input
              className="border-none ps-12"
              placeholder="Search for products"
              {...field}
            />
          </div>
        )}
      />

      <div className="flex items-center justify-between gap-3 lg:justify-normal">
        <FormField
          control={form.control}
          name="filter"
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="border-primary w-72 rounded-full border-2 px-4 lg:w-64">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="rounded-lg">
                <SelectGroup className="divide-y">
                  <SelectItem value="Select Category">
                    Select Category
                  </SelectItem>
                  {categories?.map((category) => (
                    <SelectItem key={category.slug} value={category.slug}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />

        <Button className="rounded-full">
          <ArrowDownNarrowWide />
        </Button>
      </div>
    </div>
  );
}
