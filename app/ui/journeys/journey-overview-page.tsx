import { JourneyOverviewProps } from "@/lib/definitions";
import AssignedUsersTable from "./journey-overview/assigned-users-table";
import AssignedTasksTable from "./journey-overview/assigned-task-table";
import JourneyDetails from "./journey-overview/journey-details";

export default async function JourneyOverviewPage({
  unique_id,
  journey,
}: JourneyOverviewProps) {
  return (
    <div className="flex flex-col gap-10">
      <JourneyDetails journey={journey} />
      <AssignedUsersTable unique_id={unique_id} />
      <AssignedTasksTable unique_id={unique_id} />
    </div>
  );
}
