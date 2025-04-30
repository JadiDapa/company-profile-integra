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
        subtitle="Achieve seamless technology and advanced networks with IT solutions tailored for modern infrastructure. Each solution supports growth, control, and long-term"
      />
      <LatestActivity title="" content="" image="" date="" category="" />
      <ActivityList />
    </section>
  );
}
