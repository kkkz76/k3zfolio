"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GridZoomTransition() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Create a timeline that pins the section during the scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top", // when the top of the section hits the viewport top
        end: "+=150", // when the bottom of the section hits the viewport top
        scrub: true, // ties animation progress to scroll
        pin: true, // pins the section during the animation
        // pinSpacing: true,   // leave true (default) if you want space reserved;
        // set to false if you want no extra space when unpinned
      },
    });

    // Step 1: Zoom in the grid
    // Start at scale 1 (full screen) and scale up (e.g., 3) as you scroll.
    tl.to(gridRef.current, {
      scale: 10,
      ease: "power1.out",
      duration: 4,
    });

    // Step 2: Transition the background color (optional)
    // This creates a transition effect as the grid zooms.
    tl.to(
      containerRef.current,
      {
        backgroundColor: "#fff",
        ease: "power1.out",
        duration: 1,
      },
      "-=0.5" // Overlap this animation with the zoom for a smoother transition.
    );

    // (Optional) You can also fade out grid cells or overlay text if needed.

    // Cleanup when unmounting
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* Grid container covering full screen */}
      <div
        ref={gridRef}
        className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-1 transform origin-center"
      >
        {Array.from({ length: 36 }).map((_, i) => (
          <div key={i} className="border border-white w-full h-full"></div>
        ))}
      </div>

      {/* Optional Centered Text (if needed) */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-5xl text-white">Zoom Transition</h1>
      </div>
    </section>
  );
}
