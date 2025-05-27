import Link from "next/link";
import { ReactNode } from "react";

interface NavIconProps {
  href: string;
  children: ReactNode;
  active?: boolean;
}

export default function NavIcon({
  href,
  children,
  active = false,
}: NavIconProps) {
  return (
    <Link
      href={href}
      className={`${
        active ? "bg-zinc-950 text-white" : "border border-black/20 text-black"
      } size-10 flex items-center justify-center`}
    >
      {children}
    </Link>
  );
}
