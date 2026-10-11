import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Music } from 'lucide-react';
import { coupleData } from '../data/romanticContent';
import { fireCelebrationConfetti } from '../utils/confetti';
import { romanticAudio } from '../utils/audioService';

export default function RomanticWelcome({ onEnter }) {
  const handleOpenHeart = () => {
    fireCelebrationConfetti();
    // Start romantic background music upon this user interaction
    romanticAudio.play();
    if (onEnter) {
      onEnter();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden bg-[#070104]"
    >
      {/* Cinematic Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] md:w-[600px] h-[340px] md:h-[600px] bg-rose-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 left-1/4 w-[280px] h-[280px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating decorative mini-hearts */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [-4, 4, -4] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 mb-6 flex items-center justify-center"
      >
        <div className="relative">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-tr from-rose-600/30 to-pink-500/10 backdrop-blur-md border border-rose-500/40 flex items-center justify-center shadow-[0_0_50px_rgba(244,63,94,0.35)]">
            <Heart className="w-12 h-12 md:w-14 md:h-14 text-rose-400 fill-rose-500/90 animate-heart-beat filter drop-shadow-[0_0_15px_rgba(244,63,94,0.8)]" />
          </div>
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2.2, repeat: Infinity }}
            className="absolute -top-1 -right-1"
          >
            <Sparkles className="w-7 h-7 text-amber-300 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
          </motion.div>
        </div>
      </motion.div>

      {/* Couple Names with Cinematic Reveal */}
      <motion.div
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="relative z-10 max-w-2xl"
      >
        <p className="text-xs md:text-sm font-medium tracking-[0.3em] uppercase text-rose-300/80 mb-3 flex items-center justify-center gap-2">
          <span>✨</span>
          <span>A Love Surprise</span>
          <span>✨</span>
        </p>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-extrabold tracking-tight text-white mb-4">
          <span className="bg-gradient-to-r from-pink-200 via-rose-300 to-amber-200 bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(244,63,94,0.4)]">
            Akshaj
          </span>
          <span className="inline-block mx-3 text-rose-500 animate-pulse text-3xl sm:text-5xl md:text-6xl align-middle">
            ❤️
          </span>
          <span className="bg-gradient-to-r from-amber-200 via-rose-300 to-pink-200 bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(244,63,94,0.4)]">
            Neha
          </span>
        </h1>

        {/* Romantic Line */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-lg sm:text-2xl font-serif italic text-rose-100/90 font-light mb-4 px-4 leading-relaxed tracking-wide"
        >
          “{coupleData.welcome.romanticLine}”
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="text-xs sm:text-sm text-rose-300/60 font-light max-w-md mx-auto mb-10"
        >
          {coupleData.welcome.subtext}
        </motion.p>
      </motion.div>

      {/* Glowing Action Button: "Open My Heart 💌" */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="relative z-10"
      >
        <button
          id="btn-open-my-heart"
          onClick={handleOpenHeart}
          className="group relative inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-4.5 rounded-full font-medium text-base sm:text-lg tracking-wide text-white transition-all duration-300 overflow-hidden shadow-[0_0_40px_rgba(225,29,72,0.5)] hover:shadow-[0_0_60px_rgba(244,63,94,0.8)] hover:scale-105 active:scale-95"
        >
          {/* Glowing Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 transition-all duration-300 group-hover:opacity-90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-50" />
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500 to-amber-400 opacity-40 blur-md group-hover:opacity-80 group-hover:blur-lg transition-all duration-300" />

          {/* Button Content */}
          <span className="relative z-10 flex items-center gap-3 font-semibold text-rose-50 drop-shadow-sm">
            <span>{coupleData.welcome.buttonText}</span>
            <span className="text-xl group-hover:translate-x-1 transition-transform duration-300">
              💌
            </span>
          </span>
        </button>

        <motion.div
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-4 flex items-center justify-center gap-2 text-xs text-rose-300/70"
        >
          <Music className="w-3.5 h-3.5 text-rose-400" />
          <span>Includes our song: Khaab ❤️</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
