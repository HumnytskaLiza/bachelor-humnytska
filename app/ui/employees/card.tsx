import { CardProps } from "@/lib/definitions";

export default function Card({ header, content }: CardProps) {
  return (
    <div className="p-4 border border-gray-300 rounded-2xl">
      <p className="text-xs text-gray-500">{header}</p>
      <div>{content}</div>
    </div>
  );
}
