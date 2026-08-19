"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function ArcadePage() {
  const [selectedGame, setSelectedGame] = useState<"tictactoe" | "rps">("tictactoe");

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
            onClick={() => setSelectedGame("rps")}
            className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 ${
              selectedGame === "rps"
                ? "bg-cyan-500 text-black font-bold shadow-lg shadow-cyan-500/20"
                : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800"
            }`}
          >
            Rock, Paper, Scissors
          </button>
        </div>

        {/* Game Container Area */}
        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 rounded-3xl p-8 shadow-2xl min-h-[480px] flex flex-col items-center justify-center">
          {selectedGame === "tictactoe" ? <TicTacToeGame /> : <RockPaperScissorsGame />}
        </div>
      </section>
    </main>
  );
}

// ==========================================
// TIC-TAC-TOE WITH PVP & VS AI MODES
// ==========================================
function TicTacToeGame() {
  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
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
          .filter((val): val is number => val !== null);

        if (emptyIndices.length > 0) {
          const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
          const newBoard = [...board];
          newBoard[randomIndex] = "O";
          setBoard(newBoard);
          setIsXNext(true);
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isXNext, board, winner, isDraw, gameMode]);

  const handleClick = (index: number) => {
    if (board[index] || winner || isDraw) return;
    if (gameMode === "ai" && !isXNext) return;

    const newBoard = [...board];
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
            gameMode === "ai" ? "bg-cyan-500 text-black font-bold" : "text-zinc-400 hover:text-white"
          }`}
        >
          vs Bot (AI)
        </button>
        <button
          onClick={() => { setGameMode("pvp"); resetGame(); }}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            gameMode === "pvp" ? "bg-cyan-500 text-black font-bold" : "text-zinc-400 hover:text-white"
          }`}
        >
          2 Player (Local)
        </button>
      </div>

      <div className="mb-4 text-lg font-semibold">
        {winner ? (
          <span className="text-green-400">Winner: {winner === "X" ? "You" : gameMode === "ai" ? "AI Bot" : "Player O"} 🎉</span>
        ) : isDraw ? (
          <span className="text-yellow-400">It&apos;s a Draw! 🤝</span>
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
// ROCK, PAPER, SCISSORS VS AI MODULE
// ==========================================
type Choice = "rock" | "paper" | "scissors";

const choices: { id: Choice; label: string; emoji: string }[] = [
  { id: "rock", label: "Rock", emoji: "🪨" },
  { id: "paper", label: "Paper", emoji: "📄" },
  { id: "scissors", label: "Scissors", emoji: "✂️" },
];

function RockPaperScissorsGame() {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [aiChoice, setAiChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<string>("Make your move!");
  const [score, setScore] = useState({ wins: 0, losses: 0, ties: 0 });

  const handlePlay = (choice: Choice) => {
    const aiRandomChoice = choices[Math.floor(Math.random() * choices.length)].id;
    setPlayerChoice(choice);
    setAiChoice(aiRandomChoice);

    if (choice === aiRandomChoice) {
      setResult("It's a Tie! 🤝");
      setScore((prev) => ({ ...prev, ties: prev.ties + 1 }));
    } else if (
      (choice === "rock" && aiRandomChoice === "scissors") ||
      (choice === "paper" && aiRandomChoice === "rock") ||
      (choice === "scissors" && aiRandomChoice === "paper")
    ) {
      setResult("You Win! 🎉");
      setScore((prev) => ({ ...prev, wins: prev.wins + 1 }));
    } else {
      setResult("AI Bot Wins! 🤖");
      setScore((prev) => ({ ...prev, losses: prev.losses + 1 }));
    }
  };

  const resetRps = () => {
    setPlayerChoice(null);
    setAiChoice(null);
    setResult("Make your move!");
    setScore({ wins: 0, losses: 0, ties: 0 });
  };

  const getEmoji = (id: Choice | null) => {
    const found = choices.find((c) => c.id === id);
    return found ? found.emoji : "❓";
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-cyan-400">Rock, Paper, Scissors</h3>
        <p className="text-zinc-400 mt-1">{result}</p>
      </div>

      {/* Scoreboard */}
      <div className="flex gap-6 mb-8 bg-zinc-950 px-6 py-3 rounded-2xl border border-zinc-800 text-sm">
        <div className="text-center">
          <p className="text-zinc-500">Wins</p>
          <p className="text-green-400 font-bold text-lg">{score.wins}</p>
        </div>
        <div className="text-center">
          <p className="text-zinc-500">Losses</p>
          <p className="text-rose-400 font-bold text-lg">{score.losses}</p>
        </div>
        <div className="text-center">
          <p className="text-zinc-500">Ties</p>
          <p className="text-yellow-400 font-bold text-lg">{score.ties}</p>
        </div>
      </div>

      {/* Arena Display */}
      <div className="flex justify-around items-center w-full mb-8 bg-zinc-950/60 p-6 rounded-2xl border border-zinc-800">
        <div className="text-center">
          <p className="text-xs text-zinc-400 mb-2 font-medium">You</p>
          <div className="w-20 h-20 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center text-4xl shadow-inner">
            {getEmoji(playerChoice)}
          </div>
        </div>
        <span className="text-2xl font-black text-zinc-600">VS</span>
        <div className="text-center">
          <p className="text-xs text-zinc-400 mb-2 font-medium">AI Bot</p>
          <div className="w-20 h-20 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center text-4xl shadow-inner">
            {getEmoji(aiChoice)}
          </div>
        </div>
      </div>

      {/* Selection Buttons */}
      <div className="flex gap-4 w-full justify-center mb-6">
        {choices.map((item) => (
          <button
            key={item.id}
            onClick={() => handlePlay(item.id)}
            className="flex-1 py-3 bg-zinc-950 hover:bg-cyan-500/10 border border-zinc-800 hover:border-cyan-500/50 rounded-xl font-medium transition-all flex flex-col items-center gap-1 active:scale-95 group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">{item.emoji}</span>
            <span className="text-xs text-zinc-300 group-hover:text-cyan-300">{item.label}</span>
          </button>
        ))}
      </div>

      <button
        onClick={resetRps}
        className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium rounded-xl transition-all border border-zinc-700 text-sm"
      >
        Reset Scores
      </button>
    </div>
  );
}