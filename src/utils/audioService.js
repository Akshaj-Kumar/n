// Audio service supporting HTML5 Audio + Web Audio Synth Fallback + Custom MP3

class RomanticAudioController {
  constructor() {
    this.audioElement = null;
    this.audioContext = null;
    this.synthInterval = null;
    this.isSynthPlaying = false;
    this.currentTrackName = "Khaab — Akhil 🎶";
    this.listeners = new Set();
    this.isPlaying = false;
    this.currentTime = 0;
    this.duration = 30; // preview duration or full duration
    this.volume = 0.8;
  }

  init() {
    if (this.audioElement) return;

    this.audioElement = new Audio();
    // Default to the user's chosen romantic song: Khaab by Akhil
    this.audioElement.src = '/music/khaab.mp3';
    this.audioElement.loop = true;
    this.audioElement.preload = 'auto';
    this.audioElement.volume = this.volume;

    this.audioElement.addEventListener('play', () => {
      this.isPlaying = true;
      this.notify();
    });

    this.audioElement.addEventListener('pause', () => {
      this.isPlaying = false;
      this.notify();
    });

    this.audioElement.addEventListener('timeupdate', () => {
      this.currentTime = this.audioElement.currentTime;
      this.duration = this.audioElement.duration || 30;
      this.notify();
    });

    this.audioElement.addEventListener('loadedmetadata', () => {
      this.duration = this.audioElement.duration || 30;
      this.notify();
    });

    this.audioElement.addEventListener('error', (e) => {
      console.warn("Audio element error on primary track, trying fallback /music/love-song.wav:", e);
      if (this.audioElement.src.indexOf('khaab.mp3') !== -1) {
        this.audioElement.src = '/music/love-song.wav';
        this.audioElement.load();
      } else {
        this.startWebAudioSynth();
      }
    });
  }

  subscribe(listener) {
    this.listeners.add(listener);
    listener(this.getState());
    return () => this.listeners.delete(listener);
  }

  notify() {
    const state = this.getState();
    this.listeners.forEach((fn) => fn(state));
  }

  getState() {
    return {
      isPlaying: this.isPlaying,
      currentTime: this.currentTime,
      duration: this.duration,
      volume: this.volume,
      trackName: this.currentTrackName,
    };
  }

  async play() {
    this.init();
    try {
      await this.audioElement.play();
      this.isPlaying = true;
      this.notify();
    } catch (err) {
      console.log("HTML5 audio playback blocked or failed, starting Web Audio Synth:", err);
      this.startWebAudioSynth();
    }
  }

  pause() {
    if (this.audioElement) {
      this.audioElement.pause();
    }
    if (this.isSynthPlaying) {
      this.stopWebAudioSynth();
    }
    this.isPlaying = false;
    this.notify();
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  seek(seconds) {
    if (this.audioElement && Number.isFinite(seconds)) {
      this.audioElement.currentTime = seconds;
      this.currentTime = seconds;
      this.notify();
    }
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audioElement) {
      this.audioElement.volume = this.volume;
    }
    this.notify();
  }

  loadCustomFile(file) {
    if (!file) return;
    this.init();
    const objectUrl = URL.createObjectURL(file);
    this.audioElement.src = objectUrl;
    this.currentTrackName = file.name.replace(/\.[^/.]+$/, "") + " ❤️";
    this.play();
  }

  // Romantic Web Audio Piano Synthesizer Fallback
  startWebAudioSynth() {
    if (this.isSynthPlaying) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!this.audioContext) {
        this.audioContext = new AudioCtx();
      }
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      this.isSynthPlaying = true;
      this.isPlaying = true;
      this.currentTrackName = "Khaab (Piano Romance) 🎹";
      this.notify();

      // Gentle piano arpeggio engine
      const chords = [
        [261.63, 329.63, 392.00, 493.88], // Cmaj7
        [220.00, 261.63, 329.63, 392.00], // Am7
        [174.61, 220.00, 261.63, 329.63], // Fmaj7
        [196.00, 246.94, 293.66, 392.00], // G
      ];

      let chordIdx = 0;
      let noteStep = 0;

      const playPianoTone = (freq, duration = 1.6) => {
        if (!this.audioContext || !this.isSynthPlaying) return;
        const now = this.audioContext.currentTime;

        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        // Warm harmonic tone
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.18 * this.volume, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.start(now);
        osc.stop(now + duration);
      };

      this.synthInterval = setInterval(() => {
        if (!this.isSynthPlaying) return;
        const currentChord = chords[chordIdx % chords.length];
        const freq = currentChord[noteStep % currentChord.length];
        playPianoTone(freq, 2.0);

        // Also play soft bass on beat 0
        if (noteStep === 0) {
          playPianoTone(freq / 2, 2.8);
        }

        noteStep++;
        if (noteStep >= 4) {
          noteStep = 0;
          chordIdx++;
        }
      }, 550);
    } catch (e) {
      console.warn("Synth start error:", e);
    }
  }

  stopWebAudioSynth() {
    this.isSynthPlaying = false;
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }
}

export const romanticAudio = new RomanticAudioController();
