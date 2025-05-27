"use client";
import ShopifyGuySvg from "@/components/svg/ShopifyGuy.svg";
import VapiSvg from "@/components/svg/VAPI.svg";
import VercelSvg from "@/components/svg/VercelLogo.svg";
import { motion } from "motion/react";

export function Footer() {
  return (
    <div className="bg-[#f8f3e3] grid-pattern-vignette">
      <footer className="container mx-auto px-4 py-16 md:py-24 text-center">
        <motion.p
          className="uppercase text-xs md:text-sm text-zinc-600 mb-8 md:mb-12 font-5by7 font-bold tracking-wider"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          This event would not be possible without...
        </motion.p>
        <motion.a
          href="https://shopify.com"
          target="_blank"
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <ShopifyGuySvg className="mx-auto h-[6.3rem] md:h-[8rem] w-auto" />
        </motion.a>
        <div className="items-center justify-between md:justify-center md:gap-10 lg:gap-16 flex flex-row px-2 mt-10 md:mt-16">
          <motion.a
            href="https://vapi.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <VapiSvg className="h-[18px] md:h-[22px]" />
          </motion.a>
          <motion.div
            className="bg-zinc-400 h-[24px] w-[1px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
          ></motion.div>
          <motion.a
            href="https://www.velocityincubator.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <img
              src="/velocity.png"
              className="h-[27px] md:h-[33px] invert-0 brightness-0 mb-1"
            />
          </motion.a>
          <motion.div
            className="bg-zinc-400 h-[24px] w-[1px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.25 }}
          ></motion.div>
          <motion.a
            href="https://vercel.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <VercelSvg className="h-[20px] md:h-[23px] invert-0 brightness-0" />
          </motion.a>
        </div>
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
            PRODUCT OF{" "}
            <a
              href="https://twitter.com/freemanjiangg"
              target="_blank"
              className="font-semibold relative inline-block transition-colors hover:text-zinc-500/90"
            >
              <span className="relative inline-block">FREEMAN</span>
            </a>{" "}
            ✗{" "}
            <a
              href="https://twitter.com/userisgrotesque"
              target="_blank"
              className="font-semibold relative inline-block transition-colors hover:text-zinc-500/90"
            >
              <span className="relative inline-block">AILEEN</span>
            </a>{" "}
            <br />
            with{" "}
            <a
              href="https://twitter.com/_rajanagarwal"
              target="_blank"
              className="font-semibold relative inline-block transition-colors hover:text-zinc-500/90"
            >
              <span className="relative inline-block">RAJAN</span>
            </a>{" "}
            &{" "}
            <a
              className="font-semibold relative inline-block transition-colors hover:text-zinc-500/90"
              href="https://x.com/_chloeyan"
              target="_blank"
            >
              CHLOE
            </a>{" "}
            ♡
          </p>
        </motion.div>
      </footer>
    </div>
  );
}
