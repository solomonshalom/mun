"use client";

import { Button } from "@/components/Button";
import { SocraticaLogo } from "@/components/icons/SocraticaLogo";
import { StarsBackground } from "@/components/StarsBackground";
import { HomeIcon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col bg-black min-h-[calc(100vh-64px)] text-white">
      <main className="flex-1 flex items-center justify-center">
        <section className="container text-white relative py-16 md:py-24 flex flex-col items-center justify-center">
          {/* Stars background */}
          <StarsBackground />

          <motion.h1
            className="font-tiempos text-6xl md:text-7xl lg:text-8xl text-center mb-4 relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            404
          </motion.h1>

          <motion.h2
            className="font-tiempos text-2xl md:text-3xl lg:text-4xl text-center mb-12 relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Page Not Found
          </motion.h2>

          <motion.div
            className="flex flex-col items-center text-center max-w-xl mx-auto relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="px-8 md:px-6 w-full max-w-[300px] mb-8 flex justify-center">
              <SocraticaLogo className="size-12 text-zinc-50" />
            </div>

            <div className="mt-5 text-center">
              <h3 className="font-tiempos text-xl md:text-2xl">
                {"I think I am a page, therefore I am... wait, no I'm not."}{" "}
              </h3>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link href="/">
                  <Button
                    icon={<HomeIcon className="size-4" />}
                    text="Go Home"
                  />
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
