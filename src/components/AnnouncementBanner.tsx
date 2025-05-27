import { BLUR_CONTENT } from "@/flags";
import { motion } from "motion/react";

interface AnnouncementBannerProps {
  title?: string;
  date?: string;
  className?: string;
}

export default function AnnouncementBanner({
  title = "To be announced.",
  date = "19/03/2025",
  className,
}: AnnouncementBannerProps) {
  if (!BLUR_CONTENT) {
    return null; // Don't render if blur content is disabled
  }

  return (
    <motion.div
      className={`max-w-5xl mx-auto text-center mb-16 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2
        className="text-4xl md:text-6xl text-white font-conte tracking-tight mb-4"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {title}
      </motion.h2>
      <motion.p
        className="text-zinc-400 text-xl max-w-md mx-auto font-5by7 uppercase tracking-widest"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        {date}
      </motion.p>
    </motion.div>
  );
}
