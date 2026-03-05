// scenes/GameScene.js

import WavePlayer from '../game/WavePlayer.js';
import { neonColors } from '../ui/NeonStyles.js';

export default class GameScene {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.player = null;
  }

  enter(data = {}) {
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');

    this.player = new WavePlayer({
      x: 150,
      y: this.canvas.height / 2,
      color: neonColors.blue,
      controlKey: 'ArrowRight'
    });
  }

  exit() {}

  update(dt) {
    this.player.update(dt);
  }

  render(ctx) {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Background
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.player.render(ctx);
  }
}
