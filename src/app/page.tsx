"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StarBackground from "@/components/layout/StarBackground";
import NavDock from "@/components/layout/NavDock";
import SpaceShooter from "@/components/layout/SpaceShooter";
import PortalTransition from "@/components/layout/PortalTransition";
import LoadingScreen from "@/components/layout/LoadingScreen";
import Footer from "@/components/layout/Footer";
import DimensionEffects from "@/components/layout/DimensionEffects";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

import DimensionSwitcher from "@/components/ui/DimensionSwitcher";
import PortalGunCursor from "@/components/ui/PortalGunCursor";
import EasterEggs from "@/components/ui/EasterEggs";
import SoundBoard from "@/components/ui/SoundBoard";
import ParallaxStory from "@/components/ui/ParallaxStory";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);

  return (
    <main className="relative min-h-screen">
      {/* Custom Cursor */}
      <PortalGunCursor />
      
      {/* Easter Eggs */}
      <EasterEggs />
      
      {/* Dimension-specific Effects */}
      <DimensionEffects />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
        ) : showIntro ? (
          <PortalTransition key="intro" onComplete={() => setShowIntro(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <StarBackground />
            <DimensionSwitcher onSwitch={() => setShowIntro(true)} />
            <SpaceShooter />
            <NavDock onOpenPortal={() => setShowIntro(true)} />
            
            {/* Sound Board */}
            <SoundBoard />
            
            <Hero />
            <About />
            
            {/* Parallax Story Section */}
            <ParallaxStory />
            
            <Experience />
            <Projects />
            <Skills />
            <Contact />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

