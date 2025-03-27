"use client"; // Make sure this file is a client component

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  // We'll animate the background color of this container
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // GSAP Context helps avoid conflicts when components re-mount
    const ctx = gsap.context(() => {
      // Animate the container's background color as we scroll
      gsap.to(containerRef.current, {
        backgroundColor: "#d4d4d4", // light gray
        scrollTrigger: {
          trigger: "#secondSection", // the section that triggers the color change
          start: "top center", // when the top of #secondSection hits the center of the viewport
          end: "bottom center", // when bottom of #secondSection hits center
          scrub: true, // smooth scrubbing
        },
      });
    }, containerRef);

    // Cleanup on unmount
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-neutral-900 text-white">
      {/* First Section */}
      <section
        id="firstSection"
        className="flex items-center justify-center h-screen"
      >
        <h1 className="text-4xl">Dark Section</h1>
      </section>

      {/* Second Section */}
      <section
        id="secondSection"
        className="flex items-center justify-center h-screen text-black"
      >
        <h1 className="text-4xl">Gray Section</h1>
      </section>
    </div>
  );
}
