type HeaderProps = {
  name: string;
  type: "header" | "subheader" | "sectionName";
};

export default function Header({ type, name }: HeaderProps) {
  return type === "header" ? (
    <>
      <h1 className="sm:text-xl md:text-3xl font-normal">{name}</h1>
      <hr className="border-t border-gray-300" />
    </>
  ) : type === "subheader" ? (
    <h2 className="sm:text-md md:text-l font-medium">{name}</h2>
  ) : (
    <div className="flex flex-col gap-3">
      <h2 className="sm:text-lg md:text-xl font-medium">{name}</h2>
      <hr className="border-t border-gray-300" />
    </div>
  );
}
