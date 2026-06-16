"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        const diff = Math.random() * 15;
        return Math.min(oldProgress + diff, 100);
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-emerald-deep select-none"
        >
          {/* Subtle Glow Backgrounds */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-light/10 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-600/5 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: "2s" }}></div>

          {/* Animated Islamic Mandala Outline */}
          <div className="relative w-40 h-40 md:w-64 md:h-64 flex items-center justify-center mb-6 md:mb-8">
            <svg
              className="absolute w-full h-full text-gold-300/20 animate-spin-slow"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            >
              {/* Complex Islamic geometric pattern */}
              <circle cx="50" cy="50" r="45" />
              <circle cx="50" cy="50" r="35" />
              {Array.from({ length: 12 }).map((_, i) => (
                <polygon
                  key={i}
                  points="50,5 95,50 50,95 5,50"
                  transform={`rotate(${i * 30} 50 50)`}
                />
              ))}
              {Array.from({ length: 8 }).map((_, i) => (
                <rect
                  key={i}
                  x="20"
                  y="20"
                  width="60"
                  height="60"
                  transform={`rotate(${i * 45} 50 50)`}
                />
              ))}
            </svg>

            {/* Inner glowing symbol */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="z-10 flex flex-col items-center"
            >
              <span className="text-2xl md:text-4xl text-gold-200 font-arabic text-center shadow-gold px-6">
                ﷽
              </span>
            </motion.div>
          </div>

          {/* Luxury Text Reveals */}
          <div className="text-center px-4 z-10">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-xs tracking-[0.3em] text-gold-300/70 font-sans uppercase mb-2"
            >
              The Nikkah Ceremony of
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1.2 }}
              className="text-3xl md:text-4xl font-heading text-gold-200 tracking-wide font-light mb-8"
            >
              Arfas Khan & Fidha Fathima
            </motion.h1>
          </div>

          {/* Luxury Progress Bar or Enter Button */}
          <div className="h-16 flex items-center justify-center">
            {progress < 100 ? (
              <div className="flex flex-col items-center z-10">
                <div className="w-48 h-[1px] bg-emerald-light/30 relative overflow-hidden">
                  <motion.div
                    className="h-full bg-gold-300"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: "easeInOut" }}
                  />
                </div>
                <span className="text-[10px] tracking-[0.2em] text-gold-400/50 uppercase mt-2 font-sans">
                  Loading Experience {Math.round(progress)}%
                </span>
              </div>
            ) : (
              <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                onClick={() => {
                  setIsDone(true);
                  setTimeout(onComplete, 800);
                }}
                className="px-8 py-3 rounded-full border border-gold-300 bg-gold-400/10 hover:bg-gold-400 text-gold-200 hover:text-emerald-deep font-sans text-xs tracking-[0.3em] uppercase font-semibold transition-all duration-500 hover:scale-105 active:scale-95 shadow-lg shadow-gold-400/10 z-10 cursor-pointer"
              >
                Open Invitation
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
