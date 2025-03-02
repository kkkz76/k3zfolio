"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollText from "../text/scroll-text";

const projects = [
  {
    title: "nexus nova",
    description: "Digital NFC Card Website",
    year: "2024",
  },
  {
    title: "echo",
    description: "Voice-activated AI chatbot",
    year: "2024",
  },
  {
    title: "super mario",
    description: "E-commerce Car Website",
    year: "2024",
  },
  {
    title: "After the Fall",
    description: "3D Survival Game",
    year: "2024",
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const horizontalRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Define an offset value (in pixels) if needed (adjust as necessary)
  const offset = 400; // Change or remove this if not needed

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tween = gsap.to(horizontalRef.current, {
      x: () => -(horizontalRef.current!.scrollWidth - window.innerWidth),
      ease: "power1.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => horizontalRef.current!.scrollWidth - window.innerWidth,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const scrollX = -gsap.getProperty(horizontalRef.current, "x");
          const sectionWidth = window.innerWidth;
          const newIndex = Math.min(
            Math.floor((scrollX + sectionWidth / 2) / sectionWidth),
            projects.length - 1
          );
          setActiveIndex((prev) => (prev !== newIndex ? newIndex : prev));
        },
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  // Animate the floating text box whenever the active index changes.
  useEffect(() => {
    gsap.fromTo(
      ".text-box",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );
  }, [activeIndex]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex flex-col justify-center overflow-hidden p-6 gap-10"
    >
      {/* Fixed Title and Subtitle */}
      <div className="flex justify-end">
        <div className="flex flex-col gap-4 text-right">
          <h2 className="text-lg md:text-xl lg:text-7xl font-bold uppercase">
            <ScrollText text={"The Journey"} triggerRef={sectionRef} />
          </h2>
          <p className="text-xl">
            An exciting journey of coding, creating, and always pushing what's
            possible.
          </p>
        </div>
      </div>

      {/* Horizontal Scroll Content */}
      <div className="relative flex h-screen">
        {/* Horizontally scrolling container */}
        <div ref={horizontalRef} className="flex">
          {projects.map((_, index) => (
            <div
              key={index}
              className="w-screen h-full flex-shrink-0 flex flex-col justify-center items-center p-10 bg-cover bg-center bg-no-repeat transition duration-500 ease-in-out"
              style={{
                backgroundImage: "url('/image/image_1.png')",
                filter: "grayscale(100%)",
                opacity: index === activeIndex ? 0.8 : 0.4,
              }}
            />
          ))}
        </div>
        {/* Floating Text Box */}
        <div className="text-box flex flex-col gap-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h3 className="text-7xl font-extrabold uppercase">
            {projects[activeIndex].title}
          </h3>
          <h4 className="text-2xl font-semibold ">
            {projects[activeIndex].description}
          </h4>
          <p className="text-xl font-bold ">{projects[activeIndex].year}</p>
        </div>
      </div>
      <button className="about-text mt-6 text-2xl px-6 py-3 border-2 border-primary rounded-full hover:bg-primary transition">
        View All My Works
      </button>
    </section>
  );
}
