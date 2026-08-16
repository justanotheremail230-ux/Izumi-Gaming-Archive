import { games, recentlyPlayed, favoriteGames, wishlistGames } from "@/data/games";
import SearchableGameGrid from "./components/SearchableGameGrid";
import Navbar from "./components/Navbar";
import FadeInSection from "./components/FadeInSection";
import GameCard from "./components/GameCard";
import DecryptTitle from "./components/DecryptTitle";
import SocialHUD from "./components/SocialHUD";
import MemoriesSection from "./components/MemoriesSection";
import SpotifyWidget from "./components/SpotifyWidget"; // NEW: Spotify widget import

// Batch fetch IGDB covers & summaries for all sections in 1 single call
async function getBatchGameData(gameNames: string[]) {
  try {
    const tokenResponse = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`,
      { method: "POST", cache: "no-store" }
    );
    const tokenData = await tokenResponse.json();

    const formattedNames = Array.from(new Set(gameNames))
      .map((name) => `"${name}"`)
      .join(", ");

    const igdbResponse = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": process.env.TWITCH_CLIENT_ID!,
        Authorization: `Bearer ${tokenData.access_token}`,
      },
      body: `
        fields name, summary, cover.image_id;
        where name = (${formattedNames});
        limit 500;
      `,
      cache: "no-store",
    });

    const data = await igdbResponse.json();
    const gameDataMap: Record<string, { cover: string | null; summary: string }> = {};

    if (Array.isArray(data)) {
      data.forEach((game) => {
        gameDataMap[game.name] = {
          cover: game.cover?.image_id
            ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`
            : null,
          summary: game.summary || "No description available.",
        };
      });
    }

    return gameDataMap;
  } catch (error) {
    console.error("Failed to batch fetch games:", error);
    return {};
  }
}

export default async function Home() {
  // Collect all game titles across all sections
  const allTitles = [
    ...games.map((g) => g.title),
    ...recentlyPlayed.map((g) => g.title),
    ...favoriteGames.map((g) => g.title),
    ...wishlistGames.map((g) => g.title),
  ];

  const igdbDataMap = await getBatchGameData(allTitles);

  // Attach auto-fetched covers to each section
  const libraryWithData = games.map((game) => ({
    ...game,
    cover: igdbDataMap[game.title]?.cover || null,
    summary: igdbDataMap[game.title]?.summary || "No description available.",
  }));

  const recentlyPlayedWithData = recentlyPlayed.map((game) => ({
    ...game,
    image: igdbDataMap[game.title]?.cover || "/placeholder.png",
  }));

  const favoritesWithData = favoriteGames.map((game) => ({
    ...game,
    image: igdbDataMap[game.title]?.cover || "/placeholder.png",
  }));

  const wishlistWithData = wishlistGames.map((game) => ({
    ...game,
    image: igdbDataMap[game.title]?.cover || "/placeholder.png",
  }));

  // ==========================================
  // AUTOMATIC STATS CALCULATION
  // ==========================================
  
  // 1. Calculate the most played genre
  const genreCounts = games.reduce((acc, game) => {
    acc[game.genre] = (acc[game.genre] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Sort genres by count and grab the top one
  const topGenre = Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0][0];

  // 2. Grab the #1 Favorite Game automatically
  const topGame = favoriteGames[0]?.title || "N/A";

  // ==========================================

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white relative">
      <Navbar />

      {/* HERO */}
      <section id="home" className="relative h-screen overflow-hidden">
        {/* PARALLAX FIX: Using a fixed background image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat scale-105"
          style={{ 
            backgroundImage: "url('/Banner/hero.png')",
            backgroundAttachment: "fixed" 
          }}
        />
        
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute bottom-0 left-0 w-full h-30 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent" />

        {/* Floating Right-Side Social HUD */}
        <SocialHUD />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 -mt-20">
          <p className="text-zinc-300 uppercase tracking-[0.5em] mb-4">Gaming Archive</p>
          
          {/* Cyberpunk Decrypt Title Component */}
          <DecryptTitle />

          <p className="text-zinc-300 text-lg md:text-xl mt-4">
            PC Gamer • Open World • RPG • Racing
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="relative z-20 max-w-6xl mx-auto px-6 -mt-24 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-zinc-900/70 backdrop-blur-2xl border border-zinc-700 rounded-3xl p-6 shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <p className="text-zinc-400 mb-2">Games Played</p>
            <h2 className="text-3xl font-bold">{games.length}</h2>
          </div>
          <div className="bg-zinc-900/70 backdrop-blur-2xl border border-zinc-700 rounded-3xl p-6 shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <p className="text-zinc-400 mb-2">Platform</p>
            <h2 className="text-3xl font-bold">PC</h2>
          </div>
          <div className="bg-zinc-900/70 backdrop-blur-2xl border border-zinc-700 rounded-3xl p-6 shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <p className="text-zinc-400 mb-2">Favorite Genre</p>
            <h2 className="text-2xl font-bold">{topGenre}</h2>
          </div>
          <div className="bg-zinc-900/70 backdrop-blur-2xl border border-zinc-700 rounded-3xl p-6 shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <p className="text-zinc-400 mb-2">Top Game</p>
            <h2 className="text-xl font-bold line-clamp-1" title={topGame}>{topGame}</h2>
          </div>
        </div>
      </section>

      {/* RECENTLY PLAYED */}
      <FadeInSection>
        <section id="recently-played" className="max-w-7xl mx-auto px-6 mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Recently Played</h2>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {recentlyPlayedWithData.map((game) => (
              <GameCard
                key={game.title}
                title={game.title}
                image={game.image}
                subtitle={game.subtitle}
                priority={true} 
              />
            ))}
          </div>
        </section>
      </FadeInSection>

      {/* FAVORITES */}
      <FadeInSection>
        <section id="favorites" className="max-w-7xl mx-auto px-6 mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Favorites</h2>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {favoritesWithData.map((game) => (
              <GameCard
                key={game.title}
                title={game.title}
                image={game.image}
                subtitle={game.subtitle}
              />
            ))}
          </div>
        </section>
      </FadeInSection>

      {/* WISHLIST */}
      <FadeInSection>
        <section id="wishlist" className="max-w-7xl mx-auto px-6 mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Wishlist</h2>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {wishlistWithData.map((game) => (
              <GameCard
                key={game.title}
                title={game.title}
                image={game.image}
                subtitle={game.subtitle}
              />
            ))}
          </div>
        </section>
      </FadeInSection>

      {/* MEMORIES & CLIPS SECTION */}
      <FadeInSection>
        <MemoriesSection />
      </FadeInSection>

      {/* GAME LIBRARY */}
      <FadeInSection>
        <section id="game-library" className="max-w-7xl mx-auto px-6 pb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Game Library</h2>
          <SearchableGameGrid games={libraryWithData} />
        </section>
      </FadeInSection>

      {/* FLOATING SPOTIFY WIDGET */}
      <SpotifyWidget />
    </main>
  );
}