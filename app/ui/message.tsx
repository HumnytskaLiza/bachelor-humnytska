import { MessageProps } from "@/lib/definitions";

export default function MessageComponent({ role, content }: MessageProps) {
  return (
    <div
      className={`px-3 py-2 flex flex-col gap-2 rounded-lg min-w-35 max-w-80 wrap-break-word whitespace-pre-wrap ${
        role === "user"
          ? "bg-black text-white self-end"
          : "bg-gray-200 text-black self-start"
      }`}
    >
      <p className="font-bold capitalize">{role}</p>
      <p>{content}</p>
    </div>
  );
}
