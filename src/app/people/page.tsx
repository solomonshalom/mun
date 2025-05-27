"use client";

import { SocraticaLogo } from "@/components/icons/SocraticaLogo";
import { Search } from "@/components/Search";
import ShopifyLogo from "@/components/svg/shopify-logo.svg";
import { motion } from "motion/react";
import { useEffect } from "react";

export default function PeoplePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-black">
      <div className="bg-[#f8f3e3]">
        <div className="max-w-7xl mx-auto px-6 pt-8 pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center"
          >
            <div className="flex justify-center mb-4 items-center gap-4">
              <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <SocraticaLogo className="size-10" />
              </motion.div>
              <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                className="text-zinc-600 font-medium text-2xl"
              >
                ✗
              </motion.div>
              <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              >
                {/* <img
                  src="/shopify-logo.svg"
                  alt="Shopify"
                  className="h-12 w-auto"
                /> */}
                <ShopifyLogo className="size-12" />
              </motion.div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-tiempos tracking-tight font-normal">
              People of Symposium
            </h1>
            <div className="mt-4 font-5by7 font-bold uppercase tracking-wider opacity-90 text-[0.95rem] md:text-base">
              {/* <motion.div
                className="uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                WATERLOO, ON, CANADA
              </motion.div> */}

              <motion.div
                className="text-zinc-500 text-balance"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                POWERED BY SHOPIFY
              </motion.div>
            </div>
          </motion.div>

          <div className="w-full mt-8">
            <Search />
          </div>
        </div>
      </div>

      {/* Branding footer - removed Shopify, kept only Socratica */}
      <div className="fixed bottom-4 right-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-xs text-white/70 flex flex-col items-end gap-1"
        >
          <div className="flex items-center gap-1">
            <span>Powered by</span>
            <a
              href="https://socratica.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:text-white transition-colors"
            >
              Socratica
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
