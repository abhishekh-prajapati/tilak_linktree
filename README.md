# S.K. College & Tatva Fest 2026 - Linktree Clone

A responsive, high-performance Linktree clone designed specifically for **Tilak Education Society's S.K. College of Science & Commerce** and the **Tatva Fest 2026 / Shaan Concert**.

---

## 🌟 Key Features

1. **Exact 1:1 Visual Clone**:
   - Clean, rounded white pill buttons with soft drop shadows and authentic typography.
   - High-fidelity **Instagram** gradient icons and crisp vector **Chain Link** icon.
   - Button 1: `s.k.college` (Instagram)
   - Button 2: `tatva_by_tilak` (Instagram)
   - Button 3: `Registration link` (Direct Link)

2. **Dynamic Alternating Background**:
   - Seamlessly alternates between the **Fest Poster** (Aura, Manthan, Kaleidoscope 2026) and the **Concert Poster** (Shaan Live at Tatva 2026).
   - Smooth 1.2s crossfade with subtle Ken Burns cinematic zoom.
   - Interactive bottom dot indicators to manually switch between posters at any time.
   - Play/Pause toggle in the header.
   - Mobile touch-swipe support (swipe left/right to change poster).

3. **Mobile-First & Responsive**:
   - Designed for standard mobile screens (`100dvh`), with centered desktop showcase container.
   - Native Web Share API integration + clipboard fallback toast.

---

## 🚀 Quick Start / Local Preview

1. Open a terminal in this directory:
   ```powershell
   cd C:\Users\Admin\.gemini\antigravity\scratch\sk-college-linktree
   ```
2. Start the local server:
   ```bash
   python -m http.server 8080
   ```
3. Open in your browser:
   [http://localhost:8080](http://localhost:8080)

---

## ⚙️ Customization

Edit `script.js` to update any links or change the auto-slide duration:

```javascript
const CONFIG = {
  links: {
    skCollege: "https://www.instagram.com/s.k.college/",
    tatva: "https://www.instagram.com/tatva_by_tilak/",
    registration: "https://forms.gle/tilak-fest-registration"
  },
  autoSlideInterval: 5000 // duration in milliseconds
};
```
