"use client";
import { useEffect, useRef } from "react";
import ScrollText from "../text/scroll-text";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ExperienceSection from "./experience-section";
import { div } from "motion/react-client";

const ViewWorks = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const element = sectionRef.current;

    const TimeLine1 = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top top",
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    TimeLine1.to(".view-more-text", {
      opacity: 0, // Shrinks width to 0 (center squeeze effect)
      duration: 1,
      ease: "power2.out",
    })
      .to(".fade-bar", {
        scaleX: 0, // Shrinks width to 0 (center squeeze effect)

        duration: 0.5,
        ease: "power1.out",
      })
      .set(".experience-section-container", {
        zIndex: 10,
      });
  }, []);
  return (
    <div className="container mx-auto p-6 gap-10">
      <section
        className="relative flex flex-col items-center justify-center w-full min-h-dvh p-10 text-center overflow-hidden"
        ref={sectionRef}
      >
        <div className="absolute top-0 left-0 w-full h-full -z-10 grid grid-cols-2">
          <div className="grid-cols-1 fade-bar bg-[var(--background)] "></div>
          <div className="grid-cols-1 fade-bar bg-[var(--background)] "></div>
        </div>
        <h2 className="text-4xl font-bold uppercase view-more-text">
          <ScrollText
            text={"These are just few of my works."}
            triggerRef={sectionRef}
          />
        </h2>
        <button className="about-text view-more-text mt-6 px-6 py-3 border-2 border-primary rounded-full hover:bg-primary transition uppercase">
          View More Projects
        </button>
        <div className="absolute top-0 w-full h-full -z-20 experience-section-container flex justify-center items-center">
          <h2 className="text-6xl font-bold uppercase">More journeys to go</h2>
        </div>
      </section>
    </div>
  );
};

export default ViewWorks;
