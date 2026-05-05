import Header from "../../ui/header";
import { UniqueIdProps } from "@/lib/definitions";
import { fetchUserById } from "@/lib/data";
import EmployeeProfilePage from "@/app/ui/employees/employee-profile";

export const dynamic = "force-dynamic";

export default async function Page({ params }: UniqueIdProps) {
  const { unique_id } = await params;
  const data = await fetchUserById(unique_id);

  return (
    <div>
      <Header name={`💼 ${data.first_name}'s Overview`} type="header" />
      <EmployeeProfilePage user={data} />
    </div>
  );
}
