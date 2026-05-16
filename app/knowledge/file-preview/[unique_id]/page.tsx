import Header from "../../../ui/header";
import { fetchFileLinkById } from "@/lib/data/knowledge";

export default async function Page({
  params,
}: {
  params: Promise<{ unique_id: string }>;
}) {
  const { unique_id } = await params;

  const data = await fetchFileLinkById(unique_id);

  return (
    <div>
      <Header name="📔 Knowledge Base" type="header" />
      <iframe src={data.path} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
