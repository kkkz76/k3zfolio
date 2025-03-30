"use client";
import React, { useEffect, useRef } from "react";
import HoverText from "../text/hover-text";
import gsap from "gsap";
import { useRouter } from "next/navigation";

const navBarItems = [
  {
    title: "Project",
    link: "/project",
  },
];

interface NavbarProps {
  showNavbar: boolean;
}

const Navbar = ({ showNavbar }: NavbarProps) => {
  const NavRef = useRef<HTMLElement | null>(null);

  const router = useRouter();
  useEffect(() => {
    if (NavRef.current && showNavbar) {
      gsap.from(".navbar", {
        duration: 1,
        opacity: 0,
        y: 40,
        stagger: 0.1,
        ease: "power1.out",
      });
    }
    console.log("Showing navbar");
  }, [showNavbar]);
  return (
    showNavbar && (
      <nav
        ref={NavRef}
        className="navbar  fixed top-0 w-full min-h-20 flex items-center justify-between px-20 z-50 "
      >
        <HoverText
          className="text-2xl font-thin tracking-widest uppercase cursor-pointer"
          text="K3Z"
        />
        <div className="flex gap-10">
          {navBarItems.map((item, index) => (
            <button key={index} onClick={() => router.push(item.link)}>
              {" "}
              <HoverText
                className="text-lg font-thin tracking-wide uppercase cursor-pointer"
                text={item.title}
              />
            </button>
          ))}
        </div>
      </nav>
    )
  );
};

export default Navbar;
