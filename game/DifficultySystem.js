// game/DifficultySystem.js

import { neonColors } from '../ui/NeonStyles.js';

export default class DifficultySystem {
  constructor() {
    this.baseWidth = 300;
    this.minWidth = 140;
  }

  getDifficulty(playerX) {
    if (playerX < 2000) return 0;
    if (playerX < 4000) return 1;
    if (playerX < 7000) return 2;
    if (playerX < 10000) return 3;
    if (playerX < 14000) return 4;
    return 5;
  }

  getColor(level) {
    const colors = [
      neonColors.blue,
      neonColors.green,
      neonColors.yellow,
      neonColors.orange,
      neonColors.purple,
      neonColors.red
    ];
    return colors[level];
  }

  getCorridorWidth(level) {
    const reduction = level * 25;
    return Math.max(this.minWidth, this.baseWidth - reduction);
  }

  getSlopeChance(level) {
    return 0.3 + level * 0.1;
  }
}
