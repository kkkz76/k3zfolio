"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TimelineItem {
  date: string;
  title: string;
  description: string;
  linkText?: string;
  linkUrl?: string;
}

interface TimelineProps {
  events: TimelineItem[];
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
    y: -10,
    padding: "8px",
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

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  return (
    <div className="relative flex flex-col items-center">
      <div className="absolute w-1 bg-gray-300 dark:bg-gray-700 h-full left-1/2 transform -translate-x-1/2"></div>
      {events.map((event, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className={`relative flex items-center w-full mb-8 ${
            index % 2 === 0 ? "justify-start" : "justify-end"
          }`}
        >
          <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full border-4 border-white"></div>
          <motion.div
            className="relative w-5/12 min-h-[150px] border border-black cursor-pointer overflow-hidden p-4 rounded-lg shadow-lg"
            variants={OuterCard}
            initial="initial"
            whileHover="hover"
          >
            <motion.div className="flex flex-col" variants={InnerCard}>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {event.date}
              </div>
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <motion.p
                className="text-gray-700 dark:text-gray-300 max-h-0 overflow-hidden"
                variants={descriptionVariants}
              >
                {event.description}
              </motion.p>
              {event.linkUrl && (
                <a
                  href={event.linkUrl}
                  className="text-blue-500 hover:underline"
                >
                  {event.linkText || "Read more"}
                </a>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default Timeline;
