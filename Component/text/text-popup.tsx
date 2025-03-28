"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import clsx from "clsx";

interface TextPopUpProps {
  text: string;
  className?: string;
  staggerDelay?: number;
  onAnimationComplete?: () => void;
}

const TextPopUp = ({
  text,
  className,
  staggerDelay = 0.2,
  onAnimationComplete,
}: TextPopUpProps) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.querySelectorAll(".popupChar"),
        { y: "100%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.5,
          ease: "power1.out",
          stagger: staggerDelay,
          onComplete: onAnimationComplete,
        }
      );
    }
  }, [text]);

  return (
    <div className={clsx(" overflow-hidden ", className)}>
      <p ref={containerRef}>
        {text.split("").map((char, index) => (
          <span key={index} className="popupChar inline-block opacity-0">
            {char}
          </span>
        ))}
      </p>
    </div>
  );
};

export default TextPopUp;
