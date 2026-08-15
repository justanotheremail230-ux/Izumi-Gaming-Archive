"use client";

type Props = {
  game: any;
  onClose: () => void;
};

export default function GameModal({
  game,
  onClose,
}: Props) {
  if (!game) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-zinc-900 rounded-xl p-6 max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="float-right text-white"
          onClick={onClose}
        >
          ✕
        </button>

        <img
          src={game.cover}
          alt={game.title}
          className="w-full rounded-lg mb-4"
        />

        <h2 className="text-3xl font-bold mb-2">
          {game.title}
        </h2>

        <p className="text-gray-400 mb-4">
          {game.genre}
        </p>

        <p>{game.summary}</p>
      </div>
    </div>
  );
}