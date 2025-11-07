/**
 * RPS FIGHTERS - Main Game Controller
 * Handles game flow, UI updates, and event management
 */

class RPSGame {
  constructor() {
    this.gameLogic = new GameLogic();
    this.ai = null;
    this.currentScreen = 'splash-screen';
    this.selectedMode = null;
    this.selectedDifficulty = 'normal';
    this.player1Character = null;
    this.player2Character = null;
    this.selectingFor = 1; // 1 or 2
    this.player1Move = null;
    this.player2Move = null;
    this.timer = null;
    this.timerValue = 0;
    this.playerMoveHistory = [];
    this.vibrationEnabled = true;
    this.stats = this.loadStats();

    // Initialize audio
    audioManager.init();

    // Bind methods
    this.init = this.init.bind(this);
    this.showScreen = this.showScreen.bind(this);
    this.handleMoveSelection = this.handleMoveSelection.bind(this);
  }

  /**
   * Initialize the game
   */
  init() {
    this.setupEventListeners();
    this.loadSettings();

    // Show main menu after splash screen
    setTimeout(() => {
      this.showScreen('main-menu');
    }, 2000);
  }

  /**
   * Setup all event listeners
   */
  setupEventListeners() {
    // Main menu buttons
    document.getElementById('btn-vs-ai').addEventListener('click', () => this.startVsAI());
    document.getElementById('btn-local').addEventListener('click', () => this.startLocal());
    document.getElementById('btn-practice').addEventListener('click', () => this.startPractice());
    document.getElementById('btn-how-to-play').addEventListener('click', () => this.showScreen('how-to-play'));
    document.getElementById('btn-settings').addEventListener('click', () => this.showScreen('settings-screen'));
    document.getElementById('btn-stats').addEventListener('click', () => this.showStats());

    // Difficulty buttons
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.selectDifficulty(e.target.closest('.difficulty-btn')));
    });

    // Character selection
    document.querySelectorAll('.character-card').forEach(card => {
      card.addEventListener('click', (e) => this.selectCharacter(e.target.closest('.character-card')));
    });

    // Move buttons
    document.querySelectorAll('.move-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleMoveSelection(e.target.closest('.move-btn')));
    });

    // Victory screen buttons
    document.getElementById('btn-rematch').addEventListener('click', () => this.rematch());
    document.getElementById('btn-char-select').addEventListener('click', () => this.backToCharSelect());
    document.getElementById('btn-main-menu').addEventListener('click', () => this.showScreen('main-menu'));

    // Settings buttons
    document.getElementById('toggle-sfx').addEventListener('click', () => this.toggleSFX());
    document.getElementById('toggle-music').addEventListener('click', () => this.toggleMusic());
    document.getElementById('toggle-vibration').addEventListener('click', () => this.toggleVibration());
    document.getElementById('btn-reset-stats').addEventListener('click', () => this.resetStats());

    // Back buttons
    document.getElementById('diff-back').addEventListener('click', () => this.showScreen('main-menu'));
    document.getElementById('char-back').addEventListener('click', () => this.backFromCharSelect());
    document.getElementById('help-back').addEventListener('click', () => this.showScreen('main-menu'));
    document.getElementById('settings-back').addEventListener('click', () => this.showScreen('main-menu'));
    document.getElementById('stats-back').addEventListener('click', () => this.showScreen('main-menu'));

    // Add button sound effects
    document.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        audioManager.playSFX('button');
        if (this.vibrationEnabled) {
          audioManager.vibrate('light');
        }
      });
    });
  }

  /**
   * Screen management
   */
  showScreen(screenId) {
    // Hide current screen
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
    });

    // Show new screen
    const newScreen = document.getElementById(screenId);
    if (newScreen) {
      newScreen.classList.add('active');
      this.currentScreen = screenId;
    }
  }

  /**
   * Start VS AI mode
   */
  startVsAI() {
    this.selectedMode = 'ai';
    audioManager.playSFX('select');
    this.showScreen('difficulty-screen');
  }

  /**
   * Start Local Multiplayer
   */
  startLocal() {
    this.selectedMode = 'local';
    this.selectedDifficulty = 'normal';
    audioManager.playSFX('select');
    this.selectingFor = 1;
    this.showCharacterSelect();
  }

  /**
   * Start Practice Mode
   */
  startPractice() {
    this.selectedMode = 'practice';
    this.selectedDifficulty = 'normal';
    audioManager.playSFX('select');
    this.selectingFor = 1;
    this.showCharacterSelect();
  }

  /**
   * Select difficulty
   */
  selectDifficulty(btn) {
    this.selectedDifficulty = btn.dataset.difficulty;
    audioManager.playSFX('select');
    this.selectingFor = 1;
    this.showCharacterSelect();
  }

  /**
   * Show character selection screen
   */
  showCharacterSelect() {
    const title = document.getElementById('player-select-title');
    if (this.selectedMode === 'local' && this.selectingFor === 2) {
      title.textContent = 'Player 2: Select Your Fighter';
    } else {
      title.textContent = 'Player 1: Select Your Fighter';
    }
    this.showScreen('character-select');
  }

  /**
   * Select character
   */
  selectCharacter(card) {
    const charName = card.dataset.character;
    const character = CHARACTERS[charName];

    audioManager.playSFX('select');

    // Highlight selected card
    document.querySelectorAll('.character-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');

    // Wait a moment then proceed
    setTimeout(() => {
      if (this.selectingFor === 1) {
        this.player1Character = character;

        if (this.selectedMode === 'local') {
          // Local multiplayer: now select player 2
          this.selectingFor = 2;
          this.showCharacterSelect();
          document.querySelectorAll('.character-card').forEach(c => c.classList.remove('selected'));
        } else {
          // VS AI or Practice: AI selects random character
          const charKeys = Object.keys(CHARACTERS);
          const randomChar = charKeys[Math.floor(Math.random() * charKeys.length)];
          this.player2Character = CHARACTERS[randomChar];
          this.startBattle();
        }
      } else {
        // Player 2 selection (local multiplayer)
        this.player2Character = character;
        this.startBattle();
      }
    }, 300);
  }

  /**
   * Back from character select
   */
  backFromCharSelect() {
    if (this.selectedMode === 'local' && this.selectingFor === 2) {
      // Go back to player 1 selection
      this.selectingFor = 1;
      this.showCharacterSelect();
    } else if (this.selectedMode === 'ai') {
      this.showScreen('difficulty-screen');
    } else {
      this.showScreen('main-menu');
    }
  }

  /**
   * Start the battle
   */
  startBattle() {
    // Initialize game logic
    this.gameLogic.initGame(
      this.player1Character,
      this.player2Character,
      this.selectedMode,
      this.selectedDifficulty
    );

    // Initialize AI if needed
    if (this.selectedMode === 'ai') {
      this.ai = new AIPlayer(this.selectedDifficulty);
    }

    // Reset move history
    this.playerMoveHistory = [];

    // Setup battle UI
    this.updateBattleUI();
    this.showScreen('battle-screen');

    // Start first round
    setTimeout(() => {
      this.startRound();
    }, 500);
  }

  /**
   * Update battle screen UI
   */
  updateBattleUI() {
    const state = this.gameLogic.getGameState();

    // Update round
    document.getElementById('round-text').textContent = `ROUND ${state.round}`;

    // Update player 1
    document.getElementById('p1-name').textContent = state.player1Character.name;
    this.updateHealthBar(1, state.player1Health, this.gameLogic.MAX_HEALTH);

    // Update player 2
    const p2Name = this.selectedMode === 'ai' ? 'AI OPPONENT' : 'PLAYER 2';
    document.getElementById('p2-name').textContent = p2Name;
    this.updateHealthBar(2, state.player2Health, this.gameLogic.MAX_HEALTH);

    // Update character portraits (colors)
    document.getElementById('p1-portrait').style.background =
      `linear-gradient(135deg, ${state.player1Character.colorTheme.primary}, ${state.player1Character.colorTheme.secondary})`;
    document.getElementById('p2-portrait').style.background =
      `linear-gradient(135deg, ${state.player2Character.colorTheme.primary}, ${state.player2Character.colorTheme.secondary})`;
  }

  /**
   * Update health bar
   */
  updateHealthBar(player, health, maxHealth) {
    const percentage = (health / maxHealth) * 100;
    const fillEl = document.getElementById(`p${player}-health-fill`);
    const textEl = document.getElementById(`p${player}-health-text`);

    fillEl.style.width = percentage + '%';
    textEl.textContent = `${Math.max(0, health)}/${maxHealth}`;

    // Add critical animation if health is low
    if (percentage <= 30 && percentage > 0) {
      fillEl.classList.add('health-critical');
    } else {
      fillEl.classList.remove('health-critical');
    }
  }

  /**
   * Start a new round
   */
  startRound() {
    this.player1Move = null;
    this.player2Move = null;

    // Reset move display
    document.getElementById('p1-move-display').classList.remove('show');
    document.getElementById('p2-move-display').classList.remove('show');
    document.getElementById('result-display').textContent = '';

    // Enable move buttons
    this.enableMoveButtons(true);

    // Start timer
    const timerDuration = this.gameLogic.getTimerDuration();
    if (timerDuration) {
      this.startTimer(timerDuration);
    }

    // AI makes move immediately (but hidden)
    if (this.selectedMode === 'ai') {
      setTimeout(() => {
        const aiMove = this.ai.selectMove(this.player2Character, this.playerMoveHistory);
        this.player2Move = aiMove;
      }, 500);
    }
  }

  /**
   * Timer functionality
   */
  startTimer(duration) {
    this.timerValue = Math.floor(duration / 1000);
    const timerText = document.getElementById('timer-text');
    const timerCircle = document.querySelector('.timer-circle');
    const circumference = 226; // 2 * PI * radius

    timerText.textContent = this.timerValue;

    this.timer = setInterval(() => {
      this.timerValue--;
      timerText.textContent = this.timerValue;

      // Update circle
      const offset = circumference - (this.timerValue / (duration / 1000)) * circumference;
      timerCircle.style.strokeDashoffset = offset;

      // Warning animation
      if (this.timerValue <= 2) {
        timerText.classList.add('timer-critical');
        audioManager.playSFX('countdown');
      } else if (this.timerValue <= 3) {
        timerText.classList.add('timer-warning');
        timerText.classList.remove('timer-critical');
      }

      // Time's up
      if (this.timerValue <= 0) {
        clearInterval(this.timer);
        this.handleTimeout();
      }
    }, 1000);
  }

  /**
   * Handle timeout (no move selected)
   */
  handleTimeout() {
    // Auto-select random move if player hasn't chosen
    if (!this.player1Move) {
      const moves = ['rock', 'paper', 'scissors'];
      const randomMove = moves[Math.floor(Math.random() * moves.length)];
      this.player1Move = this.player1Character.moves[randomMove];
    }

    // For local multiplayer player 2
    if (this.selectedMode === 'local' && !this.player2Move) {
      const moves = ['rock', 'paper', 'scissors'];
      const randomMove = moves[Math.floor(Math.random() * moves.length)];
      this.player2Move = this.player2Character.moves[randomMove];
    }

    this.resolveBattle();
  }

  /**
   * Enable/disable move buttons
   */
  enableMoveButtons(enabled) {
    document.querySelectorAll('.move-btn').forEach(btn => {
      btn.disabled = !enabled;
      btn.classList.remove('selected');
    });
  }

  /**
   * Handle move selection
   */
  handleMoveSelection(btn) {
    if (btn.disabled) return;

    const moveType = btn.dataset.move;

    if (this.selectedMode === 'local' && !this.player1Move) {
      // Player 1's turn
      this.player1Move = this.player1Character.moves[moveType];
      btn.classList.add('selected');
      audioManager.playSFX('select');
      if (this.vibrationEnabled) audioManager.vibrate('medium');

      // Wait for player 2
      if (!this.player2Move) {
        // In practice mode or if timer exists, don't wait
        if (this.selectedMode === 'practice' || this.timer) {
          return;
        }
      }
    } else {
      // Single player or player already moved
      if (this.selectedMode === 'local' && this.player1Move && !this.player2Move) {
        // Player 2's turn
        this.player2Move = this.player2Character.moves[moveType];
      } else {
        this.player1Move = this.player1Character.moves[moveType];
      }

      btn.classList.add('selected');
      audioManager.playSFX('select');
      if (this.vibrationEnabled) audioManager.vibrate('medium');
    }

    // Check if both players have moved
    if (this.player1Move && this.player2Move) {
      clearInterval(this.timer);
      this.enableMoveButtons(false);
      setTimeout(() => this.resolveBattle(), 500);
    }
  }

  /**
   * Resolve the battle round
   */
  resolveBattle() {
    // Resolve round in game logic
    const result = this.gameLogic.resolveRound(this.player1Move, this.player2Move);

    // Show moves
    this.showMoves(result);

    // Update move history
    this.playerMoveHistory.push(this.player1Move);

    // Update UI after animation
    setTimeout(() => {
      this.showResult(result);
      this.updateBattleUI();

      // Check for game over
      const gameOver = this.gameLogic.checkGameOver();
      if (gameOver) {
        setTimeout(() => this.endGame(gameOver), 2000);
      } else {
        // Next round
        this.gameLogic.nextRound();
        setTimeout(() => {
          this.updateBattleUI();
          this.startRound();
        }, 3000);
      }
    }, 1000);
  }

  /**
   * Show moves animation
   */
  showMoves(result) {
    const p1Display = document.getElementById('p1-move-display');
    const p2Display = document.getElementById('p2-move-display');

    // Get move icons
    const icons = { rock: '✊', paper: '✋', scissors: '✌️' };

    p1Display.textContent = icons[result.p1Move.type];
    p2Display.textContent = icons[result.p2Move.type];

    p1Display.classList.add('show');
    p2Display.classList.add('show');

    // Play collision sound
    audioManager.playCollisionSound(result.winner === 1 ? result.p1Move.type : result.p2Move.type);

    // Apply winner/loser animations
    if (result.winner === 1) {
      p1Display.classList.add('move-winner');
      p2Display.classList.add('move-loser');
    } else if (result.winner === 2) {
      p2Display.classList.add('move-winner');
      p1Display.classList.add('move-loser');
    }

    // Screen shake for heavy hits
    if (result.damage >= 5) {
      document.querySelector('#battle-screen').classList.add('screen-shake');
      if (this.vibrationEnabled) audioManager.vibrate('heavy');
      setTimeout(() => {
        document.querySelector('#battle-screen').classList.remove('screen-shake');
      }, 500);
    }
  }

  /**
   * Show round result
   */
  showResult(result) {
    const resultDisplay = document.getElementById('result-display');

    if (result.isTie) {
      resultDisplay.textContent = 'TIE!';
      resultDisplay.style.color = 'var(--text-secondary)';
    } else {
      const winnerText = result.winner === 1 ? 'YOU WIN!' : 'OPPONENT WINS!';
      resultDisplay.textContent = `${winnerText}\n-${result.damage} HP`;
      resultDisplay.style.color = result.winner === 1 ? 'var(--accent-cyan)' : 'var(--accent-red)';

      // Play damage sound
      audioManager.playDamageSound(result.damage);

      // Animate health bar
      const damagedPlayer = result.damagedPlayer;
      const healthBar = document.getElementById(`p${damagedPlayer}-health-bar`);
      healthBar.classList.add('health-decrease');
      setTimeout(() => healthBar.classList.remove('health-decrease'), 500);
    }
  }

  /**
   * End game and show victory screen
   */
  endGame(gameOverResult) {
    // Update stats
    this.updateStats(gameOverResult);

    // Setup victory screen
    const title = document.getElementById('victory-title');
    const reason = document.getElementById('victory-reason');
    const finalHealth = document.getElementById('final-health');
    const roundsPlayed = document.getElementById('rounds-played');

    if (gameOverResult.winner === 1) {
      title.textContent = 'YOU WIN!';
      title.style.color = 'var(--accent-cyan)';
      audioManager.playSFX('victory');
    } else if (gameOverResult.winner === 2) {
      title.textContent = 'YOU LOSE';
      title.style.color = 'var(--accent-red)';
      audioManager.playSFX('defeat');
    } else {
      title.textContent = 'SUDDEN DEATH!';
      title.style.color = 'var(--accent-purple)';
    }

    reason.textContent = gameOverResult.reason;
    finalHealth.textContent = `${gameOverResult.finalHealth.p1} - ${gameOverResult.finalHealth.p2}`;
    roundsPlayed.textContent = this.gameLogic.currentRound - 1;

    this.showScreen('victory-screen');
  }

  /**
   * Rematch
   */
  rematch() {
    this.startBattle();
  }

  /**
   * Back to character select
   */
  backToCharSelect() {
    this.selectingFor = 1;
    this.showCharacterSelect();
  }

  /**
   * Settings management
   */
  toggleSFX() {
    const btn = document.getElementById('toggle-sfx');
    const enabled = audioManager.toggleSFX();
    btn.textContent = enabled ? 'ON' : 'OFF';
    btn.classList.toggle('off', !enabled);
  }

  toggleMusic() {
    const btn = document.getElementById('toggle-music');
    const enabled = audioManager.toggleMusic();
    btn.textContent = enabled ? 'ON' : 'OFF';
    btn.classList.toggle('off', !enabled);
  }

  toggleVibration() {
    const btn = document.getElementById('toggle-vibration');
    this.vibrationEnabled = !this.vibrationEnabled;
    btn.textContent = this.vibrationEnabled ? 'ON' : 'OFF';
    btn.classList.toggle('off', !this.vibrationEnabled);
    localStorage.setItem('rps-fighters-vibration', this.vibrationEnabled);
  }

  loadSettings() {
    // Load audio settings
    const audioSettings = audioManager.getSettings();
    document.getElementById('toggle-sfx').textContent = audioSettings.sfxEnabled ? 'ON' : 'OFF';
    document.getElementById('toggle-music').textContent = audioSettings.musicEnabled ? 'ON' : 'OFF';

    // Load vibration setting
    const vibration = localStorage.getItem('rps-fighters-vibration');
    this.vibrationEnabled = vibration !== 'false';
    document.getElementById('toggle-vibration').textContent = this.vibrationEnabled ? 'ON' : 'OFF';
  }

  /**
   * Stats management
   */
  loadStats() {
    const saved = localStorage.getItem('rps-fighters-stats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn('Failed to load stats', e);
      }
    }
    return {
      gamesPlayed: 0,
      wins: 0,
      losses: 0,
      highestDamage: 0,
      characterUsage: {}
    };
  }

  saveStats() {
    localStorage.setItem('rps-fighters-stats', JSON.stringify(this.stats));
  }

  updateStats(gameOverResult) {
    this.stats.gamesPlayed++;
    if (gameOverResult.winner === 1) {
      this.stats.wins++;
    } else if (gameOverResult.winner === 2) {
      this.stats.losses++;
    }

    // Track character usage
    const charId = this.player1Character.id;
    this.stats.characterUsage[charId] = (this.stats.characterUsage[charId] || 0) + 1;

    this.saveStats();
  }

  showStats() {
    document.getElementById('stat-games').textContent = this.stats.gamesPlayed;
    document.getElementById('stat-wins').textContent = this.stats.wins;
    document.getElementById('stat-losses').textContent = this.stats.losses;

    const winRate = this.stats.gamesPlayed > 0
      ? Math.round((this.stats.wins / this.stats.gamesPlayed) * 100)
      : 0;
    document.getElementById('stat-winrate').textContent = winRate + '%';
    document.getElementById('stat-highest-damage').textContent = this.stats.highestDamage;

    // Find favorite character
    let favChar = 'None';
    let maxUsage = 0;
    for (let charId in this.stats.characterUsage) {
      if (this.stats.characterUsage[charId] > maxUsage) {
        maxUsage = this.stats.characterUsage[charId];
        favChar = charId.toUpperCase();
      }
    }
    document.getElementById('stat-fav-char').textContent = favChar;

    this.showScreen('stats-screen');
  }

  resetStats() {
    if (confirm('Are you sure you want to reset all stats?')) {
      this.stats = {
        gamesPlayed: 0,
        wins: 0,
        losses: 0,
        highestDamage: 0,
        characterUsage: {}
      };
      this.saveStats();
      this.showStats();
    }
  }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const game = new RPSGame();
  game.init();
});
