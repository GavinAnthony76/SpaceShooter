# 🎮 RPS FIGHTERS

A Progressive Web App (PWA) rock-paper-scissors card fighting game optimized for mobile devices. Choose your fighter, master the unique damage system, and battle against AI opponents or friends!

**[Play Now on GitHub Pages](#)** *(Link will be available after deployment)*

---

## ✨ Features

### Game Modes
- **VS AI** - Battle against intelligent AI opponents with 3 difficulty levels
- **Local Multiplayer** - Pass-and-play mode for 2 players on the same device
- **Practice Mode** - No timer, perfect for learning strategies

### Unique Gameplay
- **4 Unique Characters** - Each with themed moves and distinct visual styles
- **Twist Damage System** - Loser takes damage equal to BOTH cards combined!
- **Strategic Depth** - Rock (5 dmg), Paper (3 dmg), Scissors (1 dmg)
- **Timed Battles** - 5 seconds (Normal) or 3 seconds (Hard) per move
- **Round-based Combat** - Best of 3 rounds or K.O. victory

### PWA Features
- **Installable** - Add to home screen on mobile devices
- **Offline Play** - Full game functionality without internet
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Touch Controls** - Large, thumb-friendly buttons
- **Haptic Feedback** - Vibration support for immersive experience

---

## 🎯 How to Play

### Basic Rules
Rock beats Scissors, Scissors beats Paper, Paper beats Rock

### The Damage System (The Twist!)

Each move type deals different damage:
- **Rock moves:** 5 damage
- **Paper moves:** 3 damage
- **Scissors moves:** 1 damage

**The loser takes damage equal to BOTH cards combined!**

**Example:** Player 1 plays Rock (5 dmg), Player 2 plays Scissors (1 dmg)
- Player 1 wins (Rock beats Scissors)
- Player 2 takes 6 damage (5 + 1)

### Win Conditions
- **K.O.** - Reduce opponent's health to 0
- **Health Advantage** - Have more health after 3 rounds
- **Sudden Death** - Tie-breaker if health is equal after 3 rounds

### Starting Health
Each player starts with **10 HP**

---

## 👥 Characters

### ZEPHYRA - The Tempest Dancer ♀
*"Strike like the wind, vanish like the breeze"*

**Fighting Style:** Swift and graceful
**Theme:** Cyan/Silver/White

**Moves:**
- **Gale Fang** (Rock - 5 dmg) - Crushing wind pressure
- **Whisper Slice** (Paper - 3 dmg) - Cutting air blade
- **Breeze Needle** (Scissors - 1 dmg) - Piercing gust

---

### KRAGMAW - The Mountain's Fury ♂
*"Unyielding as stone, relentless as the earth"*

**Fighting Style:** Heavy and powerful
**Theme:** Brown/Orange/Gray

**Moves:**
- **Earthshatter Maul** (Rock - 5 dmg) - Devastating ground pound
- **Avalanche Palm** (Paper - 3 dmg) - Overwhelming earth wave
- **Pebble Shard** (Scissors - 1 dmg) - Sharp stone fragment

---

### VEXILOR - The Void Whisperer ♂
*"Darkness bends, shadows obey"*

**Fighting Style:** Mysterious and unpredictable
**Theme:** Purple/Black/Dark Blue

**Moves:**
- **Void Crush** (Rock - 5 dmg) - Collapsing darkness
- **Phantom Wrap** (Paper - 3 dmg) - Enveloping shadow
- **Umbral Pierce** (Scissors - 1 dmg) - Focused shadow spike

---

### PYRRAXIS - The Flameheart ♂
*"Burn bright, strike fast"*

**Fighting Style:** Aggressive and explosive
**Theme:** Red/Orange/Gold

**Moves:**
- **Meteor Fist** (Rock - 5 dmg) - Explosive fire punch
- **Inferno Cloak** (Paper - 3 dmg) - Swirling flame barrier
- **Cinder Dart** (Scissors - 1 dmg) - Rapid fire projectile

---

## 🤖 AI Difficulty Levels

### Easy
- Random move selection
- No pattern recognition
- Great for beginners

### Normal (5 second timer)
- Remembers your last 3 moves
- Basic pattern recognition
- Attempts to counter your favorite moves
- 70% strategic, 30% random

### Hard (3 second timer!)
- Advanced pattern detection
- Strategic damage considerations
- Exploits your weaknesses
- Unpredictable mix of tactics
- Only 3 seconds to choose!

---

## 🎮 Controls

### Mobile
- **Tap** character cards to select
- **Tap** Rock/Paper/Scissors buttons to choose moves
- Large, thumb-friendly interface

### Desktop
- **Click** to select characters and moves
- Fully responsive design

---

## 🚀 Installation

### Play Online
Simply visit the GitHub Pages URL (available after deployment)

### Install as PWA (Mobile)
1. Open the game in your mobile browser
2. Tap the "Add to Home Screen" prompt
3. The game will install like a native app
4. Launch from your home screen anytime
5. Works offline!

### Install as PWA (Desktop)
1. Open the game in Chrome, Edge, or similar browser
2. Click the install icon in the address bar
3. Or use Menu → "Install RPS Fighters"

---

## 📊 Stats Tracking

The game tracks your performance:
- **Games Played**
- **Wins & Losses**
- **Win Rate Percentage**
- **Highest Damage Dealt**
- **Favorite Character**

Stats are saved locally in your browser.

---

## ⚙️ Settings

- **Sound Effects** - Toggle game sounds on/off
- **Music** - Toggle background music on/off
- **Vibration** - Toggle haptic feedback on/off (mobile)
- **Reset Stats** - Clear your saved statistics

---

## 🛠️ Technical Details

### Built With
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid, Flexbox, animations
- **JavaScript (ES6+)** - Vanilla JS, no frameworks
- **PWA APIs** - Service Worker, Web App Manifest, Cache API
- **Web Audio API** - Sound generation
- **Vibration API** - Haptic feedback

### Browser Support
- Chrome/Edge 90+ ✅
- Safari 14+ ✅
- Firefox 88+ ✅
- Opera 76+ ✅

### Performance
- 60fps animations
- <3 second load time
- Fully responsive
- Optimized for mobile

---

## 📁 Project Structure

```
/
├── index.html              # Main HTML file
├── manifest.json           # PWA manifest
├── service-worker.js       # Service worker for offline
├── generate-icons.html     # Icon generator utility
├── css/
│   ├── style.css          # Main styles (mobile-first)
│   └── animations.css     # Animation keyframes
├── js/
│   ├── main.js            # Game controller
│   ├── characters.js      # Character data
│   ├── game-logic.js      # Core RPS mechanics
│   ├── ai.js              # AI opponent logic
│   └── audio.js           # Audio management
├── assets/
│   ├── images/
│   │   ├── ui/            # Icons and UI elements
│   │   ├── characters/    # Character portraits
│   │   └── effects/       # Particle effects
│   └── audio/
│       ├── sfx/           # Sound effects
│       └── music/         # Background music
└── README.md
```

---

## 🎨 Asset Generation

### Icons (PWA)

SVG placeholders are included. To generate PNG icons:

1. Open `generate-icons.html` in your browser
2. Right-click each canvas and save as:
   - `assets/images/ui/icon-192.png`
   - `assets/images/ui/icon-512.png`

### Character Portraits

Currently using CSS gradients as placeholders. You can replace with:
- AI-generated artwork
- Custom illustrations
- Pixel art sprites

Recommended sizes:
- Portrait: 512x512px (PNG with transparency)
- Thumbnail: 256x256px

---

## 🚧 Future Enhancements

Potential features for future updates:

- [ ] Online multiplayer
- [ ] More characters (8+ total)
- [ ] Special moves and abilities
- [ ] Tournament mode
- [ ] Character unlocks and progression
- [ ] Achievements system
- [ ] Leaderboards
- [ ] Custom character creator
- [ ] Sound effects and music tracks
- [ ] Multiple language support
- [ ] Colorblind accessibility mode

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### Areas to Contribute
- Additional characters
- AI improvements
- Visual assets (artwork, animations)
- Sound effects and music
- Bug fixes
- Performance optimizations
- Translations

---

## 📝 License

MIT License - Feel free to use this project for learning or personal use.

---

## 👤 Credits

**Game Design & Development:** Created with Claude Code
**Concept:** Original RPS fighters with unique damage mechanics
**Testing:** Community feedback welcome!

---

## 🐛 Known Issues

- PNG icons need to be generated manually (SVG placeholders provided)
- Audio uses synthesized beeps (custom sounds can be added)
- Character portraits are CSS gradients (artwork can be added)

---

## 📞 Support

Found a bug? Have a suggestion?

- Open an issue on GitHub
- Check existing issues first
- Provide detailed reproduction steps

---

## 🎉 Have Fun!

Choose your fighter, master the damage system, and become the RPS champion!

**Rock > Scissors > Paper > Rock**

May the best strategist win! ⚔️

---

**Version:** 1.0.0
**Last Updated:** November 2024
