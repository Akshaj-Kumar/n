# Akshaj ❤️ Neha — Our Little Forever

> *“Meri duniya ki sabse khoobsurat wajah… Neha ❤️”*

A deeply romantic, emotional, cinematic couple website created with all of Akshaj's heart as a surprise for Neha.

---

## ✨ Features Included

1. **Romantic Welcome Screen**:
   - Full-screen opening cinema with floating hearts and stardust glow.
   - Cinematic fade-in of **“Akshaj ❤️ Neha”** and romantic quote.
   - Glowing **“Open My Heart 💌”** button that reveals the love experience with a heart confetti burst.

2. **A Personal Handwritten-Style Love Letter**:
   - Vintage parchment card with wax seal stamped **“A ❤️ N”**.
   - Emotional Hindi/Hinglish message animated line-by-line.
   - Interactive heart counter allowing Neha to send love reactions.
   - Re-read / reveal controls.

3. **Our Memories — Photo Gallery**:
   - **Hero Spotlight Photo**: Large cinematic frame with gold-rose glow and quote.
   - **Romantic Collage**: Showcase of all 5 real photos of Akshaj & Neha (oriented upright and high-res).
   - **Interactive Lightbox**: Tap any photo to expand into a full-screen view with zoom, captions, and love reaction buttons.
   - **Add Memories Button**: Upload new memories directly from your device anytime.

4. **Romantic Music Player 🎵 — Featuring "Khaab" by Akhil**:
   - Built-in playback of your chosen romantic song: **Khaab by Akhil** (`/music/khaab.mp3`).
   - Includes **Spotify Embed Player** tab directly linked to [your Spotify track](https://open.spotify.com/track/0a6zRnrjmaOcqsEIFkXIhw?si=84d0a5e0c66d471b).
   - Animated spinning vinyl turntable featuring Akshaj & Neha's photo in the center.
   - Visualizer sound waves, play/pause controls, seekable progress bar, and volume slider.
   - Sticky floating mini-player at the bottom-right for continuous listening while scrolling.

5. **60 FPS Floating Hearts & Rose Petals ❤️**:
   - Smooth canvas particle system with hearts, rose petals, and golden sparkles.
   - Interactive heart confetti bursts when tapping buttons and liking photos.

6. **Why You Are Special, Neha 🌹**:
   - Section titled **“Tum Sabse Alag Ho, Neha ❤️”**.
   - 6 Glassmorphism cards with gradient borders and icons for each of the special reasons.

7. **Our Love Story Timeline 💞**:
   - Interactive timeline titled **“Our Little Love Story”**.
   - 4 Milestones:
     - *When we first met* (6 Nov 2026)
     - *Our favourite memory* (“jab bhi hum sath hote hai every memory is my favourite”)
     - *Our present journey* (“lovebirds joki ladte and pyaar krte hai or ek dusre ke bina reh nhi sakte meri rasmalai hai tu my future wify”)
     - *Our dreams for the future* (“future me dono ki ek family ho jisme hum khush rhe”)
   - Each card has an **Edit ✏️** button allowing you to personalize the words directly from the browser!

8. **An Interactive Surprise 💌**:
   - Glowing button: **“Neha, Ek Chhota Sa Surprise Hai ❤️”**.
   - Animated 3D-styled opening envelope with wax seal pop.
   - Unfolds Akshaj's secret message with a heart confetti shower and replay option.

9. **Cinematic Final Section & Virtual Hug 🫂**:
   - Monumental glowing couple names: **“AKSHAJ ❤️ NEHA”**.
   - Emotional romantic vows.
   - **“One More Hug? 🫂”** button that triggers an animated virtual hug modal with warm glowing hearts.

10. **Bonus Touches**:
    - **Daily Love Notes Generator**: Tap to reveal sweet compliments for Neha anytime.
    - **One More Hug Interactive Modal**: Warm hug with floating hearts and counter.

---

## 🚀 Running Locally

The website is already running on your local machine!

1. Open your browser and visit:
   - **Desktop / Laptop**: [http://localhost:5173/](http://localhost:5173/)
   - **Mobile (on same Wi-Fi)**: [http://192.168.29.83:5173/](http://192.168.29.83:5173/)

2. If you ever need to restart the server in the future:
   ```bash
   npm run dev
   ```

3. To build for production:
   ```bash
   npm run build
   ```

---

## 📸 Replacing or Adding Photos

All photos are placed in the `public/photos/` directory:
- `photo1.jpg`: Garden / outdoor couple photo (Hero spotlight)
- `photo2.jpg`: Sweet selfie together
- `photo3.jpg`: Cute photo with pink bows filter
- `photo4.jpg`: Bahce Café standing portrait
- `photo5.jpg`: Romantic selfie in white shirts

To change any photo:
1. Place your new photo in `public/photos/` with the same name (e.g., `photo1.jpg`).
2. Or use the **Upload Another Memory Photo 📸** button directly inside the gallery to preview new photos instantly.

---

## 🎵 Changing the Romantic Song

1. **Option A (Instant in browser)**:
   - Click the **“Upload Your Favourite Song 🎵”** button on the music player and choose any MP3 file from your device.

2. **Option B (Permanent in code)**:
   - Place your desired song file in `public/music/` and name it `love-song.mp3`.
   - Update `src/utils/audioService.js` line 18:
     ```js
     this.audioElement.src = '/music/love-song.mp3';
     ```

---

## 🌐 Deploying Online for Free (Shareable Link for Neha)

You can deploy this website online for free in less than 2 minutes so Neha can open it on her phone anytime:

### Method 1: Vercel (Recommended - Easiest & Fastest)
1. Go to [https://vercel.com](https://vercel.com) and sign up with GitHub or Google.
2. Install the Vercel CLI or upload your project:
   ```bash
   npx vercel
   ```
3. Follow the 3 prompts (hit Enter for default settings).
4. Vercel will give you a live free URL like: `https://akshaj-loves-neha.vercel.app`!

### Method 2: Netlify Drop (No command line needed!)
1. Build the production folder:
   ```bash
   npm run build
   ```
2. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop the `dist` folder into the Netlify window.
4. Your website is instantly live with a free custom URL!

---

*“Har love story special hoti hai, par meri favourite story woh hai jismein tum ho, Neha. ❤️”*
