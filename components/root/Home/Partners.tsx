import Image from "next/image";
import Marquee from "react-fast-marquee";

const partners = [
  { name: "Partner 1", logo: "/images/partner-7.svg" },
  { name: "Partner 2", logo: "/images/partner-7.svg" },
  { name: "Partner 3", logo: "/images/partner-7.svg" },
  { name: "Partner 1", logo: "/images/partner-7.svg" },
  { name: "Partner 2", logo: "/images/partner-7.svg" },
  { name: "Partner 3", logo: "/images/partner-7.svg" },
  { name: "Partner 3", logo: "/images/partner-7.svg" },
];

export default function Partners() {
  return (
    <section id="partners" className="bg-primary/5 relative py-4">
      <p className="text-muted-foreground text-center font-medium">
        We Trusted By <strong>200+</strong> Companies
      </p>
      <div className="mt-4 flex w-full items-center justify-between">
        <Marquee speed={45} pauseOnHover pauseOnClick gradient={false}>
          {partners.map((partner, index) => (
            <div
              key={index}
              className="relative mx-6 flex h-6 w-24 items-center justify-center p-4 lg:mx-12 lg:h-10 lg:w-32"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain object-center grayscale-100 transition hover:grayscale-0"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
