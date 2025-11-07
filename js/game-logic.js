/**
 * RPS FIGHTERS - Core Game Logic
 * Handles Rock-Paper-Scissors mechanics with unique damage system
 */

class GameLogic {
  constructor() {
    this.MAX_HEALTH = 10;
    this.MAX_ROUNDS = 3;
    this.TIMER_HARD = 3000;    // 3 seconds in ms
    this.TIMER_NORMAL = 5000;  // 5 seconds in ms

    this.currentRound = 1;
    this.player1Health = this.MAX_HEALTH;
    this.player2Health = this.MAX_HEALTH;
    this.player1Character = null;
    this.player2Character = null;
    this.difficulty = 'normal'; // easy, normal, hard
    this.gameMode = 'ai'; // ai, local, practice
  }

  /**
   * Initialize a new game with selected characters
   */
  initGame(player1Char, player2Char, mode = 'ai', difficulty = 'normal') {
    this.player1Character = player1Char;
    this.player2Character = player2Char;
    this.gameMode = mode;
    this.difficulty = difficulty;
    this.currentRound = 1;
    this.player1Health = this.MAX_HEALTH;
    this.player2Health = this.MAX_HEALTH;
  }

  /**
   * Get timer duration based on difficulty
   */
  getTimerDuration() {
    if (this.gameMode === 'practice') return null; // No timer in practice
    return this.difficulty === 'hard' ? this.TIMER_HARD : this.TIMER_NORMAL;
  }

  /**
   * Determine winner of a single move clash
   * @param {string} move1 - 'rock', 'paper', or 'scissors'
   * @param {string} move2 - 'rock', 'paper', or 'scissors'
   * @returns {number} - 1 if player1 wins, 2 if player2 wins, 0 if tie
   */
  determineWinner(move1, move2) {
    if (move1 === move2) return 0; // Tie

    // Standard RPS rules: Rock > Scissors > Paper > Rock
    const winConditions = {
      rock: 'scissors',
      scissors: 'paper',
      paper: 'rock'
    };

    return winConditions[move1] === move2 ? 1 : 2;
  }

  /**
   * Calculate damage for a round
   * THE TWIST: Loser takes damage equal to BOTH cards combined
   * @param {object} p1Move - Player 1's move object
   * @param {object} p2Move - Player 2's move object
   * @returns {object} - Result of the round
   */
  resolveRound(p1Move, p2Move) {
    const winner = this.determineWinner(p1Move.type, p2Move.type);
    const totalDamage = p1Move.damage + p2Move.damage;

    let result = {
      winner: winner,
      damage: 0,
      p1Move: p1Move,
      p2Move: p2Move,
      totalDamage: totalDamage,
      isTie: winner === 0
    };

    // Apply damage to loser
    if (winner === 1) {
      this.player2Health -= totalDamage;
      result.damage = totalDamage;
      result.damagedPlayer = 2;
    } else if (winner === 2) {
      this.player1Health -= totalDamage;
      result.damage = totalDamage;
      result.damagedPlayer = 1;
    }

    // Ensure health doesn't go below 0
    this.player1Health = Math.max(0, this.player1Health);
    this.player2Health = Math.max(0, this.player2Health);

    // Update result with current health
    result.player1Health = this.player1Health;
    result.player2Health = this.player2Health;

    return result;
  }

  /**
   * Check if game is over
   * @returns {object|null} - Game over result or null if game continues
   */
  checkGameOver() {
    // K.O. victory
    if (this.player1Health <= 0) {
      return {
        winner: 2,
        reason: 'K.O.',
        finalHealth: { p1: this.player1Health, p2: this.player2Health }
      };
    }
    if (this.player2Health <= 0) {
      return {
        winner: 1,
        reason: 'K.O.',
        finalHealth: { p1: this.player1Health, p2: this.player2Health }
      };
    }

    // Round limit reached
    if (this.currentRound > this.MAX_ROUNDS) {
      if (this.player1Health > this.player2Health) {
        return {
          winner: 1,
          reason: 'Health Advantage',
          finalHealth: { p1: this.player1Health, p2: this.player2Health }
        };
      } else if (this.player2Health > this.player1Health) {
        return {
          winner: 2,
          reason: 'Health Advantage',
          finalHealth: { p1: this.player1Health, p2: this.player2Health }
        };
      } else {
        // Sudden death needed
        return {
          winner: 0,
          reason: 'Sudden Death',
          finalHealth: { p1: this.player1Health, p2: this.player2Health }
        };
      }
    }

    return null; // Game continues
  }

  /**
   * Advance to next round
   */
  nextRound() {
    this.currentRound++;
  }

  /**
   * Get current game state
   */
  getGameState() {
    return {
      round: this.currentRound,
      maxRounds: this.MAX_ROUNDS,
      player1Health: this.player1Health,
      player2Health: this.player2Health,
      player1Character: this.player1Character,
      player2Character: this.player2Character,
      difficulty: this.difficulty,
      gameMode: this.gameMode
    };
  }

  /**
   * Reset game to initial state
   */
  reset() {
    this.currentRound = 1;
    this.player1Health = this.MAX_HEALTH;
    this.player2Health = this.MAX_HEALTH;
  }

  /**
   * Helper method to get move by type from character
   */
  static getMoveByType(character, moveType) {
    return character.moves[moveType];
  }

  /**
   * Format damage display (for UI)
   */
  static formatDamage(damage) {
    return `-${damage} HP`;
  }

  /**
   * Get winner text for display
   */
  static getWinnerText(winner) {
    if (winner === 0) return 'TIE!';
    return `PLAYER ${winner} WINS!`;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GameLogic };
}
