"use client";

import AnnouncementBanner from "@/components/AnnouncementBanner";
import DemoCard, { DemoCardProps } from "@/components/DemoCard";
import { Footer } from "@/components/Footer";
import Arielle from "@/components/svg/demos/arielle.svg";
import Brian from "@/components/svg/demos/brian.svg";
import Georgia from "@/components/svg/demos/georgia.svg";
import HackerFab from "@/components/svg/demos/hackerfab.svg";
import Jasmine from "@/components/svg/demos/jasmine.svg";
import Rikard from "@/components/svg/demos/rikard.svg";
import Rishi from "@/components/svg/demos/rishi.svg";
import Kevin from "@/components/svg/demos/kevin.svg";
import Ticker from "@/components/Ticker";
import { BLUR_CONTENT } from "@/flags";
import { motion } from "motion/react";

// Flag to control blurring of demo content

const DEMO_DATA: DemoCardProps[] = [
  {
    title: "Solomon Shalom Lijo",
    author: "General Secretary",
    description:
      `"Love your enemies." — Jesus Christ" \n \n
Solomon, the General Secretary of Symposium, walks with the quiet strength of a man after God’s own heart.
Guided by scripture, he sees politics and debate not just as weapons of divide and rule, but as a calling to serve and uplift.
As a Senior & as the School Captain at North Hills International School, he leads with conviction, compassion, and a vision rooted in grace. `,
    icon: Rishi,
    href: "https://instagram.com/solomon_lijo",
  },
  {
    title: "Swarit Tadakod",
    author: "Director General & VC of UNSC",
    description:
      "As the Director General of Symposium, Swarit Tadakod brings together experience, passion, and a clear vision to lead a conference where young voices tackle real-world issues and every delegate feels heard.",
    icon: Georgia,
    href: "https://instagram.com/swarit_champ",
  },
  {
    title: "Vidya S",
    author: "Under-Secretary General & Moderator of UNSC",
    description:
      "Vidya, the Under Secretary-General of Symposium, is the force behind the scenes ensuring that chaos turns into coordination. Whether it’s managing last-minute printouts or fine-tuning schedules, she thrives on keeping everything on track—all while bringing energy, efficiency, and a touch of fun to the MUN’s backstage hustle.",
    icon: HackerFab,
    href: "",
  },
  {
    title: "Sukumar Sriram",
    author: "Chair of UNHRC",
    description:
      "",
    icon: Brian,
    href: "",
  },
  {
    title: "Aarna Awasthi",
    author: "Co-Chair of UNHRC",
    description:
      `"Yesterday is history, tomorrow is a mystery, but today is a gift. That is why it is called the present. — Master Oogway" \n \n
      Living by this, Aarna brings unmatched presence to committee with a consistent placement rate of ninety five percent in HRC. She thrives in live debate, believes in seizing every moment, and balances her love for MUNs with a deep interest in culinary arts. A student at DPS East, she hopes to pursue international law ideally with a snack in hand`,
    icon: Kevin,
    href: "",
  },
  {
    title: "Dhruv N.M",
    author: "Chair of UNSC",
    description:
      "",
    icon: Rikard,
    href: "",
  },
  {
    title: "Meekha",
    author: "Vice-Chair of UNHRC",
    description:
      "",
    icon: Jasmine,
    href: "",
  },
    {
    title: "Stephanie",
    author: "Moderator of UNHRC",
    description:
      `Stephanie brings boldness and clarity to every committee she enters.
A delegate from North Hills International School, she’s placed in both MUNs she’s attended so far.
Known for sharp arguments, fearless diplomacy, and a creative spark rooted in art and music,
she tackles global issues with conviction—and speaks to be heard and remembered.`
,
    icon: Arielle,
    href: "https://www.instagram.com/stephanie_mascarenhas/",
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
