import Scene from "@/Component/3d/model";
import AnimatedCube from "@/Component/animated/animated-cube";
import MyTiltCard from "@/Component/card/tilt-card";
import AboutMe from "@/Component/content/about-me";
import ContactMe from "@/Component/content/contact-me";
import ExperienceSection from "@/Component/content/experience-section";
import ExpertiseSection from "@/Component/content/expertise-section";
import Filler from "@/Component/content/filler";
import SelectedWorks from "@/Component/content/selected-work";
import ViewWorks from "@/Component/content/view-work";
import ZoomIn from "@/Component/content/zoom-in";
import HoverText from "@/Component/text/hover-text";
import Marquee from "@/Component/text/marquee";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <div className="container mx-auto p-6 gap-10">
        {/* <Marquee /> */}
        {/* <ZoomIn /> */}
        {/* <AnimatedCube /> */}
        {/* <MyTiltCard /> */}
        <AboutMe />
        <ExpertiseSection />
        <SelectedWorks />
        <ViewWorks />
        <ExperienceSection />
        <ContactMe />

        {/* <AnimatedCube /> */}
        {/* <Filler /> */}
      </div>
    </main>
  );
}
