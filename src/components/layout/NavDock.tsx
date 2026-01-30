"use client";

import { motion } from "framer-motion";
import { Home, User, Code, Zap, Mail, Globe, Briefcase } from "lucide-react";
import clsx from "clsx";

const navItems = [
  { name: "Home", icon: Home, href: "#hero" },
  { name: "About", icon: User, href: "#about" },
  { name: "Experience", icon: Briefcase, href: "#experience" },
  { name: "Projects", icon: Code, href: "#projects" },
  { name: "Skills", icon: Zap, href: "#skills" },
  { name: "Contact", icon: Mail, href: "#contact" },
];

interface NavDockProps {
  onOpenPortal?: () => void;
}

export default function NavDock({ onOpenPortal }: NavDockProps) {
  return (
    <div className="fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto max-w-md md:max-w-none">
      <motion.div
        className="flex items-center justify-center gap-1 sm:gap-2 md:gap-4 px-2 sm:px-4 md:px-6 py-2 md:py-3 bg-space-gray/90 backdrop-blur-md rounded-xl md:rounded-2xl border border-portal-green/30 shadow-[0_0_20px_rgba(0,255,0,0.2)]"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      >
        {navItems.map((item) => (
          <motion.a
            key={item.name}
            href={item.href}
            className="relative group p-2 sm:p-2.5 md:p-3 rounded-lg md:rounded-xl hover:bg-portal-green/10 transition-colors active:bg-portal-green/20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <item.icon className="w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-portal-green transition-colors" />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-space-black text-portal-green text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-portal-green/20 hidden md:block">
              {item.name}
            </span>
          </motion.a>
        ))}

        {/* Divider */}
        <div className="w-px h-6 bg-portal-green/30 mx-1 hidden sm:block" />

        {/* Portal Re-Entry Button */}
        <motion.button
            onClick={onOpenPortal}
            className="relative group p-2 sm:p-2.5 md:p-3 rounded-lg md:rounded-xl hover:bg-portal-green/10 transition-colors text-portal-green active:bg-portal-green/20"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
            title="Switch Dimension"
        >
            <Globe className="w-5 h-5 md:w-6 md:h-6 animate-pulse" />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-space-black text-portal-green text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-portal-green/20 hidden md:block">
              Switch Dimension
            </span>
        </motion.button>
      </motion.div>
    </div>
  );
}

