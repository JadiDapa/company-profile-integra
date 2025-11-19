import ActivityList from "@/components/root/Activities/ActivityList";
import LatestActivity from "@/components/root/Activities/LatestActivity";
import PageHeader from "@/components/root/PageHeader";

export default function ActivitiesPage() {
  return (
    <section id="activities">
      <PageHeader
        page="Activities"
        title="This Is What We Do For"
        accent="All Of Them"
        subtitle="From community initiatives to innovative projects, we actively engage in activities that create impact, foster growth, and drive meaningful connections."
      />
      <LatestActivity title="" content="" image="" date="" category="" />
      <ActivityList />
    </section>
  );
}
