import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  Sparkles,
  MapPin,
  Download,
  Share2,
} from 'lucide-react';
import { coupleData } from '../data/romanticContent';
import { fireHeartBurst } from '../utils/confetti';

export default function PhotoGallery() {
  const [photos, setPhotos] = useState(coupleData.photos);
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);
  const [photoLikes, setPhotoLikes] = useState(() => {
    return {
      1: 99,
      2: 88,
      3: 143,
      4: 108,
      5: 124,
    };
  });

  const openLightbox = (index) => {
    setActivePhotoIndex(index);
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const nextPhoto = (e) => {
    e?.stopPropagation();
    setActivePhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = (e) => {
    e?.stopPropagation();
    setActivePhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleLike = (id, e) => {
    e?.stopPropagation();
    setPhotoLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
    fireHeartBurst();
  };

  const handleAddCustomPhoto = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newPhoto = {
        id: Date.now(),
        src: url,
        title: "A New Precious Memory",
        subtitle: "Together Forever ❤️",
        caption: "Ek aur khoobsurat pal hum dono ke pyaar ka ✨",
        location: "Our Special Place",
        tag: "New Memory",
        featured: false,
      };
      setPhotos([newPhoto, ...photos]);
      fireHeartBurst();
    }
  };

  return (
    <section id="memories" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-medium uppercase tracking-widest mb-3"
        >
          <Camera className="w-3.5 h-3.5 text-rose-400" />
          <span>Our Precious Memories</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl md:text-6xl font-serif font-extrabold text-white tracking-tight"
        >
          Moments That Made Us{' '}
          <span className="bg-gradient-to-r from-pink-300 via-rose-300 to-amber-200 bg-clip-text text-transparent">
            Fall in Love
          </span>
        </motion.h2>
        <p className="text-rose-200/70 text-sm sm:text-base mt-3 max-w-xl mx-auto font-light">
          Real, unfiltered moments of Akshaj & Neha. Har tasveer mein hamari dosti, pyaar aur sukoon hai.
        </p>
      </div>

      {/* Cinematic Hero Feature Photo Banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        onClick={() => openLightbox(0)}
        className="group relative cursor-pointer mb-12 rounded-3xl overflow-hidden glass-panel border border-rose-500/30 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]"
      >
        <div className="relative h-[380px] sm:h-[480px] md:h-[540px] w-full overflow-hidden">
          <img
            src={photos[0].src}
            alt={photos[0].title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Romantic Cinematic Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080205] via-[#080205]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-rose-950/40 via-transparent to-transparent" />

          {/* Floating Heart Sticker badge */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-rose-600/80 backdrop-blur-md text-white text-xs font-semibold shadow-lg flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>Featured Couple Spotlight</span>
            </span>
          </div>

          {/* Bottom Captions & Info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-rose-300 text-xs sm:text-sm font-medium mb-1">
                <MapPin className="w-4 h-4 text-rose-400" />
                <span>{photos[0].location}</span>
                <span>•</span>
                <span className="text-amber-200">{photos[0].subtitle}</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-2 drop-shadow-md">
                {photos[0].title}
              </h3>
              <p className="text-sm sm:text-base text-rose-100/90 font-light max-w-xl">
                {photos[0].caption}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={(e) => handleLike(photos[0].id, e)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-rose-600/40 hover:bg-rose-600/70 border border-rose-400/30 text-white text-xs font-semibold backdrop-blur-md transition-all active:scale-95"
              >
                <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
                <span>{photoLikes[photos[0].id]} Loves</span>
              </button>
              <button
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition-all"
                title="Expand Full Photo"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Romantic Collage Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {photos.slice(1).map((photo, idx) => {
          const originalIdx = idx + 1;
          const isTall = photo.id === 4; // Bahce Cafe standing photo is tall!

          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              onClick={() => openLightbox(originalIdx)}
              className={`group relative cursor-pointer rounded-2xl overflow-hidden glass-panel border border-rose-500/20 hover:border-rose-400/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(244,63,94,0.3)] ${
                isTall ? 'sm:col-span-1 lg:row-span-2' : ''
              }`}
            >
              <div
                className={`relative w-full overflow-hidden ${
                  isTall ? 'h-[440px] sm:h-full min-h-[380px]' : 'h-72'
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080205] via-[#080205]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Tag pill */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-rose-300 text-[11px] font-medium">
                    {photo.tag}
                  </span>
                </div>

                {/* Like Button */}
                <button
                  onClick={(e) => handleLike(photo.id, e)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/50 hover:bg-rose-600/80 backdrop-blur-md text-white transition-all transform active:scale-90"
                  title="Like Photo"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      photoLikes[photo.id] ? 'fill-rose-400 text-rose-400' : ''
                    }`}
                  />
                </button>

                {/* Overlay Caption at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-xs text-amber-200/90 font-medium mb-1">
                    {photo.subtitle}
                  </p>
                  <h4 className="text-lg font-serif font-bold text-white mb-1 leading-snug">
                    {photo.title}
                  </h4>
                  <p className="text-xs text-rose-200/80 font-light line-clamp-2">
                    {photo.caption}
                  </p>

                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-rose-300/70">
                    <span>{photoLikes[photo.id] || 0} hearts</span>
                    <span className="flex items-center gap-1 group-hover:text-white transition-colors">
                      <span>View</span>
                      <Maximize2 className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Add Custom Couple Photo Interactive Action */}
      <div className="mt-12 text-center">
        <label className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 text-rose-200 text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95 shadow-md">
          <Camera className="w-4 h-4 text-rose-400" />
          <span>Upload Another Memory Photo 📸</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleAddCustomPhoto}
            className="hidden"
          />
        </label>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-3 rounded-full bg-neutral-900/80 text-white hover:bg-rose-600 transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-neutral-900/80 text-white hover:bg-rose-600 transition-colors hidden sm:flex items-center justify-center"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-neutral-900/80 text-white hover:bg-rose-600 transition-colors hidden sm:flex items-center justify-center"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Card Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[90vh] w-full flex flex-col md:flex-row rounded-3xl overflow-hidden glass-panel border border-rose-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
            >
              {/* Photo Display */}
              <div className="relative md:w-3/5 bg-black flex items-center justify-center overflow-hidden min-h-[300px] max-h-[58vh] md:max-h-[80vh]">
                <img
                  src={photos[activePhotoIndex].src}
                  alt={photos[activePhotoIndex].title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {/* Photo Details Sidebar */}
              <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-neutral-950/90">
                <div>
                  <div className="flex items-center justify-between text-xs text-rose-300 font-mono mb-2">
                    <span>
                      {activePhotoIndex + 1} / {photos.length}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300">
                      {photos[activePhotoIndex].tag}
                    </span>
                  </div>

                  <p className="text-xs text-amber-200 uppercase tracking-widest font-semibold mb-1">
                    {photos[activePhotoIndex].subtitle}
                  </p>
                  <h3 className="text-2xl font-serif font-bold text-white mb-3">
                    {photos[activePhotoIndex].title}
                  </h3>
                  <p className="text-sm text-rose-100/90 font-light leading-relaxed mb-4">
                    {photos[activePhotoIndex].caption}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-rose-300/70 mb-4">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    <span>{photos[activePhotoIndex].location}</span>
                  </div>
                </div>

                {/* Bottom Modal Actions */}
                <div className="pt-4 border-t border-rose-500/20 flex items-center justify-between">
                  <button
                    onClick={(e) => handleLike(photos[activePhotoIndex].id, e)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-rose-600 text-white text-xs font-semibold shadow-[0_0_15px_rgba(244,63,94,0.5)] hover:scale-105 active:scale-95 transition-all"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>Send Love ({photoLikes[photos[activePhotoIndex].id] || 0})</span>
                  </button>

                  <div className="flex items-center gap-2 text-rose-300/80">
                    <a
                      href={photos[activePhotoIndex].src}
                      download={`akshaj_neha_${photos[activePhotoIndex].id}.jpg`}
                      className="p-2 rounded-full hover:bg-rose-900/40 transition-colors"
                      title="Download photo"
                    >
                      <Download className="w-4 h-4" />
                    </a>
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
