"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "#home", icon: "🏠" },
    { name: "Recently Played", href: "#recently-played", icon: "🎮" },
    { name: "Favorites", href: "#favorites", icon: "⭐" },
    { name: "Wishlist", href: "#wishlist", icon: "📝" },
    { name: "Library", href: "#game-library", icon: "📚" },
    { name: "Arcade", href: "/arcade", icon: "🕹️" },
  ];

  return (
    <div 
      className="fixed top-6 left-6 z-50"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Floating Button (Visible when menu is closed) */}
      <div 
        className={`transition-all duration-300 ease-in-out ${
          open ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
        }`}
      >
        <button className="bg-black/60 backdrop-blur-xl border border-cyan-500/20 text-cyan-300 px-4 py-3 rounded-xl shadow-2xl hover:bg-cyan-500/10 cursor-default">
          ☰ Menu
        </button>
      </div>

      {/* The Sidebar Card (Visible when menu is open) */}
      <div
        className={`absolute top-0 left-0 w-72 bg-black/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ease-in-out origin-top-left ${
          open
            ? "opacity-100 translate-x-0 scale-100"
            : "opacity-0 -translate-x-4 scale-95 pointer-events-none"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center gap-3 p-4 border-b border-cyan-500/20">
          <button
            onClick={() => setOpen(false)}
            className="text-zinc-400 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-md px-2 py-1 text-lg transition-colors"
            aria-label="Close Navigation"
          >
            ✕
          </button>
          <h2 className="text-cyan-300 font-semibold text-lg tracking-wide m-0">
            Navigation
          </h2>
        </div>

        {/* MENU LINKS */}
        <div className="py-2">
          {links.map((link) => {
            const isHash = link.href.startsWith("#");
            const targetHref = isHash && pathname !== "/" ? "/" + link.href : link.href;

            return (
              <a
                key={link.href}
                href={targetHref}
                onClick={() => setOpen(false)}
                className="
                  flex
                  items-center
                  justify-start
                  gap-4
                  px-6
                  py-3.5
                  text-zinc-300
                  hover:text-cyan-300
                  hover:bg-cyan-500/10
                  transition-all
                  duration-200
                "
              >
                <span className="text-xl">{link.icon}</span>
                <span className="font-medium">{link.name}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}