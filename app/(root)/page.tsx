import type { Metadata } from "next";
import About from "@/components/root/Home/About";
import CTA from "@/components/root/Home/CTA";
import FAQ from "@/components/root/Home/FAQ";
import Hero from "@/components/root/Home/Hero";
import Activities from "@/components/root/Home/Activities";
import Statistic from "@/components/root/Home/Statistic";
import LocationCheck from "@/components/root/Home/LocationCheck";
import Products from "@/components/root/Home/Products";
import Services from "@/components/root/Home/Services";
import AmbientGlow from "@/components/root/AmbientGlow";

export const metadata: Metadata = {
  title: "Integra Telekom | Reliable Unlimited Internet Provider",
  description:
    "Integra Telekom is a reliable unlimited internet provider that offers high-speed internet connections in Indonesia, providing you with uninterrupted access to unlimited internet.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="relative isolate">
      <AmbientGlow />
      <Hero />
      <Statistic />
      <LocationCheck />
      <Products />
      <Services />
      <About />
      <Activities />
      <FAQ />
      <CTA />
    </div>
  );
}
