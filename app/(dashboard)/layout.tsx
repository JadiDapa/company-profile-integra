import React, { ReactNode } from "react";
import { getUser } from "../actions/user.actions";
import { redirect } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "@/components/dashboard/Navbar";

type Props = {
  children: ReactNode;
};
export default async function RootLayout({ children }: Props) {
  const user = await getUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <SidebarProvider>
      <Sidebar user={user} />
      <main className="bg-background flex min-h-screen w-full flex-col gap-2 overflow-hidden py-2 pe-2">
        <Navbar user={user} />
        {children}
      </main>
    </SidebarProvider>
  );
}
