"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileNav from "./MobileNav";
import { Search } from "lucide-react";

const links = [
  {
    name: "HOME",
    route: "/",
  },
  {
    name: "ABOUT",
    route: "/about",
  },
  {
    name: "SERVICES",
    route: "/services",
  },
  {
    name: "REPORTS",
    route: "/activities",
  },
  {
    name: "CONTACT",
    route: "/gallery",
  },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={cn(
        "text-background fixed top-0 left-0 z-50 flex w-full items-center justify-between px-4 py-4 transition lg:px-24 lg:py-2",
        { "text-foreground bg-stone-50 shadow-sm": isScrolled },
      )}
    >
      <figure className="flex items-center gap-3">
        <div className="relative h-6 w-12 lg:h-20 lg:w-40">
          <Image
            src="/images/logo.png"
            alt="Integra Logo"
            fill
            className={`object-contain object-center transition ${!isScrolled && "brightness-0 invert"}`}
          />
        </div>
      </figure>
      <div className="block lg:hidden">
        <MobileNav links={links} />
      </div>

      <div className="hidden items-center gap-8 lg:flex">
        {links.map((link) => (
          <div key={link.name}>
            <Link
              href={link.route}
              className={`hover:border-primary border-b-2 border-transparent text-lg transition ${
                pathname === link.route ? "font-bold" : "font-medium"
              }`}
            >
              {link.name}
            </Link>
            {pathname === link.route && (
              <div
                className={`${isScrolled ? "bg-foreground" : "bg-background"} h-0.5 w-full transition`}
              />
            )}
          </div>
        ))}
        <div
          className={`${
            isScrolled ? "border-foreground" : "border-background"
          } flex items-center gap-4 rounded-full border-2 px-4 py-1 pe-8 transition`}
        >
          <Search className="size-4" />
          <p className="">Search Anything...</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
