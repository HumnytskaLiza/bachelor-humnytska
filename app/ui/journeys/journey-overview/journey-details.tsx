import Header from "../../header";
import { Journey } from "@/lib/definitions";
import DetailCard from "../../detail-card";

export default function JourneyDetails({ journey }: { journey: Journey }) {
  const labelDate = new Date(journey.start_date).toLocaleDateString("uk-UA");

  return (
    <div>
      <Header type="sectionName" name="🗂️ Journey Details" />
      <div
        className="mt-6 grid gap-5 grid-cols-1 sm:grid-cols-2 
      md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4"
      >
        <DetailCard
          background="bg-[#eae4da]"
          header="Journey Name"
          content={journey.name}
        />
        <DetailCard
          background="bg-[#eae4da]"
          header="Job Position"
          content={journey.job_position}
        />
        <DetailCard
          background="bg-[#eae4da]"
          header="Level"
          content={journey.level}
        />
        <DetailCard
          background="bg-[#eae4da]"
          header="Start Date"
          content={labelDate}
        />
      </div>
    </div>
  );
}
