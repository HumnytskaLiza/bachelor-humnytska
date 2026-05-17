"use server";

import Header from "./ui/header";
import {
  checkAuth,
  getUserRoleAction,
  getAuthUserMetadataAction,
} from "@/lib/actions";
import AdminDashboard from "./ui/dashboard/admin";
import StandardDashboard from "./ui/dashboard/standard";
import { createClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createClient();

  await checkAuth();
  const role = await getUserRoleAction();
  const userMetadata = await getAuthUserMetadataAction();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <Header
        name={`👋 Hello, ${user?.user_metadata?.first_name}`}
        type={"header"}
      />
      {role === "standard" && <StandardDashboard user={userMetadata} />}
      {role === "admin" && <AdminDashboard />}
    </div>
  );
}
