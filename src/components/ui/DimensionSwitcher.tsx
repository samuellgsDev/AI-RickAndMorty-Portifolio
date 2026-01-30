"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";

interface DimensionSwitcherProps {
  onSwitch: () => void;
}

export default function DimensionSwitcher({ onSwitch }: DimensionSwitcherProps) {
  return (
    <motion.button
      onClick={onSwitch}
      className="fixed top-6 right-64 z-50 flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md border border-portal-green/50 rounded-full text-portal-green hover:bg-portal-green/20 hover:scale-105 transition-all group"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <Zap className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
      <span className="font-mono text-sm font-bold tracking-wider">PORTAL GUN</span>
      
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-full bg-portal-green/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.button>
  );
}
