"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function IntroLoader() {
  const [isVisible, setIsVisible] = useState(true);

  // Automatically remove the loader from the screen after the animation finishes
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.6, delay: 1.8, ease: "easeInOut" }}
    >
      <motion.h1
        className="text-5xl md:text-7xl font-extrabold tracking-[0.3em] text-white mb-8 ml-4"
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ textShadow: "0 0 25px rgba(22,188,249,0.4)" }}
      >
        IZUMI
      </motion.h1>

      {/* The glowing progress bar */}
      <div className="w-48 h-1 bg-zinc-900 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-cyan-400 shadow-[0_0_15px_rgba(22,188,249,1)]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
        />
      </div>
    </motion.div>
  );
}