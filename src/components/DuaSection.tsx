"use client";

import { motion } from "framer-motion";

export default function DuaSection() {
  return (
    <section
      id="dua"
      className="relative py-24 md:py-32 px-6 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Glow orb backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[140px] bg-gold-400/5 pointer-events-none z-0"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-full max-w-4xl text-center z-10 flex flex-col items-center gap-6 md:gap-8"
      >
        {/* Decorative Ornament Header */}
        <div className="w-16 h-16 text-gold-400 opacity-70 animate-pulse-slow">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="25" y="25" width="50" height="50" transform="rotate(45 50 50)" />
            <rect x="30" y="30" width="40" height="40" transform="rotate(45 50 50)" />
            <circle cx="50" cy="50" r="8" fill="currentColor" />
          </svg>
        </div>

        {/* The Arabic Dua Calligraphy */}
        <div className="relative py-4 flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-arabic text-gold-100 tracking-wide leading-loose text-gold shadow-gold font-light">
            بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mt-6"></div>
        </div>

        {/* Translation details */}
        <div className="flex flex-col items-center gap-4 max-w-2xl font-serif">
          <p className="text-lg md:text-xl font-light italic leading-relaxed text-gold-200">
            &ldquo;May Allah bless you, and shower His blessings upon you, and join you together in goodness.&rdquo;
          </p>
          <span className="text-[10px] tracking-[0.3em] uppercase text-gold-400 font-sans font-semibold">
            — Prophet Muhammad (PBUH) [Sunan Abi Dawud]
          </span>
        </div>

        {/* Bottom Graphic Ornament */}
        <div className="w-16 h-16 text-gold-400 opacity-70 rotate-180 animate-pulse-slow" style={{ animationDelay: "2s" }}>
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="25" y="25" width="50" height="50" transform="rotate(45 50 50)" />
            <rect x="30" y="30" width="40" height="40" transform="rotate(45 50 50)" />
            <circle cx="50" cy="50" r="8" fill="currentColor" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
