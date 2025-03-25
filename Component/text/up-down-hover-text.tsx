"use client";
import { motion, useAnimation } from "motion/react";
import React from "react";

interface HoverTextProps {
  MainText: string;
  HoverText: string;
}

const UpDownHoverText = ({ MainText, HoverText }: HoverTextProps) => {
  // Allow directionRef to be either "-100%" or "100%" or null.

  const controls = useAnimation();

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;

    const initialY: "-100%" | "100%" =
      mouseY < rect.height / 2 ? "-100%" : "100%";
    controls.set({ y: initialY });
    controls.start({ y: "0", transition: { duration: 0.2 } });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    const initialY: "-100%" | "100%" =
      mouseY < rect.height / 2 ? "-100%" : "100%";
    controls.start({
      y: initialY,
      transition: { duration: 0.2 },
    });
  };

  return (
    <>
      <motion.div
        className=" w-full h-full bg-accent-1 flex items-center justify-center relative overflow-hidden cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <p className="relative w-full">{MainText}</p>
        {/* The animated white overlay */}

        <motion.div
          className="absolute top-0 w-full h-full text-black bg-white"
          initial={{ y: "100%" }}
          animate={controls}
        >
          {HoverText}
        </motion.div>
      </motion.div>
    </>
  );
};

export default UpDownHoverText;
