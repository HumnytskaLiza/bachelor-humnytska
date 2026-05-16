import Header from "../../ui/header";
import { fetchChatById } from "@/lib/data/chat";
import Chat from "@/app/ui/chat/chat";
import { UIMessage } from "ai";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ unique_id: string }>;
}) {
  const { unique_id } = await params;
  const messageHistory = await fetchChatById(unique_id);

  const formattedMessages = messageHistory.messages.map(
    (m): UIMessage => ({
      id: m.id,
      role: m.role,
      parts: [
        {
          type: "text",
          text: m.content,
        },
      ],
    }),
  );

  return (
    <div>
      <Header name={"🤖 AI Assistant"} type="header" />
      <Chat data={formattedMessages} unique_id={unique_id} />
    </div>
  );
}
