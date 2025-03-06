"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ZoomIn = () => {
  const containerRef = useRef(null);
  const targetRef = useRef(null);

  useEffect(() => {
    // Create a GSAP context for proper cleanup in React
    const ctx = gsap.context(() => {
      gsap.to(targetRef.current, {
        scale: 4, // from default scale of 1 to 4
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true, // ties the animation progress to the scrollbar
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-[300vh] relative">
      <div className="sticky top-0 h-[100vh] bg-accent-1">
        <div
          ref={targetRef}
          className="absolute top-0 w-full h-full flex justify-center items-center"
        >
          <div className="w-[25vw] h-[25vh] bg-accent-2">apple</div>
        </div>
      </div>
    </section>
  );
};

export default ZoomIn;
