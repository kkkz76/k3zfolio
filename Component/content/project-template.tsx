import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export interface Project {
  id: string;
  title: string;
  description: string;
  backImage: string;
  frontImage: string;
}

interface ProjectTemplateProps {
  project: Project;
}

const ProjectTemplate = ({ project }: ProjectTemplateProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textOverlayRef = useRef<HTMLDivElement>(null);
  const frontImageRef = useRef<HTMLDivElement>(null);

  const animationEnabledRef = useRef(false);

  useEffect(() => {
    // Register GSAP plugins (if needed)
    gsap.registerPlugin();

    // Use gsap.matchMedia() to conditionally enable hover animations
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      // When the viewport is at least 768px, enable animations
      animationEnabledRef.current = true;
      return () => {
        // Cleanup when the media query no longer matches
        animationEnabledRef.current = false;
      };
    });
    // Optionally add mobile-specific animations in another mm.add() block.
    return () => {
      mm.kill();
    };
  }, []);

  const handleMouseEnter = () => {
    if (!animationEnabledRef.current) return;
    gsap.fromTo(
      textOverlayRef.current,
      {
        y: 50,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power1.out",
      }
    );
    gsap.to(frontImageRef.current, {
      width: "100%",
      duration: 0.4,
      ease: "power1.out",
    });
  };

  const handleMouseLeave = () => {
    if (!animationEnabledRef.current) return;
    gsap.fromTo(
      textOverlayRef.current,
      {
        y: 0,
      },
      {
        y: 50,
        opacity: 0,
        duration: 0.4,
        ease: "power1.out",
      }
    );
    gsap.to(frontImageRef.current, {
      width: "0%",
      duration: 0.4,
      ease: "power1.in",
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full aspect-square relative overflow-hidden rounded-xl"
    >
      {/* Background Image with pointer events disabled */}
      <Image
        src={project.backImage}
        alt={project.title}
        fill
        className="object-cover pointer-events-none"
        sizes="100vw"
        placeholder="blur"
        blurDataURL={project.backImage}
      />

      {/* Optional text overlay */}
      <div
        ref={textOverlayRef}
        className="absolute top-0 w-full h-full z-20 pointer-events-non opacity-100 md:opacity-0"
      >
        <div
          className="relative lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 
                     top-[10%] left-0 w-full h-[40px] lg:h-[40px] text-center text-white z-10 
                     flex flex-col lg:flex-row justify-center items-center px-10 overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center w-full work-title-text-container relative h-full">
            <h3 className="md:text-md  lg:text-lg text-sm uppercase">
              {project.title}
            </h3>
            <h4 className="md:text-md lg:text-lg text-sm uppercase">
              {project.description}
            </h4>
          </div>
        </div>
      </div>

      {/* Center box with front image */}
      <div className="absolute top-0 w-full h-full ">
        <div className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20vh] lg:w-[30vh] h-[20vh] lg:h-[30vh] z-20 overflow-hidden pointer-events-none">
          <div
            ref={frontImageRef}
            className="w-full md:w-[0%]  h-full overflow-hidden "
          >
            {" "}
            <Image
              src={project.frontImage}
              alt={project.title}
              width={1920}
              height={1080}
              className="w-[20vh] lg:w-[30vh] h-[20vh] lg:h-[30vh] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTemplate;
