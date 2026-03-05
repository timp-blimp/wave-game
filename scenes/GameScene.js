// scenes/GameScene.js

import WavePlayer from '../game/WavePlayer.js';
import TerrainGenerator from '../game/TerrainGenerator.js';
import DifficultySystem from '../game/DifficultySystem.js';
import Collision from '../game/Collision.js';
import Camera from '../engine/Camera.js';
import { neonColors } from '../ui/NeonStyles.js';

export default class GameScene {
  constructor() {
    this.canvas = null;
    this.ctx = null;

    this.player = null;
    this.terrain = null;
    this.difficulty = null;
    this.collision = null;
    this.camera = null;

    this.timeAlive = 0;
    this.score = 0;
    this.state = 'running'; // running | gameOver
  }

  enter() {
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');

    this.difficulty = new DifficultySystem();
    this.terrain = new TerrainGenerator(this.canvas, this.difficulty);
    this.collision = new Collision(6);
    this.camera = new Camera(0, 0);

    this.player = new WavePlayer({
      x: 150,
      y: this.canvas.height / 2,
      color: neonColors.blue,
      controlKey: 'ArrowRight'
    });

    this.score = 0;
    this.state = 'running';
  }

  update(dt) {
    if (this.state === 'gameOver') return;

    this.player.update(dt);
    this.timeAlive += dt;
    this.score = Math.floor(this.timeAlive * 10);
    // Camera follows player
    this.camera.setPosition(
      this.player.x - this.canvas.width / 3,
      0
    );

    this.terrain.generateIfNeeded(this.player.x);

    // Collision check
    if (this.collision.check(this.player, this.terrain)) {
      this.state = 'gameOver';
    }

    this.score = Math.floor(this.player.x);
  }

  render(ctx) {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.save();

    // Apply camera offset
    ctx.translate(-this.camera.x, 0);

    this.terrain.render(ctx, this.player.x);
    this.player.render(ctx);

    ctx.restore();

    this.renderUI(ctx);
  }

  renderUI(ctx) {
    ctx.save();

    ctx.fillStyle = '#fff';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${this.score}`, 20, 40);

    if (this.state === 'gameOver') {
      ctx.font = '40px Arial';
      ctx.fillStyle = '#ff2b2b';
      ctx.fillText(
        'GAME OVER - Press R to Restart',
        this.canvas.width / 2 - 250,
        this.canvas.height / 2
      );
    }

    ctx.restore();
  }

  exit() {}

  // Restart logic handled by keyboard
  handleRestart() {
    this.enter();
    window.addEventListener('restartGame', () => {
  if (this.state === 'gameOver') {
    this.enter();
  }
});
  }
}
