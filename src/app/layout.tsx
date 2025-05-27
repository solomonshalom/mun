import LayoutWrapper from "@/components/LayoutWrapper";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { PostHogProvider } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Optimize font loading by defining fonts outside the component
const fivebyseven = localFont({
  src: [
    {
      path: "../fonts/FiveBySeven.ttf",
      weight: "400",
    },
    {
      path: "../fonts/FiveBySevenBold.ttf",
      weight: "600",
    },
  ],
  variable: "--font-5by7",
  preload: true,
});

const tiempos = localFont({
  src: [
    {
      path: "../fonts/Tiempos.otf",
      style: "normal",
    },
    {
      path: "../fonts/TiemposItalic.otf",
      style: "italic",
    },
  ],
  variable: "--font-tiempos",
  preload: true,
});

const conte = localFont({
  src: [
    {
      path: "../fonts/Conte.otf",
      style: "normal",
    },
  ],
  variable: "--font-conte",
  preload: true,
});

export const metadata: Metadata = {
  title: "Socratica Symposium",
  description:
    "We booked out a hockey arena to host the world's greatest demo day: 70+ passion projects, from Iron Man suits to art installations!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          fivebyseven.variable,
          tiempos.variable,
          conte.variable,
          "antialiased"
        )}
      >
        <PostHogProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </PostHogProvider>
      </body>
    </html>
  );
}
