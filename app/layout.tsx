"use client";
import { robotoSlab } from "./ui/fonts";
import { usePathname } from "next/navigation";
import styles from "@/app/ui/modules/main.module.css";
import SideNav from "@/app/ui/sidenav";
import Navbar from "./ui/navbar";
import "@/app/ui/globals.css";

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const hideNavbar = pathname === "/login";

  return (
    <html lang="en">
      <body className={`${robotoSlab.className} antialiased`}>
        <main className={`flex h-screen w-full overflow-hidden`}>
          {!hideNavbar && (
            <aside className="h-full shrink-0">
              <SideNav />
            </aside>
          )}
          <div className="flex h-full flex-1 flex-col">
            {!hideNavbar && (
              <header className="sticky top-0 z-0">
                <Navbar />
              </header>
            )}

            <div className={`flex-1 overflow-y-auto ${styles.padding}`}>
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
