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
];

export default function NavLinks() {
  const pathname = usePathname();
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
              className={`border-gray-300 border-b text-sm font-medium m-0 
        hover:bg-gray-100 flex-none justify-start py-4 px-3
        ${link.href === pathname ? "bg-gray-200" : ""}`}
            >
              <p className="block">{link.name}</p>
            </div>
          </Link>
        ))}
    </div>
  );
}
