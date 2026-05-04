import Header from "../../../ui/header";
import { KnowledgePageProps } from "@/lib/definitions";
import { fetchFileLinkById } from "@/lib/data";

export default async function Page({ params }: KnowledgePageProps) {
  const { unique_id } = await params;

  const data = await fetchFileLinkById(unique_id);

  return (
    <div>
      <Header name="📔 Knowledge Base" type="header" />
      <iframe src={data.path} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
