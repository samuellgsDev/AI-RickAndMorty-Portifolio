"use client";

import { motion } from "framer-motion";
import GlitchText from "@/components/ui/GlitchText";
import { Send, Tv, Github, Linkedin, Globe, Mail } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="min-h-screen py-20 px-4 flex flex-col items-center justify-center relative bg-space-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-portal-green/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
        
        {/* TV Form Side */}
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-space-gray border-4 border-gray-800 rounded-3xl p-1 shadow-2xl relative overflow-hidden"
        >
            {/* TV Frame styling */}
            <div className="absolute top-0 left-10 w-full h-1 bg-gray-700/50" />

            <div className="bg-black rounded-[1.3rem] p-8 border border-gray-800 relative overflow-hidden h-full">
                <div className="text-center mb-8 relative z-30">
                     <Tv className="w-12 h-12 text-portal-green mx-auto mb-4" />
                     <h2 className="text-2xl font-bold mb-2 text-white">
                        SEND TRANSMISSION
                     </h2>
                </div>

                <form className="space-y-4 relative z-30">
                    <div className="space-y-1">
                        <label className="text-xs font-mono text-gray-400">DESIGNATION</label>
                        <input type="text" className="w-full bg-gray-900/50 border border-portal-green/30 rounded p-2 text-white focus:outline-none focus:border-portal-green" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-mono text-gray-400">FREQUENCY</label>
                        <input type="email" className="w-full bg-gray-900/50 border border-portal-green/30 rounded p-2 text-white focus:outline-none focus:border-portal-green" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-mono text-gray-400">MESSAGE</label>
                        <textarea rows={3} className="w-full bg-gray-900/50 border border-portal-green/30 rounded p-2 text-white focus:outline-none focus:border-portal-green" />
                    </div>
                    <button className="w-full bg-portal-green text-black font-bold py-3 rounded flex items-center justify-center gap-2 hover:bg-neon-green transition-colors">
                        <Send className="w-4 h-4" /> TRANSMIT
                    </button>
                </form>
            </div>
        </motion.div>

        {/* Info Side */}
        <motion.div 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
        >
            <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                    <GlitchText text="CONTACT CHANNELS" className="text-white" />
                </h2>
                <p className="text-gray-400">
                    Reach out across dimensions. I'm available for new missions, freelance contracts, or just to talk about the complexity of the multiverse.
                </p>
            </div>

            <div className="space-y-4">
                <a href="mailto:samuellgs.dev@gmail.com" className="flex items-center gap-4 p-4 bg-space-gray rounded-xl hover:bg-gray-800 transition-colors border border-gray-700 group">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-portal-green group-hover:scale-110 transition-transform">
                        <Mail className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-xs text-gray-500 font-mono">EMAIL FREQUENCY</div>
                        <div className="text-white">samuellgs.dev@gmail.com</div>
                    </div>
                </a>


                <div className="grid grid-cols-3 gap-4">
                    <a href="https://github.com/samuellgsDev" target="_blank" className="flex flex-col items-center justify-center p-4 bg-space-gray rounded-xl hover:bg-portal-green/10 hover:border-portal-green transition-colors border border-gray-700 group">
                        <Github className="w-8 h-8 text-white group-hover:text-portal-green mb-2" />
                        <span className="text-xs text-gray-400">GitHub</span>
                    </a>
                    <a href="https://www.linkedin.com/in/samuellgs" target="_blank" className="flex flex-col items-center justify-center p-4 bg-space-gray rounded-xl hover:bg-blue-500/10 hover:border-blue-500 transition-colors border border-gray-700 group">
                        <Linkedin className="w-8 h-8 text-white group-hover:text-blue-500 mb-2" />
                        <span className="text-xs text-gray-400">LinkedIn</span>
                    </a>
                    <a href="https://www.samuellgs.dev" target="_blank" className="flex flex-col items-center justify-center p-4 bg-space-gray rounded-xl hover:bg-purple-500/10 hover:border-purple-500 transition-colors border border-gray-700 group">
                        <Globe className="w-8 h-8 text-white group-hover:text-purple-500 mb-2" />
                        <span className="text-xs text-gray-400">Website</span>
                    </a>
                </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
}
