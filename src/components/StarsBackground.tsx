"use client";
import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "motion/react";
import StarsSvg from "./svg/stars.svg";

export type StarsBackgroundProps = HTMLMotionProps<"div">;

export const StarsBackground = ({
  className,
  ...props
}: StarsBackgroundProps) => {
  return (
    <motion.div
      className={cn(
        "absolute inset-0 w-full h-full pointer-events-none",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "linear" }}
      {...props}
    >
      <StarsSvg className="w-full h-full opacity-70" />
    </motion.div>
  );
};
