"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, Sparkles, BookOpen, Utensils, Compass } from "lucide-react";


interface ScheduleItem {
  time: string;
  title: string;
  arabicSubtitle: string;
  description: string;
  icon: React.ReactNode;
}

const ITEMS: ScheduleItem[] = [
  {
    time: "4:00 PM",
    title: "Arrival of Baraat",
    arabicSubtitle: "وصول البارعات",
    description: "The groom and his family arrive at the venue, greeted with traditional rose petal ceremonies.",
    icon: <Compass className="w-5 h-5 text-emerald-deep" />,
  },
  {
    time: "4:30 PM",
    title: "The Sacred Nikah",
    arabicSubtitle: "عقد النكاح",
    description: "The solemnization of vows and signing of the marriage contract in the presence of witnesses.",
    icon: <BookOpen className="w-5 h-5 text-emerald-deep" />,
  },
  {
    time: "5:30 PM",
    title: "Ring Exchange & Dua",
    arabicSubtitle: "تبادل الخواتم والدعاء",
    description: "Exchanging rings followed by a collective prayer of blessings for the couple's eternal journey.",
    icon: <Heart className="w-5 h-5 text-emerald-deep" />,
  },
  {
    time: "6:30 PM",
    title: "The Royal Dinner",
    arabicSubtitle: "عشاء الزفاف",
    description: "A gourmet traditional Feast served to celebrate the newlywed couple's union.",
    icon: <Utensils className="w-5 h-5 text-emerald-deep" />,
  },
  {
    time: "8:00 PM",
    title: "The Rukhsati",
    arabicSubtitle: "الرخصتي",
    description: "A heartfelt farewell as the bride begins her new chapter, accompanied by prayers and blessings.",
    icon: <Sparkles className="w-5 h-5 text-emerald-deep" />,
  },
];

export default function ScheduleSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of this container to animate the line filling up
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="schedule" className="relative py-24 md:py-32 px-4 overflow-hidden">
      {/* Glow effect */}
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[140px] bg-gold-400/5 pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Title */}
        <div className="text-center mb-16 md:mb-24 z-10 flex flex-col items-center">
          <span className="text-[10px] tracking-[0.3em] uppercase text-gold-400 font-sans font-medium mb-2">
            The Timeline
          </span>
          <h2 className="text-3xl md:text-5xl font-heading text-gold-100 tracking-wide font-light">
            Event Schedule
          </h2>
          <div className="w-12 h-[1px] bg-gold-400/30 mt-4"></div>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative w-full z-10 flex flex-col items-center pl-6 md:pl-0">
          {/* Background Track Line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[1px] bg-gold-300/10 transform -translate-x-1/2"></div>

          {/* Animated Progress Line */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-gold-300 via-gold-400 to-gold-600 transform -translate-x-1/2"
          />

          <div className="flex flex-col gap-12 w-full">
            {ITEMS.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className={`flex flex-col md:flex-row items-start md:items-center w-full relative ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Icon Node Container */}
                  <div className="absolute left-6 md:left-1/2 top-1.5 md:top-1/2 w-10 h-10 rounded-full bg-gold-300 border-4 border-emerald-deep flex items-center justify-center transform -translate-x-1/2 md:-translate-y-1/2 z-10 shadow-lg glow-gold">
                    {item.icon}
                  </div>

                  {/* Empty Spacer Side */}
                  <div className="w-full md:w-1/2 hidden md:block"></div>

                  {/* Card Content Side */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                      isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                    }`}
                  >
                    <div
                      className="p-6 rounded-2xl border border-gold-300/15 relative overflow-hidden transition-all duration-300 hover:border-gold-300/35 hover:shadow-xl glass-panel"
                    >
                      {/* Subtitle / Calligraphy watermarked */}
                      <span
                        className={`absolute right-4 top-2 text-2xl font-arabic text-gold-300/5 select-none pointer-events-none hidden md:block ${
                          isEven ? "left-4 right-auto" : "right-4"
                        }`}
                      >
                        {item.arabicSubtitle}
                      </span>

                      <span className="inline-block text-[10px] tracking-widest font-sans font-semibold uppercase px-3 py-1 rounded-full mb-3 bg-gold-400/20 text-gold-300">
                        {item.time}
                      </span>

                      <h3 className="text-xl font-heading font-light mb-2 text-gold-200">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p
                        className="text-xs md:text-sm leading-relaxed font-sans font-light tracking-wide text-gold-100/70"
                      >
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
