import { ChevronsLeft, ChevronsRight } from "lucide-react";
import Image from "next/image";

const products = [
  {
    icon: "https://cdn1.iconfinder.com/data/icons/web-and-internet-outline/64/web-and-internet-02-512.png",
    title: "Internet Service Provider",
    description:
      "We offer a wide range of services to meet your needs with reliable connection",
  },
  {
    icon: "https://www.svgrepo.com/show/291910/ethernet.svg",
    title: "Metro Ethernet",
    description:
      "Provide domestic and some countries with Metro Ethernet running up to 10Gbps",
  },
  {
    icon: "https://cdn-icons-png.freepik.com/512/5048/5048756.png",
    title: "Clean Pipe Services",
    description:
      "We preventing DDoS attacks and other malicious traffic that can harm your network",
  },
];

export default function Products() {
  return (
    <section
      id="about"
      className="relative flex w-full flex-col items-center justify-between gap-12 px-4 py-12 lg:px-24 lg:py-32"
    >
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="flex items-center gap-2">
          <ChevronsRight className="text-primary size-4" />
          <p className="text-secondary font-semibold tracking-[2px] uppercase">
            OUR PRODUCTS
          </p>
          <ChevronsLeft className="text-primary size-4" />
        </div>
        <h2 className="text-3xl font-medium lg:text-5xl">
          We Offer Satisfactions
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-sm lg:text-base">
          Achieve seamless technology and advanced networks with IT solutions
          tailored for modern infrastructure. Each solution supports growth,
          control, and long-term reliability.
        </p>
      </div>
      <div className="grid w-full grid-cols-1 gap-9 px-12 lg:grid-cols-3 lg:gap-12 lg:px-32">
        {products.map((product, i) => (
          <div
            key={i}
            className="via-primary relative flex h-72 w-full cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-tr-4xl rounded-bl-4xl bg-gradient-to-tl from-red-700 to-red-700 p-4 shadow-md transition-all duration-300 hover:scale-105 lg:h-96"
          >
            <div className="relative size-16 lg:size-24">
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
            <p className="text-background text-center text-sm">
              {product.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
