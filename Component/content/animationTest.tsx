"use client"; // Needed for Next.js app router

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollAnimation = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const element = sectionRef.current;

    gsap.fromTo(
      element,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "top 50%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center bg-gray-900 text-white text-3xl"
    >
      Scroll Triggered Animation
    </section>
  );
};

export default ScrollAnimation;
