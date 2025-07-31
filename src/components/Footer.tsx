"use client";
// import ShopifyGuySvg from "@/components/svg/ShopifyGuy.svg";
// import VapiSvg from "@/components/svg/VAPI.svg";
// import VercelSvg from "@/components/svg/VercelLogo.svg";
import { motion } from "motion/react";

export function Footer() {
  return (
    <div className="bg-[#f8f3e3] grid-pattern-vignette">
      <footer className="container mx-auto px-4 py-16 md:py-24 text-center">
        <motion.div
          className="mt-12 md:mt-16 px-4 py-2.5 border border-[#A4A4A4]/30 bg-white transition-shadow duration-300 font-5by7 font-medium uppercase tracking-wider w-fit mx-auto text-zinc-600"
          style={{
            boxShadow:
              "0px 4px 0px rgba(0, 0, 0, 0.04), 0px 4px 7px rgba(0, 0, 0, 0.08)",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          <p className="text-xs md:text-sm">
            Built By{" "}
            <a
              href="https://twitter.com/shalomlijo"
              target="_blank"
              className="font-semibold relative inline-block transition-colors hover:text-zinc-500/90"
            >
              <span className="relative inline-block">Solomon Shalom Lijo</span>
            </a>
            <br />
            ♡
          </p>
        </motion.div>
      </footer>
    </div>
  );
}
