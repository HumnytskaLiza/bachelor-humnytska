import { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return <div className="w-full h-full flex flex-col">{children}</div>;
}

export function CardContent({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-full p-4 md:px-10 xl:px-30 2xl:px-50 gap-4">
      {children}
    </div>
  );
}
