"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import clsx from "clsx";

interface WholeTextPopupProps {
  start: boolean;
  text: string;
  className?: string;
  onAnimationComplete?: () => void;
}

const WholeTextPopup = ({
  start,
  text,
  className,
  onAnimationComplete,
}: WholeTextPopupProps) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (containerRef.current && start) {
      // Animate the entire text block as one unit
      gsap.fromTo(
        containerRef.current,
        { y: 100, opacity: 0 }, // start position
        {
          y: 0,
          opacity: 1,
          duration: 2,
          ease: "power3.out",
          onComplete: onAnimationComplete,
        }
      );
    }
  }, [start]);

  return (
    <div className={clsx("overflow-hidden", className)}>
      {/* Apply the ref directly to the <p> */}
      <p ref={containerRef}>{text}</p>
    </div>
  );
};

export default WholeTextPopup;
