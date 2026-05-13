import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const links = [
  {
    name: "Dashboard",
    href: "/",
    label: "dashboard",
    roles: ["admin", "standard"],
  },
  {
    name: "Employees",
    href: "/employees",
    label: "employees",
    roles: ["admin"],
  },
  {
    name: "Knowledge Base",
    href: "/knowledge",
    label: "knowledge",
    roles: ["admin", "standard"],
  },
  {
    name: "AI Assistant",
    href: "/assistant",
    label: "assistant",
    roles: ["admin", "standard"],
  },
  {
    name: "Journeys",
    href: "/journeys",
    label: "journeys",
    roles: ["admin"],
  },
  {
    name: "My Journey",
    href: "/my-journey",
    label: "my journey",
    roles: ["standard"],
  },
];

export default function NavLinks() {
  const currentPath = usePathname().split("/")[1];
  const [role, setRole] = useState<string>("standard");

  useEffect(() => {
    const supabase = createClient();

    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      setRole(data?.role ?? null);
    }

    load();
  }, []);
  return (
    <div className="flex flex-col">
      {links
        .filter((link) => !link.roles || link.roles.includes(role))
        .map((link) => (
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
