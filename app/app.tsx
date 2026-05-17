"use client";

import { usePathname } from "next/navigation";
import SideNav from "./ui/sidenav";
import Navbar from "./ui/navbar";
import styles from "@/app/ui/modules/main.module.css";
import { useState } from "react";

type AppShellProps = {
  children: React.ReactNode;
  role: string;
};

export default function App({ children }: AppShellProps) {
  const pathname = usePathname();
  const hideNavbar = pathname === "/login";
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <main className="flex h-screen w-full overflow-hidden">
      {!hideNavbar && (
        <aside
          className={`sticky top-0 left-0 h-full z-0 transition-all duration-300 overflow-hidden
                      ${sidebarOpen ? "w-screen md:w-80" : "w-0"}`}
        >
          <SideNav />
        </aside>
      )}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0">
          {!hideNavbar && (
            <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          )}
        </header>

        <div
          className={`${sidebarOpen ? "hidden md:flex" : "flex"} flex-1 overflow-y-auto ${styles.padding}`}
        >
          {children}
        </div>
      </div>
    </main>
  );
}
