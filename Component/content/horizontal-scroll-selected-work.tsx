"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollText from "../text/scroll-text";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
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

export default function HorizontalScrollSelectedWorks() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const horizontalRef = useRef<HTMLDivElement | null>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    let tween: gsap.core.Tween | undefined;

    const slideWidth =
      horizontalRef.current?.children[0]?.getBoundingClientRect().width ||
      window.innerWidth;

    const updateIndex = (self: globalThis.ScrollTrigger) => {
      if (!horizontalRef.current) return;

      const x = Math.abs(Number(gsap.getProperty(horizontalRef.current, "x")));
      const maxScroll = (projects.length - 1) * slideWidth;
      const scrollProgress = x / maxScroll;
      let newIndex = Math.round(scrollProgress * (projects.length - 1));

      // Ensure first section "Nexus Nova" is always shown when scrolling back to start
      if (self.progress <= 0) {
        newIndex = 0;
        setActiveIndex(newIndex);
      }

      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    };

    const TimeLine1 = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "+=1500",
        scrub: true,
      },
    });

    TimeLine1.from(".featured-title-container", {
      x: "-100vw",
      duration: 3,
      ease: "power2.out",
    })
      .to(".featured-title-container", {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      })
      .to(".featured-title-container", {
        height: 0,
        duration: 2,
        ease: "power2.out",
      });

    mm.add("(max-width: 768px)", () => {
      tween = gsap.to(horizontalRef.current, {
        x: -((projects.length - 1) * slideWidth),
        ease: "power1.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${(projects.length - 1) * slideWidth}`,
          scrub: 3,
          pin: true,
          anticipatePin: 1,
          onUpdate: updateIndex,
          onScrubComplete: (self) => updateIndex(self),
        },
      });
    });

    mm.add("(min-width: 769px)", () => {
      tween = gsap.to(horizontalRef.current, {
        x: -((projects.length - 1) * slideWidth),
        ease: "power1.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${(projects.length - 1) * slideWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: updateIndex,
          onScrubComplete: (self) => updateIndex(self),
        },
      });
    });

    return () => {
      tween?.kill();
      TimeLine1.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      mm.revert();
    };
  }, []);

  // Animate floating text box whenever the active index changes
  useEffect(() => {
    gsap.fromTo(
      ".text-box",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
    );
  }, [activeIndex]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-dvh flex flex-col justify-center  overflow-hidden "
    >
      {/* Fixed Title and Subtitle */}
      <div className="flex justify-end p-10 featured-title-container max-h-fit">
        <div className="flex flex-col gap-4 text-right">
          <h2 className="text-lg md:text-xl lg:text-7xl font-bold uppercase">
            <ScrollText text={"Featured Works"} triggerRef={sectionRef} />
          </h2>
          <p className="text-xl">
            An exciting journey of coding, creating, and always pushing what's
            possible.
          </p>
        </div>
      </div>

      {/* Horizontal Scroll Content */}
      <div className="relative flex h-[600px] overflow-hidden horizontal-scroll-container">
        <div ref={horizontalRef} className="flex flex-nowrap w-full">
          {projects.map((_, index) => (
            <div
              key={index}
              ref={(el) => {
                projectRefs.current[index] = el;
              }}
              className=" w-screen flex-shrink-0 flex flex-col justify-center items-center  "
            >
              <div className="relative w-full h-full">
                <Image
                  src="/image/image_1.png"
                  alt="Project Image"
                  fill
                  className="image-object opacity-60 object-cover transition-all  duration-800 ease-in-out "
                />
              </div>
            </div>
          ))}
        </div>

        {/* Floating Text Box */}
        {projects[activeIndex] && (
          <div className="w-screen opacity-0 text-box flex flex-col gap-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            <h4 className="text-lg font-semibold">
              {projects[activeIndex].description}
            </h4>
            <h3 className="text-5xl font-extrabold uppercase ">
              {projects[activeIndex].title}
            </h3>
            <p className="text-md font-extralight">
              {projects[activeIndex].year}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
