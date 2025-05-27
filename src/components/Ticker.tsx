import { motion } from "motion/react";
import { HTMLAttributes } from "react";
import { cn } from "../lib/utils";

interface TickerProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  backgroundColor?: string;
  textColor?: string;
  duration?: number;
  fadeInDelay?: number;
}

export default function Ticker({
  text,
  duration = 15,
  fadeInDelay = 0.4,
  className,
  ...props
}: TickerProps) {
  const repeatedText = `${text} • `.repeat(100);

  // Create the square dot border effect with hardcoded values
  const dotBorderStyle = {
    background: `
      linear-gradient(to right, rgb(82, 82, 91) 2px, transparent 2px, transparent 5px) top left/5px 2px repeat-x,
      linear-gradient(to right, rgb(82, 82, 91) 2px, transparent 2px, transparent 5px) bottom left/5px 2px repeat-x,
      linear-gradient(to bottom, rgb(82, 82, 91) 2px, transparent 2px, transparent 5px) left top/2px 5px repeat-y,
      linear-gradient(to bottom, rgb(82, 82, 91) 2px, transparent 2px, transparent 5px) right top/2px 5px repeat-y
    `,
    padding: "0.75rem",
  };

  return (
    <div
      className={cn(
        "w-full pb-3 pt-[0.5px] overflow-hidden bg-zinc-950",
        className
      )}
      {...props}
    >
      <div className="whitespace-nowrap overflow-hidden">
        <motion.div
          className="inline-block"
          initial={{ opacity: 0, x: "0rem" }}
          animate={{
            opacity: 1,
            x: "-40rem",
          }}
          transition={{
            x: {
              duration,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
              delay: fadeInDelay,
            },
            opacity: {
              duration: 0.8,
              delay: fadeInDelay,
            },
          }}
        >
          {Array(20)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="inline-block font-5by7 font-bold tracking-wider px-2 text-zinc-100"
                style={{
                  marginRight: "1rem",
                  ...dotBorderStyle,
                }}
              >
                {repeatedText}
              </div>
            ))}
        </motion.div>
      </div>
    </div>
  );
}
