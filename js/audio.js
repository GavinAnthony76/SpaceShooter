/**
 * RPS FIGHTERS - Audio System
 * Handles sound effects and music with fallback for missing assets
 */

class AudioManager {
  constructor() {
    this.sounds = {};
    this.music = {};
    this.sfxEnabled = true;
    this.musicEnabled = true;
    this.initialized = false;

    // Load settings from localStorage
    this.loadSettings();
  }

  /**
   * Initialize audio system
   * Uses Web Audio API for better mobile support
   */
  init() {
    if (this.initialized) return;

    // Create audio context (suspended until user interaction on mobile)
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.initialized = true;
    } catch (e) {
      console.warn('Web Audio API not supported', e);
    }
  }

  /**
   * Resume audio context (required for mobile)
   */
  resumeContext() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  /**
   * Play sound effect using Web Audio API or HTMLAudioElement
   * @param {string} soundName - Name of the sound to play
   */
  playSFX(soundName) {
    if (!this.sfxEnabled) return;

    this.resumeContext();

    // For now, use simple beep synthesis since we don't have audio files
    this.playBeep(soundName);
  }

  /**
   * Generate simple beep sounds using Web Audio API
   * Temporary solution until real audio assets are added
   */
  playBeep(type) {
    if (!this.audioContext) return;

    const ctx = this.audioContext;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Different frequencies for different sounds
    const soundConfig = {
      'button': { freq: 440, duration: 0.05, type: 'sine' },
      'select': { freq: 660, duration: 0.1, type: 'sine' },
      'countdown': { freq: 800, duration: 0.1, type: 'square' },
      'rock-hit': { freq: 200, duration: 0.2, type: 'sawtooth' },
      'paper-block': { freq: 400, duration: 0.15, type: 'sine' },
      'scissors-cut': { freq: 600, duration: 0.1, type: 'triangle' },
      'damage': { freq: 150, duration: 0.3, type: 'sawtooth' },
      'victory': { freq: 880, duration: 0.3, type: 'sine' },
      'defeat': { freq: 220, duration: 0.4, type: 'sawtooth' },
      'ko': { freq: 100, duration: 0.5, type: 'sawtooth' }
    };

    const config = soundConfig[type] || soundConfig['button'];

    oscillator.type = config.type;
    oscillator.frequency.value = config.freq;

    // Envelope
    const now = ctx.currentTime;
    gainNode.gain.setValueAtTime(0.3, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + config.duration);

    oscillator.start(now);
    oscillator.stop(now + config.duration);
  }

  /**
   * Play collision sound based on move types
   */
  playCollisionSound(moveType) {
    const soundMap = {
      'rock': 'rock-hit',
      'paper': 'paper-block',
      'scissors': 'scissors-cut'
    };
    this.playSFX(soundMap[moveType] || 'button');
  }

  /**
   * Play damage sound (scaled by damage amount)
   */
  playDamageSound(damageAmount) {
    if (damageAmount >= 5) {
      this.playSFX('damage');
    } else {
      this.playSFX('damage');
    }
  }

  /**
   * Haptic feedback (vibration)
   * @param {string} type - Type of haptic feedback
   */
  vibrate(type = 'light') {
    if (!navigator.vibrate) return;

    const patterns = {
      'light': 10,
      'medium': 20,
      'heavy': 50,
      'impact': [10, 30, 10]
    };

    navigator.vibrate(patterns[type] || 10);
  }

  /**
   * Toggle sound effects
   */
  toggleSFX() {
    this.sfxEnabled = !this.sfxEnabled;
    this.saveSettings();
    return this.sfxEnabled;
  }

  /**
   * Toggle music
   */
  toggleMusic() {
    this.musicEnabled = !this.musicEnabled;
    this.saveSettings();
    return this.musicEnabled;
  }

  /**
   * Save settings to localStorage
   */
  saveSettings() {
    localStorage.setItem('rps-fighters-audio', JSON.stringify({
      sfxEnabled: this.sfxEnabled,
      musicEnabled: this.musicEnabled
    }));
  }

  /**
   * Load settings from localStorage
   */
  loadSettings() {
    const saved = localStorage.getItem('rps-fighters-audio');
    if (saved) {
      try {
        const settings = JSON.parse(saved);
        this.sfxEnabled = settings.sfxEnabled !== false;
        this.musicEnabled = settings.musicEnabled !== false;
      } catch (e) {
        console.warn('Failed to load audio settings', e);
      }
    }
  }

  /**
   * Get current audio settings
   */
  getSettings() {
    return {
      sfxEnabled: this.sfxEnabled,
      musicEnabled: this.musicEnabled
    };
  }
}

// Create global instance
const audioManager = new AudioManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AudioManager, audioManager };
}
