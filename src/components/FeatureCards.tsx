import { Presentation, Sparkles, SproutIcon, Users } from "lucide-react";
import { HTMLAttributes } from "react";
import { cn } from "../lib/utils";

// Svgs
import BoothDemosSvg from "@/components/svg/BoothDemos.svg";
import FindPeopleSvg from "@/components/svg/FindPeople.svg";
import Garden from "@/components/svg/Garden.svg";
import StageDemosSvg from "@/components/svg/StageDemos.svg";
import FeatureCard from "./FeatureCard";
import { StarsBackground } from "./StarsBackground";

interface FeatureCardsProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
}

// Feature card data
const FEATURES = [
  {
    title: "Find People",
    description: "Find your matches.",
    icon: FindPeopleSvg,
    buttonIcon: Users,
    buttonText: "Find people",
    href: "/people",
    initialRotation: -4.5,
    delay: 0.1,
  },
  {
    title: "Stage Demos",
    description: "Lights, camera, action!",
    icon: StageDemosSvg,
    buttonIcon: Sparkles,
    buttonText: "Stage Demos",
    href: "/stage",
    initialRotation: 6.2,
    delay: 0.2,
  },
  {
    title: "Garden",
    description: "See what people are working on!",
    icon: Garden,
    buttonIcon: SproutIcon,
    buttonText: "Garden",
    href: "/garden",
    initialRotation: -5.8,
    delay: 0.3,
  },
  {
    title: "Booth Demos",
    description: "Meet the makers",
    icon: BoothDemosSvg,
    buttonIcon: Presentation,
    buttonText: "Booth Demos",
    href: "/booths",
    initialRotation: 4.7,
    delay: 0.4,
  },
];

export default function FeatureCards({
  // title = "Welcome to the World's Best Demo Day.",
  className,
  ...props
}: FeatureCardsProps) {
  return (
    <section
      className={cn(
        "container pb-16 md:pb-24 lg:pb-32 text-white relative sm:-mt-8 md:-mt-12 lg:-mt-16",
        className
      )}
      {...props}
    >
      {/* Stars background */}
      <StarsBackground />

      {/* {title && (
        <motion.h2
          className="font-tiempos text-3xl md:text-4xl lg:text-5xl text-center mb-16 md:mb-24 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          {title}
        </motion.h2>
      )} */}
      <div className="flex w-full justify-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-12 md:gap-8 max-w-7xl mx-auto space-y-0 xl:space-y-0 md:space-y-8">
          {FEATURES.map((feature) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              transition={{ duration: 0.7, delay: feature.delay }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
