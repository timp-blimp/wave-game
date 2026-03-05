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

  // === Outer glow pass ===
  ctx.shadowColor = this.color;
  ctx.shadowBlur = 30;
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = this.color;

  ctx.beginPath();
  ctx.moveTo(this.trail[0].x, this.trail[0].y);

  for (let i = 1; i < this.trail.length; i++) {
    ctx.lineTo(this.trail[i].x, this.trail[i].y);
  }

  ctx.stroke();

  // === Bright inner core pass ===
  ctx.shadowBlur = 0;
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#ffffff';

  ctx.beginPath();
  ctx.moveTo(this.trail[0].x, this.trail[0].y);

  for (let i = 1; i < this.trail.length; i++) {
    ctx.lineTo(this.trail[i].x, this.trail[i].y);
  }

  ctx.stroke();

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
