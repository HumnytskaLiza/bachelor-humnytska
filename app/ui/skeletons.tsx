import styles from "@/app/ui/modules/knowledge.module.css";
import Button from "./button";

export function FileSkeleton() {
  return (
    <div className={styles.file}>
      <div className="p-4 border border-gray-300 rounded-2xl h-full flex flex-col justify-between w-full">
        <div className="flex flex-col gap-2.5 mt-4">
          <hr className="border-6 border-gray-200 rounded-2xl w-[60%]" />
          <hr className="border-6 border-gray-200 rounded-2xl w-[90%]" />
          <hr className="border-6 border-gray-200 rounded-2xl w-[75%]" />
        </div>
        <div className="flex flex-row items-end justify-end">
          <div
            className="w-8 h-8 rounded-3xl bg-white border border-gray-300
        flex justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FolderSkeleton() {
  return (
    <div className={styles.folder}>
      <div className="flex-1 relative rounded-t-2xl border border-gray-300 bg-gray-300">
        <div className="absolute inset-0 bg-black/10 rounded-t-2xl z-0" />
        <div className="relative h-full bg-white m-3 box-border rounded-t-xl z-2"></div>
      </div>
      <div
        className={`flex-3 p-4 border border-gray-300 bg-gray-200
          ${styles["folder-main"]} rounded-2xl flex flex-row items-end justify-between z-3`}
      >
        <div
          className="w-8 h-8 rounded-3xl bg-white border border-gray-300
        flex justify-center items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function KnowledgeDataSkeleton() {
  return (
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
  );
}

export function EmployeeTableSkeleton() {
  return (
    <div className="h-full">
      <ul role="list" className="divide-y divide-gray-100">
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i} className="flex justify-between gap-6 items-center">
            <div className="flex justify-between gap-6 w-full px-5 py-3">
              <div className="flex flex-col gap-2.5 my-3">
                <hr className="border-5 border-gray-200 rounded-2xl w-24" />
                <hr className="border-5 border-gray-200 rounded-2xl w-36" />
              </div>
              <div className="flex flex-col items-end gap-2.5 my-3">
                <hr className="border-5 border-gray-200 rounded-2xl w-24" />
                <hr className="border-5 border-gray-200 rounded-2xl w-36" />
              </div>
            </div>
            <Button text="View" type="secondary" buttonType="button" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ChatTableSkeleton() {
  return (
    <div className="h-full">
      <ul role="list" className="divide-y divide-gray-100">
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i} className="flex justify-between gap-6 items-center">
            <div className="flex justify-between gap-6 w-full px-5 py-3">
              <div className="flex flex-col gap-2.5 my-3">
                <hr className="border-5 border-gray-200 rounded-2xl w-24" />
                <hr className="border-5 border-gray-200 rounded-2xl w-36" />
              </div>
            </div>
            <div className="w-full flex justify-end gap-2">
              <Button text="Open Chat" type="secondary" buttonType="button" />
              <Button
                type="secondary"
                buttonType="button"
                svg="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function JourneySkeleton() {
  return (
    <div className={styles.journey}>
      <div
        className="p-4 border border-gray-300 bg-gray-200 rounded-2xl h-full relative overflow-hidden
                  flex flex-col justify-between w-full text-black"
      >
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-start justify-between">
            <hr className="border-5 border-gray-300 rounded-2xl w-24" />
            <hr className="border-5 border-white rounded-2xl w-24" />
          </div>
          <div className="relative flex flex-col gap-4 border border-gray-300 bg-white rounded-lg px-3 py-2">
            <hr className="border-5 border-gray-200 rounded-2xl w-24" />
            <hr className="border-5 border-gray-200 rounded-2xl w-24" />
          </div>
          <div className="flex items-center justify-between">
            <hr className="border-5 border-white rounded-2xl w-24" />
            <div
              className="w-8 h-8 rounded-3xl bg-white border border-gray-300
        flex justify-center items-center text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function JourneyTableSkeleton() {
  return (
    <>
      <JourneySkeleton />
      <JourneySkeleton />
      <JourneySkeleton />
      <JourneySkeleton />
      <JourneySkeleton />
      <JourneySkeleton />
    </>
  );
}
