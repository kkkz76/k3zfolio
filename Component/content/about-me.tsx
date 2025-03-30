"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollText from "../text/scroll-text";

export default function AboutMe() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom bottom",
          end: "bottom top",
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      // Step 1: Slight scale of the section (title effect)
      timeline.to(titleRef.current, {
        scale: 1.2,
        ease: "power1.out",
        transformOrigin: "center center",
      });

      // Step 2: Paragraph fade + slide after scale is done
      timeline.fromTo(
        paragraphRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        },
        ">0.2" // Start after title finishes scaling
      );
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert(); // Kill everything on unmount
  }, []);

  return (
    <div className="container mx-auto p-6 ">
      <section
        ref={sectionRef}
        className="relative flex flex-col items-center justify-center text-center min-h-screen overflow-hidden"
      >
        {/* Title */}
        <h2
          ref={titleRef}
          className="text-2xl sm:text-3xl lg:text-7xl font-bold uppercase"
        >
          <ScrollText text="The Story of me." triggerRef={sectionRef} />
        </h2>

        {/* Paragraph */}
        <p
          ref={paragraphRef}
          className="mt-10 text-2xl xl:text-3xl 
             max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-4xl  "
        >
          A Burmese software developer passionate about developing
          creative,clean and user-focused digital experiences. Currently active
          as a freelance developer based in Singapore.
        </p>
      </section>
    </div>
  );
}
