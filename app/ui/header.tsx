import { HeaderProps } from "@/lib/definitions";

export default function Header({ type, name }: HeaderProps) {
  return type === "header" ? (
    <>
      <h1 className="text-3xl font-normal">{name}</h1>
      <hr className="border-t border-gray-300" />
    </>
  ) : type === "subheader" ? (
    <h2 className="text-l font-medium">{name}</h2>
  ) : (
    <div className="flex flex-col gap-3">
      <h2 className="text-xl font-medium">{name}</h2>
      <hr className="border-t border-gray-300" />
    </div>
  );
}
