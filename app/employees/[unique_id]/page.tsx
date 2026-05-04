import Header from "../../ui/header";
import { EmployeePageProps } from "@/lib/definitions";
import { fetchUserById } from "@/lib/data";
import EmployeeProfilePage from "@/app/ui/employees/employee-profile";

export const dynamic = "force-dynamic";

export default async function Page({ params }: EmployeePageProps) {
  const { unique_id } = await params;
  const data = await fetchUserById(unique_id);

  return (
    <div>
      <Header name={`💼 ${data.first_name}'s Overview`} type="header" />
      <EmployeeProfilePage user={data} />
    </div>
  );
}
