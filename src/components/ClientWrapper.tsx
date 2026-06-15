"use client";

import { useState } from "react";
import LoadingScreen from "./LoadingScreen";
import CustomCursor from "./CustomCursor";
import MusicPlayer from "./MusicPlayer";
import AmbientBackground from "./AmbientBackground";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import WelcomeSection from "./WelcomeSection";
import DetailsSection from "./DetailsSection";
import FamilySection from "./FamilySection";
import DuaSection from "./DuaSection";
import Footer from "./Footer";

export default function ClientWrapper() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="relative min-h-screen flex flex-col overflow-x-hidden">
          {/* Custom Cursor */}
          <CustomCursor />

          {/* Interactive Particle Backdrop */}
          <AmbientBackground />

          {/* Floating Navigation */}
          <Navbar />

          {/* Luxury Music Player */}
          <MusicPlayer />

          {/* Invitation Content Sections */}
          <main className="flex-1 w-full flex flex-col z-10">
            <HeroSection />
            <WelcomeSection />
            <DetailsSection />
            <FamilySection />
            <DuaSection />
          </main>

          {/* Elegant Footer */}
          <Footer />
        </div>
      )}
    </>
  );
}
