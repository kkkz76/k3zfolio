"use client";

import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextPopUp from "../text/text-popup";
import Navbar from "./navbar";
import { useLenis } from "lenis/react";
import WholeTextPopup from "../text/whole-text-popup";
import HorizontalLines from "../line/horizontal-line";
import HoverText from "../text/hover-text";

gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
  const [onLandingTextComplete, setLandingTextComplete] = useState(false);
  const [onLandingDivComplete, setLandingDivComplete] = useState(false);
  const [onFirstTextAnimationComplete, setFirstTextAnimationComplete] =
    useState(false);
  const [onSecondTextAnimationComplete, setSecondTextAnimationComplete] =
    useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const lenis = useLenis();

  // Disable scrolling until intro animation is complete
  useEffect(() => {
    lenis?.stop();
  }, [lenis]);

  // Animate the initial overlay exit
  useEffect(() => {
    if (onLandingTextComplete && lenis) {
      gsap.to(".lading-text-container", {
        yPercent: -100,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          lenis.start();
          setLandingDivComplete(true);
        },
      });
    }
  }, [onLandingTextComplete, lenis]);

  // Sync ScrollTrigger with Lenis
  useEffect(() => {
    if (!lenis) return;
    const update = () => ScrollTrigger.update();
    lenis.on("scroll", update);

    return () => {
      lenis.off("scroll", update);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [lenis]);

  // Fade in career title after second animation
  useEffect(() => {
    if (onSecondTextAnimationComplete) {
      gsap.to(".career-title-text", {
        opacity: 1,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => setShowNavbar(true),
      });
    }
  }, [onSecondTextAnimationComplete]);

  return (
    <>
      <Navbar showNavbar={showNavbar} />
      <section className="w-full h-screen relative overflow-hidden">
        {/* Horizontal line background */}
        <HorizontalLines
          numberOfLines={6}
          lineColor="rgba(240, 240, 240, 0.2)"
          lineThickness="0.5px"
          start={onLandingDivComplete}
        />

        {/* Intro black/white screen */}
        <div className="w-full h-full lading-text-container z-10 relative bg-white text-black">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <TextPopUp
              className="text-4xl sm:text-6xl md:text-7xl uppercase"
              text="k3z"
              onAnimationComplete={() => setLandingTextComplete(true)}
            />
          </div>
        </div>

        {/* Animated name & role */}
        <div className="absolute inset-0 flex flex-col justify-center items-center font-nohemi leading-none gap-4">
          <div className="transform translate-y-4 flex flex-col items-center gap-4 text-center">
            {/* First Name */}
            <WholeTextPopup
              text="Khant"
              className="text-[42px] sm:text-[80px] md:text-[100px] lg:text-[140px] xl:text-[180px] uppercase tracking-wide max-w-full whitespace-nowrap leading-tight"
              start={onLandingDivComplete}
              onAnimationComplete={() => setFirstTextAnimationComplete(true)}
            />

            {/* Career Title */}
            <div className="career-title-text flex flex-wrap justify-center text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl relative md:-top-2 lg:-top-4 z-20 uppercase tracking-widest text-gray-300 opacity-0 gap-2 sm:gap-4">
              <HoverText text="Software" />
              <HoverText text="Developer" />
            </div>

            {/* Last Name */}
            <WholeTextPopup
              text="Ko Ko Zaw"
              className="text-[42px] sm:text-[80px] md:text-[100px] lg:text-[140px] xl:text-[180px] uppercase tracking-wide max-w-full text-center leading-tight"
              start={onFirstTextAnimationComplete}
              onAnimationComplete={() => setSecondTextAnimationComplete(true)}
            />
          </div>
        </div>

        {/* Bottom tag line */}
        <div className="career-title-text absolute opacity-0 bottom-4 w-full text-center text-sm sm:text-base md:text-lg tracking-wider">
          <p>Coding Since 2017</p>
        </div>
      </section>
    </>
  );
};

export default Landing;
