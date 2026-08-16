"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { memories } from "@/data/memories";

export default function MemoriesSection() {
  const [activeMedia, setActiveMedia] = useState<any>(null);

  return (
    <section id="memories" className="max-w-7xl mx-auto px-6 mb-24">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Memories & Clips</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memories.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -6, scale: 1.02 }}
            onClick={() => setActiveMedia(item)}
            className="group cursor-pointer bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl overflow-hidden hover:border-cyan-400/40 hover:shadow-[0_0_25px_rgba(22,188,249,0.2)] transition-all duration-300"
          >
            <div className="relative w-full aspect-video bg-zinc-800">
              {item.type === "image" ? (
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="relative w-full h-full flex items-center justify-center bg-zinc-950">
                  {/* Video thumbnail preview or fallback icon */}
                  <span className="text-4xl text-cyan-400 group-hover:scale-110 transition-transform">▶</span>
                  <span className="absolute bottom-3 left-3 text-xs bg-black/70 px-2 py-1 rounded-md text-zinc-300">
                    Video Clip
                  </span>
                </div>
              )}
            </div>

            <div className="p-5">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg text-white group-hover:text-cyan-400 transition">
                  {item.title}
                </h3>
                <span className="text-xs text-zinc-500">{item.date}</span>
              </div>
              <p className="text-zinc-400 text-sm line-clamp-2">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal for Full View */}
      <AnimatePresence>
        {activeMedia && (
          <motion.div
            className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={() => setActiveMedia(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-zinc-900 border border-zinc-700 p-4 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                className="absolute top-4 right-4 z-10 text-2xl text-zinc-400 hover:text-cyan-400 bg-black/50 p-2 rounded-full transition"
                onClick={() => setActiveMedia(null)}
              >
                ✕
              </button>

              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black mb-4">
                {activeMedia.type === "image" ? (
                  <Image
                    src={activeMedia.src}
                    alt={activeMedia.title}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <video
                    src={activeMedia.src}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              <h3 className="text-2xl font-bold mb-1">{activeMedia.title}</h3>
              <p className="text-zinc-400 text-sm">{activeMedia.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}