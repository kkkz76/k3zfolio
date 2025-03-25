"use client";

import { ReactLenis } from "lenis/react";

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
        wheelMultiplier: 1.5,
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
