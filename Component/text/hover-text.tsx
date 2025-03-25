"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import clsx from "clsx";

interface HoverTextProps {
  text: string;
  className?: string;
}

const HoverText = ({ text, className }: HoverTextProps) => {
  const topTextRef = useRef<HTMLParagraphElement>(null);
  const bottomTextRef = useRef<HTMLParagraphElement>(null);

  // On initial render, position the bottom text off view (below)
  useEffect(() => {
    if (bottomTextRef.current) {
      gsap.set(bottomTextRef.current, { y: "100%" });
    }
  }, []);

  const handleMouseEnter = () => {
    if (topTextRef.current && bottomTextRef.current) {
      // Slide top text up and out, and bottom text in from below.
      gsap.to(topTextRef.current, {
        y: "-100%",
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to(bottomTextRef.current, {
        y: "0%",
        duration: 0.4,
        ease: "power3.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (topTextRef.current && bottomTextRef.current) {
      // Reverse the animation: top text returns, bottom text slides back down.
      gsap.to(topTextRef.current, {
        y: "0%",
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to(bottomTextRef.current, {
        y: "100%",
        duration: 0.4,
        ease: "power3.out",
      });
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={clsx("relative overflow-hidden cursor-pointer", className)}
    >
      {/* Top text (initially visible) */}
      <p ref={topTextRef} className="transition-none">
        {text}
      </p>
      {/* Bottom text (initially hidden off view, absolutely positioned over the top text) */}
      <p ref={bottomTextRef} className="absolute top-0 left-0 transition-none">
        {text}
      </p>
    </div>
  );
};

export default HoverText;
