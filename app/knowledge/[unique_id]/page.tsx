import { UniqueIdProps } from "@/lib/definitions";

import Header from "@/app/ui/header";
import UtilityBar from "@/app/ui/knowledge/utility-bar";
import Folders from "@/app/ui/knowledge/knowledge-data";
// import Breadcrumbs from "@/app/ui/breadcrumbs";

export const dynamic = "force-dynamic";

export default async function Page({ params }: UniqueIdProps) {
  const { unique_id } = await params;

  return (
    <div className="h-full">
      <Header name="📔 Knowledge Base" type="header" />
      {/* <Breadcrumbs url="/knowledge/" /> */}
      <UtilityBar unique_id={unique_id} />
      <Folders params={{ unique_id }} />
    </div>
  );
}
