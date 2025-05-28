import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stage Demos | NHIS Symposium",
};

export default function StageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
