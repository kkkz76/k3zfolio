"use client";

import Tilt from "react-parallax-tilt";

export default function MyTiltCard() {
  return (
    <Tilt
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      perspective={1000}
      scale={1.05}
      transitionSpeed={2500}
      className="w-80 h-48 bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="p-4">
        <h3 className="text-xl">My Tilt Card</h3>
        <p className="text-gray-600">Hover to see the effect!</p>
      </div>
    </Tilt>
  );
}
