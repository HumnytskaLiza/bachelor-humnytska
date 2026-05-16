import Header from "../../ui/header";
import { fetchUserById } from "@/lib/data/user";
import EmployeeJourneyOverview from "@/app/ui/employees/employee/employee-overview";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ unique_id: string }>;
}) {
  const { unique_id } = await params;
  const data = await fetchUserById(unique_id);

  return (
    <div>
      <Header name={`💼 ${data.first_name}'s Overview`} type="header" />
      <EmployeeJourneyOverview user={data} />
    </div>
  );
}
