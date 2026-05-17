import EmployeeJourneyOverview from "../employees/employee/employee-overview";
import { User } from "@/lib/definitions";

export default async function StandardDashboard({ user }: { user: User }) {
  return <EmployeeJourneyOverview user={user} personalDetails={false} />;
}
