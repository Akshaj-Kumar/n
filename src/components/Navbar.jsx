import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Menu, X, Sparkles, Music } from 'lucide-react';
import { fireHeartBurst } from '../utils/confetti';
import { romanticAudio } from '../utils/audioService';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBurst = () => {
    fireHeartBurst();
  };

  const navLinks = [
    { name: 'Love Letter 💌', href: '#love-letter' },
    { name: 'Our Memories 📸', href: '#memories' },
    { name: 'Why You 🌹', href: '#why-special' },
    { name: 'Our Story 💞', href: '#timeline' },
    { name: 'Our Song 🎵', href: '#music-player' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#080205]/85 backdrop-blur-md border-b border-rose-500/20 shadow-lg'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#"
          className="flex items-center gap-2 font-serif text-lg sm:text-xl font-bold text-white tracking-wide group"
        >
          <span className="text-rose-400 group-hover:scale-125 transition-transform">
            ❤️
          </span>
          <span className="bg-gradient-to-r from-pink-200 via-rose-300 to-amber-200 bg-clip-text text-transparent">
            Akshaj & Neha
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-medium text-rose-200/80">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-rose-400 hover:after:w-full after:transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleBurst}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-600/30 hover:bg-rose-600/60 border border-rose-500/40 text-rose-100 text-xs font-semibold backdrop-blur-md transition-all active:scale-95 shadow-sm"
            title="Burst romantic hearts"
          >
            <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
            <span className="hidden sm:inline">Send Love</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-rose-300 hover:text-white transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0207]/95 backdrop-blur-2xl border-b border-rose-500/20 px-6 py-6"
          >
            <div className="flex flex-col gap-4 text-sm text-rose-200">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 hover:text-white transition-colors border-b border-rose-500/10"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
