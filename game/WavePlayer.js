// game/WavePlayer.js

import Input from '../engine/Input.js';
import { neonColors } from '../ui/NeonStyles.js';

export default class WavePlayer {
  constructor({ x, y, color = neonColors.blue, controlKey = 'ArrowRight' }) {
    this.x = x;
    this.y = y;

    this.size = 16;
    this.speed = 300; // pixels per second (constant)

    this.color = color;
    this.controlKey = controlKey;

    this.direction = 1; // 1 = down, -1 = up
    this.trail = [];
    this.maxTrailLength = 150;
  }

  update(dt) {
    // Determine direction based on input
    if (Input.isKeyDown(this.controlKey)) {
      this.direction = -1;
    } else {
      this.direction = 1;
    }

    // Exact 45° movement
    const delta = this.speed * dt;

    this.x += delta;
    this.y += delta * this.direction;

    // Add to trail
    this.trail.push({ x: this.x, y: this.y });

    if (this.trail.length > this.maxTrailLength) {
      this.trail.shift();
    }
  }

  render(ctx) {
    this.renderTrail(ctx);
    this.renderPlayer(ctx);
  }

  renderTrail(ctx) {
  if (this.trail.length < 2) return;

  ctx.save();

  ctx.lineWidth = 6;              // thicker
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.shadowColor = this.color;   // glow
  ctx.shadowBlur = 15;

  for (let i = 1; i < this.trail.length; i++) {
    const p1 = this.trail[i - 1];
    const p2 = this.trail[i];

    // Stronger fade gradient
    const alpha = i / this.trail.length;

    ctx.strokeStyle = this.applyAlpha(this.color, alpha);

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }

  ctx.restore();
  }

  renderPlayer(ctx) {
    ctx.save();

    ctx.translate(this.x, this.y);

    // Rotate instantly based on direction
    const angle = this.direction === -1 ? -Math.PI / 4 : Math.PI / 4;
    ctx.rotate(angle);

    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 20;

    ctx.beginPath();
    ctx.moveTo(-this.size, this.size);
    ctx.lineTo(this.size, 0);
    ctx.lineTo(-this.size, -this.size);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  applyAlpha(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  reset(x, y) {
    this.x = x;
    this.y = y;
    this.trail = [];
  }
}
