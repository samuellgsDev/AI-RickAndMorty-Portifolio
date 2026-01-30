"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LOADING_TEXTS = [
  "Initializing portal fluid...",
  "Calibrating dimensional coordinates...",
  "Scanning for Mortys...",
  "Bypassing Citadel security...",
  "Loading interdimensional assets...",
  "Stabilizing reality matrix...",
  "Ready for departure!"
];

// Seeded random generator for deterministic values
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Pre-calculate star positions using seeded random
function generateStarPositions(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    left: Math.round(seededRandom(i * 3 + 1) * 10000) / 100, // Round to 2 decimals
    top: Math.round(seededRandom(i * 3 + 2) * 10000) / 100,  // Round to 2 decimals
    duration: 1 + seededRandom(i * 3 + 3) * 2,
    delay: seededRandom(i * 3 + 4) * 2
  }));
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  // Memoize star positions so they're consistent
  const starPositions = useMemo(() => generateStarPositions(100), []);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentTextIndex(prev => 
        prev < LOADING_TEXTS.length - 1 ? prev + 1 : prev
      );
    }, 400);

    return () => clearInterval(textInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.5 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[300] bg-space-black flex flex-col items-center justify-center"
    >
      {/* Starfield Background */}
      <div className="absolute inset-0 overflow-hidden">
        {starPositions.map((star, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay
            }}
          />
        ))}
      </div>

      {/* Portal Gun Charging Animation */}
      <motion.div className="relative mb-8 md:mb-12 scale-75 sm:scale-90 md:scale-100">
        {/* Gun Body */}
        <motion.div
          className="relative w-48 h-24 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-lg border-2 border-gray-500 shadow-2xl"
          animate={{ rotate: [0, -2, 2, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          {/* Gun Handle */}
          <div className="absolute -bottom-8 left-8 w-8 h-12 bg-gray-800 rounded-b-lg border-2 border-gray-600" />
          
          {/* Portal Chamber */}
          <motion.div
            className="absolute right-2 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-black border-4 border-portal-green"
            animate={{
              boxShadow: [
                "0 0 10px #00ff00, inset 0 0 10px #00ff00",
                "0 0 30px #00ff00, inset 0 0 20px #00ff00",
                "0 0 10px #00ff00, inset 0 0 10px #00ff00"
              ]
            }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            {/* Energy Swirl */}
            <motion.div
              className="absolute inset-2 rounded-full bg-gradient-to-tr from-portal-green via-yellow-400 to-neon-green opacity-80"
              animate={{ rotate: 360, scale: [0.8, 1, 0.8] }}
              transition={{ rotate: { duration: 1, repeat: Infinity, ease: "linear" }, scale: { duration: 0.5, repeat: Infinity } }}
            />
          </motion.div>

          {/* Display Screen */}
          <div className="absolute left-4 top-3 w-20 h-8 bg-black rounded border border-portal-green/50 flex items-center justify-center overflow-hidden">
            <motion.span 
              className="text-portal-green font-mono text-xs"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 0.3, repeat: Infinity }}
            >
              {progress}%
            </motion.span>
          </div>

          {/* Energy Lines */}
          <motion.div
            className="absolute left-28 top-1/2 -translate-y-1/2 w-8 h-1 bg-portal-green rounded-full"
            animate={{ opacity: [0.3, 1, 0.3], scaleX: [0.5, 1, 0.5] }}
            transition={{ duration: 0.3, repeat: Infinity }}
          />
        </motion.div>

        {/* Charging Particles */}
        {progress < 100 && [...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-portal-green rounded-full"
            style={{ right: -20, top: "50%" }}
            animate={{
              x: [50, 0],
              y: [(i - 4) * 15, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              delay: i * 0.1
            }}
          />
        ))}
      </motion.div>

      {/* Progress Bar */}
      <div className="w-64 sm:w-72 md:w-80 h-3 md:h-4 bg-gray-900 rounded-full border border-portal-green/30 overflow-hidden mb-4 md:mb-6 mx-4">
        <motion.div
          className="h-full bg-gradient-to-r from-portal-green via-neon-green to-portal-green relative"
          style={{ width: `${progress}%` }}
        >
          <motion.div
            className="absolute inset-0 bg-white/20"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* Loading Text */}
      <motion.div
        key={currentTextIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-portal-green font-mono text-sm mb-2"
      >
        {LOADING_TEXTS[currentTextIndex]}
      </motion.div>

      {/* Subtitle */}
      <motion.p
        className="text-gray-500 font-mono text-xs"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Preparing interdimensional experience...
      </motion.p>

      {/* Version Badge */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-gray-600 font-mono text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span>PORTAL GUN v2.0</span>
        <span className="w-2 h-2 rounded-full bg-portal-green animate-pulse" />
        <span>ONLINE</span>
      </motion.div>
    </motion.div>
  );
}

