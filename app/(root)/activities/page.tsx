import type { Metadata } from "next";
import { getAllActivities } from "@/app/actions/activity.action";
import ActivityList from "@/components/root/Activities/ActivityList";
import LatestActivity from "@/components/root/Activities/LatestActivity";
import PageHeader from "@/components/root/PageHeader";

export const metadata: Metadata = {
  title: "Activities",
  description:
    "See Integra Telekom's community initiatives and projects, from network rollouts to events that drive growth and meaningful connections.",
  alternates: { canonical: "/activities" },
};

export default async function ActivitiesPage() {
  const activities = await getAllActivities();

  return (
    <section id="activities">
      <PageHeader
        page="Activities"
        title="This Is What We Do For"
        accent="All Of Them"
        subtitle="From community initiatives to innovative projects, we actively engage in activities that create impact, foster growth, and drive meaningful connections."
      />
      {activities.length > 0 && (
        <>
          <LatestActivity activity={activities[0]} />
          <ActivityList activities={activities.slice(1)} />
        </>
      )}
    </section>
  );
}
