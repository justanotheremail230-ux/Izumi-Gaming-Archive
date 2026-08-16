"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type GameCardProps = {
  title: string;
  image: string;
  subtitle?: string;
  priority?: boolean;
};

export default function GameCard({
  title,
  image,
  subtitle,
  priority = false,
}: GameCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0); 
    y.set(0); 
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="
        min-w-[200px]
        w-[200px]
        h-[330px]
        flex
        flex-col
        bg-zinc-900/60
        backdrop-blur-xl
        border
        border-zinc-800
        rounded-3xl
        overflow-hidden
        hover:border-cyan-400/40
        hover:shadow-[0_0_25px_rgba(22,188,249,0.15)]
        transition-colors
        duration-300
        cursor-pointer
        flex-shrink-0
      "
    >
      {/* Image Container with fixed height */}
      <div 
        className="relative w-full h-[220px] overflow-hidden pointer-events-none bg-zinc-800 flex-shrink-0"
        style={{ transform: "translateZ(40px)" }} 
      >
        {image && image !== "/placeholder.png" ? (
          <Image
            src={image}
            alt={title}
            fill
            priority={priority}
            className="object-cover"
            sizes="200px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-500 text-xs text-center p-2">
            No Cover Found
          </div>
        )}
      </div>

      {/* Text Container with strict line-clamping */}
      <div className="p-4 flex flex-col justify-between flex-grow pointer-events-none" style={{ transform: "translateZ(25px)" }}>
        <h3 className="font-bold text-sm leading-snug line-clamp-2 text-white">{title}</h3>
        {subtitle && (
          <p className="text-zinc-500 text-xs mt-1 line-clamp-1">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );
}