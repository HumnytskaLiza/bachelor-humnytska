"use client";

import useSWR, { Key } from "swr";
import { FolderResponse, KnowledgeDataProps } from "@/lib/definitions";
import FolderElement from "./folder-element";
import FileElement from "./file-element";
import { KnowledgeDataSkeleton } from "../skeletons";
import NoDataComponent from "../no-data-component";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function KnowledgeData({ params }: KnowledgeDataProps) {
  const keyFolder: Key = params.unique_id
    ? `/api/folder/${params.unique_id}`
    : "/api/folder";

  const { data, isLoading } = useSWR<FolderResponse>(keyFolder, fetcher, {
    refreshInterval: 2000,
  });

  const folders = data?.folders;
  const files = data?.files;
  const isNoData = !isLoading && folders?.length === 0 && files?.length === 0;

  return (
    <div
      className={
        !isNoData
          ? "grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
          : "flex justify-center items-center h-[80%]"
      }
    >
      {folders?.map((element) => (
        <FolderElement
          isEmpty={element.has_children}
          key={element.unique_id}
          name={element.name}
          createdDate={element.created_date}
          uniqueId={element.unique_id}
          color_hex={element.color_hex}
        />
      ))}

      {files?.map((element) => (
        <FileElement
          key={element.unique_id}
          name={element.name}
          createdDate={element.created_date}
          uniqueId={element.unique_id}
        />
      ))}

      {isNoData && (
        <NoDataComponent
          firstLine="No files have been added yet..."
          secondLine="Create a new folder or add a file."
        />
      )}

      {isLoading && !isNoData && <KnowledgeDataSkeleton />}
    </div>
  );
}
