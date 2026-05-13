"use client";

import { usePathname } from "next/navigation";
import SideNav from "./ui/sidenav";
import Navbar from "./ui/navbar";
import styles from "@/app/ui/modules/main.module.css";

type AppShellProps = {
  children: React.ReactNode;
  role: string;
};

export default function App({ children }: AppShellProps) {
  const pathname = usePathname();
  const hideNavbar = pathname === "/login";

  return (
    <main className="flex h-screen w-full overflow-hidden">
      <aside className="h-full shrink-0">
        {!hideNavbar && (
          <aside className="h-full shrink-0">
            <SideNav />
          </aside>
        )}
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0">
          {!hideNavbar && (
            <header className="sticky top-0 z-0">
              <Navbar />
            </header>
          )}
        </header>

        <div className={`flex-1 overflow-y-auto ${styles.padding}`}>
          {children}
        </div>
      </div>
    </main>
  );
}
