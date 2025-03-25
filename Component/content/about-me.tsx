"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import ScrollText from "../text/scroll-text";

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

    // 1. Parallax Background Movement (kept scrubbed for smooth effect)
    // gsap.fromTo(
    //   bgRef.current,
    //   { y: 0 },
    //   {
    //     y: -200,
    //     scrollTrigger: {
    //       trigger: sectionRef.current, // The scrolling container
    //       start: "top top", // When the top of the section hits the top of the viewport
    //       end: "bottom top", // Until the bottom of the section hits the top
    //       scrub: true,
    //     },
    //   }
    // );

    // 2. Animate Floating Images (fade + slight vertical rise)
    // gsap.fromTo(
    //   ".floating-image",
    //   { opacity: 0, y: 50, rotate: -20 },
    //   {
    //     opacity: 0.5,
    //     y: 0,
    //     rotate: 0,
    //     duration: 1.5,
    //     ease: "power3.out",
    //     stagger: 0.3,
    //     scrollTrigger: {
    //       trigger: sectionRef.current,
    //       start: "top 40%",
    //       end: "top 60%",
    //       scrub: true,
    //       toggleActions: "play none none none",
    //     },
    //   }
    // );

    // 3. Animate Main Title

    // 4. Animate Paragraph
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
        scale: 1.5,
        ease: "power1.out",
        transformOrigin: "center center", // Keep the zoom centered
      });
  }, []);

  return (
    <div className="container mx-auto p-6 gap-10">
      <section
        ref={sectionRef}
        className=" relative flex flex-col items-center justify-center max-w-dvw h-screen p-10 text-center overflow-hidden"
      >
        {/* Parallax Background Container */}
        {/* <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: -1 }} // Ensures it's behind the content
      > */}
        {/* Floating Images inside the parallax container */}
        {/* {images.map((src, index) => {
          const pos = floatingPositions[index] || {
            top: "50%",
            left: "50%",
            rotate: 0,
          };
          return (
            <Image
              key={index}
              src={src}
              alt="Project"
              width={300}
              height={200}
              className="floating-image absolute shadow-lg"
              style={{
                top: pos.top,
                left: pos.left,
                filter: "grayscale(100%)",
              }}
            />
          );
        })} */}
        {/* </div> */}

        {/* Title */}
        <h2 className="about-title text-lg md:text-xl lg:text-7xl font-bold uppercase">
          <ScrollText text={"Hi, I'm Mario"} triggerRef={sectionRef} />
        </h2>

        {/* Paragraph */}
        <p className="about-text max-w-2xl text-lg mt-4">
          A software engineer who passionate about design, innovation, and
          building experiences that inspire. Exploring the intersection of
          creativity and technology.
        </p>

        {/* Explore Button */}
        <button className="about-text mt-6 px-6 py-3 border-2 border-primary rounded-full hover:bg-primary transition">
          View Projects
        </button>
      </section>
    </div>
  );
}
