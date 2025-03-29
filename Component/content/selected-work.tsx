"use client";

import React, { useEffect, useRef } from "react";
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

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Grab panels (top layers) & small images by class
    const panels = gsap.utils.toArray<HTMLElement>(".panel");
    const smallImages = gsap.utils.toArray<HTMLElement>(".small-image");
    const panelInfo = gsap.utils.toArray<HTMLElement>(
      ".work-title-text-container"
    );
    const anotherpanelInfo = gsap.utils.toArray<HTMLElement>(
      ".another-work-title-text-container"
    );

    // Build the timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        // Enough scroll for peeling away each panel except last
        end: () => `+=${window.innerHeight * (panels.length - 1)}`,
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,

        // If you want 50% snapping, uncomment this:
        snap: {
          snapTo: (progress: number) => {
            const step = 1 / (panelsData.length - 1);
            const lower = Math.floor(progress / step) * step;
            return progress < lower + step / 2 ? lower : lower + step;
          },
          duration: { min: 0.3, max: 0.7 },
          ease: "power2.inOut",
        },
      },
    });

    // Peel away each panel & matching small image, except the last
    // (i goes from 0..(length-2))
    panels.slice(0, -1).forEach((panel, i) => {
      // Panel from height: 100% → 0%
      tl.fromTo(
        panel,
        { height: "100%" },
        { height: "0%", duration: 1, ease: "power2.out" },
        i // timeline position
      );
      // Matching small image from height: 100% → 0%
      tl.fromTo(
        smallImages[i],
        { height: "100%" },
        {
          height: "0%",
          duration: 1,
          ease: "power2.out",
        },
        i
      );

      tl.fromTo(
        panelInfo[i + 1],
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
        i
      );
    });

    // Refresh on resize
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((st) => st.kill());
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
                <div className="flex flex-col lg:flex-row justify-between items-center w-full work-title-text-container relative h-full">
                  <h3 className="text-xl lg:text-2xl uppercase">
                    {panel.title}
                  </h3>
                  <h4 className="text-xl lg:text-2xl uppercase">
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
        <div className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30dvh] h-[30dvh] z-20 overflow-hidden pointer-events-none">
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
                className="w-[30dvh] h-[30dvh] object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
