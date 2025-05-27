"use client";
import {
  HouseIcon,
  Sprout,
  TheaterIcon,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SocraticaLogo } from "./icons/SocraticaLogo";
import NavIcon from "./NavIcon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function NavigationBar() {
  const pathname = usePathname();

  return (
    <motion.div
      className="flex justify-between items-center w-full px-6 py-6 container dot-pattern"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
    >
      <TooltipProvider>
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Link href="/">
            <SocraticaLogo className="size-7" />
          </Link>
        </motion.div>

        {/* Navigation icons */}
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tooltip>
            <TooltipTrigger>
              <NavIcon href="/" active={pathname === "/"}>
                <HouseIcon className="size-5" />
              </NavIcon>
            </TooltipTrigger>
            <TooltipContent className="font-5by7 uppercase tracking-widest font-medium">
              <p>Home</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <NavIcon href="/garden" active={pathname === "/garden"}>
                <Sprout className="size-5" />
              </NavIcon>
            </TooltipTrigger>
            <TooltipContent className="font-5by7 uppercase tracking-widest font-medium">
              <p>Garden</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <NavIcon href="/stage" active={pathname === "/stage"}>
                <TheaterIcon className="size-5" />
              </NavIcon>
            </TooltipTrigger>
            <TooltipContent className="font-5by7 uppercase tracking-widest font-medium">
              <p>Stage</p>
            </TooltipContent>
          </Tooltip>
        </motion.div>
      </TooltipProvider>
    </motion.div>
  );
}
