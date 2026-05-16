type DetailCardProps = {
  header: string;
  content: string;
  background?: string;
};

export default function DetailCard({
  header,
  content,
  background,
}: DetailCardProps) {
  return (
    <div
      className={`${background ? background : ""}
    p-4 border border-gray-300 rounded-2xl flex flex-col gap-2`}
    >
      <p className="text-sm text-gray-700">{header}</p>
      <div>{content}</div>
    </div>
  );
}
