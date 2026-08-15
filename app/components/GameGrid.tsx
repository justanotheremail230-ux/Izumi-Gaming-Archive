"use client";

import { useState } from "react";

export default function GameGrid({
  games,
}: {
  games: any[];
}) {
  const [selectedGame, setSelectedGame] = useState<any>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {games.map((game) => (
          <div
            key={game.title}
            onClick={() => setSelectedGame(game)}
            className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition cursor-pointer"
          >
            {game.cover ? (
              <img
                src={game.cover}
                alt={game.title}
                className="w-full h-52 object-cover"
              />
            ) : (
              <div className="w-full h-52 bg-zinc-800 flex items-center justify-center">
                No Cover
              </div>
            )}

            <div className="p-3">
              <h2 className="font-bold text-sm line-clamp-2">
                {game.title}
              </h2>

              <p className="text-zinc-400 text-xs mt-1">
                {game.genre}
              </p>

              <p className="text-yellow-400 text-sm mt-2">
                {"★".repeat(game.rating)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedGame && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedGame(null)}
        >
          <div
            className="bg-zinc-900 p-6 rounded-xl max-w-2xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="text-white float-right text-xl"
              onClick={() => setSelectedGame(null)}
            >
              ✕
            </button>

            <img
              src={selectedGame.cover}
              alt={selectedGame.title}
              className="w-64 mx-auto rounded-lg mb-4"
            />

            <h2 className="text-3xl font-bold mb-2">
              {selectedGame.title}
            </h2>

            <p className="text-zinc-400 mb-4">
              {selectedGame.genre}
            </p>

            <p>
              {selectedGame.summary ||
                "No description available."}
            </p>
          </div>
        </div>
      )}
    </>
  );
}