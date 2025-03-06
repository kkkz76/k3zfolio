"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

gsap.registerPlugin(ModifiersPlugin);

const Marquee = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  // 1) Base text
  const baseText = "ask vox";

  // 2) Dynamically build a longer string from the base text.
  //    This way, you only type "ask vox" once.
  const repeatedText = Array(10).fill(baseText).join(" • ");

  useEffect(() => {
    if (!marqueeRef.current) return;

    // 3) Half the total scrollWidth = width of one "full" copy
    const singleWidth = marqueeRef.current.scrollWidth / 2;

    gsap.to(marqueeRef.current, {
      x: -singleWidth,
      duration: 10,
      ease: "none",
      repeat: -1, // Infinite loop
      modifiers: {
        x: (currentX) => {
          // 4) Use ModifiersPlugin to wrap the x-value seamlessly
          const mod = parseFloat(currentX) % singleWidth;
          return `${mod}px`;
        },
      },
    });
  }, []);

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        whiteSpace: "nowrap",
        width: "100%",
      }}
    >
      {/* 5) We duplicate the long text string twice for a continuous flow */}
      <div ref={marqueeRef} style={{ display: "inline-flex" }}>
        <div style={{ display: "inline-block" }}>{repeatedText}</div>
        <div style={{ display: "inline-block" }}>{repeatedText}</div>
      </div>
    </div>
  );
};

export default Marquee;
