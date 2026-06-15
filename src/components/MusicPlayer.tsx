"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music, ListMusic } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Track {
  title: string;
  category: string;
  url: string;
}

const PLAYLIST: Track[] = [
  {
    title: "American Wedding",
    category: "Frank Ocean Instrumental",
    url: "/music/american_wedding.mp3",
  },
  {
    title: "Serene Oud & Strings",
    category: "Soft Strings Instrumental",
    url: "https://upload.wikimedia.org/wikipedia/commons/d/d7/John_Michel_-_Bach_Cello_Suite_1_-_prelude.mp3",
  },
  {
    title: "Chopin's Wedding Vows",
    category: "Piano Wedding Theme",
    url: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Frederic_Chopin_-_Nocturne_Op._9_No._2_in_E_Flat_Major.mp3",
  },
  {
    title: "Spiritual Nasheed Ambient",
    category: "Islamic Nasheed Instrumental",
    url: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Gymnopedie_No._1.mp3",
  },
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.4); // Start at 40% volume
  const [isMuted, setIsMuted] = useState(false); // Start unmuted
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentTrack = PLAYLIST[currentTrackIndex];

  // Initialize Audio
  useEffect(() => {
    const audio = new Audio(currentTrack.url);
    audio.loop = true;
    audio.volume = isMuted ? 0 : volume;
    audioRef.current = audio;

    // Try to autoplay
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay was blocked
          setIsPlaying(false);
        });
    }

    // Auto-play/unmute trigger on first user interaction (like clicking "Open Invitation")
    const handleFirstInteraction = () => {
      if (audioRef.current) {
        setIsMuted(false);
        audioRef.current.muted = false;
        audioRef.current.volume = volume;
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log("Play on interaction blocked", err));
      }
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction);
    window.addEventListener("touchstart", handleFirstInteraction);
    window.addEventListener("scroll", handleFirstInteraction);

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle Volume Change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Smooth Fade Track Transition
  const transitionToTrack = (index: number) => {
    if (!audioRef.current) return;

    const fadeOutTime = 400; // ms
    const steps = 10;
    const fadeOutStep = audioRef.current.volume / steps;
    let currentStep = 0;

    // Clear any existing fades
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    // Fade Out
    fadeIntervalRef.current = setInterval(() => {
      if (!audioRef.current) return;
      
      if (currentStep < steps && audioRef.current.volume > 0) {
        audioRef.current.volume = Math.max(0, audioRef.current.volume - fadeOutStep);
        currentStep++;
      } else {
        clearInterval(fadeIntervalRef.current!);
        
        // Change track source
        audioRef.current.pause();
        audioRef.current.src = PLAYLIST[index].url;
        audioRef.current.load();
        setCurrentTrackIndex(index);

        // Play the new track
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          
          // Fade In
          let fadeInStep = 0;
          const targetVol = isMuted ? 0 : volume;
          const stepVal = targetVol / steps;
          
          fadeIntervalRef.current = setInterval(() => {
            if (!audioRef.current) return;
            if (fadeInStep < steps) {
              audioRef.current.volume = Math.min(targetVol, audioRef.current.volume + stepVal);
              fadeInStep++;
            } else {
              clearInterval(fadeIntervalRef.current!);
            }
          }, fadeOutTime / steps);
        }).catch((err) => {
          console.error("Playback failed", err);
          setIsPlaying(false);
        });
      }
    }, fadeOutTime / steps);
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // If we were muted, maybe we want to unmute when user clicks play
      if (isMuted) {
        setIsMuted(false);
      }
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Play failed", err);
      });
    }
  };

  const handleNext = () => {
    const nextIndex = (currentTrackIndex + 1) % PLAYLIST.length;
    transitionToTrack(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    transitionToTrack(prevIndex);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 font-sans select-none">
      {/* Floating interactive volume/unmute reminder when muted */}
      {isMuted && isPlaying && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gold-400 text-emerald-deep text-[10px] tracking-wider uppercase font-semibold px-3 py-1.5 rounded-full shadow-lg pointer-events-none mb-1 animate-bounce"
        >
          Tap to Unmute Music
        </motion.div>
      )}

      <div className="flex items-center gap-3">
        {/* Expanded Music Player Control Panel */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 20 }}
              className="glass-panel w-80 rounded-2xl p-4 flex flex-col gap-3 text-gold-100"
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b border-gold-300/10 pb-2">
                <div>
                  <h3 className="text-[10px] tracking-widest text-gold-400 uppercase font-medium">
                    Ambience Player
                  </h3>
                  <p className="text-xs text-gold-200 font-serif italic">
                    {currentTrack.category}
                  </p>
                </div>
                <button
                  onClick={() => setShowPlaylist(!showPlaylist)}
                  className="p-1.5 rounded-full hover:bg-gold-400/10 text-gold-300 transition-colors"
                  title="Playlist"
                >
                  <ListMusic className="w-4 h-4" />
                </button>
              </div>

              {/* Playlist Selection overlay */}
              {showPlaylist ? (
                <div className="flex flex-col gap-1.5 max-h-40 overflow-y-auto pr-1">
                  {PLAYLIST.map((track, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        if (i !== currentTrackIndex) transitionToTrack(i);
                        setShowPlaylist(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                        i === currentTrackIndex
                          ? "bg-gold-400/20 text-gold-100 font-medium"
                          : "hover:bg-gold-400/5 text-gold-300/80"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span>{track.title}</span>
                        <span className="text-[9px] opacity-60">{track.category}</span>
                      </div>
                      {i === currentTrackIndex && isPlaying && (
                        <span className="flex gap-0.5">
                          <span className="w-0.5 h-3 bg-gold-300 animate-pulse"></span>
                          <span className="w-0.5 h-3 bg-gold-300 animate-pulse" style={{ animationDelay: "0.2s" }}></span>
                          <span className="w-0.5 h-3 bg-gold-300 animate-pulse" style={{ animationDelay: "0.4s" }}></span>
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                /* Main controls */
                <div className="flex flex-col gap-3">
                  {/* Track name scroll info */}
                  <div className="py-1">
                    <p className="text-sm font-medium text-gold-100 truncate">
                      {currentTrack.title}
                    </p>
                  </div>

                  {/* Playback Controls */}
                  <div className="flex justify-center items-center gap-4">
                    <button
                      onClick={handlePrev}
                      className="p-2 rounded-full hover:bg-gold-400/10 text-gold-300 transition-colors"
                    >
                      <SkipBack className="w-4 h-4" />
                    </button>

                    <button
                      onClick={handlePlayPause}
                      className="p-3 bg-gold-400 text-emerald-deep rounded-full hover:scale-105 transition-transform shadow-md"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" fill="currentColor" /> : <Play className="w-5 h-5 translate-x-0.5" fill="currentColor" />}
                    </button>

                    <button
                      onClick={handleNext}
                      className="p-2 rounded-full hover:bg-gold-400/10 text-gold-300 transition-colors"
                    >
                      <SkipForward className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Volume Controls */}
                  <div className="flex items-center gap-3 border-t border-gold-300/10 pt-3">
                    <button
                      onClick={toggleMute}
                      className="text-gold-300 hover:text-gold-100 transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => {
                        const newVol = parseFloat(e.target.value);
                        setVolume(newVol);
                        if (isMuted && newVol > 0) setIsMuted(false);
                      }}
                      className="flex-1 h-1 bg-gold-300/20 rounded-lg appearance-none cursor-pointer accent-gold-400"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Circular Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl relative transition-all ${
            isExpanded
              ? "bg-gold-400 text-emerald-deep"
              : "glass-panel text-gold-300 hover:border-gold-300/40"
          }`}
        >
          {/* Animated equalizer visualizer bars */}
          {isPlaying && !isMuted ? (
            <div className="flex gap-[3px] items-end justify-center w-6 h-6 z-10">
              <span className="w-[2px] bg-current rounded-full animate-eq-bar-1" style={{ height: "40%" }}></span>
              <span className="w-[2px] bg-current rounded-full animate-eq-bar-2" style={{ height: "80%" }}></span>
              <span className="w-[2px] bg-current rounded-full animate-eq-bar-3" style={{ height: "50%" }}></span>
              <span className="w-[2px] bg-current rounded-full animate-eq-bar-4" style={{ height: "90%" }}></span>
              <span className="w-[2px] bg-current rounded-full animate-eq-bar-5" style={{ height: "30%" }}></span>
            </div>
          ) : (
            <Music className="w-5 h-5 z-10" />
          )}

          {/* Equalizer Custom CSS Injection */}
          <style jsx global>{`
            @keyframes eq-bar-1 {
              0%, 100% { height: 20%; } 50% { height: 70%; }
            }
            @keyframes eq-bar-2 {
              0%, 100% { height: 35%; } 50% { height: 95%; }
            }
            @keyframes eq-bar-3 {
              0%, 100% { height: 50%; } 50% { height: 30%; }
            }
            @keyframes eq-bar-4 {
              0%, 100% { height: 25%; } 50% { height: 85%; }
            }
            @keyframes eq-bar-5 {
              0%, 100% { height: 40%; } 50% { height: 60%; }
            }
            .animate-eq-bar-1 { animation: eq-bar-1 0.8s ease-in-out infinite; }
            .animate-eq-bar-2 { animation: eq-bar-2 0.7s ease-in-out infinite; }
            .animate-eq-bar-3 { animation: eq-bar-3 0.9s ease-in-out infinite; }
            .animate-eq-bar-4 { animation: eq-bar-4 0.6s ease-in-out infinite; }
            .animate-eq-bar-5 { animation: eq-bar-5 0.8s ease-in-out infinite; }
          `}</style>
        </motion.button>
      </div>
    </div>
  );
}
