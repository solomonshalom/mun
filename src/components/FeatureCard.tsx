import { Button } from "@/components/Button";
import { LucideIcon } from "lucide-react";
import { HTMLMotionProps, motion } from "motion/react";
import Link from "next/link";
import { HTMLAttributes, useState } from "react";
import { cn } from "../lib/utils";

// Strength of opposing force. If set to 0, spring will oscillate indefinitely.
const DAMPING = 15;

// Stiffness of the spring. Higher values will create more sudden movement.
const STIFFNESS = 450;

export interface FeatureCardProps
  extends Omit<HTMLMotionProps<"div">, keyof HTMLAttributes<HTMLDivElement>> {
  title: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  buttonIcon: LucideIcon;
  buttonText: string;
  href: string;
  initialRotation?: number;
  delay?: number;
  className?: string;
}

export default function FeatureCard({
  title,
  description,
  icon: Icon,
  buttonIcon: ButtonIcon,
  buttonText,
  href,
  initialRotation = 0,
  className,
  ...props
}: FeatureCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        "flex flex-col items-center md:items-start px-6 md:px-4 ",
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7 }}
      onHoverStart={() => setHovered(true)}
      {...props}
    >
      <motion.div
        initial={{ rotate: hovered ? 0 : initialRotation }}
        transition={{
          type: "spring",
          stiffness: STIFFNESS,
          damping: DAMPING,
        }}
        whileHover={{ rotate: 0 }}
      >
        <Icon className="w-full px-1" />
      </motion.div>
      <div className="mt-5 text-center md:text-left w-full">
        <h3 className="font-tiempos text-xl md:text-2xl">{title}</h3>
        <p className="mt-2 text-zinc-300">{description}</p>
        <Link href={href} scroll={true}>
          <Button
            icon={<ButtonIcon className="size-4" />}
            text={buttonText}
            className="mt-4"
          />
        </Link>
      </div>
    </motion.div>
  );
}
