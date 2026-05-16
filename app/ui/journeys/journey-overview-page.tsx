import AssignedUsersTable from "./journey-overview/assigned-users-table";
import AssignedTasksTable from "./journey-overview/assigned-task-table";
import JourneyDetails from "./journey-overview/journey-details";
import { Journey } from "@/lib/definitions";

type JourneyOverviewProps = {
  unique_id: string;
  journey: Journey;
};

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
