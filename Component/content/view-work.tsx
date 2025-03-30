"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import ScrollText from "../text/scroll-text";
import HoverText from "../text/hover-text";

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
    }).to(".fade-bar", {
      scaleX: 0, // Shrinks width to 0 (center squeeze effect)

      duration: 0.5,
      ease: "power1.out",
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
        <div className="view-more-text">
          <h2 className="text-lg md:text-2xl lg:text-4xl font-bold uppercase ">
            <ScrollText
              text={"Continue exploring my work"}
              triggerRef={sectionRef}
            />
          </h2>
          <button className=" mt-8 px-4 py-2 border-2 border-primary rounded-lg transition-all duration-300 ease-in-out hover:scale-105 uppercase">
            <HoverText className="text-sm" text={"View All Projects"} />
          </button>
        </div>

        <div className="absolute top-0 w-full h-full -z-20 flex justify-center items-center">
          <h2 className="text-lg md:text-2xl lg:text-4xl font-bold uppercase">
            More journeys to go
          </h2>
        </div>
      </section>
    </div>
  );
};

export default ViewWorks;
