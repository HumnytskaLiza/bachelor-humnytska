import Folders from "../ui/knowledge/knowledge-data";
import Header from "../ui/header";
import UtilityBar from "../ui/knowledge/utility-bar";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <div>
      <Header name="📔 Knowledge Base" type="header" />
      <UtilityBar />
      <Folders params={{ unique_id: "" }} />
    </div>
  );
}
