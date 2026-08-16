import { games } from "@/data/games";
import SearchableGameGrid from "./components/SearchableGameGrid";
import Navbar from "./components/Navbar";
import FadeInSection from "./components/FadeInSection";
import GameCard from "./components/GameCard";

async function getGameData(gameName: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/games?name=${encodeURIComponent(gameName)}`,
      {
        cache: "no-store",
      }
    );

    const data = await response.json();

    const imageId = data?.[0]?.cover?.image_id;

    return {
      cover: imageId
        ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${imageId}.jpg`
        : null,
      summary: data?.[0]?.summary || "No description available.",
    };
  } catch {
    return {
      cover: null,
      summary: "No description available.",
    };
  }
}

export default async function Home() {
  const gamesWithData = await Promise.all(
    games.map(async (game) => {
      const igdbData = await getGameData(game.title);

      return {
        ...game,
        cover: igdbData.cover,
        summary: igdbData.summary,
      };
    })
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <Navbar />

      {/* HERO */}
      <section
        id="home"
        className="relative h-screen overflow-hidden"
      >
        <img
          src="/Banner/hero.png"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute bottom-0 left-0 w-full h-30 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 -mt-20">

          <p className="text-zinc-300 uppercase tracking-[0.5em] mb-4">
            Gaming Archive
          </p>

          <h1
            className="text-7xl md:text-9xl font-extrabold text-white tracking-wider"
            style={{
              textShadow:
                "0 0 20px rgba(255,255,255,0.25), 0 0 50px rgba(255,255,255,0.10)",
            }}
          >
            IZUMI
          </h1>

          <p className="text-zinc-300 text-lg md:text-xl mt-4">
            PC Gamer • Open World • RPG • Racing
          </p>

        </div>
      </section>

      {/* STATS */}
      <section className="relative z-20 max-w-6xl mx-auto px-6 -mt-24 pb-24">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          <div className="bg-zinc-900/70 backdrop-blur-2xl border border-zinc-700 rounded-3xl p-6 shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <p className="text-zinc-400 mb-2">
              Games Played
            </p>

            <h2 className="text-3xl font-bold">
              {games.length}
            </h2>
          </div>

          <div className="bg-zinc-900/70 backdrop-blur-2xl border border-zinc-700 rounded-3xl p-6 shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <p className="text-zinc-400 mb-2">
              Platform
            </p>

            <h2 className="text-3xl font-bold">
              PC
            </h2>
          </div>

          <div className="bg-zinc-900/70 backdrop-blur-2xl border border-zinc-700 rounded-3xl p-6 shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <p className="text-zinc-400 mb-2">
              Favorite Genre
            </p>

            <h2 className="text-2xl font-bold">
              Open World
            </h2>
          </div>

          <div className="bg-zinc-900/70 backdrop-blur-2xl border border-zinc-700 rounded-3xl p-6 shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <p className="text-zinc-400 mb-2">
              Top Game
            </p>

            <h2 className="text-xl font-bold">
              Red Dead Redemption 2
            </h2>
          </div>

        </div>

      </section>

      {/* RECENTLY PLAYED */}
      <FadeInSection>
        <section
          id="recently-played"
          className="max-w-7xl mx-auto px-6 mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Recently Played
          </h2>

          <div className="flex gap-6 overflow-x-auto pb-4">

            <GameCard
              title="Assassin's Creed Odyssey"
              image="https://images.igdb.com/igdb/image/upload/t_cover_big/co2ed3.jpg"
              subtitle="Recently Played"
            />

            <GameCard
              title="Assassin's Creed III"
              image="https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.jpg"
              subtitle="Recently Played"
            />

            <GameCard
              title="Battlefield 4"
              image="https://images.igdb.com/igdb/image/upload/t_cover_big/co1nmw.jpg"
              subtitle="Recently Played"
            />

          </div>
        </section>
      </FadeInSection>

      {/* FAVORITES */}
      <FadeInSection>
        <section
          id="favorites"
          className="max-w-7xl mx-auto px-6 mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Favorites
          </h2>

          <div className="flex gap-6 overflow-x-auto pb-4">

            <GameCard
              title="Red Dead Redemption 2"
              image="https://images.igdb.com/igdb/image/upload/t_cover_big/co1q1f.jpg"
              subtitle="Favorite"
            />

            <GameCard
              title="Assassin's Creed Odyssey"
              image="https://images.igdb.com/igdb/image/upload/t_cover_big/co2ed3.jpg"
              subtitle="Favorite"
            />

          </div>
        </section>
      </FadeInSection>

      {/* WISHLIST */}
      <FadeInSection>
        <section
          id="wishlist"
          className="max-w-7xl mx-auto px-6 mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Wishlist
          </h2>

          <div className="flex gap-6 overflow-x-auto pb-4">

            <GameCard
              title="GTA VI"
              image="https://images.igdb.com/igdb/image/upload/t_cover_big/co5vmg.jpg"
            />

            <GameCard
              title="Black Myth: Wukong"
              image="https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.jpg"
            />

            <GameCard
              title="Ghost of Tsushima"
              image="https://images.igdb.com/igdb/image/upload/t_cover_big/co6z0h.jpg"
            />

          </div>
        </section>
      </FadeInSection>

      {/* GAME LIBRARY */}
      <FadeInSection>
        <section 
          id="game-library" 
          className="max-w-7xl mx-auto px-6 pb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Game Library
          </h2>

          <SearchableGameGrid games={gamesWithData} />

        </section>
      </FadeInSection>
    </main>
  );
}