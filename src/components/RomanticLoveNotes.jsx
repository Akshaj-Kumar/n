import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Wand2 } from 'lucide-react';
import { fireHeartBurst } from '../utils/confetti';

const loveNotes = [
  "Neha, jab tum smile karti ho na, mera poora din ban jaata hai! 🥹❤️",
  "Duniya ki sabse sweet rasmalai sirf tum ho! 🍨💗",
  "Chahe kitna bhi lad lein hum, rehna toh ek dusre ke saath hi hai! 🕊️✨",
  "Tumhari aawaz sun kar dil ko jo sukoon milta hai, woh lafzon mein bayaan nahi ho sakta. 🫶",
  "Agar 100 baar bhi janam mile, har baar tumhara hi haath maangunga. 💍",
  "Meri har khushi ka raaz ho tum, Neha. 🌹",
  "Har lamha tumhare saath ek khubsurat khwaab jaisa lagta hai. 🌙",
  "Tum meri woh prayer ho jo Rab ne qubool kar li. 🤲💖",
  "You are my today, my tomorrow, and all of my future. 💫",
  "Akshaj loves Neha more than words could ever describe! 👑💗",
];

export default function RomanticLoveNotes() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextNote = () => {
    setIsAnimating(true);
    fireHeartBurst();
    setCurrentIndex((prev) => (prev + 1) % loveNotes.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <section className="relative py-16 px-4 max-w-3xl mx-auto text-center">
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-rose-500/25 relative overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <Wand2 className="w-3.5 h-3.5 text-amber-300" />
          <span>Little Love Notes For Neha</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-6">
          A Daily Reason Why I Adore You 💌
        </h3>

        <div className="min-h-[100px] flex items-center justify-center p-4 rounded-2xl bg-black/40 border border-rose-500/20 mb-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="text-lg sm:text-xl font-serif italic text-rose-100 font-light leading-relaxed"
            >
              “{loveNotes[currentIndex]}”
            </motion.p>
          </AnimatePresence>
        </div>

        <button
          onClick={nextNote}
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs sm:text-sm font-semibold shadow-md hover:scale-105 active:scale-95 transition-all"
        >
          <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-45 transition-transform" />
          <span>Tap for Another Love Note ✨</span>
        </button>
      </div>
    </section>
  );
}
