"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { useNavbar } from "../context/navbar-controller";

export default function ScrollResetHandler() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    // Scroll to top whenever route changes
    lenis.scrollTo(0, {
      immediate: true, // Prevent scroll animation
    });

    // Optional: also reset native scroll in case something bypassed Lenis
    window.scrollTo(0, 0);
  }, [pathname, lenis]);

  return null;
}
