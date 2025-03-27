"use client";
import React, { useRef } from "react";
import { gsap } from "gsap";
import HoverText from "../text/hover-text";

const ContactMe = () => {
  // We'll track the container that holds both circles
  const containerRef = useRef<HTMLDivElement>(null);
  // The top circle that moves
  const topCircleRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!containerRef.current || !topCircleRef.current) return;

    // Get bounding box of the container (both circles share this parent)
    const rect = containerRef.current.getBoundingClientRect();
    // Calculate the center of that container
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Distance from center to mouse pointer
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Limit how far the top circle can move (in px)
    const maxOffset = 30;
    let offsetX = dx;
    let offsetY = dy;

    // If the mouse is farther than maxOffset, scale back the offset
    if (distance > maxOffset) {
      const factor = maxOffset / distance;
      offsetX = dx * factor;
      offsetY = dy * factor;
    }

    // Animate the top circle
    gsap.to(topCircleRef.current, {
      x: offsetX,
      y: offsetY,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    if (!topCircleRef.current) return;
    // Return the top circle to its initial position (x: 0, y: 0)
    gsap.to(topCircleRef.current, {
      x: 0,
      y: 0,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  return (
    <div className="container mx-auto p-6 gap-10">
      <section className="relative flex flex-col w-full min-h-dvh justify-center items-center overflow-hidden">
        <div className="relative flex flex-col gap-4 text-center">
          <h4 className="text-2xl">GOT A PROJECT IN MIND?</h4>
          <h3 className="text-8xl font-bold">LET&apos;S CONNECT</h3>
          <div
            ref={containerRef}
            className="pointer-events-auto 
                     w-full h-20 flex justify-center items-center mt-5 "
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Bottom circle (STAYS IN PLACE) */}
            <div
              className="relative w-20 h-20 rounded-full border border-white 
                       flex items-center justify-center  cursor-pointer"
            >
              {/* Optional icon or design inside the bottom circle */}
              {/* For example, a small dotted shape or a different arrow */}
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></svg>
              <div
                ref={topCircleRef}
                className="absolute top-0 left-0 w-20 h-20 rounded-full border border-white 
                       flex items-center justify-center cursor-pointer"
              >
                {/* Icon/arrow inside top circle */}
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 19L19 5M5 5h14v14" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <footer className="absolute bottom-0 w-full min-h-40 justify-center flex flex-col gap-4 p-6">
          <div className="w-full flex justify-between items-center">
            <div>
              <h3 className="text-xl uppercase ">
                Feel Free to connect me on social
              </h3>
            </div>
            <div className="flex uppercase gap-8">
              <HoverText text={"linkedIn"} />
              <HoverText text={"Github"} />
              <HoverText text={"Instagram"} />
              <HoverText text={"Resume"} />
            </div>
          </div>
          <div></div>
          <p className="uppercase text-xs font-extralight">
            Made with Love by mario
          </p>
        </footer>
      </section>
    </div>
  );
};

export default ContactMe;
