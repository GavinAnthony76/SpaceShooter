/**
 * RPS FIGHTERS - Character Data
 * Each character has 3 moves corresponding to Rock, Paper, Scissors
 */

const CHARACTERS = {
  ZEPHYRA: {
    id: 'zephyra',
    name: 'ZEPHYRA',
    title: 'The Tempest Dancer',
    gender: 'female',
    quote: 'Strike like the wind, vanish like the breeze',
    colorTheme: {
      primary: '#00CED1',    // Cyan
      secondary: '#C0C0C0',  // Silver
      accent: '#FFFFFF'      // White
    },
    fightingStyle: 'Swift and graceful',
    moves: {
      rock: {
        name: 'Gale Fang',
        type: 'rock',
        damage: 5,
        description: 'Crushing wind pressure',
        effect: 'wind-crush'
      },
      paper: {
        name: 'Whisper Slice',
        type: 'paper',
        damage: 3,
        description: 'Cutting air blade',
        effect: 'wind-slice'
      },
      scissors: {
        name: 'Breeze Needle',
        type: 'scissors',
        damage: 1,
        description: 'Piercing gust',
        effect: 'wind-pierce'
      }
    }
  },

  KRAGMAW: {
    id: 'kragmaw',
    name: 'KRAGMAW',
    title: 'The Mountain\'s Fury',
    gender: 'male',
    quote: 'Unyielding as stone, relentless as the earth',
    colorTheme: {
      primary: '#8B4513',    // Brown
      secondary: '#FF8C00',  // Orange
      accent: '#808080'      // Gray
    },
    fightingStyle: 'Heavy and powerful',
    moves: {
      rock: {
        name: 'Earthshatter Maul',
        type: 'rock',
        damage: 5,
        description: 'Devastating ground pound',
        effect: 'earth-shatter'
      },
      paper: {
        name: 'Avalanche Palm',
        type: 'paper',
        damage: 3,
        description: 'Overwhelming earth wave',
        effect: 'earth-wave'
      },
      scissors: {
        name: 'Pebble Shard',
        type: 'scissors',
        damage: 1,
        description: 'Sharp stone fragment',
        effect: 'earth-shard'
      }
    }
  },

  VEXILOR: {
    id: 'vexilor',
    name: 'VEXILOR',
    title: 'The Void Whisperer',
    gender: 'male',
    quote: 'Darkness bends, shadows obey',
    colorTheme: {
      primary: '#9370DB',    // Purple
      secondary: '#000000',  // Black
      accent: '#191970'      // Dark Blue
    },
    fightingStyle: 'Mysterious and unpredictable',
    moves: {
      rock: {
        name: 'Void Crush',
        type: 'rock',
        damage: 5,
        description: 'Collapsing darkness',
        effect: 'void-collapse'
      },
      paper: {
        name: 'Phantom Wrap',
        type: 'paper',
        damage: 3,
        description: 'Enveloping shadow',
        effect: 'void-wrap'
      },
      scissors: {
        name: 'Umbral Pierce',
        type: 'scissors',
        damage: 1,
        description: 'Focused shadow spike',
        effect: 'void-pierce'
      }
    }
  },

  PYRRAXIS: {
    id: 'pyrraxis',
    name: 'PYRRAXIS',
    title: 'The Flameheart',
    gender: 'male',
    quote: 'Burn bright, strike fast',
    colorTheme: {
      primary: '#DC143C',    // Red
      secondary: '#FF8C00',  // Orange
      accent: '#FFD700'      // Yellow/Gold
    },
    fightingStyle: 'Aggressive and explosive',
    moves: {
      rock: {
        name: 'Meteor Fist',
        type: 'rock',
        damage: 5,
        description: 'Explosive fire punch',
        effect: 'fire-explosion'
      },
      paper: {
        name: 'Inferno Cloak',
        type: 'paper',
        damage: 3,
        description: 'Swirling flame barrier',
        effect: 'fire-swirl'
      },
      scissors: {
        name: 'Cinder Dart',
        type: 'scissors',
        damage: 1,
        description: 'Rapid fire projectile',
        effect: 'fire-dart'
      }
    }
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CHARACTERS };
}
