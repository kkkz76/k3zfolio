"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import ScrollText from "../text/scroll-text";
import { div } from "motion/react-client";

import HoverText from "../text/hover-text";

const images = [
  "/image/image_1.png",
  "/image/image_1.png",
  "/image/image_1.png",
  "/image/image_1.png",
  "/image/image_1.png",
  "/image/image_1.png",
];

const floatingPositions = [
  { top: "5%", left: "30%" },
  { top: "80%", left: "10%" },
  { top: "15%", left: "65%" },
  { top: "80%", left: "50%" },
  { top: "40%", left: "0%" },
  { top: "50%", left: "80%" },
];

export default function AboutMe() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null); // For parallax background

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      ".about-text",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom center",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    // 5. Creative Transition: Zoom In at the End of the Section
    // This timeline pins the section and scales it up as you scroll further.
    gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom bottom",
          end: "bottom top",
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      })
      .to(sectionRef.current, {
        scale: 1.3,
        ease: "power1.out",
        transformOrigin: "center center", // Keep the zoom centered
      });
  }, []);

  return (
    <div className="container mx-auto p-6 gap-10 ">
      <section
        ref={sectionRef}
        className=" relative flex flex-col items-center justify-center max-w-dvw h-screen p-10 text-center overflow-hidden"
      >
        <h2 className="about-title text-lg md:text-xl lg:text-7xl font-bold uppercase">
          <ScrollText text={"The Story of me."} triggerRef={sectionRef} />
        </h2>

        {/* Paragraph */}
        <p className="about-text max-w-xl text-2xl mt-4">
          A burmese software developer who enjoys building clean, creative, and
          user-focused digital experiences.
        </p>

        {/* Explore Button */}
        {/* <HoverText className="about-text" text={"learn more"} /> */}
      </section>
    </div>
  );
}
