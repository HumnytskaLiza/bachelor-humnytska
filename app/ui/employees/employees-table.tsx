"use client";

import { User } from "@/lib/definitions";
import Button from "../button";
import useSWR from "swr";
import Link from "next/link";
import { EmployeeTableSkeleton } from "../skeletons";
import NoDataComponent from "../no-data-component";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function EmployeesTable() {
  const { data, isLoading } = useSWR<User[]>("/api/user/standard", fetcher, {
    refreshInterval: 2000,
  });

  const isNoData = !isLoading && data?.length === 0;

  return (
    <div className="h-full">
      {!isLoading && !isNoData && (
        <ul role="list" className="divide-y divide-gray-100">
          {data?.map((user) => (
            <li
              key={user.email}
              className="flex justify-between gap-6 items-center"
            >
              <div className="flex justify-between gap-6 w-full px-5 py-3">
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
              <Link href={`/employees/${user.unique_id}`}>
                <Button text="View" type="main" buttonType="button" />
              </Link>
            </li>
          ))}
        </ul>
      )}
      {isNoData && (
        <NoDataComponent firstLine="No employees have been added yet..." />
      )}
      {isLoading && <EmployeeTableSkeleton />}
    </div>
  );
}
