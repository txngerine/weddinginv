"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Send, Sparkles, X } from "lucide-react";
import confetti from "canvas-confetti";

export default function RSVPSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attendance: "accept",
    guests: "1",
    dietary: "none",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const triggerConfetti = () => {
    // Custom confetti colors: Gold, Champagne, Emerald, and Pearl
    const colors = ["#f4eada", "#dbae82", "#cb8d54", "#0d3b2c", "#ffffff"];

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors,
      ticks: 200,
    });

    // Fire side bursts for a extra premium theatrical effect
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
    }, 150);

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);

    // Simulate database write / delay
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
      triggerConfetti();
    }, 1500);
  };

  return (
    <section id="rsvp" className="relative py-24 md:py-32 px-4 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-[160px] bg-gold-400/5 pointer-events-none z-0"></div>

      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {/* Title */}
        <div className="text-center mb-12 md:mb-16 z-10 flex flex-col items-center">
          <span className="text-[10px] tracking-[0.3em] uppercase text-gold-400 font-sans font-medium mb-2">
            WE WOULD BE HONORED
          </span>
          <h2 className="text-3xl md:text-5xl font-heading tracking-wide font-light text-gold-100">
            By Your Presence
          </h2>
          <div className="w-12 h-[1px] bg-gold-400/30 mt-4"></div>
          <p className="text-xs font-sans mt-3 tracking-widest uppercase text-gold-300/60">
            To Share In Our Joy
          </p>
        </div>

        {/* RSVP Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0 }}
          className="hidden w-full p-8 md:p-12 rounded-3xl border border-gold-300/15 relative z-10 glass-panel"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-sans">
            {/* Row 1: Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] tracking-widest uppercase font-semibold text-gold-300">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Tariq Al-Mansoor"
                  value={formData.name}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl border focus:outline-none transition-colors text-sm bg-emerald-deep/20 border-gold-300/20 text-gold-100 placeholder-gold-300/30 focus:border-gold-300"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] tracking-widest uppercase font-semibold text-gold-300">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="e.g. tariq@domain.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl border focus:outline-none transition-colors text-sm bg-emerald-deep/20 border-gold-300/20 text-gold-100 placeholder-gold-300/30 focus:border-gold-300"
                />
              </div>
            </div>

            {/* Row 2: Attendance Selector */}
            <div className="flex flex-col gap-3">
              <label className="text-[10px] tracking-widest uppercase font-semibold text-gold-300">
                Will you attend? *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Accept Card */}
                <label
                  className={`flex items-center gap-3 p-4 rounded-xl border border-gold-300/15 cursor-pointer transition-all hover:bg-gold-400/5 ${
                    formData.attendance === "accept"
                      ? "bg-gold-400/10 border-gold-300"
                      : "bg-transparent"
                  }`}
                >
                  <input
                    type="radio"
                    name="attendance"
                    value="accept"
                    checked={formData.attendance === "accept"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      formData.attendance === "accept"
                        ? "border-gold-300 bg-gold-400 text-emerald-deep"
                        : "border-gold-300/30 bg-transparent"
                    }`}
                  >
                    {formData.attendance === "accept" && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gold-100">Joyfully Accept</span>
                    <span className="text-[9px] opacity-60">Can&apos;t wait to celebrate!</span>
                  </div>
                </label>

                {/* Decline Card */}
                <label
                  className={`flex items-center gap-3 p-4 rounded-xl border border-gold-300/15 cursor-pointer transition-all hover:bg-gold-400/5 ${
                    formData.attendance === "decline"
                      ? "bg-gold-400/10 border-gold-300"
                      : "bg-transparent"
                  }`}
                >
                  <input
                    type="radio"
                    name="attendance"
                    value="decline"
                    checked={formData.attendance === "decline"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      formData.attendance === "decline"
                        ? "border-gold-300 bg-gold-400 text-emerald-deep"
                        : "border-gold-300/30 bg-transparent"
                    }`}
                  >
                    {formData.attendance === "decline" && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gold-100">Regretfully Decline</span>
                    <span className="text-[9px] opacity-60">Will miss it but sending blessings</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Row 3: Dropdowns for Guests & Dietary (Conditional) */}
            <AnimatePresence>
              {formData.attendance === "accept" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6 overflow-hidden"
                >
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] tracking-widest uppercase font-semibold text-gold-300">
                      Number of Guests (including you)
                    </label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="px-4 py-3 rounded-xl border focus:outline-none transition-colors text-sm appearance-none cursor-pointer bg-emerald-deep border-gold-300/20 text-gold-100 focus:border-gold-300"
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 People</option>
                      <option value="3">3 People</option>
                      <option value="4">4 People</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] tracking-widest uppercase font-semibold text-gold-300">
                      Dietary Preferences
                    </label>
                    <select
                      name="dietary"
                      value={formData.dietary}
                      onChange={handleChange}
                      className="px-4 py-3 rounded-xl border focus:outline-none transition-colors text-sm appearance-none cursor-pointer bg-emerald-deep border-gold-300/20 text-gold-100 focus:border-gold-300"
                    >
                      <option value="none">No specific preference</option>
                      <option value="halal">Strictly Halal</option>
                      <option value="vegetarian">Vegetarian</option>
                      <option value="vegan">Vegan</option>
                      <option value="allergies">Gluten/Nut Allergies</option>
                    </select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Row 4: Message text */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-widest uppercase font-semibold text-gold-300">
                Warm Message / Dua for the Couple
              </label>
              <textarea
                name="message"
                rows={4}
                placeholder="Share your prayers or a beautiful blessing message..."
                value={formData.message}
                onChange={handleChange}
                className="px-4 py-3 rounded-xl border focus:outline-none transition-colors text-sm resize-none bg-emerald-deep/20 border-gold-300/20 text-gold-100 placeholder-gold-300/30 focus:border-gold-300"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full py-4 bg-gold-400 hover:bg-gold-300 disabled:bg-gold-400/40 disabled:scale-100 text-emerald-deep rounded-xl text-xs font-semibold tracking-[0.25em] uppercase hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-emerald-deep border-t-transparent rounded-full animate-spin"></div>
                  <span>Securing RSVP...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit RSVP Response</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>

      {/* Success Modal overlay */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-panel max-w-md w-full border border-gold-300/25 p-8 rounded-3xl text-center relative flex flex-col items-center gap-6"
            >
              {/* Corner Accents */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-gold-300/40"></div>
              <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-gold-300/40"></div>
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-gold-300/40"></div>
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-gold-300/40"></div>

              {/* Close Button */}
              <button
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-4 right-4 text-gold-300 hover:text-gold-100"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon */}
              <div className="w-14 h-14 rounded-full bg-gold-400/20 border border-gold-300 flex items-center justify-center text-gold-200">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2">
                <span className="text-xl font-arabic text-gold-300">جزاك الله خيرا</span>
                <h3 className="text-2xl font-heading text-gold-100 font-light">RSVP Received</h3>
                <p className="text-xs text-gold-300/70 leading-relaxed font-sans max-w-[280px] mt-1 mx-auto">
                  {formData.attendance === "accept"
                    ? `Thank you, ${formData.name}. We are thrilled to welcome you along with ${
                        formData.guests === "1" ? "your guest" : `${formData.guests} guests`
                      } on our special day!`
                    : `Thank you, ${formData.name}. We are sorry you can't join us, but we sincerely appreciate your prayers and blessings!`}
                </p>
              </div>

              {/* Button */}
              <button
                onClick={() => setShowSuccessModal(false)}
                className="px-6 py-2.5 bg-gold-400 text-emerald-deep text-[10px] tracking-widest font-sans font-semibold uppercase rounded-full hover:bg-gold-300 transition-colors shadow-md"
              >
                Close Window
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
