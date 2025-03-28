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
  const lenis = useLenis();
  const [showNavbar, setShowNavbar] = useState(false);
  const [onLandingDivComplete, setLandingDivComplete] = useState(false);
  const [onFirstTextAnimationComplete, setFirstTextAnimationComplete] =
    useState(false);
  const [onSecondTextAnimationComplete, setSecondTextAnimationComplete] =
    useState(false);

  // Pause scrolling on mount
  useEffect(() => {
    if (lenis) {
      lenis.stop();
    }
  }, [lenis]);

  // Animate landing container and fade in text; then resume scrolling
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

  // Setup ScrollTrigger updates on Lenis scroll
  useEffect(() => {
    if (!lenis) return;
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      if (lenis) {
        lenis.off("scroll", ScrollTrigger.update);
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [lenis]);

  // Fade in the "Software Developer" text after second animation
  useEffect(() => {
    if (onSecondTextAnimationComplete) {
      gsap.to(".career-title-text", {
        opacity: 1,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          setShowNavbar(true);
        },
      });
    }
  }, [onSecondTextAnimationComplete]);

  return (
    <>
      <Navbar showNavbar={showNavbar} />
      <section className="w-full h-screen relative overflow-hidden">
        {/* Horizontal lines background */}
        <HorizontalLines
          numberOfLines={6}
          lineColor="rgba(240, 240, 240, 0.2)" // 20% opacity
          lineThickness="0.5px" // half-pixel thickness
          start={onLandingDivComplete}
        />

        {/* Black overlay / initial text container */}
        <div className="w-full h-full lading-text-container z-10 relative bg-white text-black">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <TextPopUp
              className="text-7xl uppercase"
              text="k3z"
              onAnimationComplete={() => setLandingTextComplete(true)}
            />
          </div>
        </div>

        {/* Main text container */}
        <div className="absolute inset-0 flex flex-col justify-center items-center font-nohemi leading-none gap-4">
          <div className="transform translate-y-4 flex flex-col items-center gap-4">
            <WholeTextPopup
              text="Khant"
              className="text-[220px] uppercase tracking-wide"
              start={onLandingDivComplete}
              onAnimationComplete={() => setFirstTextAnimationComplete(true)}
            />
            <div className="flex career-title-text text-2xl relative -top-5 z-20 uppercase tracking-widest text-gray-300 opacity-0  gap-4">
              <HoverText text={"Software"} />
              <HoverText text={"Developer"} />
            </div>

            <WholeTextPopup
              text="Ko Ko Zaw"
              className="text-[220px] uppercase tracking-wide"
              start={onFirstTextAnimationComplete}
              onAnimationComplete={() => setSecondTextAnimationComplete(true)}
            />
          </div>
        </div>
        <div className="career-title-text absolute opacity-0  bottom-4 w-full text-center  text-lg tracking-wider">
          <p> Coding Since 2017</p>
        </div>
      </section>
    </>
  );
};

export default Landing;
