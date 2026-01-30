"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, X, Volume2 } from "lucide-react";
import { useMultiverse } from "@/context/MultiverseContext";
import clsx from "clsx";

const PAD_CONFIG = [
  { key: "1", label: "KICK", color: "from-red-500 to-orange-500", freq: 60, type: "kick" },
  { key: "2", label: "SNARE", color: "from-orange-500 to-yellow-500", freq: 200, type: "snare" },
  { key: "3", label: "HI-HAT", color: "from-yellow-500 to-green-500", freq: 800, type: "hihat" },
  { key: "4", label: "CLAP", color: "from-green-500 to-teal-500", freq: 400, type: "clap" },
  { key: "5", label: "TOM", color: "from-teal-500 to-blue-500", freq: 120, type: "tom" },
  { key: "6", label: "BASS", color: "from-blue-500 to-indigo-500", freq: 80, type: "bass" },
  { key: "7", label: "SYNTH", color: "from-indigo-500 to-purple-500", freq: 440, type: "synth" },
  { key: "8", label: "LASER", color: "from-purple-500 to-pink-500", freq: 1200, type: "laser" },
];

export default function SoundBoard() {
  const { dimension } = useMultiverse();
  const [isOpen, setIsOpen] = useState(false);
  const [activePads, setActivePads] = useState<Set<string>>(new Set());
  const audioContextRef = useRef<AudioContext | null>(null);

  // Only show in Club dimension
  const shouldShow = dimension === "Club";

  // Initialize AudioContext
  useEffect(() => {
    if (typeof window !== "undefined" && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, []);

  const playSound = useCallback((pad: typeof PAD_CONFIG[0]) => {
    if (!audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const now = ctx.currentTime;

    // Create oscillator and gain
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    switch (pad.type) {
      case "kick":
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(150, now);
        oscillator.frequency.exponentialRampToValueAtTime(0.01, now + 0.5);
        gainNode.gain.setValueAtTime(1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        break;

      case "snare":
        // Add noise for snare
        oscillator.type = "triangle";
        oscillator.frequency.setValueAtTime(100, now);
        oscillator.frequency.exponentialRampToValueAtTime(60, now + 0.1);
        gainNode.gain.setValueAtTime(0.8, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        
        // Add noise burst
        const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < noiseBuffer.length; i++) {
          output[i] = Math.random() * 2 - 1;
        }
        const noiseSource = ctx.createBufferSource();
        const noiseGain = ctx.createGain();
        noiseSource.buffer = noiseBuffer;
        noiseSource.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noiseGain.gain.setValueAtTime(0.5, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        noiseSource.start(now);
        break;

      case "hihat":
        oscillator.type = "square";
        oscillator.frequency.setValueAtTime(pad.freq, now);
        filter.type = "highpass";
        filter.frequency.setValueAtTime(7000, now);
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        break;

      case "clap":
        oscillator.type = "triangle";
        oscillator.frequency.setValueAtTime(pad.freq, now);
        gainNode.gain.setValueAtTime(0.6, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        break;

      case "tom":
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(pad.freq, now);
        oscillator.frequency.exponentialRampToValueAtTime(50, now + 0.3);
        gainNode.gain.setValueAtTime(0.8, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        break;

      case "bass":
        oscillator.type = "sawtooth";
        oscillator.frequency.setValueAtTime(pad.freq, now);
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(400, now);
        gainNode.gain.setValueAtTime(0.7, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        break;

      case "synth":
        oscillator.type = "sawtooth";
        oscillator.frequency.setValueAtTime(pad.freq, now);
        oscillator.frequency.exponentialRampToValueAtTime(pad.freq * 2, now + 0.1);
        gainNode.gain.setValueAtTime(0.4, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        break;

      case "laser":
        oscillator.type = "sawtooth";
        oscillator.frequency.setValueAtTime(pad.freq, now);
        oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.3);
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        break;

      default:
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(pad.freq, now);
        gainNode.gain.setValueAtTime(0.5, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    }

    oscillator.start(now);
    oscillator.stop(now + 0.5);

    // Visual feedback
    setActivePads(prev => new Set(prev).add(pad.key));
    setTimeout(() => {
      setActivePads(prev => {
        const next = new Set(prev);
        next.delete(pad.key);
        return next;
      });
    }, 150);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    if (!isOpen || !shouldShow) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const pad = PAD_CONFIG.find(p => p.key === e.key);
      if (pad) {
        e.preventDefault();
        playSound(pad);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, shouldShow, playSound]);

  if (!shouldShow) return null;

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "fixed bottom-24 left-4 z-50 w-12 h-12 rounded-full border-2 backdrop-blur-md bg-black/50 flex items-center justify-center transition-all",
          "border-purple-500 text-purple-500 hover:bg-purple-500/20",
          isOpen && "bg-purple-500/30"
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Sound Board"
      >
        <Music className="w-6 h-6" />
      </motion.button>

      {/* Sound Board Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-40 left-4 z-50 bg-black/90 border border-purple-500/50 rounded-xl p-4 backdrop-blur-md"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-purple-400" />
                <span className="text-purple-400 font-mono text-sm font-bold">SOUND BOARD</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Pads Grid */}
            <div className="grid grid-cols-4 gap-2">
              {PAD_CONFIG.map((pad) => (
                <motion.button
                  key={pad.key}
                  onClick={() => playSound(pad)}
                  className={clsx(
                    "relative w-16 h-16 rounded-lg font-mono text-xs font-bold transition-all overflow-hidden",
                    "border border-gray-700 hover:border-white/50",
                    activePads.has(pad.key) ? "scale-95" : "scale-100"
                  )}
                  whileTap={{ scale: 0.9 }}
                >
                  {/* Background gradient */}
                  <div className={clsx(
                    "absolute inset-0 bg-gradient-to-br opacity-60",
                    pad.color,
                    activePads.has(pad.key) && "opacity-100"
                  )} />
                  
                  {/* Active glow */}
                  {activePads.has(pad.key) && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className={clsx("absolute inset-0 bg-gradient-to-br", pad.color)}
                    />
                  )}

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <span className="text-white/80 text-[10px]">{pad.key}</span>
                    <span className="text-white font-bold">{pad.label}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Hint */}
            <p className="text-gray-500 text-xs text-center mt-3 font-mono">
              Press 1-8 keys or tap pads
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
