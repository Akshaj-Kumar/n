import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FloatingParticles from './components/FloatingParticles';
import RomanticWelcome from './components/RomanticWelcome';
import Navbar from './components/Navbar';
import LoveLetterSection from './components/LoveLetterSection';
import PhotoGallery from './components/PhotoGallery';
import LoveMusicPlayer from './components/LoveMusicPlayer';
import ReasonsSection from './components/ReasonsSection';
import StoryTimeline from './components/StoryTimeline';
import RomanticLoveNotes from './components/RomanticLoveNotes';
import InteractiveSurpriseModal from './components/InteractiveSurpriseModal';
import FinalRomanticSection from './components/FinalRomanticSection';
import { Heart, Sparkles, ChevronDown } from 'lucide-react';

export default function App() {
  const [hasOpenedHeart, setHasOpenedHeart] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#070104] text-[#ffe4e6] overflow-x-hidden selection:bg-rose-500 selection:text-white">
      {/* 60FPS Ambient Particle Canvas (Floating Hearts, Petals, Twinkles) */}
      <FloatingParticles />

      {/* 1. Full-Screen Romantic Welcome Experience */}
      <AnimatePresence>
        {!hasOpenedHeart && (
          <RomanticWelcome onEnter={() => setHasOpenedHeart(true)} />
        )}
      </AnimatePresence>

      {/* Main Love Website Content */}
      {hasOpenedHeart && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="relative z-20 flex flex-col min-h-screen"
        >
          {/* Navigation Bar */}
          <Navbar />

          {/* Hero Transition Header */}
          <section className="relative pt-32 pb-16 px-4 text-center overflow-hidden">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-medium uppercase tracking-widest mb-6"
              >
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
                <span>Our Little Forever</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              </motion.div>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight text-white mb-6"
              >
                <span className="bg-gradient-to-r from-pink-200 via-rose-300 to-amber-200 bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(244,63,94,0.35)]">
                  Akshaj
                </span>{' '}
                <span className="inline-block text-rose-500 text-3xl sm:text-5xl align-middle animate-heart-beat">
                  ❤️
                </span>{' '}
                <span className="bg-gradient-to-r from-amber-200 via-rose-300 to-pink-200 bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(244,63,94,0.35)]">
                  Neha
                </span>
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg sm:text-2xl font-serif italic text-rose-100 font-light max-w-2xl mx-auto leading-relaxed mb-8"
              >
                “Meri duniya ki sabse khoobsurat wajah… Neha ❤️”
              </motion.p>

              {/* Scroll prompt */}
              <motion.a
                href="#love-letter"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex flex-col items-center gap-1 text-xs text-rose-300/70 hover:text-white transition-colors cursor-pointer"
              >
                <span>Begin our love journey</span>
                <ChevronDown className="w-4 h-4 text-rose-400" />
              </motion.a>
            </div>
          </section>

          {/* 2. A Personal Love Letter */}
          <LoveLetterSection />

          {/* 3. Our Memories — Photo Gallery */}
          <PhotoGallery />

          {/* 4. Romantic Music Player Showcase (Khaab by Akhil) */}
          <section id="music-player" className="py-12">
            <LoveMusicPlayer isHero={false} />
          </section>

          {/* 6. Why You Are Special, Neha 🌹 */}
          <ReasonsSection />

          {/* 7. Our Love Story Timeline 💞 */}
          <StoryTimeline />

          {/* Daily Romantic Love Notes */}
          <RomanticLoveNotes />

          {/* 8. An Interactive Surprise 💌 */}
          <InteractiveSurpriseModal />

          {/* 9. Final Romantic Section & Virtual Hug */}
          <FinalRomanticSection />

          {/* Fixed Floating Mini Player at Bottom Right */}
          <LoveMusicPlayer isHero={true} />
        </motion.div>
      )}
    </div>
  );
}
