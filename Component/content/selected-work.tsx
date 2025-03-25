"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Dynamic panel data
const panelsData = [
  {
    title: "Nexus Nova",
    description: "Digital NFC Card Website",
    year: "2024",
  },
  {
    title: "Echo",
    description: "Voice-Activated AI Chatbot Application",
    year: "2024",
  },
  { title: "Super Mario", description: "E-commerce Car Website", year: "2024" },
  { title: "After the Fall", description: "3D Survival Game", year: "2024" },
];

// #17191b96 background color

export default function SelectedWorks() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Number of panels that animate (all except the last one)
    const animatedPanelsCount = panelsData.length - 1; // 3 panels

    // Define durations (in "viewport height" units)
    const transitionDuration = 0.5; // portion for the slide animation
    const gapDuration = 0.5; // portion for the gap (delay)
    const totalDuration =
      animatedPanelsCount * (transitionDuration + gapDuration);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        // Total scroll distance needed for animated panels
        end: () => `+=${window.innerHeight * totalDuration}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // For each animated panel, add a tween for the slide and then a gap tween.
    panelsData.slice(0, animatedPanelsCount).forEach((_, index) => {
      // Tween to slide the panel out
      tl.to(
        `.panel-${index}`,
        {
          xPercent: 100,
          ease: "none",
          duration: transitionDuration,
        },
        index * (transitionDuration + gapDuration)
      );

      // Dummy tween for the gap/delay (no properties change)
      tl.to(
        {},
        { duration: gapDuration },
        index * (transitionDuration + gapDuration) + transitionDuration
      );
    });

    // Refresh ScrollTrigger on window resize/zoom changes
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
      {/* Container height now covers all panels */}
      <section
        ref={containerRef}
        className="relative"
        style={{ height: `${panelsData.length * 100}vh` }}
      >
        {/* Panels container */}
        <div className="absolute top-0 left-0  h-dvh w-full">
          {panelsData.map((panel, index) => (
            <div
              key={index}
              className={`panel panel-${index} absolute top-0 left-0 w-full h-full flex items-center justify-center p-6`}
              style={{
                // Stack panels so the first is on top
                zIndex: panelsData.length - index,

                transform: "translateX(0%)",
              }}
            >
              <div className="relative w-full h-full rounded-4xl overflow-hidden">
                <Image
                  src="/image/image_1.png"
                  alt="Project Image"
                  fill
                  className="object-cover filter grayscale hover:grayscale-0 transition-all ease-in-out duration-500"
                />
              </div>

              <div
                className={` w-full flex flex-col gap-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none `}
              >
                <h4 className="text-lg font-semibold">{panel.description}</h4>
                <h3 className="text-5xl font-extrabold uppercase ">
                  {panel.title}
                </h3>
                <p className="text-md font-extralight">{panel.year}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
