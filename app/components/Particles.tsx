"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Particles() {
  const [mounted, setMounted] = useState(false);
  
  // Ensures we only calculate window size on the client
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  // Create an array of 25 particles
  const particles = Array.from({ length: 25 });

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/30 rounded-full shadow-[0_0_8px_rgba(22,188,249,0.5)]"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 10,
            opacity: Math.random() * 0.5 + 0.2,
          }}
          animate={{
            y: -20,
            opacity: 0,
          }}
          transition={{
            duration: Math.random() * 10 + 15, // Float up slowly between 15-25 seconds
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}