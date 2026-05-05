"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Dashboard",
    href: "/",
    label: "dashboard",
  },
  { name: "Employees", href: "/employees", label: "employees" },
  {
    name: "Knowledge Base",
    href: "/knowledge",
    label: "knowledge",
  },
  {
    name: "AI Assistant",
    href: "/assistant",
    label: "assistant",
  },
  {
    name: "Journeys",
    href: "/journeys",
    label: "journeys",
  },
];

export default function NavLinks() {
  const currentPath = usePathname().split("/")[1];

  return (
    <div className="flex flex-col">
      {links.map((link) => (
        <Link key={link.name} href={link.href} passHref>
          <div
            className={`border-gray-300 border-t p-2 text-sm font-medium m-0 
        hover:bg-gray-100 md:flex-none md:justify-start md:p-4 md:px-3
        ${link.label == currentPath ? "bg-gray-200" : ""}`}
          >
            <p className="hidden md:block">{link.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
