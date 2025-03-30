"use client";

import { motion, useAnimation } from "framer-motion";

interface TimelineItem {
  date: string;
  title: string;
  company: string;
}

interface ExperienceCardProps {
  event: TimelineItem;
}

const ExperienceCard = ({ event }: ExperienceCardProps) => {
  const controls = useAnimation();

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;

    const initialY: "-100%" | "100%" =
      mouseY < rect.height / 2 ? "-100%" : "100%";
    controls.set({ y: initialY });
    controls.start({
      y: "0",
      transition: { duration: 0.2, ease: "easeInOut" },
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    const initialY: "-100%" | "100%" =
      mouseY < rect.height / 2 ? "-100%" : "100%";
    controls.start({
      y: initialY,
      transition: { duration: 0.2, ease: "easeInOut" },
    });
  };
  return (
    <>
      <motion.div
        className=" w-full lg:min-h-[120px] md:min-h-[100px] min-h-[80px]   flex items-center justify-center relative overflow-hidden cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h3 className="relative w-full text-2xl md:text-3xl lg:text-4xl uppercase ">
          {event.title}
        </h3>
        {/* The animated white overlay */}

        <motion.div
          className="absolute p-4 top-0 w-full h-full flex justify-between items-center rounded-xl text-black bg-white"
          initial={{ y: "100%" }}
          animate={controls}
        >
          <h3 className="  text-2xl md:text-3xl lg:text-4xl  uppercase">
            {event.company}
          </h3>
          <h3 className=" text-2xl md:text-3xl lg:text-4xl  uppercase">
            {event.date}
          </h3>
        </motion.div>
      </motion.div>
    </>
  );
};

export default ExperienceCard;
