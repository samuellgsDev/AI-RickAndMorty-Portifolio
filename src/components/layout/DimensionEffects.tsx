"use client";

import { useMultiverse } from "@/context/MultiverseContext";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Disc } from "lucide-react";
import useSynth from "@/hooks/useSynth"; // Make sure to import useSynth

export default function DimensionEffects() {
  const { dimension } = useMultiverse();
  const [lightsOn, setLightsOn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { playTone } = useSynth();

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (dimension === "Club") {
        setLightsOn(true);
    } else {
        setLightsOn(false);
    }
  }, [dimension]);

  // Interactive Sound on Click (Club Mode)
  useEffect(() => {
    if (dimension !== "Club") return;

    const handleGlobalClick = (e: MouseEvent) => {
        // Pentatonic Scale (C Minor): C, Eb, F, G, Bb
        // Base Frequencies: 261.63, 311.13, 349.23, 392.00, 466.16
        const scale = [261.63, 311.13, 349.23, 392.00, 466.16, 523.25, 622.25, 698.46];
        
        // Map X position to note index
        const screenWidth = window.innerWidth;
        const noteIndex = Math.floor((e.clientX / screenWidth) * scale.length);
        const freq = scale[Math.min(noteIndex, scale.length - 1)];

        playTone(freq, "sine", 0.3, 0.4);
        
        // Add visual ripple? Maybe later. For now just sound.
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, [dimension, playTone]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[50]">
      {/* ... previous effects ... */}

      {/* Club Mode: Lasers & Strobe */}
      <AnimatePresence>
        {dimension === "Club" && lightsOn && (
            <>
                {/* 1. Strobe Overlay */}
                <motion.div
                    className="absolute inset-0 bg-white mix-blend-overlay"
                    animate={{ opacity: [0, 0.1, 0, 0.2, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                
                {/* 2. Lasers */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={`laser-${i}`}
                        className="absolute top-0 left-1/2 w-[2px] h-[150vh] bg-accent-secondary blur-sm origin-top"
                        style={{ 
                            boxShadow: "0 0 10px var(--accent-secondary)",
                            rotate: (i - 2.5) * 20 
                        }}
                        animate={{ rotate: [(i - 2.5) * 20, (i - 2.5) * 30, (i - 2.5) * 10] }}
                        transition={{ duration: 3 + i, repeat: Infinity, repeatType: "reverse" }}
                    />
                ))}

                {/* 3. Floating Particles - Reduced on mobile */}
                {[...Array(isMobile ? 8 : 20)].map((_, i) => {
                    // Seeded random for deterministic values
                    const seedLeft = Math.sin(i * 12.9898) * 43758.5453;
                    const seedTop = Math.sin(i * 78.233) * 43758.5453;
                    const seedDuration = Math.sin(i * 45.164) * 43758.5453;
                    const seedDelay = Math.sin(i * 93.989) * 43758.5453;
                    
                    const left = (seedLeft - Math.floor(seedLeft)) * 100;
                    const top = (seedTop - Math.floor(seedTop)) * 100;
                    const duration = 2 + (seedDuration - Math.floor(seedDuration)) * 3;
                    const delay = (seedDelay - Math.floor(seedDelay)) * 2;
                    
                    return (
                        <motion.div 
                            key={`particle-${i}`}
                            className="absolute w-2 h-2 rounded-full bg-accent-primary"
                            style={{
                                left: `${left}vw`,
                                top: `${top}vh`
                            }}
                            animate={{ 
                                y: [0, -100], 
                                opacity: [0, 1, 0], 
                                scale: [0.5, 1.5]
                            }}
                            transition={{ 
                                duration: duration, 
                                repeat: Infinity,
                                delay: delay 
                            }}
                        />
                    );
                })}
            </>
        )}
      </AnimatePresence>
      
      {/* Toggle Button for Light Show (Bottom Left) */}
        {dimension === "Club" && (
            <div className="fixed bottom-10 left-10 pointer-events-auto z-[60]">
                <button 
                    onClick={() => setLightsOn(!lightsOn)}
                    className="flex items-center gap-2 bg-black/50 border border-portal-green/50 text-white px-4 py-2 rounded-full hover:bg-portal-green/20 transition-all font-mono text-sm"
                >
                    <Disc className={lightsOn ? "animate-spin" : ""} size={18} />
                    {lightsOn ? "LIGHTS: ON" : "LIGHTS: OFF"}
                </button>
            </div>
        )}
    </div>
  );
}
