"use client";
import { useRiveStore } from "@/stores/riveStore";
import { useRive } from "@rive-app/react-canvas";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export const Hero = () => {
  const { setRiveLoaded, isRiveLoaded } = useRiveStore();
  const [isMobile, setIsMobile] = useState(false);
  const loadStartTimeRef = useRef(Date.now());

  // Check screen size on mount and when window resizes
  useEffect(() => {
    // Default to desktop for SSR
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640); // 'sm' breakpoint in Tailwind
    };

    // Set initial value
    checkScreenSize();

    // Add resize listener
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Only create one Rive instance based on screen size
  const { RiveComponent } = useRive(
    {
      src: isMobile ? "/riv/mobiel.riv" : "/riv/big_up.riv",
      autoplay: true,
      onLoad: () => {
        console.log(`${isMobile ? "Mobile" : "Desktop"} Rive component loaded`);
        const loadTime = Date.now() - loadStartTimeRef.current;
        const remainingTime = Math.max(0, 300 - loadTime);

        console.log("waiting: ", remainingTime);
        if (remainingTime > 0) {
          setTimeout(() => {
            setRiveLoaded(true);
          }, remainingTime);
        } else {
          setRiveLoaded(true);
        }
      },
    },
    {
      fitCanvasToArtboardHeight: true,
    }
  );

  return (
    <motion.section
      className="relative w-full h-full overflow-hidden bg-indigo-700 flex items-center justify-center text-white"
      initial={{ opacity: 0.25 }}
      animate={{ opacity: isRiveLoaded ? 1 : 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <RiveComponent className="w-full h-full" />
    </motion.section>
  );
};
