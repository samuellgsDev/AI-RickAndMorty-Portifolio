"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useMultiverse } from "@/context/MultiverseContext";
import clsx from "clsx";

interface StoryElement {
  text: string;
  emoji: string;
  position: "left" | "right" | "center";
}

const STORIES: Record<string, StoryElement[]> = {
  "C-137": [
    { text: "Once upon a time in Dimension C-137...", emoji: "🌀", position: "left" },
    { text: "A developer discovered the power of code", emoji: "💻", position: "right" },
    { text: "Building portals between technologies", emoji: "🔮", position: "center" },
    { text: "Solving impossible problems", emoji: "🧪", position: "left" },
    { text: "Creating innovations across the multiverse", emoji: "🚀", position: "right" },
  ],
  "Pixel": [
    { text: "PLAYER 1 ENTERED THE GAME", emoji: "🎮", position: "left" },
    { text: "LOADING SKILLS... 100%", emoji: "📊", position: "right" },
    { text: "QUEST: BUILD AMAZING APPS", emoji: "⚔️", position: "center" },
    { text: "EXPERIENCE POINTS +9999", emoji: "⭐", position: "left" },
    { text: "ACHIEVEMENT UNLOCKED!", emoji: "🏆", position: "right" },
  ],
  "Prime": [
    { text: "Professional excellence begins here", emoji: "📈", position: "left" },
    { text: "Clean architecture, clean code", emoji: "🏗️", position: "right" },
    { text: "Enterprise-grade solutions", emoji: "💼", position: "center" },
    { text: "Scalable and maintainable systems", emoji: "⚙️", position: "left" },
    { text: "Delivering measurable results", emoji: "✅", position: "right" },
  ],
  "Club": [
    { text: "THE PARTY IS ABOUT TO START", emoji: "🎉", position: "left" },
    { text: "DROP THE BASS... AND THE CODE", emoji: "🎵", position: "right" },
    { text: "VIBING WITH CREATIVE SOLUTIONS", emoji: "💃", position: "center" },
    { text: "MAKING APPS THAT HIT DIFFERENT", emoji: "🔥", position: "left" },
    { text: "THE SHOW NEVER STOPS", emoji: "🪩", position: "right" },
  ],
};

export default function ParallaxStory() {
  const { dimension } = useMultiverse();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth spring for parallax
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Transform values for different layers
  const y1 = useTransform(smoothProgress, [0, 1], [100, -100]);
  const y2 = useTransform(smoothProgress, [0, 1], [50, -150]);
  const y3 = useTransform(smoothProgress, [0, 1], [0, -200]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const stories = STORIES[dimension] || STORIES["C-137"];

  const themeColor = dimension === "Pixel" ? "text-pink-400 border-pink-500/30" :
                     dimension === "Prime" ? "text-blue-400 border-blue-500/30" :
                     dimension === "Club" ? "text-purple-400 border-purple-500/30" :
                     "text-portal-green border-portal-green/30";

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-[60vh] py-20 overflow-hidden"
      style={{ opacity }}
    >
      {/* Background floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => {
          const seedX = Math.sin(i * 12.9898) * 43758.5453;
          const seedY = Math.sin(i * 78.233) * 43758.5453;
          const left = (seedX - Math.floor(seedX)) * 100;
          const top = (seedY - Math.floor(seedY)) * 100;
          
          return (
            <motion.div
              key={i}
              className={clsx(
                "absolute w-2 h-2 rounded-full opacity-20",
                dimension === "Pixel" ? "bg-pink-500" :
                dimension === "Prime" ? "bg-blue-500" :
                dimension === "Club" ? "bg-purple-500" :
                "bg-portal-green"
              )}
              style={{
                left: `${left}%`,
                top: `${top}%`,
                y: i % 3 === 0 ? y1 : i % 3 === 1 ? y2 : y3,
              }}
            />
          );
        })}
      </div>

      {/* Story content */}
      <motion.div 
        className="container mx-auto px-4 max-w-4xl relative z-10"
        style={{ scale }}
      >
        <motion.h3
          className={clsx("text-center font-mono text-sm mb-12 tracking-widest", themeColor)}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          ▼ SCROLL TO DISCOVER ▼
        </motion.h3>

        <div className="space-y-16">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              className={clsx(
                "flex items-center gap-4",
                story.position === "left" && "justify-start",
                story.position === "right" && "justify-end",
                story.position === "center" && "justify-center"
              )}
              initial={{ 
                opacity: 0, 
                x: story.position === "left" ? -50 : story.position === "right" ? 50 : 0,
                y: 30
              }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <motion.div
                className={clsx(
                  "flex items-center gap-4 bg-black/40 backdrop-blur-sm border rounded-xl px-6 py-4 max-w-md",
                  themeColor
                )}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <motion.span 
                  className="text-3xl"
                  animate={{ 
                    y: [0, -5, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2 + index * 0.5, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {story.emoji}
                </motion.span>
                <p className={clsx(
                  "font-mono text-sm md:text-base",
                  dimension === "Pixel" ? "text-pink-100 font-bold tracking-wider" : "text-gray-200"
                )}>
                  {story.text}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom indicator */}
        <motion.div
          className={clsx("text-center mt-16 font-mono text-xs tracking-widest", themeColor)}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true }}
        >
          ━━━ THE JOURNEY CONTINUES ━━━
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
