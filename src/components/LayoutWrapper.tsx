"use client";

import NavigationBar from "@/components/NavigationBar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const IFRAME_PAGES = new Set(["/garden"]);

// So we can use usePathname in the layout
export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isFramePage = IFRAME_PAGES.has(pathname);

  return (
    <div className={cn(isFramePage && "min-h-screen flex flex-col")}>
      {/* Hidden preloader to start loading Rive assets early */}
      {/* <RivePreloader /> */}
      {/* Full-screen loader that hides the entire app until Rive is ready */}
      <NavigationBar />
      <main className={cn(isFramePage && "flex-1 flex")}>{children}</main>
    </div>
  );
}
