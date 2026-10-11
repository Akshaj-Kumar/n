import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Heart,
  Sparkles,
  Flame,
  Infinity as InfinityIcon,
  Edit3,
  Check,
  X,
  RotateCcw,
} from 'lucide-react';
import { coupleData } from '../data/romanticContent';
import { fireHeartBurst } from '../utils/confetti';

const iconComponents = {
  1: Sparkles,
  2: Heart,
  3: Flame,
  4: InfinityIcon,
};

export default function StoryTimeline() {
  const [timelineItems, setTimelineItems] = useState(() => {
    try {
      const saved = localStorage.getItem('akshaj_neha_timeline');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((item) =>
          item.id === 1 && item.date === '6 Nov 2026'
            ? { ...item, date: '10 Nov 2025' }
            : item
        );
      }
    } catch {
      // fallback
    }
    return coupleData.timeline;
  });

  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ date: '', title: '', highlight: '', description: '' });

  const handleEditClick = (item) => {
    setEditingItem(item.id);
    setFormData({
      date: item.date,
      title: item.title,
      highlight: item.highlight,
      description: item.description,
    });
  };

  const handleSaveEdit = (id) => {
    const updated = timelineItems.map((it) =>
      it.id === id ? { ...it, ...formData } : it
    );
    setTimelineItems(updated);
    localStorage.setItem('akshaj_neha_timeline', JSON.stringify(updated));
    setEditingItem(null);
    fireHeartBurst();
  };

  const handleResetTimeline = () => {
    setTimelineItems(coupleData.timeline);
    localStorage.removeItem('akshaj_neha_timeline');
    fireHeartBurst();
  };

  return (
    <section id="timeline" className="relative py-24 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-medium uppercase tracking-widest mb-3"
        >
          <Calendar className="w-3.5 h-3.5 text-rose-400" />
          <span>Our Journey Through Time</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl md:text-6xl font-serif font-extrabold text-white tracking-tight"
        >
          Our Little{' '}
          <span className="bg-gradient-to-r from-pink-300 via-rose-300 to-amber-200 bg-clip-text text-transparent">
            Love Story 💞
          </span>
        </motion.h2>
        <p className="text-rose-200/70 text-sm sm:text-base mt-3 max-w-lg mx-auto font-light">
          Pehle mulaqaat se lekar hamare aane wale kal tak — har lamha ek khoobsurat ehsaas.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Central glowing vertical timeline bar */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-gradient-to-b from-rose-500 via-pink-500 to-amber-400 opacity-40 shadow-[0_0_15px_rgba(244,63,94,0.6)]" />

        <div className="space-y-12">
          {timelineItems.map((item, idx) => {
            const Icon = iconComponents[item.id] || Heart;
            const isEven = idx % 2 === 0;
            const isEditing = editingItem === item.id;

            return (
              <div
                key={item.id}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                } gap-6 md:gap-12`}
              >
                {/* Center Heart Node */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-700 to-pink-500 border-4 border-[#070104] flex items-center justify-center text-white shadow-[0_0_20px_rgba(244,63,94,0.8)] group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 fill-white" />
                  </div>
                </div>

                {/* Milestone Content Card */}
                <div className="ml-14 md:ml-0 md:w-1/2 w-[calc(100%-3.5rem)]">
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="glass-panel rounded-3xl p-6 sm:p-8 border border-rose-500/25 relative overflow-hidden group shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
                  >
                    {/* Top Date Badge & Edit Trigger */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-600/30 border border-rose-400/40 text-amber-200 shadow-sm">
                        {item.date}
                      </span>

                      <button
                        onClick={() =>
                          isEditing ? handleSaveEdit(item.id) : handleEditClick(item)
                        }
                        className="text-xs text-rose-300 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-950/40 border border-rose-500/20 transition-all hover:bg-rose-900/60"
                        title="Edit this milestone"
                      >
                        {isEditing ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-300 font-semibold">Done</span>
                          </>
                        ) : (
                          <>
                            <Edit3 className="w-3 h-3 text-rose-400" />
                            <span>Edit</span>
                          </>
                        )}
                      </button>
                    </div>

                    {isEditing ? (
                      /* Inline Edit Form */
                      <div className="space-y-3 mt-4">
                        <div>
                          <label className="text-[11px] uppercase tracking-wider text-rose-400/80 font-mono">
                            Date / Time
                          </label>
                          <input
                            type="text"
                            value={formData.date}
                            onChange={(e) =>
                              setFormData({ ...formData, date: e.target.value })
                            }
                            className="w-full mt-1 bg-black/60 border border-rose-500/40 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-400"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] uppercase tracking-wider text-rose-400/80 font-mono">
                            Highlight Title
                          </label>
                          <input
                            type="text"
                            value={formData.highlight}
                            onChange={(e) =>
                              setFormData({ ...formData, highlight: e.target.value })
                            }
                            className="w-full mt-1 bg-black/60 border border-rose-500/40 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-400"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] uppercase tracking-wider text-rose-400/80 font-mono">
                            Description
                          </label>
                          <textarea
                            rows={3}
                            value={formData.description}
                            onChange={(e) =>
                              setFormData({ ...formData, description: e.target.value })
                            }
                            className="w-full mt-1 bg-black/60 border border-rose-500/40 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-400"
                          />
                        </div>

                        <div className="flex gap-2 justify-end pt-2">
                          <button
                            onClick={() => setEditingItem(null)}
                            className="px-3 py-1 text-xs text-rose-300 hover:text-white"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSaveEdit(item.id)}
                            className="px-4 py-1.5 text-xs bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-medium shadow-md"
                          >
                            Save Milestone
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Display Mode */
                      <>
                        <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-1">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-semibold text-rose-300 mb-3">
                          {item.highlight}
                        </p>
                        <p className="text-sm sm:text-base text-rose-100/90 font-light leading-relaxed">
                          {item.description}
                        </p>
                      </>
                    )}
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reset to Default helper */}
      <div className="mt-12 text-center">
        <button
          onClick={handleResetTimeline}
          className="inline-flex items-center gap-1.5 text-xs text-rose-400/70 hover:text-rose-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset timeline to original words</span>
        </button>
      </div>
    </section>
  );
}
