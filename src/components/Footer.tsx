"use client";

import { useState } from "react";
import { Share2, Copy, Check, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: "Nikah Invitation: Arfas & Fidha",
      text: "You are cordially invited to witness the sacred Nikah union of Arfas Khan and Fidha Fathima on Dec 18, 2026.",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Share failed", err);
      }
    } else {
      // Fallback copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (err) {
        console.error("Copy failed", err);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-gold-300/10 py-16 px-6 overflow-hidden flex flex-col items-center justify-center font-sans bg-emerald-deep/60">
      {/* Glow effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-40 rounded-full blur-[100px] bg-gold-400/5 pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8 z-10">
        {/* Monogram */}
        <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-heading font-light tracking-widest text-gold-200">
              A & F
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase font-sans font-semibold text-gold-400">
              Sacred Covenant
            </span>
        </div>

        {/* Closing Warm Message */}
        <div className="flex flex-col gap-2 font-serif max-w-md text-gold-100">
          <p className="text-base md:text-lg italic font-light leading-relaxed">
            &ldquo;And We created you in pairs.&rdquo;
          </p>
          <p className="text-xs font-sans font-light tracking-wide opacity-70 leading-relaxed">
            Your presence and prayers are the greatest gifts we could receive. We look forward to celebrating this blessed union with you.
          </p>
        </div>

        {/* Share Button & Top button */}
        <div className="flex items-center gap-4 mt-2">
          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-sans tracking-widest uppercase bg-gold-400 text-emerald-deep hover:bg-gold-300 font-semibold hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? "Link Copied!" : "Share Invitation"}</span>
          </button>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full border border-gold-300/20 hover:border-gold-300/50 hover:bg-gold-400/10 text-gold-300 transition-all cursor-pointer"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Small Footer Notice */}
        <div className="text-[10px] tracking-[0.15em] uppercase font-light mt-4 text-gold-400/50">
          &copy; 2026 Arfas & Fidha. All Rights Reserved.
        </div>
      </div>

      {/* Floating Clipboard Copy Toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-gold-400 text-emerald-deep text-xs font-semibold px-4 py-2 rounded-full shadow-2xl tracking-wider uppercase font-sans flex items-center gap-2 border border-gold-300"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Invitation Link Copied to Clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
