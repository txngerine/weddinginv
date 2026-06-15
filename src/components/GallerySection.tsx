"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";


interface GalleryImage {
  src: string;
  alt: string;
  aspect: "aspect-square" | "aspect-[3/4]" | "aspect-[4/3]" | "aspect-[16/9]";
}

const IMAGES: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1596751303335-74f35836c353?q=80&w=600&auto=format&fit=crop",
    alt: "Mehndi Design on Bride's Hands",
    aspect: "aspect-[3/4]",
  },
  {
    src: "https://images.unsplash.com/photo-1544078751-58fed2b8493e?q=80&w=600&auto=format&fit=crop",
    alt: "Golden Nikah Wedding Rings",
    aspect: "aspect-square",
  },
  {
    src: "https://images.unsplash.com/photo-1519225495810-7512c696505a?q=80&w=600&auto=format&fit=crop",
    alt: "Groom's Traditional Attire Details",
    aspect: "aspect-[4/3]",
  },
  {
    src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600&auto=format&fit=crop",
    alt: "Ornate Emerald and Gold Tablescape Decor",
    aspect: "aspect-[3/4]",
  },
  {
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600&auto=format&fit=crop",
    alt: "Stunning Wedding Hall Canopy",
    aspect: "aspect-[16/9]",
  },
  {
    src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=600&auto=format&fit=crop",
    alt: "Fragrant White Rose Bridal Bouquet",
    aspect: "aspect-square",
  },
];

export default function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const showNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % IMAGES.length);
  };

  const showPrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + IMAGES.length) % IMAGES.length);
  };

  return (
    <section id="gallery" className="relative py-24 md:py-32 px-4 overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/4 right-1/3 w-80 h-80 rounded-full blur-[140px] bg-gold-400/5 pointer-events-none z-0"></div>

      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Title */}
        <div className="text-center mb-16 md:mb-24 z-10 flex flex-col items-center">
          <span className="text-[10px] tracking-[0.3em] uppercase text-gold-400 font-sans font-medium mb-2">
            Capturing Memories
          </span>
          <h2 className="text-3xl md:text-5xl font-heading tracking-wide font-light text-gold-100">
            Our Gallery
          </h2>
          <div className="w-12 h-[1px] bg-gold-400/30 mt-4"></div>
        </div>

        {/* Masonry-like Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 w-full z-10 space-y-6">
          {IMAGES.map((img, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.05 }}
              key={idx}
              className="break-inside-avoid relative rounded-2xl overflow-hidden border border-gold-300/15 group cursor-pointer shadow-lg"
              onClick={() => openLightbox(idx)}
            >
              {/* Photo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                className={`w-full ${img.aspect} object-cover transition-transform duration-700 group-hover:scale-105`}
                loading="lazy"
              />

              {/* Luxury Gold/Emerald Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/90 via-emerald-deep/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="flex justify-between items-center text-gold-100">
                  <div>
                    <h4 className="text-sm font-heading font-light tracking-wide">{img.alt}</h4>
                    <p className="text-[9px] uppercase tracking-wider text-gold-400 mt-1 font-sans">View Photo</p>
                  </div>
                  <div className="p-2 rounded-full bg-gold-400/20 text-gold-300">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-gold-200 hover:bg-white/20 transition-colors z-55 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={showPrev}
              className="absolute left-4 p-3 rounded-full bg-white/5 text-gold-200 hover:bg-white/10 transition-colors z-55 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={showNext}
              className="absolute right-4 p-3 rounded-full bg-white/5 text-gold-200 hover:bg-white/10 transition-colors z-55 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Main Image Container */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="max-w-4xl max-h-[80vh] relative flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMAGES[selectedIndex].src}
                alt={IMAGES[selectedIndex].alt}
                className="max-w-full max-h-[70vh] rounded-lg object-contain shadow-2xl border border-gold-300/20"
              />
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gold-200 font-heading text-lg tracking-wide text-center"
              >
                {IMAGES[selectedIndex].alt}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
