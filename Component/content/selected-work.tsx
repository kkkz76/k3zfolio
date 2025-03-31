"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef } from "react";

const panelsData = [
  {
    title: "Nexus Nova",
    description: "NFC Card Website",
    year: "2024",
    image: "/image/projects/nexusnova_bg.jpg",
    smallImage: "/image/projects/nexusnova_small.png",
    link: "https://nexus-ten-nu.vercel.app/",
  },
  {
    title: "Echo",
    description: "AI Desktop App",
    year: "2024",
    image: "/image/projects/test.jpg",
    smallImage: "/image/projects/askvox_small.png",
    link: "https://askvox-marketing.vercel.app/",
  },
  {
    title: "Super Mario",
    description: "E-commerce Car Website",
    year: "2024",
    image: "/image/projects/supermario_bg.jpg",
    smallImage: "/image/projects/supermario_small.png",
    link: "https://super-mario-bay.vercel.app/",
  },
  {
    title: "After the Fall",
    description: "3D Survival Game",
    year: "2024",
    image: "/image/projects/afterthefall_bg.jpg",
    smallImage: "/image/projects/afterthefall_small.png",
    link: "",
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
          end: () =>
            panels.length > 1
              ? `+=${window.innerHeight * (panels.length - 1)}`
              : "+=0",
          scrub: 0.5,
          pin: true,
          invalidateOnRefresh: true,
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
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
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
            <div className="absolute top-0 w-full h-dvh z-40 pointer-events-none ">
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
        <div className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20dvh] h-[20dvh] lg:w-[40dvh] lg:h-[40dvh] z-20 overflow-hidden pointer-events-none rounded-lg">
          {panelsData.map((panel, index) => (
            <div
              key={index}
              className="small-image absolute w-full h-full overflow-hidden cursor-pointer pointer-events-auto"
              onClick={() => window.open(panel.link, "_blank")}
              style={{ zIndex: panelsData.length - index }}
            >
              <Image
                src={panel.smallImage}
                alt={panel.title}
                width={1920}
                height={1080}
                className="w-[20dvh] h-[20dvh] lg:w-[40dvh] lg:h-[40dvh] object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
