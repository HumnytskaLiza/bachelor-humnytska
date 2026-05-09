import { MessageProps } from "@/lib/definitions";
import ReactMarkdown from "react-markdown";

export default function MessageComponent({
  role,
  content,
  agentRole,
}: MessageProps) {
  return (
    <div
      className={`px-3 py-2 flex flex-col gap-2 rounded-lg min-w-35 max-w-110 wrap-break-word whitespace-pre-wrap ${
        role === "user"
          ? "bg-black text-white self-end"
          : "bg-gray-200 text-black self-start"
      }`}
    >
      <p className="font-bold capitalize">{role}</p>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
