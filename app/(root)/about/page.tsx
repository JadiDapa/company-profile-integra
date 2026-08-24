import type { Metadata } from "next";
import FindUs from "@/components/root/About/FindUs";
import About from "@/components/root/Home/About";
import PageHeader from "@/components/root/PageHeader";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Integra Telekom's mission to connect people and empower businesses with reliable, high-speed internet and IT solutions across Indonesia.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <section id="about">
      <PageHeader
        page="About"
        title="This Is Our"
        accent="Story"
        subtitle="We are dedicated to creating innovative solutions that connect people and empower businesses. By combining technology with a customer-first approach, we deliver reliable and efficient services. Our goal is to shape a smarter, connected future for everyone."
      />
      <About />
      <FindUs />
    </section>
  );
}
