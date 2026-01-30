"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Target {
  id: number;
  x: number;
  y: number;
  type: string;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotSpeed: number;
}

import { useMultiverse } from "@/context/MultiverseContext";

const TARGET_SETS = {
  "C-137": ["👾", "🛸"], // Classic Sci-fi
  "Pixel": ["👾","💾"], // Retro
  "Prime": ["💠", "🧊"], // Geometric/Clean
  "Club": ["🎵", "🪩"], // Party
};

export default function SpaceShooter() {
  const { dimension } = useMultiverse();
  const [targets, setTargets] = useState<Target[]>([]);
  const [explosions, setExplosions] = useState<{ id: number; x: number; y: number }[]>([]);
  const [score, setScore] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Spawner - only on desktop
  useEffect(() => {
    if (isMobile) return; // Don't spawn on mobile
    const spawnInterval = setInterval(() => {
        if (typeof window === "undefined") return;
        if (targets.length > 10) return; // Limit targets

        // Spawn from top
        const startX = Math.random() * (window.innerWidth - 50); // Avoid edge
        const startY = -60; // Just above screen
        
        const currentSet = TARGET_SETS[dimension] || TARGET_SETS["C-137"];
        const randomType = currentSet[Math.floor(Math.random() * currentSet.length)];

        const newTarget: Target = {
            id: nextId.current++,
            x: startX,
            y: startY,
            type: randomType,
            vx: 0, // No horizontal movement
            vy: Math.random() * 1.5 + 0.5, // Slow downward speed (0.5 to 2)
            size: Math.random() * 20 + 30, // 30-50px
            rotation: 0,
            rotSpeed: (Math.random() - 0.5) * 5
        };

        setTargets(prev => [...prev, newTarget]);
    }, 2000); // 2s spawn rate

    return () => clearInterval(spawnInterval);
  }, [targets.length, dimension, isMobile]);

  // Game Loop
  useEffect(() => {
    let animationFrame: number;

    const gameLoop = () => {
        setTargets(prev => 
            prev.map(t => ({
                ...t,
                x: t.x + t.vx,
                y: t.y + t.vy,
                rotation: t.rotation + t.rotSpeed
            })).filter(t => {
                // Remove if off screen
                return t.x > -100 && t.x < window.innerWidth + 100 && 
                       t.y > -100 && t.y < window.innerHeight + 100;
            })
        );
        animationFrame = requestAnimationFrame(gameLoop);
    };

    animationFrame = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Dimension-specific sound effects
  const playDimensionSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      const playSound = (
        startFreq: number, 
        endFreq: number, 
        type: OscillatorType, 
        duration: number, 
        volume: number
      ) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(startFreq, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(endFreq, audioContext.currentTime + duration);
        
        gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.type = type;
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
      };

      switch (dimension) {
        case "C-137":
          // Portal gun zap sound
          playSound(800, 200, "sawtooth", 0.15, 0.25);
          setTimeout(() => playSound(600, 100, "square", 0.1, 0.15), 50);
          break;
          
        case "Pixel":
          // 8-bit coin/power-up sound
          playSound(587.33, 1174.66, "square", 0.08, 0.2); // D5 to D6
          setTimeout(() => playSound(880, 1760, "square", 0.08, 0.2), 80); // A5 to A6
          break;
          
        case "Prime":
          // Subtle corporate click/ding
          playSound(1200, 1200, "sine", 0.05, 0.15);
          setTimeout(() => playSound(1500, 1500, "sine", 0.08, 0.1), 60);
          break;
          
        case "Club":
          // Bass drop
          playSound(150, 50, "sine", 0.2, 0.3);
          break;
      }
      
      // Clean up
      setTimeout(() => {
        audioContext.close();
      }, 500);
    } catch (error) {
      console.log("Audio playback not supported");
    }
  };

  const handleShoot = (id: number, x: number, y: number, e: React.MouseEvent) => {
    setExplosions(prev => [...prev, { id, x, y }]);
    setScore(s => s + 100);
    
    // Play dimension-specific sound effect
    playDimensionSound();
    
    // Remove target
    setTargets(prev => prev.filter(t => t.id !== id));

    // Remove explosion after animation
    setTimeout(() => {
        setExplosions(prev => prev.filter(e => e.id !== id));
    }, 500);
  };

  // Hide on mobile
  if (isMobile) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {/* Score Counter */}
      <div className="absolute top-4 right-8 text-portal-green font-mono text-xl z-50 bg-black/50 px-4 py-2 rounded border border-portal-green/30 pointer-events-auto">
        SCORE: {score}
        {/* Hint tooltip */}
        {score === 0 && (
          <div className="absolute top-full right-0 mt-2 text-xs text-gray-400 whitespace-nowrap animate-pulse">
            🎯 Click the falling targets to score!
          </div>
        )}
      </div>

      {/* Targets */}
      {targets.map(target => (
        <div
            key={target.id}
            className="absolute cursor-pointer pointer-events-auto select-none transition-transform will-change-transform hover:scale-110 active:scale-90"
            style={{
                left: target.x,
                top: target.y,
                fontSize: target.size,
                transform: `rotate(${target.rotation}deg)`
            }}
            onClick={(e) => {
                e.stopPropagation();
                handleShoot(target.id, target.x, target.y, e);
            }}
        >
            {target.type}
        </div>
      ))}

      {/* Explosions */}
      <AnimatePresence>
        {explosions.map(exp => (
            <motion.div
                key={exp.id}
                initial={{ scale: 0.5, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ opacity: 0 }}
                className="absolute text-4xl pointer-events-none"
                style={{ left: exp.x, top: exp.y }}
            >
                💥
            </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
