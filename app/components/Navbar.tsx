"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      const recentlyPlayed =
        document.getElementById("recently-played");
      const favorites =
        document.getElementById("favorites");
      const wishlist =
        document.getElementById("wishlist");

      if (
        recentlyPlayed &&
        scrollPosition < recentlyPlayed.offsetTop
      ) {
        setActive("home");
        return;
      }

      if (
        wishlist &&
        scrollPosition >= wishlist.offsetTop
      ) {
        setActive("wishlist");
        return;
      }

      if (
        favorites &&
        scrollPosition >= favorites.offsetTop
      ) {
        setActive("favorites");
        return;
      }

      if (
        recentlyPlayed &&
        scrollPosition >= recentlyPlayed.offsetTop
      ) {
        setActive("recently-played");
        return;
      }

      setActive("home");
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const activeClass =
    "text-cyan-300 bg-cyan-500/10 shadow-[inset_0_-2px_0_rgba(22,188,249,0.7)]";

  const inactiveClass =
    "text-zinc-400 hover:text-white hover:bg-white/5";

  return (
    <header className="fixed top-0 left-0 w-full z-50 p-4">
      <div className="max-w-7xl mx-auto bg-black/40 backdrop-blur-2xl border border-zinc-700/60 rounded-[22px] overflow-hidden shadow-2xl">

        <div className="grid grid-cols-4 items-center">

          <a
            href="#home"
            className={`h-14 flex items-center justify-center text-sm md:text-base font-medium transition-all duration-300 ${
              active === "home"
                ? activeClass
                : inactiveClass
            }`}
          >
            Home
          </a>

          <a
            href="#recently-played"
            className={`h-14 flex items-center justify-center text-sm md:text-base font-medium border-l border-zinc-700/40 transition-all duration-300 ${
              active === "recently-played"
                ? activeClass
                : inactiveClass
            }`}
          >
            Recently Played
          </a>

          <a
            href="#favorites"
            className={`h-14 flex items-center justify-center text-sm md:text-base font-medium border-l border-zinc-700/40 transition-all duration-300 ${
              active === "favorites"
                ? activeClass
                : inactiveClass
            }`}
          >
            Favorites
          </a>

          <a
            href="#wishlist"
            className={`h-14 flex items-center justify-center text-sm md:text-base font-medium border-l border-zinc-700/40 transition-all duration-300 ${
              active === "wishlist"
                ? activeClass
                : inactiveClass
            }`}
          >
            Wishlist
          </a>

        </div>

      </div>
    </header>
  );
}