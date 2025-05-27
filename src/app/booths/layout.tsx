import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booth Demos | Socratica Symposium",
};

export default function BoothsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
