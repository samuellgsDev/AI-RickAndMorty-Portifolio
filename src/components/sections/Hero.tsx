"use client";

import { motion } from "framer-motion";
import Portal from "@/components/ui/Portal";
import GlitchText from "@/components/ui/GlitchText";
import TypeWriter from "@/components/ui/TypeWriter";
import clsx from "clsx";
import { ArrowDown } from "lucide-react";
import { useMultiverse } from "@/context/MultiverseContext";

export default function Hero() {
  const { dimension } = useMultiverse();

  const HEADLINES = {
    "C-137": "WUBBA LUBBA",
    "Pixel": "PLAYER 1",
    "Prime": "SAMUEL GADELHA",
    "Club": "PARTY MODE"
  };

  const SUB_HEADLINES = {
      "C-137": "DUB DUB!",
      "Pixel": "READY!",
      "Prime": "SOFTWARE ENGINEER",
      "Club": "ACTIVATED!"
  };

  const TYPEWRITER_TEXTS = {
      "C-137": ["Creating APIs...", "Building automations...", "Traversing dimensions...", "Optimizing reality..."],
      "Pixel": ["INSERT COIN TO START...", "LOADING LEVEL...", "DEFEATING BOSSES...", "COLLECTING POWER-UPS..."],
      "Prime": ["Developing solutions.", "Architecting systems.", "Delivering results.", "Scaling applications."],
      "Club": ["Dropping beats...", "Mixing frameworks...", "Spinning up servers...", "Making noise in the browser..."]
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-20 md:py-0">
      
      {/* Central Portal */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10"
      >
        <Portal size="xl" className={clsx(
          "scale-75 sm:scale-90 md:scale-100",
          dimension === "Club" && "filter hue-rotate-[300deg]"
        )} />
        
        {/* User coming out of portal image placeholder or avatar */}
        <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-auto cursor-pointer avatar-area"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
             {/* Replace with your image */}
             <div className={clsx(
                 "w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm border-2 transition-all duration-300",
                 dimension === "C-137" && "border-portal-green/50 hover:border-portal-green hover:shadow-[0_0_30px_rgba(0,255,0,0.5)]",
                 dimension === "Pixel" && "border-pink-500/50 hover:border-pink-500",
                 dimension === "Prime" && "border-blue-500/50 hover:border-blue-500",
                 dimension === "Club" && "border-purple-500/50 hover:border-purple-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]"
             )}>
                <span className={clsx(
                    "font-creepster text-lg sm:text-xl md:text-2xl text-center px-2",
                    dimension === "C-137" && "text-portal-green",
                    dimension === "Pixel" && "text-pink-500",
                    dimension === "Prime" && "text-blue-500",
                    dimension === "Club" && "text-purple-500"
                )}>
                    {dimension === "Pixel" ? "8-BIT SAMU" : dimension === "Club" ? "DJ SAMU" : dimension === "Prime" ? "SAMUEL G." : "IT'S ME, SAMU!"}
                </span>
             </div>
        </motion.div>
      </motion.div>

      {/* Text Content */}
      <div className="relative z-20 mt-6 md:mt-12 text-center space-y-3 md:space-y-4 w-full max-w-2xl">
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
        >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-shadow-glow">
              <span className="block text-white">{HEADLINES[dimension]}</span>
              <GlitchText text={SUB_HEADLINES[dimension]} className="text-portal-green" />
            </h1>
        </motion.div>

        <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.3 }}
        >
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-mono max-w-2xl mx-auto h-12 md:h-16 px-4">
                {dimension === "C-137" && <span className="text-rick-hair font-bold">samuel gadelha<br/></span>}
                <TypeWriter 
                    texts={TYPEWRITER_TEXTS[dimension]} 
                    typingSpeed={80}
                    deletingSpeed={40}
                    pauseTime={2000}
                    className={clsx(
                        dimension === "C-137" && "text-portal-green",
                        dimension === "Pixel" && "text-pink-500",
                        dimension === "Prime" && "text-blue-500",
                        dimension === "Club" && "text-purple-500"
                    )}
                />
            </p>
        </motion.div>
        
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="mt-6 md:mt-8"
        >
            <a href="#projects" className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-portal-green text-black font-bold text-sm sm:text-base rounded-full shadow-[0_0_20px_#00ff00] hover:shadow-[0_0_40px_#00ff00] hover:scale-105 active:scale-95 transition-all">
                {dimension === "Pixel" ? "START GAME" : "VIEW DIMENSIONS"}
            </a>
        </motion.div>
      </div>

      {/* Scroll Indicator - Hidden on very small screens */}
      <motion.div
        className="absolute bottom-16 md:bottom-10 left-1/2 -translate-x-1/2 text-portal-green hidden sm:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="w-6 h-6 md:w-8 md:h-8" />
      </motion.div>
    </section>
  );
}

