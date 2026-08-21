import { notFound } from "next/navigation";
import ActivityForm from "@/components/dashboard/activities/ActivityForm";
import { getActivityBySlug } from "@/app/actions/activity.action";

export default async function UpdateActivityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const activity = await getActivityBySlug(slug);

  if (!activity) return notFound();

  return (
    <section className="flex w-full flex-col gap-6 py-6">
      <ActivityForm activity={activity} />
    </section>
  );
}
