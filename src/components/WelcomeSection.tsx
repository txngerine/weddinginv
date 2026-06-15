"use client";

import { motion } from "framer-motion";

export default function WelcomeSection() {
  return (
    <section
      id="welcome"
      className="relative py-24 md:py-32 px-6 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background glow overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-[100px] bg-gold-400/5 pointer-events-none z-0"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-full max-w-3xl text-center z-10 flex flex-col items-center gap-6 md:gap-8 p-8 md:p-12 rounded-3xl border border-gold-300/10 glass-panel"
      >
        {/* Animated Top Scroll Graphic */}
        <div className="w-24 h-8 text-gold-400 opacity-60">
          <svg className="w-full h-full" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M10,15 C30,5 40,25 50,15 C60,5 70,25 90,15" />
            <circle cx="50" cy="15" r="3" fill="currentColor" />
            <path d="M30,15 L70,15" strokeDasharray="3 3" />
          </svg>
        </div>

        {/* Islamic Greeting in Arabic */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-2xl md:text-3xl font-arabic text-gold-200 tracking-wide">
            السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ
          </span>
          <span className="text-[10px] md:text-xs tracking-[0.25em] font-sans uppercase font-medium mt-1 text-gold-300/80">
            Peace, Mercy, and Blessings of Allah be upon you
          </span>
        </div>

        {/* Invitation Message */}
        <div className="flex flex-col items-center gap-4 md:gap-6 font-serif">
          <p className="text-base md:text-lg leading-relaxed font-light italic text-gold-100">
            &ldquo;And among His signs is that He created for you mates from among yourselves that you may find tranquility in them; and He placed between you affection and mercy.&rdquo;
          </p>
          <span className="text-[10px] tracking-[0.3em] uppercase text-gold-400 font-sans font-medium">
            — Surah Ar-Rum [30:21]
          </span>

          <div className="w-12 h-[1px] bg-gold-400/30 my-2"></div>

          <p className="text-sm md:text-base leading-loose font-sans font-light tracking-wide text-gold-200/90">
            Under the grace of Allah (SWT), we request the honor of your presence to share in our joy
            and witness the sacred union of our hearts. Please join us for our Nikah ceremony as we
            embark on this beautiful journey of faith, love, and partnership.
          </p>
        </div>

        {/* Decorative Separator */}
        <div className="w-24 h-8 text-gold-400 opacity-60 rotate-180">
          <svg className="w-full h-full" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M10,15 C30,5 40,25 50,15 C60,5 70,25 90,15" />
            <circle cx="50" cy="15" r="3" fill="currentColor" />
            <path d="M30,15 L70,15" strokeDasharray="3 3" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
