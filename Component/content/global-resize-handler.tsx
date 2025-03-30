"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GlobalResizeHandler() {
  const router = useRouter();

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(() => {
        // Refresh the current route

        // Alternatively, if you prefer a full reload, you can use:
        window.location.reload();
      }, 200); // Adjust debounce delay as needed
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (timerId) clearTimeout(timerId);
    };
  }, [router]);

  return null;
}
