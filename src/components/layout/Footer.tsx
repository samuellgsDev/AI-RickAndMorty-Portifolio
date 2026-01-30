"use client";

import { motion } from "framer-motion";
import { useMultiverse } from "@/context/MultiverseContext";
import Portal from "@/components/ui/Portal";
import { Github, Linkedin, Heart, Sparkles } from "lucide-react";

const FOOTER_QUOTES = {
  "C-137": "\"Nobody exists on purpose. Nobody belongs anywhere. We're all going to die. Come build software with me.\"",
  "Pixel": "GAME OVER? INSERT COIN TO CONTINUE...",
  "Prime": "Building the future, one commit at a time.",
  "Club": "When the bass drops, so does the production code. 🎧"
};

const CREDITS = {
  "C-137": "© 2026 Dimension C-137. All realities reserved.",
  "Pixel": "© 2026 PLAYER 1. ALL RIGHTS UNLOCKED.",
  "Prime": "© 2026 Samuel Gadelha. All rights reserved.",
  "Club": "© 2026 DJ Sam Productions. Drop the bass, not the bugs."
};

export default function Footer() {
  const { dimension } = useMultiverse();

  return (
    <footer className="relative bg-space-black border-t border-portal-green/20 py-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-portal-green rounded-full"
            style={{
              left: `${(i * 5) % 100}%`,
              top: `${Math.sin(i) * 50 + 50}%`
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 2 + (i % 3) * 0.5,
              repeat: Infinity,
              delay: i * 0.1
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center mb-8 md:mb-12">
          
          {/* Mini Portal */}
          <motion.div 
            className="flex justify-center md:justify-start"
            whileHover={{ scale: 1.1 }}
          >
            <Portal size="sm" />
          </motion.div>

          {/* Quote */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400 italic font-mono text-sm leading-relaxed">
              {FOOTER_QUOTES[dimension]}
            </p>
          </motion.div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-end gap-4">
            <motion.a
              href="https://github.com/samuellgsDev"
              target="_blank"
              className="w-12 h-12 bg-space-gray rounded-full flex items-center justify-center border border-portal-green/30 hover:border-portal-green transition-all group"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Github className="w-5 h-5 text-gray-400 group-hover:text-portal-green transition-colors" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/samuellgs"
              target="_blank"
              className="w-12 h-12 bg-space-gray rounded-full flex items-center justify-center border border-blue-500/30 hover:border-blue-500 transition-all group"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </motion.a>
          </div>
        </div>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800" />
          </div>
          <div className="relative flex justify-center">
            <motion.span 
              className="bg-space-black px-4 text-portal-green"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              ⚛
            </motion.span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          {/* Credits */}
          <motion.p 
            className="text-gray-500 font-mono"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {CREDITS[dimension]}
          </motion.p>

          {/* Made With */}
          <div className="flex items-center gap-2 text-gray-500">
            <span>Built with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </motion.span>
            <span>and</span>
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4 text-portal-green" />
            </motion.span>
            <span>interdimensional caffeine</span>
          </div>

          {/* Easter Egg Hint */}
          <motion.p 
            className="text-gray-700 font-mono text-xs cursor-help"
            whileHover={{ color: "#00ff00" }}
            title="Try the Konami Code..."
          >
            ↑↑↓↓←→←→BA
          </motion.p>
        </div>

        {/* Glitch Report Link */}
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <a 
            href="https://github.com/samuellgsDev/portifolio-desafio-googleAI/issues"
            target="_blank"
            className="text-xs text-gray-600 hover:text-portal-green transition-colors font-mono"
          >
            🐛 Report a glitch in the matrix
          </a>
        </motion.div>
      </div>
    </footer>
  );
}
