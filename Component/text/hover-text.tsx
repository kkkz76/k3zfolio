"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface HoverTextProps {
  text: string;
}

const HoverText = ({ text }: HoverTextProps) => {
  const topTextRef = useRef(null);
  const bottomTextRef = useRef(null);

  // On initial render, position the bottom text off view (below)
  useEffect(() => {
    gsap.set(bottomTextRef.current, { y: "100%" });
  }, []);

  const handleMouseEnter = () => {
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
  };

  const handleMouseLeave = () => {
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
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden cursor-pointer"
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
