"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

interface SkillCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

const SkillCard = ({ title, description, icon }: SkillCardProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const hoverTimelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Set initial states
    gsap.set(containerRef.current, { y: 0, padding: "0px" });
    gsap.set(innerRef.current, {
      backgroundColor: "var(--background)",
      color: "inherit",
    });
    gsap.set(arrowRef.current, {
      x: -50,
      maxWidth: "0px",
      marginRight: "0px",
      opacity: 0,
    });
    gsap.set(descriptionRef.current, {
      y: 0,
      maxHeight: "0px",
      marginTop: "0px",
      opacity: 0,
    });

    // Create the hover timeline (paused initially)
    hoverTimelineRef.current = gsap.timeline({ paused: true });

    // Outer card animation (simulate OuterCard hover variant)
    hoverTimelineRef.current.to(
      containerRef.current,
      {
        y: -30,
        padding: "8px",
        borderColor: "var(--color-primary)",
        duration: 0.3,
        ease: "power1.inOut",
      },
      0
    );

    // Inner card animation (simulate InnerCard hover variant)
    hoverTimelineRef.current.to(
      innerRef.current,
      {
        backgroundColor: "var(--foreground)",
        color: "var(--background)",
        duration: 0.2,
        ease: "power1.inOut",
      },
      0
    );

    // Arrow animation (simulate arrowVariants)
    hoverTimelineRef.current.to(
      arrowRef.current,
      {
        x: 0,
        maxWidth: "100px",
        marginRight: "20px",
        opacity: 1,
        duration: 0.3,
        ease: "power1.out",
      },
      0
    );

    // Description animation (simulate descriptionVariants)
    hoverTimelineRef.current.to(
      descriptionRef.current,
      {
        y: -10,
        maxHeight: "160px",
        marginTop: "40px",
        opacity: 1,
        duration: 0.2,
        ease: "power1.inOut",
      },
      0
    );

    return () => {
      hoverTimelineRef.current?.kill();
    };
  }, []);

  const handleMouseEnter = () => {
    hoverTimelineRef.current?.play();
  };

  const handleMouseLeave = () => {
    hoverTimelineRef.current?.reverse();
  };

  return (
    <div
      ref={containerRef}
      className="relative flex w-full min-h-[300px] md:min-h-[400px] border border-primary cursor-pointer overflow-hidden bg-[var(--background)]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={innerRef} className="flex flex-col w-full rounded-lg">
        {/* Icon and Arrow */}
        <div className="absolute top-0 flex items-center p-6">
          {/* Arrow (initially hidden) */}
          <div ref={arrowRef} style={{ overflow: "hidden" }}>
            <ArrowRight className="text-inherit" size={24} />
          </div>
          {/* Icon */}
          {icon}
        </div>
        {/* Content Wrapper */}
        <div className="absolute bottom-0 flex flex-col w-full p-6">
          <h3 className="text-4xl w-full">{title}</h3>
          <p ref={descriptionRef} className="text-lg overflow-hidden">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
