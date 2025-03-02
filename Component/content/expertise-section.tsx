"use client";

import { Brain, Cpu, Gamepad2, Globe } from "lucide-react";
import SkillCard from "../card/skill-card";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollText from "../text/scroll-text";

const services = [
  {
    title: "Website",
    description:
      "Turning caffeine and code into pixel-perfect websites. No, I don’t use Wix.",
    icon: <Globe className="size-12 " />,
  },
  {
    title: "Game",
    description:
      "Designing games that make you forget about sleep... and your responsibilities.",
    icon: <Gamepad2 className="size-12 " />,
  },
  {
    title: "AI",
    description:
      "Developing AI that can hold a conversation—just not about your life choices.",
    icon: <Brain className="size-12 " />,
  },
  {
    title: "Software",
    description:
      "Writing code that (mostly) doesn’t break. Debugging is just bonus content.",
    icon: <Cpu className="size-12 " />,
  },
];

const cardPos = [0, 60, 40, -20];
gsap.registerPlugin(ScrollTrigger);

export default function ExpertiseSection() {
  const sectionRef = useRef<HTMLElement | null>(null); // 👈 Ensure this is correct

  useEffect(() => {
    const element = sectionRef.current;
    gsap.fromTo(
      element,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top center",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section
      className="relative flex flex-col items-center justify-center w-full gap-4 p-6 min-h-screen"
      ref={sectionRef}
    >
      <div className="w-full  flex flex-col gap-4">
        <h2 className="text-lg md:text-xl lg:text-7xl font-bold text-left uppercase  ">
          <ScrollText text="EXPERTISE" triggerRef={sectionRef} />
        </h2>
        <p className="max-w-xl text-xl">
          Bringing ideas to life with smart solutions, seamless experiences, and
          a touch of creativity—learning, building, and growing with innovation.
        </p>
      </div>

      <div className="grid grid-cols-1 w-full md:grid-cols-2 xl:grid-cols-4">
        {services.map((service, index) => {
          return (
            <div
              key={index}
              className="relative"
              style={{ marginTop: `${cardPos[index]}px` }}
            >
              <SkillCard
                title={service.title}
                description={service.description}
                icon={service.icon}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
