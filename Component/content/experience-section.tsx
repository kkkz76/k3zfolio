"use client";

import { useEffect, useRef } from "react";
import ExperienceCard from "../card/experience-card";
import ScrollText from "../text/scroll-text";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const events = [
  {
    date: "2024",
    title: "Fullstack Web Developer",
    company: "Nexus Nova",
  },
  {
    date: "2024",
    title: "AI & Backend Engineer",
    company: "AskVox AI",
  },
  {
    date: "2024",
    title: "Project Manager & Web Developer",
    company: "E-commerce Car Website",
  },
  {
    date: "2024",
    title: "Unity Game Developer",
    company: "After The Fall",
  },
  {
    date: "2021",
    title: "Fullstack Developer",
    company: "EPSA",
  },
];

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".experience-card-container");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "top top",
          scrub: 1.5,
        },
      });

      tl.from(cards, {
        x: -200,
        opacity: 0,
        duration: 2,
        ease: "power3.inOut",
        stagger: 0.6,
      });

      // Optional: refresh to fix layout shifts
      ScrollTrigger.refresh();
    }, sectionRef); // ✅ scoped to this component

    return () => ctx.revert(); // ✅ cleanup on unmount
  }, []);

  return (
    <div className="container mx-auto p-6 gap-10">
      <section
        ref={sectionRef}
        className="flex flex-col items-center justify-center w-full overflow-hidden gap-10 min-h-dvh"
      >
        <div className="w-full flex flex-col gap-4">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold uppercase text-left">
            <ScrollText text="EXPERIENCE." triggerRef={sectionRef} />
          </h2>
        </div>

        <div className="relative flex flex-col items-center w-full">
          {events.map((event, index) => (
            <div className="experience-card-container w-full" key={index}>
              <ExperienceCard event={event} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExperienceSection;
