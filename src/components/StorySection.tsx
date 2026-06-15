"use client";

import { motion } from "framer-motion";


interface StoryEvent {
  date: string;
  title: string;
  description: string;
  imageUrl: string;
}

const EVENTS: StoryEvent[] = [
  {
    date: "August 12, 2023",
    title: "The First Meeting",
    description:
      "A serendipitous introduction through family sparked an instant connection. In a quiet cafe, hours dissolved into minutes as we discovered shared dreams, faith, and a laughter that felt like home.",
    imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop",
  },
  {
    date: "April 24, 2024",
    title: "Growing in Faith & Love",
    description:
      "Months of conversations, prayers, and laughter built a foundation of trust. We realized that our paths were meant to be walked together, complementing each other's journey closer to the Divine.",
    imageUrl: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600&auto=format&fit=crop",
  },
  {
    date: "October 10, 2025",
    title: "The Proposal",
    description:
      "Under a canopy of amber autumn leaves and glowing lanterns, a simple question was asked, and a tearful 'Yes' sealed our promise. We promised to stand by each other in every season of life.",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop",
  },
  {
    date: "December 18, 2026 • ١١ صَفَر",
    title: "Our Nikah Day",
    description:
      "The day we write our forever vows in the presence of our loved ones and under the blessings of Allah. A sacred covenant that marks the beginning of our eternal love story.",
    imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600&auto=format&fit=crop",
  },
];

export default function StorySection() {
  return (
    <section id="story" className="relative py-24 md:py-32 px-4 overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[150px] bg-emerald-light/10 pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-[150px] bg-gold-400/5 pointer-events-none z-0"></div>

      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Title */}
        <div className="text-center mb-16 md:mb-24 z-10 flex flex-col items-center">
          <span className="text-[10px] tracking-[0.3em] uppercase text-gold-400 font-sans font-medium mb-2">
            Our Journey
          </span>
          <h2 className="text-3xl md:text-5xl font-heading text-gold-100 tracking-wide font-light">
            Our Love Story
          </h2>
          <div className="w-12 h-[1px] bg-gold-400/30 mt-4"></div>
        </div>

        {/* Timeline */}
        <div className="relative w-full z-10">
          {/* Vertical Center Line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[1px] bg-gradient-to-b from-gold-400/10 via-gold-300/40 to-gold-400/10 transform -translate-x-1/2 hidden md:block"></div>

          <div className="flex flex-col gap-16 md:gap-24">
            {EVENTS.map((event, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center w-full relative ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 top-6 w-3 h-3 rounded-full bg-gold-400 border-2 border-emerald-deep transform -translate-x-1/2 z-10 hidden md:block glow-gold"></div>

                  {/* Empty Side (For desktop spacing alignment) */}
                  <div className="w-full md:w-1/2 px-4 md:px-8 hidden md:block"></div>

                  {/* Event Card Content */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] as const }}
                    className="w-full md:w-1/2 px-4 md:px-8"
                  >
                    <div
                      className="rounded-2xl border border-gold-300/15 overflow-hidden flex flex-col glass-panel"
                    >
                       {/* Image Frame */}
                       <div className="relative w-full h-48 sm:h-60 overflow-hidden group">
                         {/* eslint-disable-next-line @next/next/no-img-element */}
                         <img
                           src={event.imageUrl}
                           alt={event.title}
                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                           loading="lazy"
                         />
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/80 via-transparent to-transparent"></div>
                        <span className="absolute bottom-4 left-4 bg-gold-400 text-emerald-deep text-[10px] tracking-wider uppercase font-semibold px-3 py-1 rounded-full shadow-md">
                          {event.date}
                        </span>
                      </div>

                      {/* Text details */}
                      <div className="p-6 md:p-8 flex flex-col gap-3">
                        <h3 className="text-xl md:text-2xl font-heading font-light text-gold-200">
                          {event.title}
                        </h3>
                        <p
                          className="text-xs md:text-sm leading-relaxed font-sans font-light tracking-wide text-gold-100/70"
                        >
                          {event.description}
                        </p>
                      </div>
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
