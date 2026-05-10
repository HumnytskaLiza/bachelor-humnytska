"use client";

import { Journey } from "@/lib/definitions";
import useSWR from "swr";
import { JourneyTableSkeleton } from "../skeletons";
import NoDataComponent from "../no-data-component";
import JourneyElement from "./journey-element";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function JourneyTable() {
  const { data, isLoading } = useSWR<Journey[]>("/api/journey", fetcher, {
    refreshInterval: 2000,
  });

  const isNoData = !isLoading && data?.length === 0;

  return (
    <div
      className={
        "grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-6"
      }
    >
      {data?.map((element) => (
        <JourneyElement
          key={element.unique_id}
          name={element.name}
          job_position={element.job_position}
          level={element.level}
          created_date={element.created_date}
          unique_id={element.unique_id}
          color_hex={element.color_hex}
          start_date={element.start_date}
        />
      ))}

      {isNoData && (
        <NoDataComponent firstLine="No journeys have been created yet..." />
      )}

      {isLoading && !isNoData && <JourneyTableSkeleton />}
    </div>
  );
}
