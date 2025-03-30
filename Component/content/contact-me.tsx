"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverText from "../text/hover-text";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ContactMe = () => {
  // Refs for DOM elements
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const topCircleRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      sectionRef.current &&
      textContainerRef.current &&
      containerRef.current &&
      footerRef.current
    ) {
      // Animate text container when section reaches center of viewport
      gsap.from(textContainerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
        },
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power3.out",
      });

      // Animate circle container with a scale effect
      gsap.from(containerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
        },
        opacity: 0,
        scale: 0.5,
        duration: 1.2,
        delay: 0.3,
        ease: "power3.out",
      });

      // Animate footer on scroll
      gsap.from(footerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
        },
        opacity: 0,
        y: 50,
        duration: 1.2,
        delay: 0.6,
        ease: "power3.out",
      });
    }
  }, []);

  // Mouse move animation for the top circle
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!containerRef.current || !topCircleRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const maxOffset = 30;
    let offsetX = dx;
    let offsetY = dy;

    if (distance > maxOffset) {
      const factor = maxOffset / distance;
      offsetX = dx * factor;
      offsetY = dy * factor;
    }

    gsap.to(topCircleRef.current, {
      x: offsetX,
      y: offsetY,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  // Reset circle position on mouse leave
  const handleMouseLeave = () => {
    if (!topCircleRef.current) return;
    gsap.to(topCircleRef.current, {
      x: 0,
      y: 0,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  return (
    <div className="bg-primary text-black">
      <div className="container mx-auto p-6 gap-10">
        <section
          ref={sectionRef}
          className="relative flex flex-col w-full min-h-screen justify-center items-center overflow-hidden"
        >
          <div
            ref={textContainerRef}
            className="relative flex flex-col gap-4 text-center"
          >
            <h4 className="text-xl sm:text-2xl md:text-3xl">
              GOT A PROJECT IN MIND?
            </h4>
            <h3 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold">
              LET&apos;S CONNECT
            </h3>
            <div
              ref={containerRef}
              className="pointer-events-auto w-full h-20 flex justify-center items-center mt-5"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Bottom circle (static) */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border border-black flex items-center justify-center cursor-pointer">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></svg>
                {/* Animated top circle */}
                <div
                  ref={topCircleRef}
                  className="absolute top-0 left-0 w-full h-full rounded-full border border-black flex items-center justify-center cursor-pointer"
                >
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="black"
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
          <footer
            ref={footerRef}
            className="absolute bottom-0 w-full min-h-[10rem] flex flex-col gap-4 p-6"
          >
            <div className="w-full flex flex-col lg:flex-row justify-between items-center">
              <div>
                <h3 className="text-md lg:text-xl uppercase">
                  Feel Free to connect with me on social
                </h3>
              </div>
              <div className="flex flex-wrap uppercase gap-4 sm:gap-8 mt-4 sm:mt-0">
                <HoverText text="linkedIn" />
                <HoverText text="Github" />
                <HoverText text="Instagram" />
                <HoverText text="Resume" />
              </div>
            </div>
            <p className="uppercase text-xs font-extralight text-center lg:text-left">
              Made with Love by K3Z
            </p>
          </footer>
        </section>
      </div>
    </div>
  );
};

export default ContactMe;
