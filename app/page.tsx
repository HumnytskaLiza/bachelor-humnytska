"use server";

import Header from "./ui/header";
import { checkAuth, getUserRoleAction } from "@/lib/actions";
import AdminDashboard from "./ui/dashboard/admin";
import StandardDashboard from "./ui/dashboard/standard";
import { createClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createClient();

  await checkAuth();
  const role = await getUserRoleAction();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <Header
        name={`👋 Hello, ${user?.user_metadata?.first_name}`}
        type={"header"}
      />
      {role === "standard" && <StandardDashboard />}
      {role === "admin" && <AdminDashboard />}
    </div>
  );
}
