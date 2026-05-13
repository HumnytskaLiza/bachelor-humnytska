import { UniqueIdProps } from "@/lib/definitions";
import Header from "@/app/ui/header";
import UtilityBar from "@/app/ui/knowledge/utility-bar";
import Folders from "@/app/ui/knowledge/knowledge-data";
import { checkAuth, getUserRoleAction } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function Page({ params }: UniqueIdProps) {
  const { unique_id } = await params;

  await checkAuth();
  const role = await getUserRoleAction();

  return (
    <div className="h-full">
      <Header name="📔 Knowledge Base" type="header" />
      <UtilityBar unique_id={unique_id} role={role} />
      <Folders params={{ unique_id }} />
    </div>
  );
}
