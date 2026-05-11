"use client";

import { User } from "@/lib/definitions";
import Button from "../../button";
import useSWR from "swr";
import Link from "next/link";
// import { EmployeeTableSkeleton } from "../skeletons";
import NoDataComponent from "../../no-data-component";
import { JourneyOverviewTableProps } from "@/lib/definitions";
import Header from "../../header";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AssignedUsersTable({
  unique_id,
}: JourneyOverviewTableProps) {
  const { data, isLoading } = useSWR<User[]>(
    `/api/journey/${unique_id}/users`,
    fetcher,
    {
      refreshInterval: 4000,
    },
  );

  const isNoData = !isLoading && data?.length === 0;
  const userCount = data?.length;

  return (
    <div className="h-full flex flex-col gap-3">
      <Header type="sectionName" name={`🙎 Assigned Users: ${userCount}`} />
      {!isLoading && !isNoData && (
        <ul role="list" className="divide-y divide-gray-100 px-4">
          {data?.map((user) => (
            <li
              key={user.email}
              className="flex justify-between gap-6 items-center"
            >
              <div className="flex justify-between gap-6 w-full py-3">
                <div className="flex gap-x-4">
                  <div className="flex-auto">
                    <p className="text-sm/6 font-semibold text-gray-900">
                      {user.first_name} {user.last_name}
                    </p>
                    <p className="mt-1 truncate text-xs/5 text-gray-500">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm/6 text-gray-900">
                    {user.level} {user.job_position}
                  </p>
                  <p className="mt-1 text-xs/5 text-gray-500">
                    Added{" "}
                    <span>{new Date(user.created_date).toLocaleString()}</span>
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <Link href={`/employees/${user.unique_id}`}>
                  <Button text="View" type="main" buttonType="button" />
                </Link>
                <Button
                  type="secondary"
                  buttonType="button"
                  svg="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
                />
              </div>
            </li>
          ))}
        </ul>
      )}
      {isNoData && (
        <div className="h-50">
          <NoDataComponent firstLine="No employees have been assigned to this journey yet..." />
        </div>
      )}
      {/* {isLoading && <EmployeeTableSkeleton />} */}
    </div>
  );
}
