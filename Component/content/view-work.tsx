"use client";
import React, { useRef } from "react";
import ScrollText from "../text/scroll-text";

const ViewWorks = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  return (
    <section
      className="sticky top-0 flex flex-col items-center justify-center w-full min-h-dvh p-10 text-center overflow-hidden -z-20  "
      ref={sectionRef}
    >
      <h2 className="text-4xl font-bold uppercase">
        <ScrollText
          text={"These are just few of my works."}
          triggerRef={sectionRef}
        />
      </h2>
      <button className="about-text mt-6 px-6 py-3 border-2 border-primary rounded-full hover:bg-primary transition uppercase">
        View More Projects
      </button>
    </section>
  );
};

export default ViewWorks;
