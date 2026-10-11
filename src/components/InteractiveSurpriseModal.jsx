import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, X, RotateCcw, MailOpen, Gift } from 'lucide-react';
import { coupleData } from '../data/romanticContent';
import { fireCelebrationConfetti, fireHeartBurst } from '../utils/confetti';

export default function InteractiveSurpriseModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [envelopeState, setEnvelopeState] = useState('closed'); // 'closed' | 'opening' | 'opened'

  const handleOpenSurprise = () => {
    setIsOpen(true);
    setEnvelopeState('opening');
    setTimeout(() => {
      setEnvelopeState('opened');
      fireCelebrationConfetti();
    }, 900);
  };

  const handleReplay = () => {
    setEnvelopeState('closed');
    setTimeout(() => {
      setEnvelopeState('opening');
      setTimeout(() => {
        setEnvelopeState('opened');
        fireCelebrationConfetti();
      }, 900);
    }, 400);
  };

  const handleClose = () => {
    setIsOpen(false);
    setEnvelopeState('closed');
  };

  return (
    <section className="relative py-16 px-4 text-center">
      {/* Prominent Glowing Button Trigger */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-xl mx-auto"
      >
        <div className="p-1 rounded-full bg-gradient-to-r from-rose-600 via-pink-500 to-amber-400 p-1 shadow-[0_0_40px_rgba(244,63,94,0.5)] animate-pulse-glow inline-block">
          <button
            id="btn-surprise"
            onClick={handleOpenSurprise}
            className="group relative flex items-center justify-center gap-3 px-8 sm:px-12 py-5 rounded-full bg-[#080205] text-white font-serif text-lg sm:text-2xl font-bold tracking-wide transition-all duration-300 hover:bg-transparent hover:text-white"
          >
            <Sparkles className="w-6 h-6 text-amber-300 group-hover:rotate-45 transition-transform" />
            <span>{coupleData.surprise.buttonText}</span>
            <span className="text-2xl group-hover:scale-125 transition-transform">
              🎁
            </span>
          </button>
        </div>
        <p className="text-xs sm:text-sm text-rose-300/70 mt-3 font-light">
          {coupleData.surprise.tagline}
        </p>
      </motion.div>

      {/* Fullscreen Surprise Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
            onClick={handleClose}
          >
            {/* Close Cross Button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 z-50 p-3 rounded-full bg-neutral-900/80 text-white hover:bg-rose-600 transition-colors"
              aria-label="Close Surprise"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl text-center"
            >
              {/* Envelope Stage */}
              <div className="relative mx-auto w-full max-w-lg perspective-1000">
                {/* Envelope Outer */}
                <div className="relative rounded-3xl p-8 sm:p-12 glass-panel border border-rose-400/40 shadow-[0_25px_60px_rgba(244,63,94,0.35)] overflow-hidden">
                  {/* Glowing Aura inside envelope */}
                  <div className="absolute inset-0 bg-gradient-to-b from-rose-950/60 via-neutral-950 to-neutral-950/95" />

                  {/* Stamp & Ribbon Header */}
                  <div className="relative z-10 flex items-center justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-600 to-amber-500 p-0.5 shadow-[0_0_25px_rgba(244,63,94,0.8)]">
                      <div className="w-full h-full rounded-full bg-[#080205] flex items-center justify-center">
                        <Heart className="w-8 h-8 text-rose-400 fill-rose-500 animate-heart-beat" />
                      </div>
                    </div>
                  </div>

                  {/* Unfolded Note Content */}
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={
                      envelopeState === 'opened'
                        ? { y: 0, opacity: 1 }
                        : { y: 20, opacity: 0 }
                    }
                    transition={{ duration: 0.7 }}
                    className="relative z-10 space-y-6"
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-200 text-xs font-semibold uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{coupleData.surprise.envelopeTitle}</span>
                    </div>

                    <p className="text-lg sm:text-2xl font-serif text-white font-normal leading-relaxed text-balance">
                      “{coupleData.surprise.letterText}”
                    </p>

                    <div className="pt-2">
                      <p className="text-3xl sm:text-4xl font-handwriting text-rose-300 font-semibold drop-shadow-md">
                        {coupleData.surprise.sender}
                      </p>
                    </div>
                  </motion.div>

                  {/* Interactive Modal Buttons */}
                  <div className="relative z-10 mt-10 pt-6 border-t border-rose-500/20 flex flex-wrap items-center justify-center gap-4">
                    <button
                      onClick={handleReplay}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-950/60 hover:bg-rose-900 border border-rose-500/30 text-rose-200 text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95"
                    >
                      <RotateCcw className="w-4 h-4 text-rose-400" />
                      <span>{coupleData.surprise.replaysText}</span>
                    </button>

                    <button
                      onClick={handleClose}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs sm:text-sm font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all"
                    >
                      <Heart className="w-4 h-4 fill-white" />
                      <span>{coupleData.surprise.closeText}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
