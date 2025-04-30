import Pictures from "@/components/root/Gallery/Pictures";
import PageHeader from "@/components/root/PageHeader";

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
