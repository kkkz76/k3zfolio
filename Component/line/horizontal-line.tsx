import React, { useEffect } from "react";
import { gsap } from "gsap";

interface HorizontalLinesProps {
  numberOfLines: number;
  lineColor: string;
  lineThickness: string;
  start: boolean;
  onAnimationComplete?: () => void;
}

const HorizontalLines = ({
  numberOfLines = 6,
  lineColor = "rgba(0, 0, 0, 0.1)",
  lineThickness = "1px",
  start,
  onAnimationComplete,
}: HorizontalLinesProps) => {
  useEffect(() => {
    if (!start) return;
    const lines = gsap.utils.toArray(".line");
    const tl = gsap.timeline({
      onComplete: () => {
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      },
    });
    tl.fromTo(
      lines,
      {
        scaleX: 0,
        transformOrigin: "left",
      },
      {
        opacity: 1,
        scaleX: 1,
        duration: 1.3,
        ease: "power2.out",
        stagger: 0.2,
      }
    );
  }, [start]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: numberOfLines }).map((_, i) => {
        const topOffset = `${((i + 1) * 100) / (numberOfLines + 1)}%`;
        return (
          <div
            key={i}
            className="line absolute w-full opacity-0"
            style={{
              top: topOffset,
              height: lineThickness,
              backgroundColor: lineColor,
            }}
          />
        );
      })}
    </div>
  );
};

export default HorizontalLines;
