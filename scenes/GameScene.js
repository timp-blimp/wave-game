// scenes/GameScene.js

import WavePlayer from '../game/WavePlayer.js';
import TerrainGenerator from '../game/TerrainGenerator.js';
import DifficultySystem from '../game/DifficultySystem.js';
import { neonColors } from '../ui/NeonStyles.js';

export default class GameScene {
  constructor() {
    this.canvas = null;
    this.ctx = null;

    this.player = null;
    this.terrain = null;
    this.difficulty = null;
  }

  enter() {
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');

    this.difficulty = new DifficultySystem();
    this.terrain = new TerrainGenerator(this.canvas, this.difficulty);

    this.player = new WavePlayer({
      x: 150,
      y: this.canvas.height / 2,
      color: neonColors.blue,
      controlKey: 'ArrowRight'
    });
  }

  update(dt) {
    this.player.update(dt);
    this.terrain.generateIfNeeded(this.player.x);
  }

  render(ctx) {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.terrain.render(ctx, this.player.x);
    this.player.render(ctx);
  }
}
