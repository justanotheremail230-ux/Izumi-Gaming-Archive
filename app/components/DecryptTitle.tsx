"use client";

import { useState } from "react";

interface DecryptTitleProps {
  text: string;
  className?: string;
}

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%*&";

export default function DecryptTitle({ text, className = "" }: DecryptTitleProps) {
  const [displayText, setDisplayText] = useState(text);

  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, 30);
  };

  return (
    <span onMouseEnter={scramble} className={`cursor-default ${className}`}>
      {displayText}
    </span>
  );
}