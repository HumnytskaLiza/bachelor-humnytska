import Link from "next/link";
import styles from "@/app/ui/modules/knowledge.module.css";

type FileElementProps = {
  name: string;
  createdDate: Date;
  uniqueId: string;
};

export default function FileElement({
  name,
  createdDate,
  uniqueId,
}: FileElementProps) {
  const maxLength = 16;
  const labelName =
    name.length > maxLength ? name.slice(0, maxLength) + "…" : name;

  const labelDate = new Date(createdDate).toLocaleDateString("uk-UA");

  return (
    <Link href={`/knowledge/file-preview/${uniqueId}`} className={styles.file}>
      <div
        className="p-4 border border-gray-300 rounded-2xl h-full
                  flex flex-col justify-between w-full"
      >
        <div className="flex flex-col gap-2.5 mt-4">
          <hr className="border-6 border-gray-200 rounded-2xl w-[60%]" />
          <hr className="border-6 border-gray-200 rounded-2xl w-[90%]" />
          <hr className="border-6 border-gray-200 rounded-2xl w-[75%]" />
        </div>
        <div className="flex flex-row items-end justify-between">
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-gray-900 leading-tight uppercase">
              {labelName}
            </h3>
            <p className="text-xs text-gray-500 mt-1">{labelDate}</p>
          </div>
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
    </Link>
  );
}
