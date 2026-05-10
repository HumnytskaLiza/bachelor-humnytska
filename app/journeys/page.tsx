import Header from "../ui/header";
import JourneyTable from "../ui/journeys/journey-table";
import UtilityBar from "../ui/journeys/utility-bar";

export default function Page() {
  return (
    <div>
      <Header name={"📖 Journeys"} type="header" />
      <UtilityBar />
      <JourneyTable />
    </div>
  );
}
