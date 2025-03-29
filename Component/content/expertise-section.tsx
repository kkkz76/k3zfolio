"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollText from "../text/scroll-text";
import SkillCard from "../card/skill-card";
import { Brain, Cpu, Gamepad2, Globe } from "lucide-react";
import { div } from "motion/react-client";
import clsx from "clsx";

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

const marginClasses = [
  "mt-[0px]",
  "mt-[60px]",
  "mt-[40px]",
  "-mt-[20px]", // note: negative margin uses a leading dash.
];

export default function ExpertiseSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const innerTextRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Use gsap.matchMedia() instead of ScrollTrigger.matchMedia({})
    const mm = gsap.matchMedia();

    // Desktop & Tablet: run animations only when viewport is at least 768px wide.
    mm.add("(min-width: 1024px)", () => {
      const cards = gsap.utils.toArray(".skill-card");
      const leftCards = cards.slice(0, 2);
      const rightCards = cards.slice(2, 4);
      const spans = gsap.utils.toArray(".scattered-text");
      const span1 = spans.slice(0, 1);
      const hidespan = spans.slice(1, 4);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2000",
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.from(cards, {
        x: -200,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.5,
      })
        .to(".expertise-title-container", {
          opacity: 0,
          duration: 6,
          ease: "power2.out",
        })
        .to(cards, {
          y: -100,
          marginTop: 0,
          duration: 6,
          ease: "power2.out",
        })
        .addLabel("split", "+=0")
        .to(
          ".inner-text",
          {
            opacity: 1,
            duration: 2,
            ease: "power2.out",
          },
          "split"
        )
        .to(
          leftCards,
          {
            x: -700,
            duration: 18,
            ease: "power2.out",
          },
          "split"
        )
        .to(
          rightCards,
          {
            x: 700,
            duration: 18,
            ease: "power2.out",
          },
          "split"
        )
        .to(cards, {
          opacity: 0,
          duration: 1.5,
          ease: "power2.out",
        })
        .to(hidespan, {
          opacity: 0,
          duration: 18,
          ease: "power2.out",
        })
        .to(span1, {
          scale: 20,
          opacity: 0,
          duration: 45,
          ease: "power2.out",
        });

      return () => {
        tl.kill();
      };
    });

    // Mobile fallback (optional: add mobile-specific animations here)
    mm.add("(max-width: 767px)", () => {
      // For mobile, you can add simple fade-in or keep static.
    });

    return () => {
      mm.kill();
    };
  }, []);

  return (
    <div className="container mx-auto p-6 gap-10">
      <section
        ref={sectionRef}
        className="relative w-full min-h-dvh flex flex-col items-center justify-center gap-6  p-overflow-hidden"
      >
        {/* Fixed Title and Subtitle */}
        <div className="w-full flex flex-col gap-4 expertise-title-container">
          <h2 className="text-lg md:text-xl lg:text-7xl font-bold uppercase text-left">
            <ScrollText text="EXPERTISE." triggerRef={sectionRef} />
          </h2>
          {/* <p className="max-w-2xl text-2xl">
            Bringing ideas to life with creativity and innovation.
          </p> */}
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 w-full lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              className={clsx(
                "skill-card relative mt-0",
                `lg:${marginClasses[index]}`
              )}
            >
              <SkillCard
                title={service.title}
                description={service.description}
                icon={service.icon}
              />
            </div>
          ))}
        </div>
        <div
          ref={innerTextRef}
          className="absolute inner-text font-bold text-7xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 -z-10 w-full"
        >
          <h2 className="text-lg md:text-3xl lg:text-5xl font-bold uppercase text-center relative">
            <span className="scattered-text inline-block">Explore</span>{" "}
            <span className="scattered-text inline-block">my</span>{" "}
            <span className="scattered-text inline-block"> selected</span>{" "}
            <span className="scattered-text inline-block">works</span>{" "}
          </h2>
        </div>
      </section>
    </div>
  );
}
