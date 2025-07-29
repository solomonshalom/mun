"use client";

import AnnouncementBanner from "@/components/AnnouncementBanner";
import DemoCard, { DemoCardProps } from "@/components/DemoCard";
import { Footer } from "@/components/Footer";
import Arielle from "@/components/svg/demos/arielle.svg";
import Brian from "@/components/svg/demos/brian.svg";
import Georgia from "@/components/svg/demos/georgia.svg";
import HackerFab from "@/components/svg/demos/hackerfab.svg";
import Jasmine from "@/components/svg/demos/jasmine.svg";
import Kevin from "@/components/svg/demos/kevin.svg";
import Prism from "@/components/svg/demos/prism.svg";
import Rikard from "@/components/svg/demos/rikard.svg";
import Rishi from "@/components/svg/demos/rishi.svg";
import Santiago from "@/components/svg/demos/santiago.svg";
import Ticker from "@/components/Ticker";
import { BLUR_CONTENT } from "@/flags";
import { motion } from "motion/react";

// Flag to control blurring of demo content

const DEMO_DATA: DemoCardProps[] = [
  {
    title: "Solomon Shalom Lijo",
    author: "General Secretary",
    description:
      "The inspirational story of starting a company that is modernizing urban planning and policy, and bringing more awareness to the importance of this field.",
    icon: Rishi,
    href: "",
  },
  {
    title: "Swarit",
    author: "Director General & VC of UNSC",
    description:
      "The inspirational story of pursuing writing, and finding what one is truly passionate about.",
    icon: Georgia,
    href: "",
  },
  {
    title: "Vidya S",
    author: "Under-Secretary General & Moderator of UNSC",
    description:
      "A group of students who are fabricating their own computer chips (an incredibly challenging feat), and the humorous story of starting in an apartment and now a full design team on campus.",
    icon: HackerFab,
    href: "",
  },
  {
    title: "Sukumar Sriram",
    author: "Chair of UNHRC",
    description:
      "BracketBot: An open source robotics kit, the interesting and humorous story behind them.",
    icon: Brian,
    href: "",
  },
  {
    title: "Meekha",
    author: "Vice-Chair of UNHRC",
    description:
      "The inspirational journey of pursuing art over the years, taking risks, and making things that are intrinsic to oneself, regardless of technical perfection.",
    icon: Jasmine,
    href: "",
  },
    {
    title: "Stephanie",
    author: "Moderator of UNHRC",
    description:
      "The humorous story of putting googly eyes on a train to raise awareness for public transit, and possibly the story of starting 3+ Socratica nodes.",
    icon: Arielle,
    href: "https://x.com/ariellelok",
  },
  {
    title: "Dhruv N.M",
    author: "Chair of UNSC",
    description:
      "The humorous yet awe-inspiring story behind conducting research in lab-grown/cell-based meat for the last 2+ years, and a discussion of alternative proteins and their necessity for our future.",
    icon: Rikard,
    href: "",
  }
];

export default function Page() {
  return (
    <main className="min-h-screen">
      <div className="container py-8">
        <motion.h1
          className="text-4xl md:text-5xl font-medium tracking-tight font-tiempos"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          The Team
        </motion.h1>
        <motion.h2
          className="text-lg mt-2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          A team built & tested for war.
        </motion.h2>
      </div>

      <Ticker text="Delegate" className="mt-8" />

      <div className="py-8 md:py-16 bg-zinc-950 px-8">
        <AnnouncementBanner />

        <div className="grid grid-cols-1 md:grid-cols-2 items-center max-w-5xl mx-auto gap-8 md:gap-12 justify-items-center mb-28">
          {DEMO_DATA.map((demo, i) => (
            <motion.div
              key={demo.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i < 4 ? i * 0.15 : 0.15 }}
              className="h-full"
            >
              <DemoCard {...demo} blurContent={BLUR_CONTENT} />
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
