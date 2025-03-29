"use client";
import ProjectTemplate, { Project } from "@/Component/content/project-template";

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
  return (
    <div className="container mx-auto ">
      <section className="w-full min-h-screen overflow-hidden">
        {/* Main heading */}
        <h1 className="font-bold text-8xl uppercase max-w-md">
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
  );
}
