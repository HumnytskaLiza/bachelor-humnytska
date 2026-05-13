"use server";

import { robotoSlab } from "./ui/fonts";
import "@/app/ui/globals.css";
import { getUserRole } from "@/lib/data";
import App from "./app";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const role = await getUserRole();
  return (
    <html lang="en">
      <body className={`${robotoSlab.className} antialiased`}>
        <App role={role}>{children}</App>
      </body>
    </html>
  );
}
