"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function ArcadePage() {
  const [selectedGame, setSelectedGame] = useState<"tictactoe" | "chess">("tictactoe");

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="max-w-5xl mx-auto px-6 pt-32 pb-24">
        <div className="text-center mb-12">
          <p className="text-cyan-400 uppercase tracking-[0.4em] mb-2 text-sm font-semibold">Interactive Lounge</p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">The Arcade</h1>
          <p className="text-zinc-400 mt-2">Take a quick break and play some mini-games right here on the site.</p>
        </div>

        {/* Game Switcher Tabs */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setSelectedGame("tictactoe")}
            className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 ${
              selectedGame === "tictactoe"
                ? "bg-cyan-500 text-black font-bold shadow-lg shadow-cyan-500/20"
                : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800"
            }`}
          >
            Tic-Tac-Toe
          </button>
          <button
            onClick={() => setSelectedGame("chess")}
            className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 ${
              selectedGame === "chess"
                ? "bg-cyan-500 text-black font-bold shadow-lg shadow-cyan-500/20"
                : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800"
            }`}
          >
            Mini Chess Puzzle
          </button>
        </div>

        {/* Game Container Area */}
        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 rounded-3xl p-8 shadow-2xl min-h-[480px] flex flex-col items-center justify-center">
          {selectedGame === "tictactoe" ? <TicTacToeGame /> : <MiniChessGame />}
        </div>
      </section>
    </main>
  );
}

// ==========================================
// TIC-TAC-TOE WITH PVP & VS AI MODES
// ==========================================
function TicTacToeGame() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameMode, setGameMode] = useState<"pvp" | "ai">("ai");

  const calculateWinner = (squares: Array<string | null>) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((square) => square !== null);

  useEffect(() => {
    if (gameMode === "ai" && !isXNext && !winner && !isDraw) {
      const timer = setTimeout(() => {
        const emptyIndices = board
          .map((val, idx) => (val === null ? idx : null))
          .filter((val) => val !== null) as number[];

        if (emptyIndices.length > 0) {
          const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
          const newBoard = board.slice();
          newBoard[randomIndex] = "O";
          setBoard(newBoard);
          setIsXNext(true);
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isXNext, board, winner, isDraw, gameMode]);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;
    if (gameMode === "ai" && !isXNext) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-2 mb-6 bg-zinc-950 p-1.5 rounded-xl border border-zinc-800">
        <button
          onClick={() => { setGameMode("ai"); resetGame(); }}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            gameMode === "ai" ? "bg-cyan-500 text-black" : "text-zinc-400 hover:text-white"
          }`}
        >
          vs Bot (AI)
        </button>
        <button
          onClick={() => { setGameMode("pvp"); resetGame(); }}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            gameMode === "pvp" ? "bg-cyan-500 text-black" : "text-zinc-400 hover:text-white"
          }`}
        >
          2 Player (Local)
        </button>
      </div>

      <div className="mb-4 text-lg font-semibold">
        {winner ? (
          <span className="text-green-400">Winner: {winner === "X" ? "You" : gameMode === "ai" ? "AI Bot" : "Player O"} 🎉</span>
        ) : isDraw ? (
          <span className="text-yellow-400">It's a Draw! 🤝</span>
        ) : (
          <span className="text-zinc-300">
            Current Turn:{" "}
            <strong className="text-cyan-400">
              {isXNext ? "You (X)" : gameMode === "ai" ? "AI Bot (O)..." : "Player O"}
            </strong>
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 w-72 h-72">
        {board.map((value, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-full h-full bg-zinc-950/80 border border-zinc-800 rounded-2xl text-3xl font-extrabold flex items-center justify-center hover:border-cyan-500/50 transition-all duration-200 active:scale-95 text-white shadow-inner"
          >
            <span className={value === "X" ? "text-cyan-400" : "text-purple-400"}>
              {value}
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="mt-6 px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium rounded-xl transition-all border border-zinc-700 text-sm"
      >
        Reset Board
      </button>
    </div>
  );
}

// ==========================================
// MINI CHESS MINI-GAME / PUZZLE MODULE
// ==========================================
function MiniChessGame() {
  const [message, setMessage] = useState("Select a White piece to move.");
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  
  const [pieces, setPieces] = useState<Array<{ type: string; player: "white" | "black" } | null>>([
    { type: "R", player: "black" }, { type: "K", player: "black" }, { type: "R", player: "black" }, null,
    null, null, null, null,
    null, null, null, null,
    { type: "R", player: "white" }, { type: "K", player: "white" }, { type: "R", player: "white" }, null,
  ]);

  const handleSquareClick = (index: number) => {
    const piece = pieces[index];
    if (selectedPiece === null) {
      if (piece && piece.player === "white") {
        setSelectedPiece(index);
        setMessage(`Selected ${piece.type}. Choose target square.`);
      }
    } else {
      const newPieces = [...pieces];
      newPieces[index] = newPieces[selectedPiece];
      newPieces[selectedPiece] = null;
      setPieces(newPieces);
      setSelectedPiece(null);
      setMessage("AI Bot is thinking...");

      setTimeout(() => {
        setMessage("Your turn! Move White pieces.");
      }, 600);
    }
  };

  const resetChess = () => {
    setPieces([
      { type: "R", player: "black" }, { type: "K", player: "black" }, { type: "R", player: "black" }, null,
      null, null, null, null,
      null, null, null, null,
      { type: "R", player: "white" }, { type: "K", player: "white" }, { type: "R", player: "white" }, null,
    ]);
    setSelectedPiece(null);
    setMessage("Game reset. Select a White piece.");
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-center">
        <h3 className="text-lg font-bold text-cyan-400">Mini Tactical Chess vs AI</h3>
        <p className="text-zinc-400 text-xs mt-1">{message}</p>
      </div>

      <div className="grid grid-cols-4 gap-2 w-72 h-72 bg-zinc-950 p-3 rounded-2xl border border-zinc-800">
        {pieces.map((piece, index) => {
          const isSelected = selectedPiece === index;
          const isDarkSquare = (Math.floor(index / 4) + (index % 4)) % 2 === 1;

          return (
            <button
              key={index}
              onClick={() => handleSquareClick(index)}
              className={`w-full h-full rounded-xl flex items-center justify-center text-2xl font-bold transition-all ${
                isDarkSquare ? "bg-zinc-900" : "bg-zinc-800/60"
              } ${isSelected ? "ring-2 ring-cyan-400 bg-cyan-950/40" : "hover:bg-zinc-700/50"}`}
            >
              {piece && (
                <span className={piece.player === "white" ? "text-cyan-300 drop-shadow" : "text-rose-400 drop-shadow"}>
                  {piece.type === "R" ? "♖" : "♔"}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <button
        onClick={resetChess}
        className="mt-6 px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium rounded-xl transition-all border border-zinc-700 text-sm"
      >
        Restart Board
      </button>
    </div>
  );
}