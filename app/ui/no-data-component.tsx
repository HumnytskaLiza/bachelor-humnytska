import { NoDataComponentProps } from "@/lib/definitions";

export default function NoDataComponent({
  firstLine,
  secondLine,
}: NoDataComponentProps) {
  return (
    <div
      className="h-[90%] flex flex-col gap-4 text-center 
    font-medium text-gray-500 justify-center"
    >
      <span>{firstLine}</span>
      {secondLine && <span>{secondLine}</span>}
    </div>
  );
}
