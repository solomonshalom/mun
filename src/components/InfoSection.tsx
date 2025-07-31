"use client";
import { motion } from "motion/react";
import { HTMLAttributes } from "react";
import { cn } from "../lib/utils";
import { InfoLink } from "./InfoLink";
import { StarsBackground } from "./StarsBackground";

export const infoLinks: InfoLinkItem[] = [
  {
    title: "Getting to the School",
    description: "In-person",
    url: "https://www.notion.so/solomonlijo/Getting-to-NHIS-23f4c3d854ab8167aba6c25eae1d96bd?source=copy_link",
  },
  {
    title: "The MUN Package",
    description: "The schedule of the MUN",
    url: "https://www.notion.so/solomonlijo/NHIS-MUN-Delegate-Package-23f4c3d854ab803bba1be505b5ea63e1?source=copy_link",
  },
  {
    title: "The Team",
    description: "Your chairs, moderators, and everyone you need!",
    url: "https://nhissymposium.space/stage",
  },
  {
    title: "About NHIS",
    description: "Learn more about NHIS and it's mission",
    url: "https://nhisblr.com",
  },
  {
    title: "Our Code of Conduct",
    description: "Set of guidelines you'll need to adhere to at our events.",
    url: "https://www.notion.so/solomonlijo/Code-of-Conduct-23f4c3d854ab81c08c8bd7dd181a030d?source=copy_link",
  },
  {
    title: "UNSC Position Paper Submission",
    description: "TBA",
    url: "https://github.com/solomonshalom/mun/commit/da705e44446590c8561492375295c9fc34b1cca3"
  }
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
