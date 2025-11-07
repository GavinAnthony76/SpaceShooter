/**
 * RPS FIGHTERS - AI Opponents
 * Three difficulty levels: Easy, Normal, Hard
 */

class AIPlayer {
  constructor(difficulty = 'normal') {
    this.difficulty = difficulty;
    this.moveHistory = []; // Track opponent's moves
    this.MAX_HISTORY = 3;
  }

  /**
   * Get AI's move based on difficulty
   * @param {object} character - AI's character object
   * @param {array} playerMoveHistory - Player's previous moves
   * @returns {object} - Selected move object
   */
  selectMove(character, playerMoveHistory = []) {
    switch (this.difficulty) {
      case 'easy':
        return this.easyAI(character);
      case 'normal':
        return this.normalAI(character, playerMoveHistory);
      case 'hard':
        return this.hardAI(character, playerMoveHistory);
      default:
        return this.easyAI(character);
    }
  }

  /**
   * EASY AI: Completely random move selection
   */
  easyAI(character) {
    const moves = ['rock', 'paper', 'scissors'];
    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    return character.moves[randomMove];
  }

  /**
   * NORMAL AI: Pattern recognition
   * Remembers last 3 moves and tries to predict player's next move
   */
  normalAI(character, playerMoveHistory) {
    // If not enough history, random move
    if (playerMoveHistory.length < 2) {
      return this.easyAI(character);
    }

    // Look for patterns in last 3 moves
    const recentMoves = playerMoveHistory.slice(-this.MAX_HISTORY);

    // Count frequency of each move type
    const frequency = {
      rock: 0,
      paper: 0,
      scissors: 0
    };

    recentMoves.forEach(move => {
      if (move && move.type) {
        frequency[move.type]++;
      }
    });

    // Predict player will use their most frequent move
    let predictedMove = 'rock';
    let maxFreq = 0;
    for (let moveType in frequency) {
      if (frequency[moveType] > maxFreq) {
        maxFreq = frequency[moveType];
        predictedMove = moveType;
      }
    }

    // 70% chance to counter predicted move, 30% random
    if (Math.random() < 0.7) {
      const counterMove = this.getCounterMove(predictedMove);
      return character.moves[counterMove];
    } else {
      return this.easyAI(character);
    }
  }

  /**
   * HARD AI: Strategic thinking
   * - Considers damage values
   * - Exploits patterns more aggressively
   * - Mixes up strategy to avoid being predictable
   */
  hardAI(character, playerMoveHistory) {
    // Early game: random but weighted toward high damage
    if (playerMoveHistory.length < 2) {
      // 50% rock, 30% paper, 20% scissors (favor high damage)
      const rand = Math.random();
      if (rand < 0.5) return character.moves.rock;
      if (rand < 0.8) return character.moves.paper;
      return character.moves.scissors;
    }

    const recentMoves = playerMoveHistory.slice(-this.MAX_HISTORY);

    // Advanced pattern detection
    const patterns = this.detectPatterns(recentMoves);

    // Strategy selection based on pattern confidence
    let selectedMove;

    if (patterns.hasStrongPattern) {
      // High confidence: counter the predicted move
      const predictedPlayerMove = patterns.predictedMove;
      const counterMove = this.getCounterMove(predictedPlayerMove);
      selectedMove = counterMove;
    } else if (patterns.playerFavorsLowDamage) {
      // Player uses scissors often: use rock
      selectedMove = 'rock';
    } else {
      // No clear pattern: strategic mix
      // Weight toward rock/paper (higher damage)
      const rand = Math.random();
      if (rand < 0.4) selectedMove = 'rock';
      else if (rand < 0.75) selectedMove = 'paper';
      else selectedMove = 'scissors';
    }

    // 10% chance to randomly deviate (unpredictability)
    if (Math.random() < 0.1) {
      return this.easyAI(character);
    }

    return character.moves[selectedMove];
  }

  /**
   * Detect advanced patterns in player moves
   */
  detectPatterns(moveHistory) {
    if (moveHistory.length < 2) {
      return { hasStrongPattern: false };
    }

    const frequency = { rock: 0, paper: 0, scissors: 0 };
    let lastMove = null;
    let repeatingLast = 0;

    moveHistory.forEach((move, index) => {
      if (move && move.type) {
        frequency[move.type]++;
        if (index > 0 && move.type === lastMove) {
          repeatingLast++;
        }
        lastMove = move.type;
      }
    });

    // Find most common move
    let mostCommon = 'rock';
    let maxCount = 0;
    for (let type in frequency) {
      if (frequency[type] > maxCount) {
        maxCount = frequency[type];
        mostCommon = type;
      }
    }

    // Strong pattern if one move is used 60%+ of the time
    const total = moveHistory.length;
    const hasStrongPattern = (maxCount / total) >= 0.6;

    // Detect if player favors low damage (scissors)
    const playerFavorsLowDamage = frequency.scissors >= total * 0.5;

    // Check if player is repeating last move
    const likelyToRepeat = repeatingLast >= 1 && lastMove;

    return {
      hasStrongPattern,
      predictedMove: likelyToRepeat ? lastMove : mostCommon,
      playerFavorsLowDamage,
      frequency
    };
  }

  /**
   * Get the move that counters the given move
   * Rock > Scissors, Scissors > Paper, Paper > Rock
   */
  getCounterMove(moveType) {
    const counters = {
      rock: 'paper',      // Paper beats Rock
      paper: 'scissors',  // Scissors beats Paper
      scissors: 'rock'    // Rock beats Scissors
    };
    return counters[moveType] || 'rock';
  }

  /**
   * Update move history (for tracking)
   */
  recordMove(move) {
    this.moveHistory.push(move);
    if (this.moveHistory.length > this.MAX_HISTORY) {
      this.moveHistory.shift();
    }
  }

  /**
   * Reset AI state
   */
  reset() {
    this.moveHistory = [];
  }

  /**
   * Set AI difficulty
   */
  setDifficulty(difficulty) {
    this.difficulty = difficulty;
    this.reset();
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AIPlayer };
}
