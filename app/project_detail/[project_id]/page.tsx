"use client";

import { useParams } from "next/navigation";
import { useNavbar } from "@/Component/context/navbar-controller";
import { useEffect, useLayoutEffect, useRef } from "react";
import ContactMe from "@/Component/content/contact-me";
import Image from "next/image";
import HoverText from "@/Component/text/hover-text";
import gsap from "gsap";

const mockProjectData = [
  {
    id: "1",
    title: "Nexus Nova (User Dashboard)",
    type: "Website",
    description:
      "Digital NFC Card Platform – A comprehensive platform featuring an e-commerce store for ordering customized physical NFC business cards, a user dashboard for managing and personalizing digital business cards, and an admin panel for overseeing users and orders. Designed for seamless networking and smart contact sharing, enabling users to customize their cards with essential details, social links, and branding.",
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "Supabase PostgreSQl",
      "Shadcn UI",
      "Prisma ORM",
    ],
    liveUrl: "https://nexus-ten-nu.vercel.app/",
    images: [
      "/image/nexus_user_dashboard/ss1.png",
      "/image/nexus_user_dashboard/ss2.png",
      "/image/nexus_user_dashboard/ss3.png",
      "/image/nexus_user_dashboard/ss4.png",
    ],
  },
  {
    id: "2",
    title: "Echo (Admin Dashboard)",
    type: "Website",
    description:
      "Echo (Admin Dashboard) is a centralized control panel designed to manage and oversee all aspects of the Echo Application. It provides administrators with real-time insights, analytics, and configuration settings. Built for performance and scalability, the dashboard streamlines operations and ensures secure, efficient platform governance",
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "Supabase PostgreSQl",
      "Shadcn UI",
      "Prisma ORM",
      "Next Auth",
    ],
    liveUrl: "https://askvox-admin.vercel.app/",
    images: [
      "/image/askvox_admin/ss1.png",
      "/image/askvox_admin/ss2.png",
      "/image/askvox_admin/ss3.png",
      "/image/askvox_admin/ss4.png",
      "/image/askvox_admin/ss5.png",
    ],
  },
  {
    id: "3",
    title: "Echo (Marketing)",
    type: "Website",
    description:
      "Echo (Marketing) is the promotional and outreach hub of the Echo platform, crafted to drive user engagement and brand visibility. With a focus on data-driven strategies, the marketing dashboard empowers teams to optimize campaigns, boost conversions, and grow Echo’s user base effectively.",
    technologies: ["Next.js", "Tailwind CSS", "Shadcn UI", "Prisma ORM"],
    liveUrl: "https://askvox-marketing.vercel.app/",
    images: ["/image/askvox_marketing/ss1.png"],
  },

  {
    id: "4",
    title: "Echo",
    type: "Cross-Platform Application",
    description:
      "Echo is a next-generation AI voice assistant built specifically for gamers, powered by Meta’s LLaMA 3 language model. Designed for speed, context-awareness, and seamless voice interaction, Echo enhances your gaming experience by providing real-time assistance without interrupting gameplay.",
    technologies: [
      "Electron.js",
      "Tailwind CSS",
      "Python",
      "Google APIs",
      "Llama 3",
      "JWT Auth",
      "Supabase PostgreSQL",
    ],
    liveUrl: "https://askvox-marketing.vercel.app/",
    images: [
      "/image/askvox/ss1.png",
      "/image/askvox/ss2.png",
      "/image/askvox/ss3.png",
      "/image/askvox/ss4.png",
    ],
  },
  {
    id: "5",
    title: "Super Mario E-commerce Car Website",
    type: "Website",
    description:
      "Super Mario is a dynamic and user-friendly e-commerce platform tailored for car enthusiasts and dealerships. With a vibrant design inspired by the adventurous spirit of Super Mario, the website combines playful aesthetics with powerful functionality.Users can seamlessly browse, compare, and purchase vehicles, while admins benefit from robust inventory management, order tracking, and user analytics. ",
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "Neon PostgreSQl",
      "Shadcn UI",
      "Prisma ORM",
      "Next Auth",
    ],
    liveUrl: "https://super-mario-bay.vercel.app/",
    images: [
      "/image/supermario_car_website/ss1.png",
      "/image/supermario_car_website/ss2.png",
      "/image/supermario_car_website/ss3.png",
      "/image/supermario_car_website/ss4.png",
    ],
  },
  {
    id: "6",
    title: "After the Fall",
    type: "Game",
    description:
      "After the Fall is a top-down isometric 3D zombie survival game built with Unity. Set in a post-apocalyptic world overrun by the undead, players must scavenge, strategize, and survive wave after wave of zombie attacks. With immersive visuals, dynamic lighting, and real-time combat, After the Fall delivers an intense survival experience, combining tactical gameplay with fast-paced action in a stylized 3D environment.",
    technologies: ["Unity Engine"],
    liveUrl: "",
    images: [
      "/image/after_the_fall/ss1.png",
      "/image/after_the_fall/ss2.png",
      "/image/after_the_fall/ss3.png",
      "/image/after_the_fall/ss4.png",
    ],
  },
  {
    id: "7",
    title: "VR House",
    type: "Game",
    description:
      "VR House is an immersive virtual reality experience that allows users to explore, design, and interact with fully 3D-modeled home environments. Built for VR platforms, it offers realistic physics, spatial audio, and intuitive navigation to simulate real-world home walkthroughs. Whether for architecture visualization, interior design previews, or virtual staging, VR House provides a seamless and engaging environment for showcasing and customizing living spaces in real-time.",
    technologies: ["Unity Engine", "XR Interaction Toolkit"],
    liveUrl: "",
    images: [
      "/image/vr_house/ss1.png",
      "/image/vr_house/ss2.png",
      "/image/vr_house/ss3.png",
    ],
  },
  {
    id: "8",
    title: "K3Z Portfolio",
    type: "Website",
    description:
      "K3Z Portfolio is a sleek, interactive digital showcase built to highlight the work, skills, and personality of a modern creative developer. Designed with a minimalist dark theme and subtle animations, the portfolio presents projects, experiences, and personal branding in an elegant and engaging format.",
    technologies: ["Next.js", "Tailwind CSS", "GSAP", "Framer Motion"],
    liveUrl: "https://k3zfolio.vercel.app/",
    images: ["/image/k3z/ss1.png"],
  },
];

export default function ProjectDetailPage() {
  const { setShowNavbar } = useNavbar();
  const params = useParams();
  const project_id = params.project_id as string;

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShowNavbar(true);
    return () => setShowNavbar(false);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".fade-up", {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });

      tl.from(
        ".image-fade",
        {
          opacity: 0,
          scale: 0.95,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=0.5"
      );
    }, sectionRef);

    return () => ctx.revert(); // Clean up on unmount
  }, []);

  const project = mockProjectData.find((p) => p.id === project_id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-10">
        <h1 className="text-3xl font-bold text-red-500">Project not found</h1>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto p-6">
        <section
          ref={sectionRef}
          className="w-full min-h-screen overflow-hidden pt-20 space-y-16"
        >
          {/* Title Section */}
          <div className="space-y-4 fade-up">
            <h1 className="text-4xl md:text-6xl xl:text-7xl font-bold leading-tight max-w-4xl">
              {project.title}
            </h1>
            <span className="inline-block border border-gray-600 px-4 py-1 rounded-full text-sm tracking-wider">
              {project.type}
            </span>
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl pt-4">
              {project.description}
            </p>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-base uppercase border-b-2 border-primary fade-up"
            >
              <HoverText text="Watch Live" />
            </a>
          </div>

          {/* Technologies Section */}
          <div className="space-y-6 fade-up">
            <h2 className="text-2xl font-semibold">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-1 text-sm border border-gray-500 rounded-xl tracking-wide"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Image Gallery */}
          <div className="space-y-6 fade-up">
            <h2 className="text-2xl font-semibold">Preview</h2>
            <div className="space-y-10">
              {project.images.map((img, i) => (
                <div
                  key={i}
                  className="relative rounded-xl overflow-hidden border border-gray-700 shadow-xl image-fade"
                >
                  <Image
                    src={img}
                    alt={`Screenshot ${i + 1}`}
                    className="object-cover w-full h-auto rounded-xl"
                    width={1920}
                    height={1080}
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <ContactMe />
    </>
  );
}
