"use client";

import AnnouncementBanner from "@/components/AnnouncementBanner";
import BoothCard from "@/components/BoothCard";
import { Footer } from "@/components/Footer";
import Ticker from "@/components/Ticker";
import { BLUR_CONTENT } from "@/flags";
import boothData from "@/public/boothData.json";
import { motion } from "motion/react";

interface Booth {
  title: string;
  description: string;
  members: string[];
  link_text: string;
}

const Page = () => {
  const booths: Booth[] = boothData;

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
          Booth Demos
        </motion.h1>
        <motion.h2
          className="text-lg mt-2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Explore {booths.length} innovative projects spanning art, tech, and
          engineering.
        </motion.h2>
      </div>

      <Ticker text="EXHIBITION BOOTHS" className="mt-8" />

      <div className="py-8 md:py-16 bg-zinc-950">
        <AnnouncementBanner />

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch justify-items-center gap-12 md:gap-0 mb-28 max-w-[73rem]">
          {booths.map((booth, i) => (
            <motion.div
              key={booth.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i < 6 ? i * 0.1 : 0.1 }}
              className="h-full w-full flex"
            >
              <BoothCard
                title={booth.title}
                description={booth.description}
                members={booth.members}
                linkText={booth.link_text}
                blurContent={BLUR_CONTENT}
                className="w-full"
              />
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Page;
