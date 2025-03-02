"use client";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { ReactNode } from "react";

interface SkillCardProps {
  title: string;
  description: string;
  icon: ReactNode;
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
    y: -30,
    padding: "8px",
    borderColor: "var(--color-primary)", // Using a CSS variable

    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const arrowVariants = {
  initial: { x: -50 },
  hover: {
    x: 0,
    maxWidth: "100px",
    marginRight: "20px",
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// Description slides in from below
const descriptionVariants = {
  hover: {
    y: -10,
    maxHeight: "160px",
    marginTop: "40px",
    opacity: 1,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

const ProjectCard = ({ title, description, icon }: SkillCardProps) => {
  return (
    <motion.div
      className=" relative flex  mt-15  w-full  min-h-[400px] border border-black cursor-pointer overflow-hidden"
      variants={OuterCard}
      initial="initial"
      whileHover="hover"
    >
      <motion.div
        className="  flex flex-col w-full  rounded-lg  "
        variants={InnerCard}
      >
        {/* Icon and Arrow */}
        <div className="absolute top-0 flex items-center p-6">
          {/* Arrow (Hidden Initially) */}
          <motion.div
            className="max-w-0 overflow-hidden"
            variants={arrowVariants}
          >
            <ArrowRight className="text-inherit size-12" />
          </motion.div>

          {/* Icon (Shifts when Arrow Appears) */}
          {icon}
        </div>

        {/* Content Wrapper */}

        <div className="absolute bottom-0 flex flex-col w-full p-6">
          <h3 className="text-4xl w-full">{title}</h3>
          <motion.p
            className="text-lg max-h-0 overflow-hidden"
            variants={descriptionVariants}
          >
            {description}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
