"use client";
import { geistSans, geistMono, robotoSlab, josefinSans } from "./ui/fonts";
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
        <main className={`flex h-full w-full flex-row`}>
          {!hideNavbar && (
            <aside className="sticky top-0 h-screen">
              <SideNav />
            </aside>
          )}
          <div className="flex flex-col w-full h-screen">
            {!hideNavbar && <Navbar />}
            <div className={`${styles.padding}`}>{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}
