"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function AutoScrollPage() {
  useEffect(() => {
    // Auto scroll from the top to the bottom and then back to the top
    gsap.to(window, {
      scrollTo: { y: "max", autoKill: false },
      duration: 10, // Adjust the duration to control the scroll speed
      repeat: -1, // Infinite loop
      yoyo: true, // Reverse direction after reaching the bottom
      ease: "linear",
    });
  }, []);

  return (
    <div className="h-[300vh] bg-gray-900 text-white flex items-center justify-center">
      <h1 className="text-4xl font-bold">Auto Scrolling Page</h1>
    </div>
  );
}
