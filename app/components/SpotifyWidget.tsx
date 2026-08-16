"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function SpotifyWidget() {
  // Mock state for design preview (you can hook this up to a Lanyard or Spotify API later!)
  const [song, setSong] = useState({
    title: "The Perfect Girl",
    artist: "Mareux",
    albumArt: "https://i.scdn.co/image/ab67616d0000b27341935ded233c70691761d763",
    isPlaying: true,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-3 p-3 bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/80 rounded-2xl shadow-2xl hover:border-cyan-500/40 transition-all duration-300 group max-w-[280px]"
    >
      {/* Album Art with pulse effect when playing */}
      <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-zinc-800">
        <img
          src={song.albumArt}
          alt={song.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {song.isPlaying && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
          </div>
        )}
      </div>

      {/* Song Info & Equalizer Animation */}
      <div className="flex flex-col min-w-0 pr-2">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">
            Spotify Live
          </span>
        </div>
        <p className="text-xs font-bold text-white truncate mt-0.5">
          {song.title}
        </p>
        <p className="text-[11px] text-zinc-400 truncate">{song.artist}</p>
      </div>

      {/* Mini Equalizer Bars */}
      <div className="flex items-end gap-[2px] h-4 ml-auto">
        <span className="w-[2px] bg-green-400 animate-[bounce_1s_infinite_100ms] rounded-full h-full" />
        <span className="w-[2px] bg-green-400 animate-[bounce_1s_infinite_300ms] rounded-full h-2/3" />
        <span className="w-[2px] bg-green-400 animate-[bounce_1s_infinite_200ms] rounded-full h-4/5" />
      </div>
    </motion.div>
  );
}