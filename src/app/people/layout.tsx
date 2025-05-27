import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "People | Socratica Symposium",
  description: "Browse and search for people at the Socratica Symposium.",
};

export default function PeopleLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen">{children}</div>;
}
