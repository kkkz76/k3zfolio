"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  return <ReactLenis root>{children}</ReactLenis>;
};

export default SmoothScroll;
