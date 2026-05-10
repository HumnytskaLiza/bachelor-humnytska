import Link from "next/link";
import styles from "@/app/ui/modules/knowledge.module.css";
import { Journey } from "@/lib/definitions";

export default function JourneyElement({
  unique_id,
  name,
  job_position,
  level,
  created_date,
  color_hex,
  start_date,
}: Journey) {
  const maxLength = 26;
  const labelName =
    name.length > maxLength ? name.slice(0, maxLength) + "…" : name;

  const labelDate = new Date(created_date).toLocaleDateString("uk-UA");
  const labelStartDate = new Date(start_date).toLocaleDateString("uk-UA");

  return (
    <Link href={`/journeys/${unique_id}`} className={styles.journey}>
      <div
        className={`p-4 border border-gray-300 rounded-2xl h-full relative overflow-hidden
                  flex flex-col justify-between w-full ${color_hex === "#eae4da" ? "text-black" : "text-white"}`}
        style={{ backgroundColor: color_hex }}
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative flex h-full flex-col justify-between">
          <div className="flex items-start justify-between">
            <p className="text-2xl font-bold uppercase ">{job_position}</p>
            <div
              className="border border-gray-300 px-3 text-xs bg-white 
            rounded-lg text-black flex items-center"
            >
              {level}
            </div>
          </div>
          <div
            style={{ backgroundColor: color_hex }}
            className="relative flex flex-col gap-4 border border-gray-300 rounded-lg px-3 py-2"
          >
            <p
              className={`${color_hex === "#eae4da" ? "text-black" : "text-white"} text-sm`}
            >
              <b>Start:</b> {labelStartDate}
            </p>
            <p
              className={`text-lg font-semibold ${color_hex === "#eae4da" ? "text-black" : "text-white"}`}
            >
              {labelName}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-xs ${color_hex === "#eae4da" ? "text-gray-900" : "text-gray-100"} mt-1`}
            >
              {labelDate}
            </p>
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
    </Link>
  );
}
