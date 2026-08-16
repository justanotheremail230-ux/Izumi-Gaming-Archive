"use client";

import { useEffect, useState } from "react";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>/\\";

export default function DecryptTitle() {
  const targetText = "IZUMI";
  const [displayText, setDisplayText] = useState("#####");
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Wait for the intro loader to finish (1.5 seconds) before starting the effect
    const startTimer = setTimeout(() => {
      setHasStarted(true);
    }, 1500);

    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let iteration = 0;
    
    const interval = setInterval(() => {
      setDisplayText(
        targetText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return targetText[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      if (iteration >= targetText.length) {
        clearInterval(interval);
      }

      iteration += 1 / 2;
    }, 80);

    return () => clearInterval(interval);
  }, [hasStarted]);

  return (
    <h1
      className="text-7xl md:text-9xl font-black text-white tracking-widest font-mono"
      style={{
        textShadow: "0 0 25px rgba(22,188,249,0.5), 0 0 50px rgba(255,255,255,0.2)",
      }}
    >
      {displayText}
    </h1>
  );
}