"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ScrollTextProps {
  text: string;
  triggerRef: React.RefObject<HTMLElement | null>;
  startColor?: string;
  endColor?: string;
}

export default function ScrollText({
  text,
  triggerRef,
  startColor = "#4B5563",
  endColor = "#FFFFFF",
}: ScrollTextProps) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!triggerRef.current) return;

    const chars = triggerRef.current.querySelectorAll(".char");

    gsap.fromTo(
      chars,
      { color: startColor }, // Grey at start
      {
        color: endColor, // White on scroll down
        stagger: 0.1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true, // Smooth transition
          toggleActions: "play reverse play reverse", // Replays on scroll up & down
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [triggerRef]);

  return (
    <span>
      {text.split("").map((char, index) => (
        <span key={index} className="char inline-block">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
