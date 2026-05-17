"use client";

import { Journey, User } from "@/lib/definitions";
import useSWR from "swr";
import JourneyDetails from "../../journeys/journey-overview/journey-details";
import EmployeeTasks from "./employee-tasks";
import EmployeeDetails from "./employee-details";
import { Status } from "@/lib/types";

type EmployeeAssignments = {
  journey: Journey;
  mergedTasks: {
    unique_id: string;
    name: string;
    description: string;
    deadline: Date;
    created_date: Date;
    status: Status;
  }[];
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function EmployeeJourneyOverview({
  user,
  personalDetails = true,
}: {
  user: User;
  personalDetails?: boolean;
}) {
  const { data } = useSWR<EmployeeAssignments>(
    `/api/employee/${user.unique_id}`,
    fetcher,
    {
      refreshInterval: 4000,
    },
  );

  return (
    <div className="flex flex-col gap-10">
      {personalDetails && <EmployeeDetails user={user} />}
      {data?.journey !== undefined && <JourneyDetails journey={data.journey} />}
      {data?.mergedTasks !== undefined && (
        <EmployeeTasks mergedTasks={data.mergedTasks} />
      )}
    </div>
  );
}
