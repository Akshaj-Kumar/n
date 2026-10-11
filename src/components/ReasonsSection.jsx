import React from 'react';
import { motion } from 'framer-motion';
import {
  Bell,
  HeartHandshake,
  Sparkles,
  BookHeart,
  Eye,
  Crown,
  Heart,
} from 'lucide-react';
import { coupleData } from '../data/romanticContent';
import { fireHeartBurst } from '../utils/confetti';

const iconMap = {
  1: Bell,
  2: HeartHandshake,
  3: Sparkles,
  4: BookHeart,
  5: Eye,
  6: Crown,
};

export default function ReasonsSection() {
  const handleCardClick = () => {
    fireHeartBurst();
  };

  return (
    <section id="why-special" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-medium uppercase tracking-widest mb-3"
        >
          <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
          <span>Reasons My Heart Chooses You</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl md:text-6xl font-serif font-extrabold text-white tracking-tight"
        >
          Tum Sabse Alag Ho,{' '}
          <span className="bg-gradient-to-r from-pink-300 via-rose-300 to-amber-200 bg-clip-text text-transparent">
            Neha ❤️
          </span>
        </motion.h2>
        <p className="text-rose-200/70 text-sm sm:text-base mt-3 max-w-lg mx-auto font-light">
          Woh 6 sachchi baatein jo har roz mere dil ko tumhare pyaar se bhar deti hain.
        </p>
      </div>

      {/* 6 Animated Romantic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {coupleData.reasons.map((reason, idx) => {
          const Icon = iconMap[reason.id] || Heart;

          return (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: idx * 0.12, duration: 0.7 }}
              onClick={handleCardClick}
              className="glass-panel glass-card-hover group cursor-pointer relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle Gradient Backlight */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-rose-600/10 rounded-full blur-2xl group-hover:bg-rose-500/25 transition-all duration-500 pointer-events-none" />

              <div>
                {/* Header Icon + Number */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-rose-900/60 to-rose-950/80 border border-rose-500/30 flex items-center justify-center text-rose-300 group-hover:text-amber-200 group-hover:scale-110 group-hover:border-rose-400 transition-all duration-300 shadow-md">
                    <Icon className="w-7 h-7 filter drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
                  </div>

                  <span className="font-serif italic text-2xl text-rose-500/40 group-hover:text-rose-400/80 transition-colors font-bold">
                    0{idx + 1}
                  </span>
                </div>

                {/* Subtitle tag */}
                <p className="text-xs uppercase tracking-widest text-amber-300/80 font-semibold mb-2">
                  {reason.title}
                </p>

                {/* Romantic Message */}
                <h3 className="text-lg sm:text-xl font-serif text-white font-medium leading-relaxed group-hover:text-rose-100 transition-colors">
                  “{reason.message}”
                </h3>
              </div>

              {/* Bottom Heart Sticker on Hover */}
              <div className="mt-8 pt-4 border-t border-rose-500/10 flex items-center justify-between text-xs text-rose-400/70">
                <span className="group-hover:text-rose-200 transition-colors">
                  Tap to send love
                </span>
                <Heart className="w-4 h-4 fill-rose-500/20 text-rose-400 group-hover:fill-rose-500 group-hover:scale-125 transition-all duration-300" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
