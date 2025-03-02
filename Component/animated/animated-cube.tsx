"use client";
import React, { useEffect } from "react";
import { gsap } from "gsap";

const AnimatedCube: React.FC = () => {
  useEffect(() => {
    const n = 19;
    const rots = [
      { ry: 270, a: 0.5 },
      { ry: 0, a: 0.85 },
      { ry: 90, a: 0.4 },
      { ry: 180, a: 0.0 },
    ];

    gsap.set(".face", {
      z: 200,
      rotateY: (i: number) => rots[i].ry,
      transformOrigin: "50% 50% -201px",
    });

    for (let i = 0; i < n; i++) {
      let die = document.querySelector(".die");
      let cube = die?.querySelector(".cube");

      if (i > 0 && die) {
        let clone = die.cloneNode(true) as HTMLElement; // Cast to HTMLElement
        document.querySelector(".tray")?.appendChild(clone);
        cube = clone.querySelector(".cube");
      }

      if (cube) {
        gsap
          .timeline({
            repeat: -1,
            yoyo: true,
            defaults: { ease: "power3.inOut", duration: 1 },
          })
          .fromTo(
            cube,
            {
              rotateY: -90,
            },
            {
              rotateY: 90,
              ease: "power1.inOut",
              duration: 2,
            }
          )
          .fromTo(
            cube.querySelectorAll(".face"),
            {
              color: (j: number) =>
                `hsl(${(i / n) * 75 + 130}, 67%, ${
                  100 * [rots[3].a, rots[0].a, rots[1].a][j]
                }%)`,
            },
            {
              color: (j: number) =>
                `hsl(${(i / n) * 75 + 130}, 67%, ${
                  100 * [rots[0].a, rots[1].a, rots[2].a][j]
                }%)`,
            },
            0
          )
          .to(
            cube.querySelectorAll(".face"),
            {
              color: (j: number) =>
                `hsl(${(i / n) * 75 + 130}, 67%, ${
                  100 * [rots[1].a, rots[2].a, rots[3].a][j]
                }%)`,
            },
            1
          )
          .progress(i / n);
      }
    }

    gsap
      .timeline()
      .from(
        ".tray",
        {
          yPercent: -3,
          duration: 2,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
        },
        0
      )
      .fromTo(
        ".tray",
        { rotate: -15 },
        {
          rotate: 15,
          duration: 4,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
        },
        0
      )
      .from(
        ".die",
        {
          duration: 0.01,
          opacity: 0,
          stagger: { each: -0.05, ease: "power1.in" },
        },
        0
      )
      .to(
        ".tray",
        {
          scale: 1.2,
          duration: 2,
          ease: "power3.inOut",
          yoyo: true,
          repeat: -1,
        },
        0
      );

    const handleResize = () => {
      const h = n * 56;
      gsap.set(".tray", { height: h });
      gsap.set(".pov", { scale: window.innerHeight / h });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="pov flex items-center justify-center w-full  bg-black overflow-hidden">
      <div className="tray">
        <div className="die w-[400px] h-[55px] pb-[9px] perspective-[999px]">
          <div className="cube absolute w-full h-full transform-style-preserve-3d">
            <div
              className="face absolute  w-full h-full flex items-center justify-center"
              style={{ fontSize: "60px" }}
            >
              KHANT
            </div>
            <div
              className="face absolute w-full h-full flex items-center justify-center"
              style={{ fontSize: "58px" }}
            >
              KO KO
            </div>
            <div
              className="face absolute w-full h-full flex items-center justify-center"
              style={{ fontSize: "55px" }}
            >
              ZAW
            </div>
          </div>
        </div>
        {/* clones will go here */}
      </div>
    </div>
  );
};

export default AnimatedCube;
