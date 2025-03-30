"use client";
import ContactMe from "@/Component/content/contact-me";
import ProjectTemplate, { Project } from "@/Component/content/project-template";
import { useNavbar } from "@/Component/context/navbar-controller";
import { useEffect } from "react";

const projects: Project[] = [
  {
    id: "1",
    title: "NEXUS NOVA ",
    description: " Website",
    backImage: "/image/image_1.png",
    frontImage: "/image/landing.jpg",
  },
  {
    id: "2",
    title: "NEXUS NOVA ",
    description: "Website",
    backImage: "/image/image_1.png",
    frontImage: "/image/landing.jpg",
  },
  {
    id: "3",
    title: "NEXUS NOVA ",
    description: "Website",
    backImage: "/image/image_1.png",
    frontImage: "/image/landing.jpg",
  },
  {
    id: "4",
    title: "NEXUS NOVA ",
    description: " Website",
    backImage: "/image/image_1.png",
    frontImage: "/image/landing.jpg",
  },
];

export default function ProjectCollectionPage() {
  const { setShowNavbar } = useNavbar();
  useEffect(() => {
    setShowNavbar(true);
    return () => setShowNavbar(false);
  }, []);
  return (
    <>
      <div className="container mx-auto p-6 ">
        <section className="w-full min-h-screen overflow-hidden pt-12">
          {/* Main heading */}
          <h1 className="font-bold text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl uppercase max-w-sm">
            my work collection.
          </h1>

          {/* Projects Grid */}
          <div className="mt-20 grid grid-cols-1 xl:grid-cols-2 gap-3">
            {projects.map((project, index) => (
              <ProjectTemplate key={index} project={project} />
            ))}
          </div>
        </section>
      </div>
      <ContactMe />
    </>
  );
}
