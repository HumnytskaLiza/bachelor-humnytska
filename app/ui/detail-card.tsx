import { CardProps } from "@/lib/definitions";

export default function DetailCard({ header, content, background }: CardProps) {
  return (
    <div
      className={`${background ? background : ""}
    p-4 border border-gray-300 rounded-2xl flex flex-col gap-2`}
    >
      <p className="text-sm text-gray-700">{header}</p>
      <div>{content}</div>
    </div>
  );
}
