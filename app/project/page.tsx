"use client";
import ContactMe from "@/Component/content/contact-me";
import ProjectTemplate from "@/Component/content/project-template";
import { useNavbar } from "@/Component/context/navbar-controller";
import { useEffect } from "react";

const panelsData = [
  {
    title: "Nexus Nova",
    description: "NFC Card Website",
    year: "2024",
    image: "/image/projects/nexusnova_bg.jpg",
    smallImage: "/image/projects/nexusnova_small.png",
    link: "https://nexus-ten-nu.vercel.app/",
  },
  {
    title: "Echo",
    description: "AI Desktop App",
    year: "2024",
    image: "/image/projects/test.jpg",
    smallImage: "/image/projects/askvox_small.png",
    link: "https://askvox-marketing.vercel.app/",
  },
  {
    title: "Super Mario",
    description: "E-commerce Car Website",
    year: "2024",
    image: "/image/projects/supermario_bg.jpg",
    smallImage: "/image/projects/supermario_small.png",
    link: "https://super-mario-bay.vercel.app/",
  },
  {
    title: "After the Fall",
    description: "3D Survival Game",
    year: "2024",
    image: "/image/projects/afterthefall_bg.jpg",
    smallImage: "/image/projects/afterthefall_small.png",
    link: "",
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
            {panelsData.map((project, index) => (
              <ProjectTemplate key={index} project={project} />
            ))}
          </div>
        </section>
      </div>
      <ContactMe />
    </>
  );
}
