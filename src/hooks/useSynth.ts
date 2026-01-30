"use client";

import { useRef, useEffect } from "react";

export default function useSynth() {
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize AudioContext on first user interaction or mount
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    if (Ctx) {
        audioCtxRef.current = new Ctx();
    }
  }, []);

  const playTone = (freq: number, type: OscillatorType = "sine", duration: number = 0.1, vol: number = 0.5) => {
    if (!audioCtxRef.current) return;
    
    // Resume context if suspended (browser policy)
    if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
    }

    const osc = audioCtxRef.current.createOscillator();
    const gain = audioCtxRef.current.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);
    
    gain.gain.setValueAtTime(vol, audioCtxRef.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtxRef.current.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtxRef.current.destination);

    osc.start();
    osc.stop(audioCtxRef.current.currentTime + duration);
  };

  const playKick = () => {
      if (!audioCtxRef.current) return;
      playTone(150, "square", 0.5, 0.8);
      // Frequency sweep for kick
      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();
      osc.frequency.setValueAtTime(150, audioCtxRef.current.currentTime);
      osc.frequency.exponentialRampToValueAtTime(0.01, audioCtxRef.current.currentTime + 0.5);
      gain.gain.setValueAtTime(1, audioCtxRef.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtxRef.current.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);
      osc.start();
      osc.stop(audioCtxRef.current.currentTime + 0.5);
  };

  return { playTone, playKick };
}
