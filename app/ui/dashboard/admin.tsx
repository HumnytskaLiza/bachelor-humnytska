import { fetchStandardUsers } from "@/lib/data/user";
import {
  fetchJourneys,
  fetchOpenAssignments,
  fetchUsersWithoutJourney,
} from "@/lib/data/journey";
import DetailCard from "../detail-card";
import Button from "../button";
import Link from "next/link";
import { fetchRecentFiles } from "@/lib/data/knowledge";
import FileElement from "../knowledge/file-element";
import Header from "../header";

export default async function AdminDashboard() {
  const users = await fetchStandardUsers();
  const usersWithoutJourney = await fetchUsersWithoutJourney();
  const journeys = await fetchJourneys();
  const assignments = await fetchOpenAssignments();
  const files = await fetchRecentFiles();

  const stats = [
    { label: "Total Employees", value: users.length },
    { label: "Total Journeys", value: journeys.length },
    { label: "Open Employees' Assignments", value: assignments.length },
    { label: "Users Without Journey", value: usersWithoutJourney.length },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>

        <div className="flex gap-3">
          <Link href={"/journeys"}>
            <Button text="Create Journey" buttonType="button" type="main" />
          </Link>
          <Link href={"/employees"}>
            <Button text="Add Employee" buttonType="button" type="secondary" />
          </Link>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item, id) => (
          <DetailCard
            key={id}
            header={item.label}
            content={item.value.toString()}
          />
        ))}
      </div>
      <Header name="📔 Recently Added Documents" type="sectionName" />
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 pb-6">
        {files.slice(0, 9).map((file) => (
          <FileElement
            key={file.unique_id}
            name={file.name}
            createdDate={file.created_date}
            uniqueId={file.unique_id}
          />
        ))}
      </div>
    </div>
  );
}
