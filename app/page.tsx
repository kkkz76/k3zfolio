"use client";
import AboutMe from "@/Component/content/about-me";
import ContactMe from "@/Component/content/contact-me";
import ExperienceSection from "@/Component/content/experience-section";
import ExpertiseSection from "@/Component/content/expertise-section";
import Landing from "@/Component/content/landing";
import SelectedWorks from "@/Component/content/selected-work";
import Test from "@/Component/content/test";
import ViewWorks from "@/Component/content/view-work";
import { useNavbar } from "@/Component/context/navbar-controller";
import { useEffect } from "react";

export default function Home() {
  return (
    <>
      {/* <Test /> */}
      <Landing />
      <AboutMe />
      <ExpertiseSection />
      <SelectedWorks />
      <ViewWorks />
      <ExperienceSection />
      <ContactMe />
    </>
  );
}
