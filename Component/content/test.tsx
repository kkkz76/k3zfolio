"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Test() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const gsapContextRef = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Pass the actual DOM node instead of the ref object
    gsapContextRef.current = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: container, // Use container instead of containerRef
          start: "top top",
          end: "+=1000",
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, container);

    return () => {
      // Clean up GSAP context on unmount
      gsapContextRef.current.revert();
    };
  }, []);

  const handleNavigation = () => {
    // Revert GSAP animations to clean up any pinned elements
    if (gsapContextRef.current) {
      gsapContextRef.current.revert();
    }
    router.push("/project");
  };

  return (
    <section ref={containerRef} className="relative bg-accent-2">
      <div>apple</div>
      <button onClick={handleNavigation}>go to next</button>
    </section>
  );
}
