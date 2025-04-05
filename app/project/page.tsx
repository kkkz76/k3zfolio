"use client";
import ContactMe from "@/Component/content/contact-me";
import ProjectTemplate from "@/Component/content/project-template";
import { useNavbar } from "@/Component/context/navbar-controller";
import { useEffect } from "react";

const panelsData = [
  {
    title: "Nexus Nova",
    description: "Website",
    year: "2024",
    image: "/image/projects/nexusnova_bg.jpg",
    smallImage: "/image/projects/nexusnova_small.png",
    link: "https://nexus-ten-nu.vercel.app/",
  },
  {
    title: "Echo (Admin)",
    description: "Website",
    year: "2024",
    image: "/image/projects/askvoxadmin_bg.jpg",
    smallImage: "/image/projects/askvoxadmin_small.png",
    link: "https://askvox-admin.vercel.app/",
  },
  {
    title: "Echo (Marketing)",
    description: "Website",
    year: "2024",
    image: "/image/projects/askvox_bg.jpg",
    smallImage: "/image/projects/askvox_small.png",
    link: "https://askvox-marketing.vercel.app/",
  },
  {
    title: "Echo (Main APP)",
    description: "Desktop App",
    year: "2024",
    image: "/image/projects/askvox_mainapp_bg.jpg",
    smallImage: "/image/projects/askvox_mainapp_small.png",
    link: "",
  },
  {
    title: "Super Mario",
    description: "Website",
    year: "2024",
    image: "/image/projects/supermario_bg.jpg",
    smallImage: "/image/projects/supermario_small.png",
    link: "https://super-mario-bay.vercel.app/",
  },
  {
    title: "After the Fall",
    description: "3D Game",
    year: "2024",
    image: "/image/projects/afterthefall_bg.jpg",
    smallImage: "/image/projects/afterthefall_small.png",
    link: "",
  },
  {
    title: "VR House",
    description: "VR Game",
    year: "2024",
    image: "/image/projects/vrhouse_bg.jpg",
    smallImage: "/image/projects/vrhouse_small.png",
    link: "",
  },
  {
    title: "K3Z Porfolio",
    description: "Website",
    year: "2025",
    image: "/image/projects/k3z_bg.jpg",
    smallImage: "/image/projects/k3z_small.png",
    link: "https://k3zfolio.vercel.app/",
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
