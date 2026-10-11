import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Feather, RefreshCw, Sparkles, CheckCheck } from 'lucide-react';
import { coupleData } from '../data/romanticContent';
import { fireHeartBurst } from '../utils/confetti';

export default function LoveLetterSection() {
  const [revealedCount, setRevealedCount] = useState(1);
  const [isAutoWriting, setIsAutoWriting] = useState(true);
  const [heartReactions, setHeartReactions] = useState(() => {
    return parseInt(localStorage.getItem('letter_hearts') || '143', 10);
  });

  const paragraphs = coupleData.letter.paragraphs;

  // Auto line-by-line reveal
  useEffect(() => {
    if (!isAutoWriting) return;

    if (revealedCount < paragraphs.length) {
      const timer = setTimeout(() => {
        setRevealedCount((prev) => prev + 1);
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [revealedCount, isAutoWriting, paragraphs.length]);

  const handleRevealAll = () => {
    setRevealedCount(paragraphs.length);
    setIsAutoWriting(false);
  };

  const handleRestart = () => {
    setRevealedCount(1);
    setIsAutoWriting(true);
  };

  const handleReaction = () => {
    const updated = heartReactions + 1;
    setHeartReactions(updated);
    localStorage.setItem('letter_hearts', updated.toString());
    fireHeartBurst();
  };

  return (
    <section id="love-letter" className="relative py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Decorative Title */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-medium uppercase tracking-widest mb-3"
        >
          <Feather className="w-3.5 h-3.5 text-rose-400" />
          <span>From Akshaj's Heart to Neha</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl font-serif font-extrabold text-white tracking-tight"
        >
          A Personal{' '}
          <span className="bg-gradient-to-r from-pink-300 via-rose-300 to-amber-200 bg-clip-text text-transparent">
            Love Letter
          </span>
        </motion.h2>
        <p className="text-rose-200/70 text-sm sm:text-base mt-2 max-w-lg mx-auto font-light">
          Har lafz, har ehsaas, sirf aur sirf tumhare liye Neha…
        </p>
      </div>

      {/* Parchment Letter Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative parchment rounded-3xl p-7 sm:p-12 md:p-14 overflow-hidden border border-rose-500/30 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)]"
      >
        {/* Soft Background Warm Watermark / Filigree */}
        <div className="absolute top-6 right-6 w-32 h-32 md:w-48 md:h-48 opacity-5 pointer-events-none select-none">
          <Heart className="w-full h-full fill-rose-500 text-rose-500" />
        </div>

        {/* Vintage Wax Seal Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-rose-500/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-700 via-rose-800 to-rose-950 flex items-center justify-center border-2 border-amber-300/60 shadow-[0_0_20px_rgba(244,63,94,0.4)]">
              <span className="font-serif font-bold text-amber-200 text-sm tracking-wider">
                A ❤️ N
              </span>
            </div>
            <div>
              <p className="text-xs text-rose-300/60 tracking-wider uppercase font-semibold">
                Directly from the Heart
              </p>
              <p className="text-sm font-serif italic text-amber-200/90">
                {coupleData.letter.date}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {revealedCount < paragraphs.length && (
              <span className="inline-flex items-center gap-1.5 text-xs text-rose-400 animate-pulse font-mono bg-rose-950/40 px-3 py-1 rounded-full border border-rose-500/30">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                Writing...
              </span>
            )}
          </div>
        </div>

        {/* Handwritten Salutation */}
        <div className="mb-6">
          <h3 className="text-3xl sm:text-4xl font-handwriting text-rose-300 font-semibold drop-shadow-[0_2px_10px_rgba(244,114,182,0.4)]">
            {coupleData.letter.salutation}
          </h3>
        </div>

        {/* Animated Paragraphs */}
        <div className="space-y-6 text-base sm:text-lg md:text-xl text-rose-100/95 font-light leading-relaxed">
          {paragraphs.slice(0, revealedCount).map((p, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={`relative pl-4 border-l-2 ${
                idx === revealedCount - 1
                  ? 'border-rose-400 text-white font-normal'
                  : 'border-rose-500/30 text-rose-100/90'
              }`}
            >
              {p}
            </motion.p>
          ))}
        </div>

        {/* Closing & Handwritten Signature */}
        {revealedCount >= paragraphs.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="mt-12 pt-8 border-t border-rose-500/20 flex flex-col sm:flex-row sm:items-end justify-between gap-6"
          >
            <div>
              <p className="text-xs uppercase tracking-widest text-rose-400/80 mb-1">
                {coupleData.letter.closing}
              </p>
              <h4 className="text-4xl sm:text-5xl font-handwriting text-amber-200 drop-shadow-[0_2px_15px_rgba(251,191,36,0.4)]">
                {coupleData.letter.signature}
              </h4>
            </div>

            {/* Heart Reaction Trigger */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleReaction}
                className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white text-sm font-semibold shadow-[0_0_20px_rgba(244,63,94,0.5)] hover:scale-105 active:scale-95 transition-all"
              >
                <Heart className="w-4 h-4 fill-white group-hover:scale-125 transition-transform" />
                <span>Send Love to Akshaj ({heartReactions})</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Reveal Controls at bottom */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-rose-300/70 pt-4 border-t border-rose-500/10">
          <div className="flex items-center gap-3">
            {revealedCount < paragraphs.length ? (
              <button
                onClick={handleRevealAll}
                className="hover:text-white transition-colors underline underline-offset-4 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Reveal full letter now</span>
              </button>
            ) : (
              <button
                onClick={handleRestart}
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5 text-rose-400" />
                <span>Re-read with writing animation</span>
              </button>
            )}
          </div>

          <span className="text-[11px] font-mono text-rose-400/60">
            {revealedCount} of {paragraphs.length} paragraphs read
          </span>
        </div>
      </motion.div>
    </section>
  );
}
