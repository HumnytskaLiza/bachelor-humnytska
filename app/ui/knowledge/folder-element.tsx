import Link from "next/link";
import styles from "@/app/ui/modules/knowledge.module.css";

type FolderElementProps = {
  name: string;
  createdDate: Date;
  uniqueId: string;
  color_hex: string;
  isEmpty: boolean;
};

export default function FolderElement({
  name,
  createdDate,
  uniqueId,
  color_hex,
}: FolderElementProps) {
  const maxLength = 16;
  const labelName =
    name.length > maxLength ? name.slice(0, maxLength) + "…" : name;

  const labelDate = new Date(createdDate).toLocaleDateString("uk-UA");

  return (
    <Link href={`/knowledge/${uniqueId}`} className={styles.folder}>
      <div
        className="flex-1 relative 
        rounded-t-2xl border border-gray-300"
        style={{ backgroundColor: color_hex }}
      >
        <div className="absolute inset-0 bg-black/10 rounded-t-2xl z-0" />
        <div className="relative h-full bg-white m-3 box-border rounded-t-xl z-2"></div>
      </div>
      <div
        style={{ backgroundColor: color_hex }}
        className={`flex-3 p-4 border border-gray-300 
          ${styles["folder-main"]} rounded-2xl flex flex-row items-end justify-between z-3`}
      >
        <div className="flex flex-col">
          <h3
            className={`text-md font-semibold ${color_hex === "#eae4da" ? "text-black" : "text-white"} uppercase leading-tight`}
          >
            {labelName}
          </h3>
          <p
            className={`text-xs ${color_hex === "#eae4da" ? "text-gray-900" : "text-gray-100"} mt-1`}
          >
            {labelDate}
          </p>
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
    </Link>
  );
}
