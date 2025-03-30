"use client";

import React, { useEffect, useRef } from "react";
import HoverText from "../text/hover-text";
import gsap from "gsap";
import { useRouter } from "next/navigation";

const navBarItems = [
  {
    title: "Projects",
    link: "/project",
  },
];

interface NavbarProps {
  showNavbar: boolean;
  isDarkText: boolean;
}

const Navbar = ({ showNavbar, isDarkText }: NavbarProps) => {
  const NavRef = useRef<HTMLElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!NavRef.current) return;
    const el = NavRef.current;

    if (showNavbar) {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          pointerEvents: "auto",
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power1.out",
        }
      );
    } else {
      gsap.set(el, { opacity: 0, pointerEvents: "none" });
    }
  }, [showNavbar]);

  return (
    <nav
      ref={NavRef}
      className="fixed top-0 w-full min-h-24 flex items-center justify-between px-6 lg:px-20 z-50 "
    >
      <button onClick={() => router.push("/")}>
        <HoverText
          className={`text-md lg:text-2xl tracking-widest uppercase cursor-pointer ${
            isDarkText ? "text-black" : "text-white"
          } `}
          text="K3Z"
        />
      </button>
      <div className="flex gap-10">
        {navBarItems.map((item, index) => (
          <button key={index} onClick={() => router.push(item.link)}>
            <HoverText
              className={`text-sm lg:text-xl font-thin  uppercase cursor-pointer ${
                isDarkText ? "text-black" : "text-white"
              }`}
              text={item.title}
            />
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
