import { NoDataComponentProps } from "@/lib/definitions";

export default function NoDataComponent({
  firstLine,
  secondLine,
}: NoDataComponentProps) {
  return (
    <div className="flex flex-col gap-4 text-center font-medium text-gray-500 h-[90%] justify-center">
      <span>{firstLine}</span>
      {secondLine && <span>{secondLine}</span>}
    </div>
  );
}
