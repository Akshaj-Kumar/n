import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, X, ArrowUp } from 'lucide-react';
import { coupleData } from '../data/romanticContent';
import { fireHeartBurst } from '../utils/confetti';

export default function FinalRomanticSection() {
  const [showHugModal, setShowHugModal] = useState(false);
  const [hugCount, setHugCount] = useState(() => {
    return parseInt(localStorage.getItem('akshaj_neha_hugs') || '108', 10);
  });

  const handleGiveHug = () => {
    const updated = hugCount + 1;
    setHugCount(updated);
    localStorage.setItem('akshaj_neha_hugs', updated.toString());
    setShowHugModal(true);
    fireHeartBurst();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="forever" className="relative pt-24 pb-16 px-4 sm:px-6 text-center overflow-hidden">
      {/* Background cinematic radial glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] bg-rose-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Giant Beating Neon Heart */}
        <motion.div
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="mx-auto w-24 h-24 sm:w-32 sm:h-32 mb-8 flex items-center justify-center relative"
        >
          <div className="absolute inset-0 rounded-full bg-rose-500/20 blur-2xl" />
          <Heart className="w-20 h-20 sm:w-28 sm:h-28 text-rose-500 fill-rose-600 drop-shadow-[0_0_35px_rgba(244,63,94,0.9)]" />
          <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-amber-300 drop-shadow-[0_0_12px_rgba(251,191,36,0.9)] animate-spin-slow" />
        </motion.div>

        {/* Monumental Couple Names */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-widest text-white mb-6 uppercase"
        >
          <span className="bg-gradient-to-r from-pink-300 via-rose-300 to-amber-200 bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(244,63,94,0.4)]">
            AKSHAJ
          </span>
          <span className="inline-block mx-3 text-rose-500 text-3xl sm:text-5xl align-middle">
            ❤️
          </span>
          <span className="bg-gradient-to-r from-amber-200 via-rose-300 to-pink-300 bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(244,63,94,0.4)]">
            NEHA
          </span>
        </motion.h2>

        {/* Romantic Quotes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-4 max-w-2xl mx-auto mb-12 px-4"
        >
          <p className="text-xl sm:text-2xl md:text-3xl font-serif italic text-rose-100 font-light leading-relaxed">
            “{coupleData.final.line1}”
          </p>

          <p className="text-base sm:text-xl text-rose-200/80 font-light leading-relaxed pt-2">
            “{coupleData.final.line2}”
          </p>
        </motion.div>

        {/* One More Hug? 🫂 Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <button
            id="btn-one-more-hug"
            onClick={handleGiveHug}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-12 py-4 sm:py-5 rounded-full font-serif text-lg sm:text-xl font-bold text-white bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 shadow-[0_0_35px_rgba(244,63,94,0.6)] hover:shadow-[0_0_55px_rgba(244,63,94,0.9)] hover:scale-105 active:scale-95 transition-all"
          >
            <span className="text-2xl group-hover:rotate-12 transition-transform">
              🫂
            </span>
            <span>{coupleData.final.hugButtonText}</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-black/30 border border-white/20 text-rose-200">
              {hugCount} Hugs Sent
            </span>
          </button>
        </motion.div>

        {/* Back to top & copyright signature */}
        <div className="pt-12 border-t border-rose-500/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-rose-300/60 font-light">
          <p>
            Created with endless love by <span className="text-rose-200 font-medium">Akshaj</span> for his favorite person, <span className="text-rose-200 font-medium">Neha</span>. ❤️
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-rose-300 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Virtual Hug Modal */}
      <AnimatePresence>
        {showHugModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowHugModal(false)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full rounded-3xl p-8 glass-panel border border-rose-400/40 text-center shadow-[0_20px_50px_rgba(244,63,94,0.4)]"
            >
              <button
                onClick={() => setShowHugModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-rose-300 hover:text-white"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Animated Hug Hearts */}
              <div className="relative w-28 h-28 mx-auto mb-6 flex items-center justify-center">
                <motion.div
                  animate={{ x: [-12, -2, -12], rotate: [-10, 0, -10] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-16 h-16 rounded-full bg-rose-600 flex items-center justify-center text-white text-3xl shadow-lg z-10"
                >
                  ❤️
                </motion.div>
                <motion.div
                  animate={{ x: [12, 2, 12], rotate: [10, 0, 10] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-16 h-16 rounded-full bg-pink-500 flex items-center justify-center text-white text-3xl shadow-lg -ml-4"
                >
                  💖
                </motion.div>
                <span className="absolute -bottom-2 text-2xl animate-bounce">
                  🫂
                </span>
              </div>

              <h3 className="text-2xl font-serif font-bold text-white mb-3">
                {coupleData.final.hugTitle}
              </h3>

              <p className="text-sm text-rose-100/90 leading-relaxed font-light mb-6">
                {coupleData.final.hugMessage}
              </p>

              <div className="p-3 rounded-2xl bg-rose-950/40 border border-rose-500/20 text-xs text-amber-200 mb-6 font-medium">
                Akshaj gave you {hugCount} hugs so far! 🥰
              </div>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleGiveHug}
                  className="px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-md active:scale-95 transition-all"
                >
                  Hug Again 🫂
                </button>
                <button
                  onClick={() => setShowHugModal(false)}
                  className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all"
                >
                  Close & Smile 😊
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
