import Header from "../../ui/header";
import { UniqueIdProps } from "@/lib/definitions";
import { fetchJourneyById, fetchUsersWithoutJourney } from "@/lib/data";
import UtilityBar from "@/app/ui/journeys/journey-overview/utility-bar";
import JourneyOverviewPage from "@/app/ui/journeys/journey-overview-page";

export default async function Page({ params }: UniqueIdProps) {
  const { unique_id } = await params;
  const data = await fetchJourneyById(unique_id);
  const users = await fetchUsersWithoutJourney();

  return (
    <div>
      <Header name={`📖 Journey Overview`} type="header" />
      <UtilityBar unique_id={unique_id} users={users} />
      <JourneyOverviewPage journey={data} unique_id={unique_id} />
    </div>
  );
}
