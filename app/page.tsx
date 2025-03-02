import AboutMe from "@/Component/content/about-me";
import AnimatedCube from "@/Component/animated/animated-cube";
import ExpertiseSection from "@/Component/content/expertise-section";
import ExperienceSection from "@/Component/content/experience-section";
import ScrollAnimation from "@/Component/content/animationTest";
import Experience from "@/Component/content/text-exp";
import GridTransition from "@/Component/content/test-grid";
import GridZoom from "@/Component/content/test-grid";
import GridZoomTransition from "@/Component/content/test-grid";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <div className="container mx-auto p-4 gap-6">
        {/* <AnimatedCube /> */}
        <div className="bg-accent-2 h-screen w-full">This is landing</div>
        <AboutMe />
        <ExpertiseSection />

        {/* <ScrollAnimation /> */}

        <Experience />
        <GridZoomTransition />
        <ExperienceSection />
      </div>
    </main>
  );
}
