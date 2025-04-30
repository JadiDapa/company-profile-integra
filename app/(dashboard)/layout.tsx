import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export default function RootLayout({ children }: Props) {
  return (
    <section className="bg-primary/5 flex min-h-screen w-full overflow-hidden lg:gap-12">
      <div>
        <Sidebar />
      </div>

      <main className="w-full lg:ml-[240px]">
        <Navbar />
        <div className="px-3 pb-6">{children}</div>
      </main>
    </section>
  );
}
