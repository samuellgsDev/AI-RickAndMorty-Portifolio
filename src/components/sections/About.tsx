"use client";

import { motion } from "framer-motion";
import GlitchText from "@/components/ui/GlitchText";
import clsx from "clsx";
import { useMultiverse } from "@/context/MultiverseContext";

export default function About() {
  const { dimension } = useMultiverse();

  const ROLES = {
    "C-137": "MULTIVERSE DEV",
    "Pixel": "8-BIT WIZARD",
    "Prime": "SENIOR ARCHITECT",
    "Club": "RESIDENT DJ"
  };

  const DESCRIPTIONS = {
      "C-137": (
          <>
            Listen, Morty. I'm not just some average developer from <span className="text-rick-hair">Citadel of Ricks</span>. 
            I'm a full-stack engineer who traverses the multiverse of technologies. I build systems that withstand interdimensional travel.
          </>
      ),
      "Pixel": (
          <>
            INSERT COIN TO CONTINUE... I have cleared Level 99 of Full Stack Development. 
            My inventory is full of powerful frameworks and legendary algorithms. Awaiting new quest...
          </>
      ),
      "Prime": (
          <>
            Samuel is a dedicated precision engineer with a focus on scalable, high-performance architecture. 
            Delivering clean code and robust solutions for enterprise-grade applications.
          </>
      ),
      "Club": (
          <>
            Welcome to the VIP Lounge. Use the light toggle to start the show.
            I spin full-stack frameworks like vinyl records. Making sure your user experience hits harder than the bass drop.
          </>
      )
  };

  return (
    <section id="about" className="min-h-screen py-20 px-4 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-portal-green/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-rick-hair/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto max-w-5xl z-10">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
            >
                {/* Dossier Image / Card */}
                <div className="relative group">
                    <motion.div 
                        className="absolute -inset-1 bg-gradient-to-r from-portal-green to-rick-hair rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000"
                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />
                    <div className="relative bg-space-gray border border-portal-green/30 rounded-lg p-6 backdrop-blur-sm">
                        <div className="aspect-[3/4] bg-black/40 rounded flex items-center justify-center border-2 border-dashed border-gray-700 relative overflow-hidden group-hover:border-portal-green/50 transition-colors">
                            {/* Avatar Image */}
                            <div className="absolute inset-0 z-0">
                                <img 
                                    src="/samuel-avatar.jpg" 
                                    alt="Samuel Avatar" 
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 filter grayscale group-hover:grayscale-0"
                                />
                                {/* Overlay for CRT effect */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 pointer-events-none" />
                            </div>
                            
                            {/* Scanning line animation */}
                            <motion.div 
                                className="absolute top-0 left-0 w-full h-1 bg-portal-green/80 shadow-[0_0_15px_#00ff00] z-10"
                                animate={{ top: ["0%", "100%", "0%"] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            />
                            
                            {/* Tech overlay */}
                            <div className="absolute inset-0 z-10 p-2 flex flex-col justify-between pointer-events-none opacity-50">
                                <div className="flex justify-between text-[10px] text-portal-green font-mono">
                                    <span>REC</span>
                                    <span>[C-137]</span>
                                </div>
                                <div className="flex justify-between text-[10px] text-portal-green font-mono">
                                    <span>ISO: 800</span>
                                    <span>F/2.8</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-4 space-y-2 font-mono text-sm text-portal-green">
                            <div className="flex justify-between border-b border-portal-green/20 pb-1">
                                <span className="text-gray-400">STATUS:</span>
                                <span>{dimension === "Club" ? "VIBING" : "ALIVE"}</span>
                            </div>
                            <div className="flex justify-between border-b border-portal-green/20 pb-1">
                                <span className="text-gray-400">SPECIES:</span>
                                <span>{dimension === "Pixel" ? "NPC" : "HUMAN"}</span>
                            </div>
                            <div className="flex justify-between border-b border-portal-green/20 pb-1">
                                <span className="text-gray-400">ROLE:</span>
                                <span>{ROLES[dimension]}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-6">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-white">WHO IS </span>
                        <GlitchText text={dimension === "Club" ? "DJ SAM?" : "SAMUEL?"} className="text-portal-green" />
                    </h2>
                    
                    <div className="space-y-4 text-gray-300 font-sans text-base md:text-lg leading-relaxed border-l-4 border-portal-green/50 pl-4 md:pl-6">
                        <p>{DESCRIPTIONS[dimension]}</p>
                    </div>

                    <div className="pt-4">
                        <h3 className="text-xl text-portal-green font-creepster mb-2">Current Mission:</h3>
                        <p className="text-gray-400 font-mono text-sm bg-black/30 p-3 rounded border border-gray-800">
                            &gt; {dimension === "Pixel" ? "DEFEAT BOSS" : "SEEKING CHALLENGES"} <br/>
                            &gt; {dimension === "Pixel" ? "LEVEL UP" : "OPTIMIZING REALITY"} <br/>
                            &gt; {dimension === "Pixel" ? "INSERT COIN" : dimension === "Club" ? "DROPPING BEATS" : "DRINKING COFFEE"}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    </section>
  );
}
