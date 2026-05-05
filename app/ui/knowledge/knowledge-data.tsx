"use client";

import useSWR, { Key } from "swr";
import { Folder, File, KnowledgeDataProps } from "@/lib/definitions";
import FolderElement from "./folder-element";
import FileElement from "./file-element";
import { FileSkeleton, FolderSkeleton } from "../skeletons";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type FolderResponse = {
  current: Folder | null;
  folders: Folder[];
  files: File[];
};

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
        <div className="flex flex-col gap-4 text-center font-medium text-gray-500">
          <span>No files have been added yet...</span>
          <span>Create a new folder or add a file.</span>
        </div>
      )}

      {isLoading && !isNoData && (
        <>
          <FolderSkeleton />
          <FolderSkeleton />
          <FolderSkeleton />
          <FolderSkeleton />
          <FileSkeleton />
          <FileSkeleton />
          <FileSkeleton />
          <FileSkeleton />
        </>
      )}
    </div>
  );
}
