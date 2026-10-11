import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Music2,
  Upload,
  Disc3,
  Heart,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { romanticAudio } from '../utils/audioService';

export default function LoveMusicPlayer({ isHero = false }) {
  const [audioState, setAudioState] = useState(romanticAudio.getState());
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(0.8);
  const [playerTab, setPlayerTab] = useState('turntable'); // 'turntable' | 'spotify'
  const fileInputRef = useRef(null);

  useEffect(() => {
    const unsubscribe = romanticAudio.subscribe((state) => {
      setAudioState(state);
    });
    return unsubscribe;
  }, []);

  const handlePlayPause = () => {
    romanticAudio.toggle();
  };

  const handleMuteToggle = () => {
    if (isMuted) {
      romanticAudio.setVolume(previousVolume || 0.8);
      setIsMuted(false);
    } else {
      setPreviousVolume(audioState.volume);
      romanticAudio.setVolume(0);
      setIsMuted(true);
    }
  };

  const handleSeek = (e) => {
    const val = parseFloat(e.target.value);
    romanticAudio.seek(val);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    romanticAudio.setVolume(val);
    if (val > 0 && isMuted) setIsMuted(false);
  };

  const handleCustomAudioUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      romanticAudio.loadCustomFile(file);
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // If rendered as the standalone in-page section:
  if (!isHero) {
    return (
      <div className="relative w-full max-w-4xl mx-auto px-4 py-8">
        <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden border border-rose-500/20 shadow-[0_15px_50px_rgba(0,0,0,0.6)]">
          {/* Subtle Ambient Backlight */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose-600/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

          {/* Player Mode Switcher Tabs */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-rose-500/15 flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <span className="text-xs uppercase tracking-widest text-rose-300 font-semibold font-mono">
                Our Special Song
              </span>
            </div>

            <div className="flex items-center gap-2 bg-black/50 p-1 rounded-full border border-rose-500/20">
              <button
                onClick={() => setPlayerTab('turntable')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  playerTab === 'turntable'
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'text-rose-300/80 hover:text-white'
                }`}
              >
                Vinyl Turntable 🎵
              </button>
              <button
                onClick={() => setPlayerTab('spotify')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  playerTab === 'spotify'
                    ? 'bg-[#1DB954] text-black shadow-md'
                    : 'text-rose-300/80 hover:text-white'
                }`}
              >
                <span>Spotify Player</span>
                <span className="text-[10px]">🟢</span>
              </button>
            </div>
          </div>

          {playerTab === 'spotify' ? (
            /* Official Spotify Embed Player */
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden border border-[#1DB954]/30 shadow-[0_0_30px_rgba(29,185,84,0.15)] bg-neutral-950 p-2">
                <iframe
                  style={{ borderRadius: '16px' }}
                  src="https://open.spotify.com/embed/track/0a6zRnrjmaOcqsEIFkXIhw?utm_source=generator&theme=0"
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allowFullScreen=""
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Spotify Embed: Khaab - Akhil"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-rose-300/80 pt-2">
                <p className="italic font-serif">
                  “Main jadon tere khaab an wale raah tureya... ❤️”
                </p>
                <a
                  href="https://open.spotify.com/track/0a6zRnrjmaOcqsEIFkXIhw?si=84d0a5e0c66d471b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1DB954]/20 hover:bg-[#1DB954]/30 border border-[#1DB954]/40 text-[#1DB954] font-medium transition-all"
                >
                  <span>Open in Spotify App</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ) : (
            /* Custom Romantic Vinyl Turntable Player */
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              {/* Spinning Vinyl Record with Akshaj & Neha's photo in the center */}
              <div className="relative group flex-shrink-0">
                <div
                  className={`relative w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-gradient-to-tr from-neutral-900 via-neutral-950 to-neutral-900 p-2 shadow-[0_10px_35px_rgba(0,0,0,0.8),_0_0_25px_rgba(225,29,72,0.3)] border-4 border-neutral-800 ${
                    audioState.isPlaying ? 'animate-spin-slow' : ''
                  }`}
                  style={{ animationDuration: '14s' }}
                >
                  {/* Vinyl Grooves Texture */}
                  <div className="absolute inset-4 rounded-full border border-neutral-800/80 pointer-events-none" />
                  <div className="absolute inset-8 rounded-full border border-neutral-800/60 pointer-events-none" />
                  <div className="absolute inset-12 rounded-full border border-neutral-800/40 pointer-events-none" />

                  {/* Center Label (Couple Photo) */}
                  <div className="absolute inset-14 rounded-full overflow-hidden border-2 border-rose-400/50 shadow-inner">
                    <img
                      src="/photos/photo2.jpg"
                      alt="Akshaj and Neha"
                      className="w-full h-full object-cover"
                    />
                    {/* Center Spindle Hole */}
                    <div className="absolute inset-0 m-auto w-3.5 h-3.5 rounded-full bg-neutral-900 border border-amber-300" />
                  </div>
                </div>

                {/* Tonearm Simulation */}
                <div
                  className={`absolute -top-3 right-0 w-16 h-28 origin-top-right transition-transform duration-700 pointer-events-none hidden sm:block ${
                    audioState.isPlaying ? 'rotate-12' : '-rotate-12'
                  }`}
                >
                  <div className="w-1.5 h-20 bg-gradient-to-b from-neutral-400 to-neutral-600 rounded-full shadow-lg ml-auto mr-4" />
                  <div className="w-4 h-5 bg-rose-500/80 rounded-sm ml-auto mr-3 shadow-md" />
                </div>
              </div>

              {/* Controls & Track Details */}
              <div className="flex-1 w-full text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 text-rose-400 text-xs tracking-wider uppercase font-semibold mb-1">
                  <Music2 className="w-3.5 h-3.5 animate-pulse" />
                  <span>Akshaj ❤️ Neha Love Song</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-1">
                  {audioState.trackName}
                </h3>
                <p className="text-xs sm:text-sm text-rose-200/70 mb-5">
                  “Main jadon tere khaab an wale raah tureya... ❤️”
                </p>

                {/* Visualizer Waves */}
                <div className="flex items-center justify-center md:justify-start gap-1.5 h-7 mb-4">
                  {[40, 70, 30, 90, 60, 100, 50, 80, 45, 95, 65, 35, 75, 55].map((height, idx) => (
                    <motion.div
                      key={idx}
                      animate={
                        audioState.isPlaying
                          ? { height: [`${Math.max(15, height * 0.25)}%`, `${height}%`, '20%'] }
                          : { height: '18%' }
                      }
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        delay: idx * 0.05,
                      }}
                      className="w-1 bg-gradient-to-t from-rose-600 to-pink-300 rounded-full"
                    />
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="space-y-1 mb-4">
                  <input
                    type="range"
                    min="0"
                    max={audioState.duration || 30}
                    value={audioState.currentTime}
                    onChange={handleSeek}
                    className="w-full h-1.5 bg-rose-950/60 rounded-lg appearance-none cursor-pointer accent-rose-500"
                  />
                  <div className="flex justify-between text-[11px] text-rose-300/60 font-mono">
                    <span>{formatTime(audioState.currentTime)}</span>
                    <span>{formatTime(audioState.duration)}</span>
                  </div>
                </div>

                {/* Playback Buttons & Volume */}
                <div className="flex flex-wrap items-center justify-center md:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <button
                      id="btn-play-our-love-song"
                      onClick={handlePlayPause}
                      className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-[0_0_25px_rgba(244,63,94,0.6)] hover:shadow-[0_0_35px_rgba(244,63,94,0.9)] hover:scale-105 active:scale-95 transition-all"
                      aria-label={audioState.isPlaying ? "Pause Love Song" : "Play Our Love Song"}
                    >
                      {audioState.isPlaying ? (
                        <Pause className="w-6 h-6 fill-white" />
                      ) : (
                        <Play className="w-6 h-6 fill-white ml-0.5" />
                      )}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleMuteToggle}
                        className="p-2 text-rose-300/80 hover:text-white transition-colors"
                        title={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted || audioState.volume === 0 ? (
                          <VolumeX className="w-5 h-5 text-rose-400" />
                        ) : (
                          <Volume2 className="w-5 h-5 text-rose-300" />
                        )}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={audioState.volume}
                        onChange={handleVolumeChange}
                        className="w-20 sm:w-24 h-1.5 bg-rose-950/60 rounded-lg appearance-none cursor-pointer accent-rose-400"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href="https://open.spotify.com/track/0a6zRnrjmaOcqsEIFkXIhw?si=84d0a5e0c66d471b"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-[#1DB954] bg-[#1DB954]/10 hover:bg-[#1DB954]/20 border border-[#1DB954]/30 transition-all hover:scale-105"
                    >
                      <span>Spotify</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="audio/*"
                      onChange={handleCustomAudioUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium text-rose-200 bg-rose-900/30 hover:bg-rose-800/40 border border-rose-500/30 transition-all hover:scale-105"
                      title="Upload any audio file from device"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Song</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Floating Mini-Player (Bottom of screen)
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 max-w-sm w-auto">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-panel backdrop-blur-xl bg-neutral-950/85 border border-rose-500/30 rounded-full px-4 py-2.5 shadow-[0_10px_35px_rgba(0,0,0,0.7)] flex items-center gap-3"
      >
        {/* Animated mini vinyl icon */}
        <div
          onClick={handlePlayPause}
          className={`cursor-pointer w-9 h-9 rounded-full overflow-hidden border border-rose-400/50 flex-shrink-0 ${
            audioState.isPlaying ? 'animate-spin-slow' : ''
          }`}
          style={{ animationDuration: '10s' }}
        >
          <img
            src="/photos/photo2.jpg"
            alt="Now playing"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Song Info */}
        <div className="flex flex-col pr-1 cursor-pointer" onClick={handlePlayPause}>
          <span className="text-xs font-semibold text-rose-100 truncate max-w-[140px] sm:max-w-[180px]">
            {audioState.trackName}
          </span>
          <span className="text-[10px] text-rose-400/80 font-mono">
            {audioState.isPlaying ? 'Playing • ' : 'Paused • '}
            {formatTime(audioState.currentTime)}
          </span>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={handlePlayPause}
          className="w-8 h-8 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center transition-all shadow-[0_0_15px_rgba(244,63,94,0.6)] flex-shrink-0"
          aria-label={audioState.isPlaying ? 'Pause' : 'Play'}
        >
          {audioState.isPlaying ? (
            <Pause className="w-4 h-4 fill-white" />
          ) : (
            <Play className="w-4 h-4 fill-white ml-0.5" />
          )}
        </button>

        {/* Mute button */}
        <button
          onClick={handleMuteToggle}
          className="text-rose-300 hover:text-white p-1 transition-colors"
          title="Toggle Mute"
        >
          {isMuted || audioState.volume === 0 ? (
            <VolumeX className="w-4 h-4 text-rose-400" />
          ) : (
            <Volume2 className="w-4 h-4 text-rose-300" />
          )}
        </button>
      </motion.div>
    </div>
  );
}
