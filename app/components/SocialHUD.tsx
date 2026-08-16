"use client";

import { motion } from "framer-motion";

export default function SocialHUD() {
  // Your provided links and handles
  const socials = [
    { name: "Steam", href: "https://steamcommunity.com/profiles/76561199078217387/", icon: "🎮" },
    { name: "YouTube", href: "https://www.youtube.com/@Not_AFK_23", icon: "▶" },
    { name: "Spotify", href: "https://open.spotify.com/user/31zlkezfjaihvr4vkcdygdufggne?si=bcc2794c578b490e", icon: "🎵" },
    { name: "Discord", text: "frek2303", icon: "💬" },
    { name: "Epic", text: "GandaPlayer_23", icon: "⚔️" },
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`Copied ${text} to clipboard!`);
  };

  return (
    <motion.div 
      className="absolute right-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      {socials.map((social) => (
        <motion.button
          key={social.name}
          onClick={() => social.href ? window.open(social.href, "_blank") : handleCopy(social.text!)}
          whileHover={{ scale: 1.08, x: -5 }}
          className="group relative flex items-center justify-end gap-3 px-4 py-3 rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(22,188,249,0.2)] transition-all duration-300"
        >
          <span className="text-xs uppercase tracking-widest text-zinc-400 group-hover:text-white transition">
            {social.name}
          </span>
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition">
            {social.icon}
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
}