"use client";

import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextPopUp from "../text/text-popup";
import Navbar from "./navbar";
import { useLenis } from "lenis/react";
import Image from "next/image";
import WholeTextPopup from "../text/whole-text-popup";

gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
  const [onLandingTextComplete, setLandingTextComplete] = useState(false);
  const lenis = useLenis();
  const [showNavbar, setShowNavbar] = useState(false);
  const [onLandingDivComplete, setLandingDivComplete] = useState(false);

  // Pause scrolling immediately on mount using Lenis's API
  useEffect(() => {
    if (lenis) {
      lenis.stop();
    }
  }, [lenis]);

  // Animate landing container and fade in text; resume scrolling.
  useEffect(() => {
    if (onLandingTextComplete && lenis) {
      gsap.to(".lading-text-container", {
        yPercent: -100,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          lenis.start();
          // Fade in only the opacity without touching y
          setLandingDivComplete(true);

          gsap.to(".landing-heading-text", {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => {
              setShowNavbar(true);
            },
          });
        },
      });

      gsap.fromTo(
        ".landing-img",
        {
          opacity: 0.1,
          scale: 1,
        },
        {
          opacity: 1,
          scale: 1.1,
          duration: 1,
          ease: "power1.out",
        }
      );
    }
  }, [onLandingTextComplete, lenis]);

  // Create a parallax effect for the text on scroll using GSAP ScrollTrigger.
  useEffect(() => {
    if (!lenis) return;
    // Update ScrollTrigger on each Lenis scroll event.
    lenis.on("scroll", ScrollTrigger.update);

    // Cleanup: remove the listener and kill all ScrollTriggers when the component unmounts
    return () => {
      if (lenis) {
        lenis.off("scroll", ScrollTrigger.update);
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [lenis]);

  return (
    <>
      <Navbar showNavbar={showNavbar} />
      <section className="w-full h-screen relative bg-primary text-black">
        {/* Black overlay / initial text container */}
        <div className="w-full h-full lading-text-container z-10 relative bg-black text-primary">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {/* 'k3z' popup text */}
            <TextPopUp
              className="text-7xl uppercase"
              text="k3z"
              onAnimationComplete={() => setLandingTextComplete(true)}
            />
          </div>
        </div>

        {/* Main text container */}
        <div className="absolute inset-0 flex flex-col justify-center items-center font-nohemi leading-none gap-4">
          {/* Wrap in another div to shift everything up at once */}
          <div className="transform translate-y-4 flex flex-col items-center gap-4">
            <WholeTextPopup
              text="Khant"
              className="text-[140px] font-semibold uppercase tracking-wider landing-heading-text opacity-0"
              start={onLandingDivComplete}
            />

            <h1 className="text-2xl relative -top-2 font-semibold uppercase tracking-widest landing-heading-text opacity-0">
              Software Developer
            </h1>

            <WholeTextPopup
              text="Ko Ko Zaw"
              className="text-[140px] font-semibold uppercase tracking-wider landing-heading-text opacity-0"
              start={onLandingDivComplete}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;
