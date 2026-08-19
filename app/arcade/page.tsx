"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

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
            Play Chess (vs AI)
          </button>
        </div>

        {/* Game Container Area */}
        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 rounded-3xl p-8 shadow-2xl min-h-[480px] flex flex-col items-center justify-center">
          {selectedGame === "tictactoe" ? <TicTacToeGame /> : <FullChessGame />}
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
          .filter((val) => val !== null) as number[];

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
// FULL CHESS GAME VS AI MODULE
// ==========================================
function FullChessGame() {
  const [game, setGame] = useState(new Chess());
  const [status, setStatus] = useState("Your turn! Play as White.");

  function onDrop(sourceSquare: any, targetSquare: any) {
    if (game.isGameOver()) return false;

    try {
      const gameCopy = new Chess(game.fen());
      
      // Check if it's a pawn promotion move
      const piece = gameCopy.get(sourceSquare);
      const isPromotion =
        piece &&
        piece.type === "p" &&
        ((piece.color === "w" && targetSquare[1] === "8") ||
         (piece.color === "b" && targetSquare[1] === "1"));

      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: isPromotion ? "q" : undefined,
      });

      if (move === null) return false;

      setGame(gameCopy);

      if (gameCopy.isGameOver() || gameCopy.isDraw()) {
        setStatus("Game Over!");
        return true;
      }

      setStatus("AI Bot is thinking...");

      setTimeout(() => {
        const possibleMoves = gameCopy.moves({ verbose: true });
        if (possibleMoves.length > 0) {
          const randomIndex = Math.floor(Math.random() * possibleMoves.length);
          const aiMove = possibleMoves[randomIndex];
          
          gameCopy.move(aiMove);
          setGame(new Chess(gameCopy.fen()));

          if (gameCopy.isGameOver() || gameCopy.isDraw()) {
            setStatus("Game Over!");
          } else {
            setStatus("Your turn! Play as White.");
          }
        }
      }, 300);

      return true;
    } catch (e) {
      return false;
    }
  }

  return (
    <div className="flex flex-col items-center w-full max-w-[400px]">
      <div className="mb-6 text-center">
        <h3 className="text-xl font-bold text-cyan-400">Chess vs AI Bot</h3>
        <p className="text-zinc-400 mt-1">{status}</p>
      </div>

      <div className="w-full bg-zinc-950 p-2 rounded-lg border border-zinc-800 shadow-xl">
        <Chessboard 
          {...({
            position: game.fen(),
            onPieceDrop: onDrop,
            boardOrientation: "white",
            customDarkSquareStyle: { backgroundColor: '#27272a' },
            customLightSquareStyle: { backgroundColor: '#52525b' },
          } as any)}
        />
      </div>

      <button
        onClick={() => {
          setGame(new Chess());
          setStatus("Your turn! Play as White.");
        }}
        className="mt-8 px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium rounded-xl transition-all border border-zinc-700 text-sm"
      >
        Restart Chess Match
      </button>
    </div>
  );
}