"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

interface PortalProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function Portal({ className, size = "md" }: PortalProps) {
  const sizeClasses = {
    sm: "w-32 h-32",
    md: "w-64 h-64",
    lg: "w-96 h-96",
    xl: "w-[500px] h-[500px]",
  };

  return (
    <div
      className={clsx(
        "relative flex items-center justify-center",
        sizeClasses[size],
        className
      )}
    >
      {/* Outer Glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-portal-green blur-3xl opacity-20"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Spinning Portal Ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-4 border-dashed border-portal-green"
        style={{
            boxShadow: "0 0 20px #00ff00, inset 0 0 20px #00ff00"
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Inner Swirls */}
      <motion.div
        className="absolute inset-4 rounded-full bg-gradient-to-tr from-portal-green via-neon-green to-portal-center opacity-80"
        style={{
            filter: "blur(20px)"
        }}
        animate={{ rotate: -360, scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      
       {/* Accents (Particles) */}
       <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 w-2 h-2 bg-white rounded-full blur-[1px]" />
        <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-portal-center rounded-full blur-[2px]" />
      </motion.div>
    </div>
  );
}
