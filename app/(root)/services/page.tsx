import PageHeader from "@/components/root/PageHeader";
import ServiceSection from "@/components/root/Services/ServiceSection";

export const products = [
  {
    icon: "https://cdn1.iconfinder.com/data/icons/web-and-internet-outline/64/web-and-internet-02-512.png",
    title: "Internet Service",
    description:
      "Stay connected with our reliable and high-speed internet solutions. We provide both dedicated and shared options designed to ensure smooth browsing, seamless communication, and uninterrupted business operations.",
    list: ["Internet Dedicated", "Internet Broadband", "Dedicated Shared"],
  },

  {
    icon: "https://www.svgrepo.com/show/291910/ethernet.svg",
    title: "Infrastructure Network",
    description:
      "Build a strong foundation for your business with our robust network infrastructure solutions. From local loops and VPNs to satellite connectivity, we deliver secure, scalable, and efficient networking tailored to your needs.",
    list: ["Local Loop (MPLS L2/L3)", "Radio Trunking", "VPN-IP", "V-SAT"],
  },

  {
    icon: "/images/data-center.png",
    title: "Data Center",
    description:
      "Protect and manage your critical data with our secure and efficient data center services. We provide colocation and dedicated server options that ensure stability, reliability, and high availability for your business.",
    list: ["Colocation", "Dedicated Server"],
  },

  {
    icon: "/images/telephone.png",
    title: "Telephone",
    description:
      "Enhance your communication systems with our comprehensive telephone solutions. Whether it’s VoIP, PSTN, or cloud-based PBX, we help businesses stay connected with clarity and reliability.",
    list: ["VoIP", "PSTN", "Cloud PABX"],
  },

  {
    icon: "/images/manage.png",
    title: "Manage Services",
    description:
      "Focus on growth while we manage your IT operations with professionalism and care. Our managed services cover networking, security, IoT, and firewalls, ensuring optimal performance and peace of mind for your business.",
    list: [
      "Network Managed",
      "Security System",
      "Internet Of Things (IoT)",
      "Firewall System",
    ],
  },

  {
    icon: "/images/software.png",
    title: "Software Development",
    description:
      "Transform ideas into powerful digital solutions with our custom software development services. From AI-driven applications to mobile and web platforms, we build scalable and innovative tools tailored to your business goals.",
    list: [
      "AI (Artificial Intelligence)",
      "Mobile Application (Android/iOS)",
      "Web Application",
    ],
  },
];

export default function ServicePage() {
  return (
    <section id="services">
      <PageHeader
        page="Services"
        title="Neat Quality Provided"
        accent="For You"
        subtitle="Achieve seamless technology and advanced networks with IT solutions tailored for modern infrastructure. Each solution supports growth, control, and long-term"
      />
      <section>
        {products.map((product, index) => (
          <ServiceSection key={product.title} product={product} index={index} />
        ))}
      </section>
    </section>
  );
}
