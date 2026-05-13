"use server";

import Header from "./ui/header";
import { checkAuth, getUserRoleAction } from "@/lib/actions";
import AdminDashboard from "./ui/dashboard/admin";
import StandardDashboard from "./ui/dashboard/standard";

export default async function Page() {
  await checkAuth();
  const role = await getUserRoleAction();

  return (
    <div>
      <Header name={"👋 Hello, User"} type={"header"} />
      {role === "standard" && <StandardDashboard />}
      {role === "admin" && <AdminDashboard />}
    </div>
  );
}
