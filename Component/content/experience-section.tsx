"use client";
import { motion } from "motion/react";
import ExperienceCard from "../card/experience-card";

const events = [
  {
    date: "2024 OCT",
    title: "UI/UX & Web Developer",
    company: "Nexus Nova",
  },
  {
    date: "2024 SEP",
    title: "AI & Web Developer",
    company: "AskVox AI",
  },
  {
    date: "2024 SEP",
    title: "Project Manager & Web Developer",
    company: "E-commerce Car Website",
  },
  {
    date: "2024 JUL",
    title: "Game Developer",
    company: "After the Fall",
  },
  {
    date: "2021 AUG",
    title: "Web Developer",
    company: "EPSA E-Libary",
  },
];

const ExperienceSection = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full overflow-hidden gap-4 p-6 ">
      <h2 className="text-lg md:text-xl lg:text-2xl italic font-bold text-center uppercase tracking-widest ">
        The Journey
      </h2>

      <div className="relative flex flex-col items-center w-full ">
        <div className="absolute w-1 bg-gray-300 dark:bg-gray-700 h-full left-1/2 transform -translate-x-1/2"></div>
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className={`relative flex items-center w-full mb-4 ${
              index % 2 === 0 ? "justify-start" : "justify-end"
            }`}
          >
            <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full border-4 border-white"></div>
            <ExperienceCard event={event} index={index} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
