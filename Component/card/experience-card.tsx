"use client";

import { motion } from "motion/react";

interface TimelineItem {
  date: string;
  title: string;
  company: string;
}

interface ExperienceCardProps {
  event: TimelineItem;
  index: number;
}

const InnerCard = {
  hover: {
    backgroundColor: "var(--foreground)",
    color: "var(--background)",
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

const OuterCard = {
  hover: {
    borderColor: "var(--color-primary)",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const descriptionVariants = {
  hover: {
    y: -5,
    maxHeight: "100px",
    opacity: 1,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

const ExperienceCard = ({ event, index }: ExperienceCardProps) => {
  return (
    <motion.div
      className="relative flex items-center w-5/12 min-h-[130px] border border-black cursor-pointer overflow-hidden p-4 shadow-lg"
      variants={OuterCard}
      initial="initial"
      whileHover="hover"
    >
      <motion.div
        className={`flex flex-col w-full ${
          index % 2 === 0 ? "text-right" : "text-left"
        }`}
      >
        <p className="text-sm ">{event.date}</p>
        <div className="flex flex-col justify-between">
          <h3 className="text-sm lg:text-2xl font-bold">{event.title}</h3>
          <h3 className="text-sm lg:text-lg font-medium">{event.company}</h3>
        </div>

        {/* <motion.p
          className="text-gray-700 dark:text-gray-300 max-h-0 overflow-hidden"
          variants={descriptionVariants}
        >
          {event.description}
        </motion.p> */}
      </motion.div>
    </motion.div>
  );
};

export default ExperienceCard;
