"use client";

import { useState, useEffect } from "react";

const moods = [
  { text: "Chilling and watching your code... 👀", emoji: "🤖" },
  { text: "Did you check out the Arcade yet? 🕹️", emoji: "🎮" },
  { text: "Beep boop! Clean code detected. ✨", emoji: "⚡" },
  { text: "Need a snack break? 🍕", emoji: "🦊" },
  { text: "You're doing great today! 🚀", emoji: "⭐" },
];

export default function VirtualPet() {
  const [isOpen, setIsOpen] = useState(true);
  const [moodIndex, setMoodIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Cycle through cute random sayings every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMoodIndex((prev) => (prev + 1) % moods.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handlePetClick = () => {
    setIsAnimating(true);
    setMoodIndex(Math.floor(Math.random() * moods.length));
    setTimeout(() => setIsAnimating(false), 500);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-black/80 backdrop-blur-xl border border-cyan-500/30 text-cyan-400 p-3 rounded-2xl shadow-2xl hover:scale-110 transition-all text-xl"
        title="Wake up companion"
      >
        🤖
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 max-w-xs animate-bounce-subtle">
      {/* Speech Bubble */}
      <div className="bg-zinc-900/90 backdrop-blur-xl border border-cyan-500/30 text-zinc-200 px-4 py-2.5 rounded-2xl shadow-2xl text-xs relative flex items-center gap-2">
        <span>{moods[moodIndex].text}</span>
        <button
          onClick={() => setIsOpen(false)}
          className="text-zinc-500 hover:text-zinc-300 ml-1 text-sm font-bold"
          title="Minimize"
        >
          ×
        </button>
      </div>

      {/* Pet Avatar Box */}
      <button
        onClick={handlePetClick}
        className={`w-14 h-14 bg-black/80 backdrop-blur-xl border border-cyan-500/40 rounded-2xl shadow-2xl flex items-center justify-center text-2xl transition-transform duration-300 hover:border-cyan-400 ${
          isAnimating ? "scale-125 rotate-12" : "scale-100"
        }`}
        title="Click me!"
      >
        {moods[moodIndex].emoji}
      </button>
    </div>
  );
}