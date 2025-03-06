"use client";
import React, { useRef } from "react";
import Scene from "../3d/model";
import ScrollText from "../text/scroll-text";

const Filler = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  return (
    <section className="  flex flex-col w-full" ref={sectionRef}>
      <h2 className="about-title text-lg md:text-xl lg:text-7xl font-bold uppercase">
        <ScrollText text={"Code & Play"} triggerRef={sectionRef} />
      </h2>
      <div className="flex w-full">
        <div className=" h-[800px] min-w-1/2 overflow-hidden">
          <Scene />
        </div>
        <div className="text-5xl font-bold text-center w-full flex justify-center items-center">
          <h2> "Game Developer by day, Game Explorer by night"</h2>
        </div>
      </div>
    </section>
  );
};

export default Filler;
