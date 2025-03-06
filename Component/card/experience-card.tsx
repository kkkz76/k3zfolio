"use client";

import { motion } from "framer-motion";

interface TimelineItem {
  date: string;
  title: string;
  company: string;
}

interface ExperienceCardProps {
  event: TimelineItem;
  direction: "left" | "right";
}

/** Variants for hover animation */
const cardVariants = {
  hover: {
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const overlayVariants = {
  initial: { width: "0%" },
  hover: { width: "100%", transition: { duration: 0.3, ease: "easeIn" } },
};

const textVariants = {
  initial: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.5, ease: "easeIn" } },
};

const ExperienceCard = ({ event, direction }: ExperienceCardProps) => {
  return (
    <motion.div
      className="relative group flex items-center w-full min-h-28 cursor-pointer overflow-hidden"
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
    >
      {/* Background Hover Overlay */}
      <motion.div
        className={`absolute top-0 ${
          direction === "left" ? "left-0" : "right-0"
        }  h-full z-10 flex items-center justify-center bg-gray-200 text-black`}
        variants={overlayVariants}
      >
        <motion.div
          className="text-center text-foreground flex flex-col gap-2"
          variants={textVariants}
        >
          <h3 className="text-4xl font-bold">{event.company}</h3>
          <p className="text-md ">{event.date}</p>
        </motion.div>
      </motion.div>

      {/* Text Content */}
      <motion.div className=" flex w-full ">
        <h3 className="text-5xl w-full font-bold text-center ">
          {event.title}
        </h3>
      </motion.div>
    </motion.div>
  );
};

export default ExperienceCard;
