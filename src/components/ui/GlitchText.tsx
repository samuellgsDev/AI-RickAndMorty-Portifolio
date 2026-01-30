"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

interface GlitchTextProps {
  text: string;
  className?: string;
}

export default function GlitchText({ text, className }: GlitchTextProps) {
  return (
    <div className={clsx("relative inline-block", className)}>
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute top-0 left-0 -z-10 text-portal-green opacity-70"
        animate={{
          x: [0, -2, 2, -1, 0],
          y: [0, 1, -1, 0],
          opacity: [0.7, 1, 0.5, 0.7]
        }}
        transition={{
            duration: 0.2,
            repeat: Infinity,
            repeatDelay: 3,
            repeatType: "mirror",
            times: [0, 0.2, 0.4, 0.6, 1]
        }}
        aria-hidden="true"
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 -z-10 text-rick-hair opacity-70"
        animate={{
          x: [0, 2, -2, 1, 0],
          y: [0, -1, 1, 0],
          opacity: [0.7, 0.5, 1, 0.7]
        }}
        transition={{
            duration: 0.2,
            repeat: Infinity,
            repeatDelay: 2.5,
            repeatType: "mirror",
            times: [0, 0.2, 0.4, 0.6, 1]
        }}
        aria-hidden="true"
      >
        {text}
      </motion.span>
    </div>
  );
}
