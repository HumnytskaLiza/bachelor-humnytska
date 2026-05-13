import Folders from "../ui/knowledge/knowledge-data";
import Header from "../ui/header";
import UtilityBar from "../ui/knowledge/utility-bar";
import { checkAuth, getUserRoleAction } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function Page() {
  await checkAuth();
  const role = await getUserRoleAction();

  return (
    <div>
      <Header name="📔 Knowledge Base" type="header" />
      <UtilityBar role={role} />
      <Folders params={{ unique_id: "" }} />
    </div>
  );
}
