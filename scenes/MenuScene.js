// scenes/MenuScene.js
import Input from '../engine/Input.js';

export default class MenuScene {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  enter() {
    // start listening to input (if not already)
    Input.start();
  }

  exit() {
    // nothing yet
  }

  update(dt) {
    // placeholder: could animate title in the future
  }

  render(ctx) {
    const { width, height } = this.canvas;
    ctx.save();
    ctx.clearRect(0, 0, width, height);

    // Background
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);

    // Title
    ctx.font = 'bold 48px Inter, system-ui, Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#39f';
    ctx.fillText('WAVE GAME', width / 2, height / 2 - 40);

    // Subtext
    ctx.font = '16px Inter, system-ui, Arial';
    ctx.fillStyle = '#8fb';
    ctx.fillText('Placeholder menu (Step 1) — press Enter to start later', width / 2, height / 2 + 10);
    ctx.restore();
  }
}
