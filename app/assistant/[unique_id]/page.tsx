import Header from "../../ui/header";
import { UniqueIdProps } from "@/lib/definitions";
import { fetchChatById } from "@/lib/data";
import Chat from "@/app/ui/chat/chat";

export const dynamic = "force-dynamic";

export default async function Page({ params }: UniqueIdProps) {
  const { unique_id } = await params;
  const data = await fetchChatById(unique_id);

  return (
    <div>
      <Header name={"🤖 AI Assistant"} type="header" />
      <Chat data={data.messages} unique_id={unique_id} />
    </div>
  );
}
