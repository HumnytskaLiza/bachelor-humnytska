import Header from "../../ui/header";
import ChatHistory from "@/app/ui/chat/chat-history";
import UtilityBar from "@/app/ui/chat/utility-bar";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <div>
      <Header name={"🤖 AI Assistant"} type="header" />
      <UtilityBar />
      <ChatHistory />
    </div>
  );
}
