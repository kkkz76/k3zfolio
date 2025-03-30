"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const panelsData = [
  {
    title: "Nexus Nova",
    description: "NFC Card Website",
    year: "2024",
    image: "/image/landing.jpg",
    smallImage: "/image/image_1.png",
  },
  {
    title: "Echo",
    description: "AI Desktop App",
    year: "2024",
    image: "/image/image_1.png",
    smallImage: "/image/landing.jpg",
  },
  {
    title: "Super Mario",
    description: "E-commerce Car Website",
    year: "2024",
    image: "/image/landing.jpg",
    smallImage: "/image/image_1.png",
  },
  {
    title: "After the Fall",
    description: "3D Survival Game",
    year: "2024",
    image: "/image/image_1.png",
    smallImage: "/image/landing.jpg",
  },
];

export default function SelectedWorks() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create a GSAP context and store it in the ref
    ctxRef.current = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".panel");
      const smallImages = gsap.utils.toArray<HTMLElement>(".small-image");
      const panelInfo = gsap.utils.toArray<HTMLElement>(
        ".work-title-text-container"
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container, // use the container directly
          start: "top top",
          end:
            panels.length > 1
              ? `+=${window.innerHeight * (panels.length - 1)}`
              : "+=0",
          scrub: 0.5,
          pin: true,
        },
      });

      panels.slice(0, -1).forEach((panel, i) => {
        tl.fromTo(
          panel,
          { height: "100%" },
          { height: "0%", duration: 1, ease: "power2.out" },
          i
        );
        tl.fromTo(
          smallImages[i],
          { height: "100%" },
          { height: "0%", duration: 1, ease: "power2.out" },
          i
        );
        tl.fromTo(
          panelInfo[i + 1],
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
          i
        );
      });
    }, containerRef);
  }, []);

  useLayoutEffect(() => {
    return () => {
      // Clean up the GSAP context on unmount
      if (ctxRef.current) {
        ctxRef.current.revert();
      }
    };
  }, []);
  return (
    <section
      ref={containerRef}
      className="relative"
      // Container is total scroll area for pinned effect
      style={{ height: `${panelsData.length * 100}vh` }}
    >
      {/* Big background panels, stacked */}
      <div className="absolute top-0 left-0 w-full h-dvh overflow-hidden">
        {panelsData.map((panel, index) => (
          <div
            key={index}
            className="panel absolute top-0 left-0 w-full h-full overflow-hidden"
            style={{ zIndex: panelsData.length - index }}
          >
            {/* Background Image (clipped by panel's height) */}
            <Image
              src={panel.image}
              alt={panel.title}
              width={1920}
              height={1080}
              className="w-full h-dvh  object-cover"
            />

            {/* Optional text */}
            <div className="absolute top-0 w-full h-dvh z-40  ">
              <div
                className="relative lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 top-30 left-0
                  w-full h-[80px] lg:h-[40px] text-center text-white  
                  pointer-events-none flex flex-col lg:flex-row justify-between items-center 
                  px-4 lg:px-20 overflow-hidden  "
              >
                <div className="flex flex-col lg:flex-row lg:justify-between items-center w-full work-title-text-container relative h-full">
                  <h3 className="text-md lg:text-2xl font-semibold uppercase">
                    {panel.title}
                  </h3>
                  <h4 className="text-sm lg:text-2xl uppercase">
                    {panel.description}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Center box with small images, also stacked */}
      <div className="absolute top-0 w-full h-dvh">
        <div className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20dvh] h-[20dvh] lg:w-[30dvh] lg:h-[30dvh] z-20 overflow-hidden pointer-events-none rounded-md">
          {panelsData.map((panel, index) => (
            <div
              key={index}
              className="small-image absolute w-full h-full overflow-hidden"
              style={{ zIndex: panelsData.length - index }}
            >
              <Image
                src={panel.smallImage}
                alt={panel.title}
                width={1920}
                height={1080}
                className="w-[20dvh] h-[20dvh] lg:w-[30dvh] lg:h-[30dvh] object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
