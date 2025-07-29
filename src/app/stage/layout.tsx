import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Team | NHIS Symposium",
};

export default function StageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
