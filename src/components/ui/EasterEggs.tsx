"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMultiverse } from "@/context/MultiverseContext";
import useSynth from "@/hooks/useSynth";

// Konami Code: ↑↑↓↓←→←→BA
const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA"
];

// Get Schwifty sequence: S-C-H-W-I-F-T-Y
const SCHWIFTY_CODE = ["KeyS", "KeyC", "KeyH", "KeyW", "KeyI", "KeyF", "KeyT", "KeyY"];

interface EasterEgg {
  id: string;
  active: boolean;
}

export default function EasterEggs() {
  const { dimension } = useMultiverse();
  const { playTone } = useSynth();
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [schwiftyIndex, setSchwiftyIndex] = useState(0);
  const [showPortalSecret, setShowPortalSecret] = useState(false);
  const [showSchwifty, setShowSchwifty] = useState(false);
  const [pickleRickMode, setPickleRickMode] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showPickleRick, setShowPickleRick] = useState(false);

  // Konami Code Handler
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Konami Code
    if (e.code === KONAMI_CODE[konamiIndex]) {
      const nextIndex = konamiIndex + 1;
      setKonamiIndex(nextIndex);
      
      // Play progression tone
      playTone(200 + (nextIndex * 50), "square", 0.05, 0.3);
      
      if (nextIndex === KONAMI_CODE.length) {
        setShowPortalSecret(true);
        setKonamiIndex(0);
        // Play success sound
        playTone(523.25, "sine", 0.2, 0.5);
        setTimeout(() => playTone(659.25, "sine", 0.2, 0.5), 150);
        setTimeout(() => playTone(783.99, "sine", 0.3, 0.5), 300);
      }
    } else if (e.code === KONAMI_CODE[0]) {
      setKonamiIndex(1);
    } else {
      setKonamiIndex(0);
    }

    // Schwifty Code
    if (e.code === SCHWIFTY_CODE[schwiftyIndex]) {
      const nextIdx = schwiftyIndex + 1;
      setSchwiftyIndex(nextIdx);
      
      if (nextIdx === SCHWIFTY_CODE.length) {
        setShowSchwifty(true);
        setSchwiftyIndex(0);
        // Play funky sound
        playTone(261.63, "sawtooth", 0.3, 0.4);
        setTimeout(() => playTone(329.63, "sawtooth", 0.3, 0.4), 200);
        setTimeout(() => playTone(392.00, "sawtooth", 0.5, 0.4), 400);
      }
    } else if (e.code === SCHWIFTY_CODE[0]) {
      setSchwiftyIndex(1);
    } else {
      setSchwiftyIndex(0);
    }
  }, [konamiIndex, schwiftyIndex, playTone]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Pickle Rick: Click avatar area 5 times
  useEffect(() => {
    if (clickCount >= 5 && !pickleRickMode) {
      setPickleRickMode(true);
      setShowPickleRick(true);
      playTone(100, "square", 0.5, 0.6);
      
      setTimeout(() => setShowPickleRick(false), 5000);
    }
  }, [clickCount, pickleRickMode, playTone]);

  // Global click counter for pickle rick (on hero section)
  useEffect(() => {
    const heroSection = document.getElementById("hero");
    if (!heroSection) return;

    const handleHeroClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".avatar-area")) {
        setClickCount(prev => prev + 1);
      }
    };

    heroSection.addEventListener("click", handleHeroClick);
    return () => heroSection.removeEventListener("click", handleHeroClick);
  }, []);

  return (
    <>
      {/* Konami Code Secret Portal */}
      <AnimatePresence>
        {showPortalSecret && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90"
            onClick={() => setShowPortalSecret(false)}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", damping: 15 }}
              className="text-center p-8 max-w-lg"
            >
              {/* Secret Portal */}
              <motion.div
                className="w-64 h-64 mx-auto mb-8 rounded-full bg-gradient-to-br from-portal-green via-yellow-400 to-portal-green"
                animate={{ 
                  rotate: 360,
                  boxShadow: ["0 0 50px #00ff00", "0 0 100px #ffff00", "0 0 50px #00ff00"]
                }}
                transition={{ rotate: { duration: 4, repeat: Infinity, ease: "linear" }, boxShadow: { duration: 2, repeat: Infinity } }}
              >
                <div className="w-full h-full flex items-center justify-center text-6xl">
                  🥒
                </div>
              </motion.div>
              
              <motion.h2 
                className="text-4xl font-creepster text-portal-green mb-4"
                animate={{ textShadow: ["0 0 10px #00ff00", "0 0 30px #00ff00", "0 0 10px #00ff00"] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                SECRET DIMENSION UNLOCKED!
              </motion.h2>
              
              <p className="text-gray-300 font-mono mb-4">
                "Wubba lubba dub dub! You found the secret, Morty! 
                <br/>You're not as dumb as you look!"
              </p>
              
              <p className="text-sm text-portal-green/70 font-mono">
                — Rick Sanchez, probably
              </p>
              
              <motion.p 
                className="mt-6 text-xs text-gray-500"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Click anywhere to close
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Get Schwifty Mode */}
      <AnimatePresence>
        {showSchwifty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] pointer-events-none overflow-hidden"
          >
            {/* Disco Background */}
            <motion.div
              className="absolute inset-0"
              animate={{ 
                background: [
                  "radial-gradient(circle, rgba(255,0,255,0.3) 0%, transparent 70%)",
                  "radial-gradient(circle, rgba(0,255,255,0.3) 0%, transparent 70%)",
                  "radial-gradient(circle, rgba(255,255,0,0.3) 0%, transparent 70%)",
                  "radial-gradient(circle, rgba(255,0,255,0.3) 0%, transparent 70%)"
                ]
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
            
            {/* Dancing Text */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [-5, 5, -5]
              }}
              transition={{ duration: 0.3, repeat: Infinity }}
            >
              <h1 className="text-8xl font-creepster text-yellow-400 text-shadow-glow">
                GET SCHWIFTY!
              </h1>
              <p className="text-2xl text-white mt-4 font-mono">
                🎤 Show me what you got! 🎤
              </p>
            </motion.div>

            {/* Floating Emojis - Using deterministic positions */}
            {[...Array(20)].map((_, i) => {
              // Use seeded random for deterministic positions
              const seed = i * 1234.5678;
              const startX = (Math.sin(seed) * 0.5 + 0.5) * 100;
              const endX = (Math.sin(seed + 1) * 0.5 + 0.5) * 100;
              const duration = 2 + (i % 3);
              const delay = (i % 5) * 0.4;
              
              return (
                <motion.div
                  key={i}
                  className="absolute text-4xl"
                  style={{ left: `${startX}%` }}
                  initial={{ y: "100vh" }}
                  animate={{ 
                    y: -100,
                    x: `${endX - startX}%`,
                    rotate: 360
                  }}
                  transition={{ 
                    duration: duration,
                    repeat: Infinity,
                    delay: delay
                  }}
                >
                  {["🎵", "🎶", "🕺", "💃", "🎤", "🪩"][i % 6]}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pickle Rick Popup */}
      <AnimatePresence>
        {showPickleRick && (
          <motion.div
            initial={{ scale: 0, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: 100 }}
            className="fixed bottom-20 right-20 z-[200] bg-green-900 border-4 border-green-500 rounded-2xl p-6 shadow-2xl"
          >
            <div className="text-6xl mb-4 text-center">🥒</div>
            <h3 className="text-2xl font-creepster text-green-400 mb-2">
              I'M PICKLE RICK!
            </h3>
            <p className="text-sm text-green-300 font-mono">
              The smartest pickle in the multiverse!
            </p>
            <motion.div
              className="mt-4 text-xs text-green-500/70 text-center"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              Achievement Unlocked! 🏆
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Schwifty Timer */}
      {showSchwifty && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 5, duration: 1 }}
          onAnimationComplete={() => setShowSchwifty(false)}
          className="hidden"
        />
      )}
    </>
  );
}
