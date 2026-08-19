"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function ArcadePage() {
  const [selectedGame, setSelectedGame] = useState<"tictactoe" | "rps" | "memory" | "guess" | "reaction">("tictactoe");

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
        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          <button
            onClick={() => setSelectedGame("tictactoe")}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
              selectedGame === "tictactoe"
                ? "bg-cyan-500 text-black font-bold shadow-lg shadow-cyan-500/20"
                : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800"
            }`}
          >
            Tic-Tac-Toe
          </button>
          <button
            onClick={() => setSelectedGame("rps")}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
              selectedGame === "rps"
                ? "bg-cyan-500 text-black font-bold shadow-lg shadow-cyan-500/20"
                : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800"
            }`}
          >
            Rock, Paper, Scissors
          </button>
          <button
            onClick={() => setSelectedGame("memory")}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
              selectedGame === "memory"
                ? "bg-cyan-500 text-black font-bold shadow-lg shadow-cyan-500/20"
                : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800"
            }`}
          >
            Memory Match
          </button>
          <button
            onClick={() => setSelectedGame("guess")}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
              selectedGame === "guess"
                ? "bg-cyan-500 text-black font-bold shadow-lg shadow-cyan-500/20"
                : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800"
            }`}
          >
            Number Guess
          </button>
          <button
            onClick={() => setSelectedGame("reaction")}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
              selectedGame === "reaction"
                ? "bg-cyan-500 text-black font-bold shadow-lg shadow-cyan-500/20"
                : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800"
            }`}
          >
            Reaction Timer
          </button>
        </div>

        {/* Game Container Area */}
        <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 rounded-3xl p-8 shadow-2xl min-h-[480px] flex flex-col items-center justify-center">
          {selectedGame === "tictactoe" ? (
            <TicTacToeGame />
          ) : selectedGame === "rps" ? (
            <RockPaperScissorsGame />
          ) : selectedGame === "memory" ? (
            <MemoryGame />
          ) : selectedGame === "guess" ? (
            <NumberGuessGame />
          ) : (
            <ReactionGame />
          )}
        </div>
      </section>
    </main>
  );
}

// ==========================================
// 1. TIC-TAC-TOE WITH PVP & VS AI MODES
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
// 2. ROCK, PAPER, SCISSORS VS AI MODULE
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

// ==========================================
// 3. MEMORY MATCH CARD FLIP GAME MODULE
// ==========================================
const cardIcons = ["🎮", "🕹️", "⚡", "🔥", "🚀", "🎯"];

interface CardItem {
  id: number;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
}

function MemoryGame() {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [firstSelection, setFirstSelection] = useState<number | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [matches, setMatches] = useState(0);

  const initializeGame = () => {
    const deck = [...cardIcons, ...cardIcons]
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({
        id: index,
        icon,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(deck);
    setFirstSelection(null);
    setMatches(0);
    setIsChecking(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (index: number) => {
    if (isChecking || cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    if (firstSelection === null) {
      setFirstSelection(index);
    } else {
      setIsChecking(true);
      const firstCard = cards[firstSelection];
      const secondCard = newCards[index];

      if (firstCard.icon === secondCard.icon) {
        newCards[firstSelection].isMatched = true;
        newCards[index].isMatched = true;
        setCards(newCards);
        setFirstSelection(null);
        setIsChecking(false);
        setMatches((prev) => prev + 1);
      } else {
        setTimeout(() => {
          newCards[firstSelection].isFlipped = false;
          newCards[index].isFlipped = false;
          setCards(newCards);
          setFirstSelection(null);
          setIsChecking(false);
        }, 800);
      }
    }
  };

  const isComplete = matches === cardIcons.length;

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-cyan-400">Memory Match</h3>
        <p className="text-zinc-400 mt-1">
          {isComplete ? "You matched all pairs! 🎉" : `Pairs Found: ${matches} / ${cardIcons.length}`}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-3 w-full mb-6">
        {cards.map((card, index) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(index)}
            className={`h-16 rounded-xl text-2xl flex items-center justify-center border transition-all duration-300 ${
              card.isFlipped || card.isMatched
                ? "bg-cyan-500/10 border-cyan-500/50 text-white"
                : "bg-zinc-950 border-zinc-800 hover:border-zinc-700 text-transparent"
            }`}
          >
            {card.isFlipped || card.isMatched ? card.icon : "❓"}
          </button>
        ))}
      </div>

      <button
        onClick={initializeGame}
        className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium rounded-xl transition-all border border-zinc-700 text-sm"
      >
        Restart Game
      </button>
    </div>
  );
}

// ==========================================
// 4. NUMBER GUESSING GAME (1 - 100)
// ==========================================
function NumberGuessGame() {
  const [targetNum, setTargetNum] = useState<number>(() => Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState<string>("");
  const [message, setMessage] = useState<string>("Guess a number between 1 and 100");
  const [attempts, setAttempts] = useState<number>(0);
  const [won, setWon] = useState<boolean>(false);

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(guess);
    if (isNaN(num)) return;

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (num === targetNum) {
      setMessage(`Correct! You found it in ${newAttempts} attempts! 🎉`);
      setWon(true);
    } else if (num < targetNum) {
      setMessage("Too low! Try a higher number 📈");
    } else {
      setMessage("Too high! Try a lower number 📉");
    }
    setGuess("");
  };

  const resetGuess = () => {
    setTargetNum(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setMessage("Guess a number between 1 and 100");
    setAttempts(0);
    setWon(false);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-cyan-400">Number Guessing</h3>
        <p className="text-zinc-400 mt-1">{message}</p>
      </div>

      <div className="w-full bg-zinc-950/60 p-6 rounded-2xl border border-zinc-800 mb-6 text-center">
        <p className="text-xs text-zinc-500 mb-3">Attempts: <span className="text-white font-bold">{attempts}</span></p>
        
        {!won ? (
          <form onSubmit={handleGuess} className="flex gap-2">
            <input
              type="number"
              min="1"
              max="100"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Enter number..."
              className="flex-1 bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-xl text-white focus:outline-none focus:border-cyan-500 text-sm"
              autoFocus
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl text-sm transition-all shadow-lg shadow-cyan-500/20"
            >
              Guess
            </button>
          </form>
        ) : (
          <button
            onClick={resetGuess}
            className="w-full py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-xl text-sm transition-all"
          >
            Play Again 🚀
          </button>
        )}
      </div>

      {!won && (
        <button
          onClick={resetGuess}
          className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium rounded-xl transition-all border border-zinc-700 text-sm"
        >
          Reset Game
        </button>
      )}
    </div>
  );
}

// ==========================================
// 5. REACTION TIME TESTER
// ==========================================
type ReactionState = "waiting" | "ready" | "clicked" | "result" | "early";

function ReactionGame() {
  const [gameState, setGameState] = useState<ReactionState>("waiting");
  const [startTime, setStartTime] = useState<number>(0);
  const [reactionTime, setReactionTime] = useState<number>(0);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const startTest = () => {
    setGameState("waiting");
    const randomTime = Math.floor(Math.random() * 2000) + 1500; // 1.5 to 3.5 seconds

    const id = setTimeout(() => {
      setGameState("ready");
      setStartTime(Date.now());
    }, randomTime);

    setTimerId(id);
  };

  const handleClick = () => {
    if (gameState === "waiting") {
      if (timerId) clearTimeout(timerId);
      setGameState("early");
    } else if (gameState === "ready") {
      const elapsed = Date.now() - startTime;
      setReactionTime(elapsed);
      setGameState("result");
    } else if (gameState === "result" || gameState === "early") {
      startTest();
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-cyan-400">Reaction Timer</h3>
        <p className="text-zinc-400 mt-1">Test your reflexes!</p>
      </div>

      {/* Interactive Box */}
      <div
        onClick={handleClick}
        className={`w-full h-56 rounded-2xl border flex flex-col items-center justify-center cursor-pointer transition-all p-6 text-center select-none shadow-xl ${
          gameState === "waiting"
            ? "bg-rose-950/40 border-rose-900/50 text-rose-300"
            : gameState === "ready"
            ? "bg-emerald-500 border-emerald-400 text-black font-black animate-pulse"
            : gameState === "early"
            ? "bg-amber-950/40 border-amber-900/50 text-amber-300"
            : "bg-zinc-950 border-zinc-800 text-white"
        }`}
      >
        {gameState === "waiting" && (
          <>
            <span className="text-3xl mb-2">⏳</span>
            <p className="text-lg font-bold">Wait for Green...</p>
            <p className="text-xs text-rose-400/80 mt-1">(Don't click too early!)</p>
          </>
        )}
        {gameState === "ready" && (
          <>
            <span className="text-4xl mb-2">⚡</span>
            <p className="text-3xl tracking-wide">CLICK NOW!</p>
          </>
        )}
        {gameState === "early" && (
          <>
            <span className="text-3xl mb-2">❌</span>
            <p className="text-lg font-bold">Too Soon!</p>
            <p className="text-xs text-zinc-400 mt-2">Click anywhere to try again.</p>
          </>
        )}
        {gameState === "result" && (
          <>
            <span className="text-3xl mb-2">🏆</span>
            <p className="text-sm text-zinc-400">Your Reaction Time:</p>
            <p className="text-3xl font-extrabold text-cyan-400 my-1">{reactionTime} ms</p>
            <p className="text-xs text-zinc-500 mt-2">Click anywhere to play again.</p>
          </>
        )}
        {/* Initial state trigger before first click */}
      </div>

      {gameState === "waiting" && timerId === null ? null : (
        <button
          onClick={(e) => {
            e.stopPropagation();
            startTest();
          }}
          className="mt-6 px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium rounded-xl transition-all border border-zinc-700 text-sm"
        >
          {gameState === "result" || gameState === "early" ? "Play Again" : "Start Test"}
        </button>
      )}
    </div>
  );
}