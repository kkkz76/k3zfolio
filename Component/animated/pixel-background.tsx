"use client";

import React, { useEffect, useRef } from "react";

export default function PixelSpotPage() {
  // We'll store the dot's position and velocity in refs (so they persist between renders).
  const xRef = useRef(0);
  const yRef = useRef(0);
  const vxRef = useRef(0);
  const vyRef = useRef(0);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Because Next.js can render on the server, ensure 'window' is defined:
    if (typeof window === "undefined") return;

    // Initialize the dot near the center of the viewport.
    xRef.current = window.innerWidth / 2;
    yRef.current = window.innerHeight / 2;

    // Give it a small random velocity in each axis.
    vxRef.current = (Math.random() - 0.5) * 2; // e.g. -1.0 to 1.0
    vyRef.current = (Math.random() - 0.5) * 2;

    // Animation loop using requestAnimationFrame.
    const animate = () => {
      // Update position.
      xRef.current += vxRef.current;
      yRef.current += vyRef.current;

      // Bounce off edges.
      if (xRef.current < 0 || xRef.current > window.innerWidth) {
        vxRef.current = -vxRef.current;
      }
      if (yRef.current < 0 || yRef.current > window.innerHeight) {
        vyRef.current = -vyRef.current;
      }

      // Update the dot’s transform if the ref is valid.
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${xRef.current}px, ${yRef.current}px)`;
      }

      requestAnimationFrame(animate);
    };

    // Start animation.
    animate();
  }, []);

  return (
    <main className="relative w-screen h-screen bg-black overflow-hidden">
      {/* The “pixel spot” */}
      <div
        ref={dotRef}
        className="absolute w-[2px] h-[2px] bg-white"
        style={{ top: 0, left: 0 }}
      />
    </main>
  );
}
