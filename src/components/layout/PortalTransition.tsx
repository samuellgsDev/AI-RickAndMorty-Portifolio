"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Portal from "@/components/ui/Portal";
import { useMultiverse, Dimension } from "@/context/MultiverseContext";
import { Zap, Briefcase, Gamepad2, Disc } from "lucide-react";
import clsx from "clsx";

interface PortalTransitionProps {
  onComplete: () => void;
}

const DIMENSIONS: { id: Dimension; name: string; color: string; icon: any }[] = [
  { id: "C-137", name: "DIMENSION C-137", color: "text-portal-green", icon: Zap },
  { id: "Pixel", name: "DIMENSION J-19Z7", color: "text-pink-500", icon: Gamepad2 },
  { id: "Prime", name: "DIMENSION PRIME", color: "text-blue-500", icon: Briefcase },
  { id: "Club", name: "DIMENSION CLUB", color: "text-purple-500", icon: Disc },
];

export default function PortalTransition({ onComplete }: PortalTransitionProps) {
  const { setDimension } = useMultiverse();
  const [selectedDim, setSelectedDim] = useState<Dimension | null>(null);
  const [isExpanding, setIsExpanding] = useState(false);

  const handleSelect = (dim: Dimension) => {
    setSelectedDim(dim);
    setDimension(dim);
    setIsExpanding(true);

    setTimeout(() => {
        onComplete();
    }, 1500); // Faster transition
  };

  return (
    <motion.div 
        className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }} 
    >
        {/* Smooth Color Pulse - Only at start of transition */}
        <AnimatePresence>
          {isExpanding && (
            <motion.div 
                className={clsx(
                    "absolute inset-0 z-0",
                    selectedDim === "C-137" && "bg-portal-green",
                    selectedDim === "Pixel" && "bg-pink-500",
                    selectedDim === "Prime" && "bg-blue-500",
                    selectedDim === "Club" && "bg-purple-500"
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>

        {/* Subtle Speed Lines - Cleaner effect */}
        {isExpanding && (
          <>
            {[...Array(16)].map((_, i) => (
              <motion.div
                  key={`beam-${i}`}
                  className="absolute top-1/2 left-1/2 w-[2px] h-[100vh] origin-top bg-white/20"
                  style={{ rotate: (360 / 16) * i }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ 
                      scaleY: [0, 1.5], 
                      opacity: [0, 0.4, 0]
                  }}
                  transition={{ 
                      duration: 0.8, 
                      delay: i * 0.02,
                      ease: "easeOut"
                  }}
              />
            ))}

            {/* Gentle particle burst */}
            {[...Array(20)].map((_, i) => {
              const angle = (360 / 20) * i;
              const radians = angle * (Math.PI / 180);
              const distance = 300 + (i % 3) * 100;
              
              return (
                <motion.div
                    key={`particle-${i}`}
                    className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-white/60"
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    animate={{ 
                        x: Math.cos(radians) * distance,
                        y: Math.sin(radians) * distance,
                        scale: [0, 1, 0.5],
                        opacity: [0, 1, 0]
                    }}
                    transition={{ 
                        duration: 1,
                        delay: i * 0.02,
                        ease: "easeOut"
                    }}
                />
              );
            })}
          </>
        )}

        {/* Selection UI (Hidden when expanding) */}
        <AnimatePresence>
          {!isExpanding && (
              <motion.div 
                  className="z-20 text-center px-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
              >
                  <h1 className="text-2xl sm:text-3xl md:text-5xl font-creepster text-white mb-2 text-shadow-glow">
                      CHOOSE YOUR REALITY
                  </h1>
                  <p className="text-gray-400 font-mono text-xs sm:text-sm mb-4 md:mb-8">
                      CAUTION: Timelines may vary wildly.
                  </p>

                  <div className="grid grid-cols-2 md:flex gap-4 sm:gap-6 md:gap-12 items-center justify-center max-w-sm md:max-w-none mx-auto">
                      {DIMENSIONS.map((dim, index) => (
                          <motion.div 
                              key={dim.id} 
                              className="flex flex-col items-center cursor-pointer group"
                              onClick={() => handleSelect(dim.id)}
                              initial={{ opacity: 0, y: 20, scale: 0.9 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ 
                                  delay: 0.2 + (index * 0.08),
                                  duration: 0.4,
                                  ease: "easeOut"
                              }}
                              whileHover={{ y: -8, scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                          >
                              <motion.div
                                  whileHover={{ rotate: 180 }}
                                  transition={{ duration: 0.5, ease: "easeOut" }}
                                  className="mb-3 relative"
                              >
                                  <Portal size="md" className={clsx(
                                      "scale-[0.6] sm:scale-75 md:scale-100",
                                      dim.id === "Pixel" && "filter hue-rotate-[280deg] brightness-150", 
                                      dim.id === "Prime" && "filter hue-rotate-[180deg] saturation-50",
                                      dim.id === "Club" && "filter hue-rotate-[300deg] brightness-125",
                                  )} />
                                  <dim.icon className={clsx("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10", dim.color)} />
                              </motion.div>
                              
                              <motion.h2 
                                  className={clsx("text-xs sm:text-sm md:text-lg lg:text-xl font-bold font-mono group-hover:text-shadow-glow transition-all", dim.color)}
                              >
                                  {dim.name}
                              </motion.h2>
                          </motion.div>
                      ))}
                  </div>
              </motion.div>
          )}
        </AnimatePresence>

        {/* Expanding Portal - Smooth and fast */}
        <AnimatePresence>
          {isExpanding && (
              <motion.div
                  className="relative z-10"
                  initial={{ scale: 1, rotate: 0, opacity: 1 }}
                  animate={{ 
                      scale: [1, 30, 80], 
                      rotate: [0, 90, 180], 
                      opacity: [1, 1, 0] 
                  }}
                  transition={{ 
                      duration: 1.2,
                      ease: [0.22, 1, 0.36, 1], // Smooth easeOutExpo
                      times: [0, 0.5, 1]
                  }}
              >
                  <Portal size="xl" className={clsx(
                      selectedDim === "Pixel" && "filter hue-rotate-[280deg]", 
                      selectedDim === "Prime" && "filter hue-rotate-[180deg]",
                      selectedDim === "Club" && "filter hue-rotate-[300deg]",
                  )} />
              </motion.div>
          )}
        </AnimatePresence>
    </motion.div>
  );
}

