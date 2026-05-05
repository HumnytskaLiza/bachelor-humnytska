import { HeaderProps } from "@/lib/definitions";

export default function Header({ type, name }: HeaderProps) {
  return type === "header" ? (
    <h1 className="text-3xl font-normal">{name}</h1>
  ) : (
    <h2 className="text-l font-medium">{name}</h2>
  );
}
