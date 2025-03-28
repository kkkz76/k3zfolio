import Scene from "@/Component/3d/model";
import AnimatedCube from "@/Component/animated/animated-cube";
import MyTiltCard from "@/Component/card/tilt-card";
import AboutMe from "@/Component/content/about-me";
import AutoScrollPage from "@/Component/content/auto-scroll";
import HomePage from "@/Component/content/color-text";
import ContactMe from "@/Component/content/contact-me";
import ExperienceSection from "@/Component/content/experience-section";
import ExpertiseSection from "@/Component/content/expertise-section";
import Filler from "@/Component/content/filler";
import Landing from "@/Component/content/landing";
import Navbar from "@/Component/content/navbar";
import SelectedWorks from "@/Component/content/selected-work";
import Testing from "@/Component/content/testing";
import ViewWorks from "@/Component/content/view-work";
import ZoomIn from "@/Component/content/zoom-in";
import HoverText from "@/Component/text/hover-text";
import Marquee from "@/Component/text/marquee";
import UpDownHoverText from "@/Component/text/up-down-hover-text";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Landing />
      <AboutMe />
      <ExpertiseSection />
      <SelectedWorks />
      <ViewWorks />
      <ExperienceSection />
      <ContactMe />
      {/* <AnimatedCube /> */}
    </main>
  );
}
