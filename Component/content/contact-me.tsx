"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverText from "../text/hover-text";
import { useNavbar } from "../context/navbar-controller";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const info = {
  linkedin: "https://www.linkedin.com/in/khantkokozaw38/",
  github: "https://github.com/kkkz76",
  instragram: "https://www.instagram.com/khantko.kozaw.37/",
  resume:
    "https://drive.google.com/file/d/1nMLc3c_yO5nlreDmvwKfb9mfpA2g2TvX/view?usp=sharing",
};

const ContactMe = () => {
  // Refs for DOM elements
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const topCircleRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const { setIsDarkText } = useNavbar();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      onEnter: () => setIsDarkText(true),
      onLeaveBack: () => setIsDarkText(false),
    });

    return () => trigger.kill();
  }, []);

  useEffect(() => {
    if (
      sectionRef.current &&
      textContainerRef.current &&
      containerRef.current &&
      footerRef.current
    ) {
      const ctx = gsap.context(() => {
        // Create one timeline with shared ScrollTrigger
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
          },
        });

        // Text container animation
        tl.from(textContainerRef.current, {
          opacity: 0,
          y: 50,
          duration: 1.2,
          ease: "power3.out",
        });

        // Circle container animation (delayed relative to previous)
        tl.from(
          containerRef.current,
          {
            opacity: 0,
            scale: 0.5,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.6"
        ); // Overlap start by 0.9s for natural delay

        // Footer animation (delayed relative to previous)
        tl.from(
          footerRef.current,
          {
            opacity: 0,
            y: 50,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.6"
        );
      });

      return () => ctx.revert();
    }
  }, []);

  // Mouse move animation for the top circle
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!containerRef.current || !topCircleRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const maxOffset = 30;
    let offsetX = dx;
    let offsetY = dy;

    if (distance > maxOffset) {
      const factor = maxOffset / distance;
      offsetX = dx * factor;
      offsetY = dy * factor;
    }

    gsap.to(topCircleRef.current, {
      x: offsetX,
      y: offsetY,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  // Reset circle position on mouse leave
  const handleMouseLeave = () => {
    if (!topCircleRef.current) return;
    gsap.to(topCircleRef.current, {
      x: 0,
      y: 0,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  return (
    <div className="bg-primary text-black">
      <div className="container mx-auto p-6 gap-10">
        <section
          ref={sectionRef}
          className="relative flex flex-col w-full min-h-dvh justify-center items-center overflow-hidden"
        >
          <div
            ref={textContainerRef}
            className="relative flex flex-col gap-4 text-center"
          >
            <h4 className="text-xl sm:text-2xl md:text-3xl">
              GOT A PROJECT IN MIND?
            </h4>
            <h3 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold">
              LET&apos;S CONNECT
            </h3>
            <div
              onClick={() => {
                window.location.href = "mailto:khantkokozawwork@gmail.com";
              }}
              ref={containerRef}
              className="pointer-events-auto w-full h-20 flex justify-center items-center mt-5"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Bottom circle (static) */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border border-black flex items-center justify-center cursor-pointer">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></svg>
                {/* Animated top circle */}
                <div
                  ref={topCircleRef}
                  className="absolute top-0 left-0 w-full h-full rounded-full border border-black flex items-center justify-center cursor-pointer"
                >
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 19L19 5M5 5h14v14" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <footer
            ref={footerRef}
            className="absolute bottom-0 w-full min-h-[10rem] flex flex-col gap-4 p-6"
          >
            <div className="w-full flex flex-col lg:flex-row justify-between items-center">
              <div>
                <h3 className="text-xs md:text:sm lg:text-xl uppercase">
                  Feel Free to connect with me on social
                </h3>
              </div>
              <div className="flex flex-wrap uppercase gap-2 text-xs sm:gap-4 mt-4 ">
                <div onClick={() => window.open(info.linkedin, "_blank")}>
                  <HoverText text="linkedIn" />
                </div>
                <div onClick={() => window.open(info.github, "_blank")}>
                  <HoverText text="Github" />
                </div>
                <div onClick={() => window.open(info.instragram, "_blank")}>
                  <HoverText text="Instagram" />
                </div>
                <div onClick={() => window.open(info.resume, "_blank")}>
                  <HoverText text="Resume" />
                </div>
              </div>
            </div>
            <p className="uppercase text-xs font-extralight text-center lg:text-left">
              Made with Love by K3Z
            </p>
          </footer>
        </section>
      </div>
    </div>
  );
};

export default ContactMe;
