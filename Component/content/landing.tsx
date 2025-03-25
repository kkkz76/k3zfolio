"use client";

import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextPopUp from "../text/text-popup";
import Navbar from "./navbar";
import { useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
  const [onLandingTextComplete, setLandingTextComplete] = useState(false);
  const lenis = useLenis();
  const [showNavbar, setShowNavbar] = useState(false);

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
          gsap.to(".landing-heading-text", {
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            onComplete: () => {
              setShowNavbar(true);
            },
          });
        },
      });
    }
  }, [onLandingTextComplete, lenis]);

  // Create a parallax effect for the text on scroll using GSAP ScrollTrigger.
  useEffect(() => {
    if (!lenis) return;

    // Update ScrollTrigger on each Lenis scroll event.
    lenis.on("scroll", ScrollTrigger.update);

    // Select all elements with the class "landing-heading-text" and add a parallax animation.
    const headingElements = gsap.utils.toArray(
      ".landing-heading-text"
    ) as HTMLElement[];
    headingElements.forEach((elem) => {
      gsap.to(elem, {
        y: -100, // Adjust this value to control the parallax offset
        ease: "none",
        scrollTrigger: {
          trigger: elem,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

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
      <section className="w-full mx-auto h-dvh relative">
        <div className="w-full h-full lading-text-container z-10 relative bg-black">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <TextPopUp
              className="text-6xl font-light tracking-widest uppercase"
              text="mario"
              onAnimationComplete={() => setLandingTextComplete(true)}
            />
          </div>
        </div>
        <div
          className="absolute top-0 w-full h-full flex flex-col justify-center items-center gap-6"
          style={{
            backgroundImage: 'url("/image/landing.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1 className="text-3xl font-extralight italic landing-heading-text opacity-0">
            I'm a
          </h1>
          <h1 className="text-5xl font-extrabold uppercase tracking-wide landing-heading-text opacity-0">
            Game and Software Developer
          </h1>
        </div>
      </section>
    </>
  );
};

export default Landing;
