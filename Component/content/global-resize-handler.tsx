"use client";

import { useEffect } from "react";

export default function GlobalResizeHandler() {
  useEffect(() => {
    // Function to check if we're in desktop mode
    const isDesktop = () => window.innerWidth >= 1024;
    // Store the initial device type
    let currentIsDesktop = isDesktop();
    let timerId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      // Clear any pending timer
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        // Check the new device type
        const newIsDesktop = isDesktop();
        // If device type has changed, reload the page
        if (newIsDesktop !== currentIsDesktop) {
          window.location.reload();
        }
      }, 200); // Adjust debounce delay as needed
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timerId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return null;
}
