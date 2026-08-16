"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  // This hook magically tracks how far down the page the user has scrolled
  const { scrollYProgress } = useScroll();
  
  // This adds a smooth "spring" physics effect so the bar doesn't look jittery
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-cyan-400 z-[9999] origin-left shadow-[0_0_20px_rgba(22,188,249,1)]"
      style={{ scaleX }}
    />
  );
}