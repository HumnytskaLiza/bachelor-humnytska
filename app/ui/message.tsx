import { MessageProps } from "@/lib/definitions";

export default function MessageComponent({ role, content }: MessageProps) {
  return (
    <div
      className={`px-3 py-2 rounded-lg max-w-80 break-words whitespace-pre-wrap ${
        role === "user"
          ? "bg-black text-white self-end"
          : "bg-gray-200 text-black self-start"
      }`}
    >
      {content}
    </div>
  );
}
