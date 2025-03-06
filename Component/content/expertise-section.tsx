"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollText from "../text/scroll-text";
import SkillCard from "../card/skill-card";
import { Brain, Cpu, Gamepad2, Globe } from "lucide-react";

const services = [
  {
    title: "Website",
    description:
      "Turning caffeine and code into pixel-perfect websites. No, I don’t use Wix.",
    icon: <Globe className="size-12" />,
  },
  {
    title: "Game",
    description:
      "Designing games that make you forget about sleep... and your responsibilities.",
    icon: <Gamepad2 className="size-12" />,
  },
  {
    title: "AI",
    description:
      "Developing AI that can hold a conversation—just not about your life choices.",
    icon: <Brain className="size-12" />,
  },
  {
    title: "Software",
    description:
      "Writing code that (mostly) doesn’t break. Debugging is just bonus content.",
    icon: <Cpu className="size-12" />,
  },
];

const cardPos = [0, 60, 40, -20];

export default function ExpertiseSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Select all cards using the "skill-card" class.
    const cards = gsap.utils.toArray(".skill-card");

    // Create a timeline that pins the section while cards animate in from the left.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=1000", // Adjust this value to control how long the pin lasts.
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.from(cards, {
      x: -200,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      stagger: 0.3,
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-dvh flex flex-col items-center justify-center gap-6 p-overflow-hidden "
    >
      {/* Fixed Title and Subtitle */}
      <div className="w-full flex flex-col gap-4">
        <h2 className="text-lg md:text-xl lg:text-7xl font-bold uppercase text-left">
          <ScrollText text="EXPERTISE" triggerRef={sectionRef} />
        </h2>
        <p className="max-w-2xl text-xl">
          Bringing ideas to life with smart solutions and growing with
          innovation.
        </p>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 w-full md:grid-cols-2 xl:grid-cols-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="skill-card relative"
            style={{ marginTop: `${cardPos[index]}px` }}
          >
            <SkillCard
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
