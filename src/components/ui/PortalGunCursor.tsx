"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMultiverse } from "@/context/MultiverseContext";
import clsx from "clsx";

export default function PortalGunCursor() {
  const { dimension } = useMultiverse();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 ||
        window.innerWidth < 768
      );
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Hide on touch devices
  if (isTouchDevice) return null;

  const cursorColor = dimension === "Pixel" ? "bg-pink-500 border-pink-500" :
                    dimension === "Prime" ? "bg-blue-500 border-blue-500" :
                    dimension === "Club" ? "bg-purple-500 border-purple-500" :
                    "bg-portal-green border-portal-green";
  
  const cursorBg = dimension === "Pixel" ? "bg-pink-500" :
                   dimension === "Prime" ? "bg-blue-500" :
                   dimension === "Club" ? "bg-purple-500" :
                   "bg-portal-green";

  return (
    <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[100] mix-blend-difference"
        animate={{
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            scale: isClicking ? 0.8 : 1
        }}
        transition={{
            type: "spring",
            mass: 0.1,
            stiffness: 800,
            damping: 20
        }}
    >
        {/* Crosshair */}
        <div className="relative w-full h-full">
            <div className={clsx("absolute top-1/2 left-0 w-full h-[2px] transform -translate-y-1/2 transition-colors duration-300", cursorBg)} />
            <div className={clsx("absolute top-0 left-1/2 w-[2px] h-full transform -translate-x-1/2 transition-colors duration-300", cursorBg)} />
            <div className={clsx("absolute top-1/2 left-1/2 w-4 h-4 border-2 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-colors duration-300", cursorColor)} />
        </div>
    </motion.div>
  );
}

