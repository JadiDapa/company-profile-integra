"use client";

import { Accordion } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import useSidebarStore from "@/stores/SidebarStore";
import { House, Images, LogOut, NotebookPen, X } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

const userLink = [
  {
    name: "Dashboard",
    url: "/dashboard",
    Icon: House,
    public: true,
  },
  {
    name: "Activities",
    url: "/dashboard/activities",
    Icon: NotebookPen,
    public: true,
  },
  {
    name: "Gallery",
    url: "/dashboard/galleries",
    Icon: Images,
    public: false,
  },
];

export default function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useSidebarStore();

  const pathname = usePathname();

  const router = useRouter();

  async function handleLogout() {
    await signOut();
    router.push("/");
    toast.success("Behasil Log Out!");
  }

  return (
    <>
      <aside
        className={cn(
          "box-shadow bg-primary fixed z-50 min-h-screen w-[280px] space-y-3 overflow-hidden px-4 py-7 shadow-sm transition-all duration-500",
          isSidebarOpen ? "translate-x-0" : "max-lg:-translate-x-full",
        )}
      >
        <div className="flex w-full items-center">
          <Link
            href={"/"}
            className="bg-background relative flex h-12 w-16 items-center justify-center rounded-lg"
          >
            <div className="relative h-12 w-12">
              <Image
                src="/images/logo.png"
                alt="Logo"
                className="object-contain object-center"
                fill
              />
            </div>
          </Link>
          <Link href={"/"} className="flex-1">
            <p className="text-background text-center font-medium">
              Taruna Augerah Mandiri
            </p>
          </Link>

          <X
            onClick={closeSidebar}
            className="text-background lg:hidden"
            size={32}
            strokeWidth={1.8}
          />
        </div>

        <Separator />

        <ScrollArea className="h-[85vh] text-slate-100">
          <Accordion type="single" className="flex flex-col gap-2" collapsible>
            {userLink.map((item) => {
              return (
                <div key={item.url}>
                  <Link
                    onClick={closeSidebar}
                    key={item.url}
                    href={item.url}
                    className={cn(
                      "text-background mt-1 flex w-full items-center justify-between rounded-lg px-5 py-2.5 duration-300",
                      pathname === item.url
                        ? "bg-background text-primary shadow-sm"
                        : "hover:bg-background hover:text-primary",
                    )}
                  >
                    <div className="flex items-center justify-center gap-5">
                      <item.Icon strokeWidth={1.8} size={24} />
                      <div className="text-xl">{item.name}</div>
                    </div>
                  </Link>
                </div>
              );
            })}
            <Separator />
            <div
              className={cn(
                "text-background mt-1 flex h-full w-full cursor-pointer items-center px-5 py-2.5 duration-300",
              )}
            >
              <div
                onClick={handleLogout}
                className={`"justify-center flex cursor-pointer items-center gap-5`}
              >
                <LogOut strokeWidth={1.8} size={24} />
                <div className="text-xl">Log Out</div>
              </div>
            </div>
          </Accordion>
        </ScrollArea>
      </aside>
    </>
  );
}
