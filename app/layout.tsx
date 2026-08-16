import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import "./globals.css";
import CursorGlow from "./components/CursorGlow";
import IntroLoader from "./components/IntroLoader";
import ScrollProgress from "./components/ScrollProgress";
import Particles from "./components/Particles";

const exo = Exo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Izumi Gaming Archive",
  description: "Personal Gaming Archive",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={exo.className}>
        {/* Our Cinematic Loader */}
        <IntroLoader />

        {/* Our Neon Scroll Bar */}
        <ScrollProgress />

        {/* Background Particles */}
        <Particles />

        {/* Global background effect */}
        <CursorGlow />
        
        {/* The rest of your website */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}