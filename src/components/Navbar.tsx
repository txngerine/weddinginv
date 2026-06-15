"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "Welcome", href: "#welcome" },
  { label: "Details", href: "#details" },
  { label: "Family", href: "#family" },
  { label: "RSVP", href: "#rsvp" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for scroll spy
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // triggers when section is in the middle of the screen
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.href.replace("#", ""));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetEl = document.getElementById(href.replace("#", ""));
    if (targetEl) {
      setIsMenuOpen(false);
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-500 flex justify-center py-4 px-4 md:px-8 ${
          isScrolled ? "translate-y-0" : "translate-y-2"
        }`}
      >
        <div
          className={`w-full max-w-6xl transition-all duration-500 rounded-full flex items-center justify-between px-6 py-2 md:py-3 ${
            isScrolled
              ? "glass-panel shadow-2xl border-gold-400/20"
              : "bg-transparent border-transparent"
          }`}
        >
          {/* Logo Insignia */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, "#hero")}
            className="flex items-center gap-1.5 font-heading text-xl md:text-2xl font-semibold tracking-widest text-gold-200"
          >
            <span>A</span>
            <span className="text-xs text-gold-400 font-serif font-light">&</span>
            <span>F</span>
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className={`text-xs tracking-[0.2em] uppercase transition-colors relative py-1 hover:text-gold-200 ${
                  activeSection === item.href.replace("#", "")
                    ? "text-gold-300 font-medium"
                    : "text-gold-100/60"
                }`}
              >
                {item.label}
                {activeSection === item.href.replace("#", "") && (
                  <motion.span
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold-400"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full transition-colors hover:bg-emerald-light/30 text-gold-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-20 md:hidden bg-emerald-deep/95 backdrop-blur-md flex items-center justify-center"
          >
            {/* Elegant Background Grid inside drawer */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#cb8d54_1px,transparent_1px),linear-gradient(to_bottom,#cb8d54_1px,transparent_1px)] bg-[size:32px_32px]"></div>

            <nav className="flex flex-col items-center gap-6 text-center z-10">
              <span className="text-3xl font-heading text-gold-200 mb-4">Arfas & Fidha</span>
              {NAV_ITEMS.map((item, idx) => (
                <motion.a
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`text-sm tracking-[0.3em] uppercase py-2 hover:text-gold-200 ${
                    activeSection === item.href.replace("#", "")
                      ? "text-gold-300 font-semibold"
                      : "text-gold-100/60"
                  }`}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
