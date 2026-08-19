"use client";

import { useRef, useState, ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function MagneticButton({ children, className = "", onClick }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMoves = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current!.getBoundingClientRect();
    const centerx = left + width / 2;
    const centery = top + height / 2;
    const distanceX = clientX - centerx;
    const distanceY = clientY - centery;

    // Pull intensity factor
    setPosition({ x: distanceX * 0.3, y: distanceY * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMoves}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      }}
      className={`relative inline-block ${className}`}
    >
      {children}
    </button>
  );
}