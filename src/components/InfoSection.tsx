"use client";
import { motion } from "motion/react";
import { HTMLAttributes } from "react";
import { cn } from "../lib/utils";
import { InfoLink } from "./InfoLink";
import { StarsBackground } from "./StarsBackground";
import BurritoSvg from "./svg/burrito.svg";

export const infoLinks: InfoLinkItem[] = [
  {
    title: "Getting to the School",
    description: "In-person",
    url: "",
  },
  {
    title: "The MUN",
    description: "The delegate's package of information",
    url: "",
  },
  {
    title: "The Team",
    description: "Your chairs, moderators and everyone you need!",
    url: "",
  },
  {
    title: "About NHIS",
    description: "Learn more about NHIS and it's mission",
    url: "",
  },
  {
    title: "Our Code of Conduct",
    description: "Set of guidelines you'll need to adhere to at our events.",
    url: "",
  },
];

export type InfoLinkItem = {
  title: string;
  description: string;
  url: string;
};

export type InfoSectionProps = HTMLAttributes<HTMLDivElement> & {
  links: InfoLinkItem[];
  animationDuration?: number;
};

export const InfoSection = ({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <section
      className={cn(
        "container mx-auto px-4 py-16 md:py-24 lg:py-32 relative",
        className
      )}
      {...rest}
    >
      <StarsBackground />
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <BurritoSvg className="w-full px-4 md:px-0 md:max-w-4xl md:mx-auto" />
        </motion.div>

        <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-white">
          {infoLinks.map((link, index) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: 0.1 + index * 0.1,
              }}
            >
              <InfoLink
                title={link.title}
                description={link.description}
                url={link.url}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
