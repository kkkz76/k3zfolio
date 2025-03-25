"use client";
import { useRef } from "react";
import ExperienceCard from "../card/experience-card";
import ScrollText from "../text/scroll-text";

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
  return (
    <div className="container mx-auto p-6 gap-10">
      <section
        ref={sectionRef}
        className=" flex flex-col items-center justify-center w-full overflow-hidden gap-10 min-h-dvh bg-[var(--background)]"
      >
        <div className="w-full flex flex-col gap-4 ">
          <h2 className="text-lg md:text-xl lg:text-6xl font-bold italic tracking-wider  ">
            <ScrollText
              text={"I have been working as a ..."}
              triggerRef={sectionRef}
            />
          </h2>
        </div>

        <div className="relative flex flex-col items-center w-full">
          {events.map((event, index) => (
            <ExperienceCard event={event} key={index} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExperienceSection;
