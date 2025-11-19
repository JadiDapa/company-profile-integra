import { ChevronsLeft, ChevronsRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const products = [
  {
    icon: "https://cdn1.iconfinder.com/data/icons/web-and-internet-outline/64/web-and-internet-02-512.png",
    title: "Internet Service",
    description: [
      "Internet Dedicated",
      "Internet Broadboard",
      "Dedicated Shared",
    ],
  },
  {
    icon: "https://www.svgrepo.com/show/291910/ethernet.svg",
    title: "Infrastructure Network",
    description: [
      "Local Loop (MPLS L2/L3)",
      "Radio Trunking",
      "VPN-IP",
      "V-SAT",
    ],
  },
  {
    icon: "/images/data-center.png",
    title: "Data Center",
    description: ["Colocation", "Dedicated Server"],
  },
  {
    icon: "/images/telephone.png",
    title: "Telephone",
    description: ["VoIP", "PSTN", "Cloud PABX"],
  },
  {
    icon: "/images/manage.png",
    title: "Manage Services",
    description: [
      "Network Managed",
      "Security System",
      "Internet Of Things (IoT)",
      "Firewall System",
      // "Command Center (Monitoring)",
    ],
  },
  {
    icon: "/images/software.png",
    title: "Software Development",
    description: [
      "AI (Artificial Intelligence)",
      "Mobile Application (Android/iOS)",
      "Web Application",
    ],
  },
];

export default function Services() {
  return (
    <section
      id="about"
      className="relative flex w-full flex-col items-center justify-between gap-12 px-4 py-12 lg:px-24 lg:py-32"
    >
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="flex items-center gap-2">
          <ChevronsRight className="text-primary size-4" />
          <p className="text-secondary font-semibold tracking-[2px] uppercase">
            OUR SERVICES
          </p>
          <ChevronsLeft className="text-primary size-4" />
        </div>
        <h2 className="text-3xl font-medium lg:text-5xl">
          We Offer Satisfactions
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-sm lg:text-base">
          Explore our wide range of services designed to meet your connectivity
          needs. From high-speed internet to advanced network solutions, we have
          you covered.
        </p>
      </div>
      <div className="grid w-full grid-cols-1 gap-9 px-12 lg:grid-cols-3 lg:gap-9 lg:px-32">
        {products.map((product, i) => (
          <Link
            href={`services#service-${i}`}
            key={i}
            className="via-primary relative flex h-64 w-full cursor-pointer flex-col items-center gap-3 overflow-hidden rounded-tr-4xl rounded-bl-4xl bg-gradient-to-tl from-red-700 to-red-700 p-4 pt-9 shadow-md transition-all duration-300 hover:scale-105 lg:h-80"
          >
            <div className="relative size-14 lg:size-24">
              <Image
                src={product.icon}
                alt={"Illustration"}
                fill
                className="object-contain object-center brightness-0 invert"
              />
            </div>
            <h3 className="text-background text-center text-xl font-semibold lg:text-2xl">
              {product.title}
            </h3>
            <div className="">
              {product.description.map((index) => (
                <div className="flex items-center gap-2" key={index}>
                  <p className="text-xl text-white">-</p>
                  <p className="text-background text-sm lg:text-base">
                    {index}
                  </p>
                </div>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
