"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User, UserRole } from "@/generated/prisma";
import { adminItems, settingsItems, technicianItems } from "@/lib/sidebar-menu";
import { PanelRightOpen, LogOut } from "lucide-react";

// Menu items.

export default function DashboardSidebar({ user }: { user: User }) {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();
  const { signOut } = useClerk();
  const router = useRouter();

  const role = user.role as UserRole;

  const handleSignOut = async () => {
    await signOut();
    router.replace("/sign-in");
  };

  return (
    <Sidebar className="bg-background border-none p-2">
      <SidebarContent className="bg-background">
        <ScrollArea className="bg-primary border-border h-screen overflow-hidden rounded-2xl border px-5">
          <div className="mb-4 flex items-center justify-between gap-3 py-4 pt-4">
            <figure className="relative h-16 w-48">
              <Image
                src="/images/logo.png"
                alt="Logo"
                className="object-contain object-center"
                fill
              />
            </figure>
            <PanelRightOpen
              onClick={toggleSidebar}
              className="text-white"
              strokeWidth={1.4}
            />
          </div>
          {/* Overview */}

          {role === "TECHNICIAN" && (
            <SidebarGroup className="p-0 pt-1">
              <SidebarGroupLabel className="text-sm font-semibold text-white">
                TECHNICIAN MENU
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {technicianItems.map((item) => {
                    const active = pathname === item.url;

                    return (
                      <SidebarMenuItem
                        key={item.title}
                        className="relative rounded-none p-0"
                      >
                        <SidebarMenuButton asChild>
                          <Link
                            href={item.url || "#"}
                            className={`${
                              active
                                ? "text-primary bg-white font-medium hover:bg-white"
                                : "text-white"
                            } flex h-10 items-center gap-x-4`}
                          >
                            <item.icon
                              className={`${
                                active
                                  ? "text-primary font-medium"
                                  : "text-white"
                              } size-5 text-base`}
                            />
                            <span
                              className={`${
                                active
                                  ? "text-primary font-medium"
                                  : "text-white"
                              } text-base`}
                            >
                              {item.title}
                            </span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}

          {role === "ADMIN" && (
            <SidebarGroup className="p-0 pt-1">
              <SidebarGroupLabel className="text-sm font-semibold text-white">
                ADMIN MENU
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {adminItems.map((item) => {
                    const active = pathname === item.url;

                    return (
                      <SidebarMenuItem
                        key={item.title}
                        className="relative rounded-none p-0"
                      >
                        <SidebarMenuButton asChild>
                          <Link
                            href={item.url || "#"}
                            className={`${
                              active
                                ? "text-primary bg-white font-medium hover:bg-white"
                                : "text-white"
                            } flex h-10 items-center gap-x-4`}
                          >
                            <item.icon
                              className={`${
                                active
                                  ? "text-primary font-medium"
                                  : "text-white"
                              } size-5 text-base`}
                            />
                            <span
                              className={`${
                                active
                                  ? "text-primary font-medium"
                                  : "text-white"
                              } text-base`}
                            >
                              {item.title}
                            </span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}

          {/* SETTINGS pinned to bottom */}
          <SidebarGroup className="mt-auto p-0 pt-6 pb-6">
            <SidebarGroupLabel className="text-sm font-semibold text-white">
              GENERAL
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {settingsItems.map((item) => {
                  return (
                    <SidebarMenuItem
                      key={item.title}
                      className="relative rounded-none p-0"
                    >
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.url}
                          className="flex h-10 items-center gap-x-4"
                        >
                          <item.icon className="size-5 text-white" />
                          <span className="text-base text-white">
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
                <SidebarMenuItem className="relative rounded-none p-0">
                  <SidebarMenuButton asChild>
                    <div
                      onClick={handleSignOut}
                      className="flex h-10 cursor-pointer items-center gap-x-4"
                    >
                      <LogOut className="size-5 text-white" />
                      <span className="text-base text-white">Log Out</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}
