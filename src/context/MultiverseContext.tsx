"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Dimension = "C-137" | "Pixel" | "Prime" | "Club";

interface MultiverseContextType {
  dimension: Dimension;
  setDimension: (dim: Dimension) => void;
  isTransitioning: boolean;
}

const MultiverseContext = createContext<MultiverseContextType | undefined>(undefined);

export function MultiverseProvider({ children }: { children: ReactNode }) {
  const [dimension, setDimension] = useState<Dimension>("C-137");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSetDimension = (dim: Dimension) => {
    setIsTransitioning(true);
    setDimension(dim);
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 2000);
  };

  useEffect(() => {
    // Apply theme class to body
    document.body.className = ""; // Reset
    document.body.classList.add(`theme-${dimension.toLowerCase()}`);
    
    // Add transition class for smooth theme changes
    if (isTransitioning) {
      document.body.classList.add("transitioning");
    }
  }, [dimension, isTransitioning]);

  return (
    <MultiverseContext.Provider value={{ dimension, setDimension: handleSetDimension, isTransitioning }}>
      {children}
    </MultiverseContext.Provider>
  );
}

export function useMultiverse() {
  const context = useContext(MultiverseContext);
  if (context === undefined) {
    throw new Error("useMultiverse must be used within a MultiverseProvider");
  }
  return context;
}
