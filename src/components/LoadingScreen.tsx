"use client";
import { motion } from "motion/react";
import { SocraticaLogo } from "./icons/SocraticaLogo";

export const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      <motion.div
        className=""
        initial={{ opacity: 0, filter: "blur(0px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{
          opacity: 0,
          filter: "blur(20px)",
          transition: {
            opacity: { delay: 0.3, duration: 0.5 },
            filter: { duration: 0.5 },
          },
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="relative flex flex-col items-center justify-center">
          {/* Main logo */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{
              scale: [0.95, 1.05, 0.95],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              opacity: { delay: 0.1 },
            }}
          >
            <SocraticaLogo className="text-[#fcfaf2] w-12 h-12 md:w-16 md:h-16" />
          </motion.div>
          {/* <motion.p
            className="text-white text-3xl font-conte mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
          >
            SYMPOSIUM
          </motion.p> */}
          {/* <motion.p
            className="text-white text-2xl font-5by7 mt-2 font-medium uppercase tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.7,
            }}
          >
            INITIALIZING
          </motion.p> */}
        </div>
      </motion.div>
    </motion.div>
  );
};
