"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function SearchableGameGrid({
  games,
}: {
  games: any[];
}) {
  const [search, setSearch] = useState("");
  const [selectedGame, setSelectedGame] = useState<any>(null);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState("A-Z");

  const genres = [
    "All",
    ...new Set(games.map((game) => game.genre)),
  ];

  let filteredGames = games.filter((game) => {
    const matchesSearch = game.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesGenre =
      selectedGenre === "All" || game.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  filteredGames.sort((a, b) => {
    if (sortBy === "A-Z") return a.title.localeCompare(b.title);
    if (sortBy === "Top Rated") return (b.rating || 0) - (a.rating || 0);
    if (sortBy === "Newest") return (b.year || 0) - (a.year || 0);
    return 0;
  });

  const gridContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const cardItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-5">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-3 py-1.5 text-sm rounded-full transition-all duration-300 ${
              selectedGenre === genre
                ? "bg-cyan-500 text-white shadow-[0_0_15px_rgba(22,188,249,0.35)]"
                : "bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 text-zinc-300 hover:border-cyan-400/40"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search your library..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 py-3 rounded-xl bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 focus:border-cyan-400/50 focus:shadow-[0_0_20px_rgba(22,188,249,0.15)] outline-none text-white transition-all duration-300"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
            🔍
          </span>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-5 py-3 rounded-xl bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 focus:border-cyan-400/50 focus:shadow-[0_0_20px_rgba(22,188,249,0.15)] outline-none text-white transition-all duration-300 cursor-pointer"
        >
          <option value="A-Z">Alphabetical (A-Z)</option>
          <option value="Top Rated">Top Rated</option>
          <option value="Newest">Newest Release</option>
        </select>
      </div>

      <motion.div 
        variants={gridContainer}
        initial="hidden"
        animate="show"
        key={sortBy + search + selectedGenre} 
        className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4"
      >
        {filteredGames.map((game) => (
          <motion.div
            key={game.title}
            variants={cardItem}
            whileHover={{ y: -6, scale: 1.03 }}
            onClick={() => setSelectedGame(game)}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-xl hover:border-cyan-400/40 hover:shadow-[0_0_25px_rgba(22,188,249,0.20)] transition-all duration-300">
              {game.cover ? (
                <motion.div
                  className="relative w-full aspect-[2/3]"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={game.cover}
                    alt={game.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 33vw, 20vw"
                  />
                </motion.div>
              ) : (
                <div className="w-full aspect-[2/3] bg-zinc-800 flex items-center justify-center">
                  No Cover
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black via-black/90 to-transparent">
                <h2 className="text-xs font-semibold line-clamp-2">
                  {game.title}
                </h2>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* MODAL WITH IMMERSIVE BLURRED BACKGROUND */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-hidden"
            onClick={() => setSelectedGame(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* IMMERSIVE BACKGROUND GLOW */}
            {selectedGame.cover && (
              <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-black/75 z-10" />
                <Image
                  src={selectedGame.cover}
                  alt=""
                  fill
                  className="object-cover blur-3xl opacity-35 scale-125"
                />
              </div>
            )}

            {/* MODAL CARD CONTENT */}
            <motion.div
              className="relative z-20 bg-zinc-900/90 border border-zinc-700/60 p-6 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl backdrop-blur-2xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <button
                className="float-right text-2xl text-zinc-400 hover:text-cyan-400 transition"
                onClick={() => setSelectedGame(null)}
              >
                ✕
              </button>

              {selectedGame.cover && (
                <div className="relative w-52 h-[300px] mx-auto mb-6 shadow-2xl rounded-2xl overflow-hidden border border-zinc-700">
                  <Image
                    src={selectedGame.cover}
                    alt={selectedGame.title}
                    fill
                    className="object-cover"
                    sizes="208px"
                  />
                </div>
              )}

              <div className="text-center mb-6">
                <h2 className="text-4xl font-bold mb-3">{selectedGame.title}</h2>
                <div className="flex justify-center flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm">
                    {selectedGame.genre}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-sm">PC</span>
                  <span className="px-3 py-1 rounded-full bg-zinc-800 text-yellow-400 text-sm">
                    {"★".repeat(selectedGame.rating || 5)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-zinc-800/40 border border-zinc-800 rounded-xl p-4">
                  <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Status</p>
                  <p className="font-semibold text-white">Completed</p>
                </div>
                <div className="bg-zinc-800/40 border border-zinc-800 rounded-xl p-4">
                  <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Release Year</p>
                  <p className="font-semibold text-white">{selectedGame.year}</p>
                </div>
              </div>

              <div className="border-t border-zinc-800 pt-6">
                <h3 className="text-xl font-semibold mb-3">About</h3>
                <p className="leading-8 text-zinc-300">
                  {selectedGame.summary || "No description available."}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}