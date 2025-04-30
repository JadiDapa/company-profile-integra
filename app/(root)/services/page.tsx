import AboutUs from "@/components/root/About/AboutUs";
import FindUs from "@/components/root/About/FindUs";
import VisionMission from "@/components/root/About/VisionMission";
import PageHeader from "@/components/root/PageHeader";

export default function ServicePage() {
  return (
    <section id="services">
      <PageHeader
        page="Services"
        title="Neat Quality Provided"
        accent="For You"
        subtitle="Achieve seamless technology and advanced networks with IT solutions tailored for modern infrastructure. Each solution supports growth, control, and long-term"
      />
      <AboutUs />
      <VisionMission />
      <FindUs />
    </section>
  );
}
