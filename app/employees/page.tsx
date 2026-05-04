import Header from "../ui/header";
import UtilityBar from "../ui/employees/utility-bar";
import EmployeesTable from "../ui/employees/employees-table";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <div>
      <Header name={"💼 Employees Overview"} type="header" />
      <UtilityBar />
      <EmployeesTable />
    </div>
  );
}
