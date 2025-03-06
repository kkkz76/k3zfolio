"use client";

import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment, OrbitControls, Stage } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function InteractiveModel() {
  const { scene } = useGLTF("/model/forest_house.glb"); // Ensure correct path
  const modelRef = useRef<THREE.Group>(null);

  return <primitive ref={modelRef} object={scene} scale={1} />;
}

export default function Scene() {
  return (
    <div className="w-full h-full -z-10 flex items-center justify-center">
      <Canvas
        shadows
        camera={{ position: [2, 2, 6], fov: 45 }} // Adjusted camera for correct view
      >
        {/* Stronger lighting to boost reflections */}
        <ambientLight intensity={0.4} /> {/* Balanced background light */}
        <directionalLight position={[5, 5, 5]} intensity={2} />{" "}
        {/* Stronger key light */}
        {/* Enhance reflections */}
        <Environment preset="city" />
        {/* Adds realistic soft shadows */}
        <Stage intensity={1.2}>
          <InteractiveModel />
        </Stage>
        {/* Enable mouse drag rotation (restricted to Y-axis) */}
        <OrbitControls
          enableZoom={false}
          enableRotate={true}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
