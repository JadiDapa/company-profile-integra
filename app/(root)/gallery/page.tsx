import type { Metadata } from "next";
import Pictures from "@/components/root/Gallery/Pictures";
import PageHeader from "@/components/root/PageHeader";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse photos of Integra Telekom's completed installations, infrastructure, and projects across Indonesia.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <section id="gallery">
      <PageHeader
        page="Gallery"
        title="Every Works Done"
        accent="With Love"
        subtitle="Achieve seamless technology and advanced networks with IT solutions tailored for modern infrastructure. Each solution supports growth, control, and long-term"
      />
      <Pictures />
    </section>
  );
}
