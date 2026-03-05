// ui/Button.js

import { applyNeonGlow } from './NeonStyles.js';

export default class Button {
  constructor({
    x,
    y,
    width,
    height,
    text,
    color,
    onClick
  }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.color = color;
    this.onClick = onClick;

    this.isHovered = false;
  }

  containsPoint(mx, my) {
    return (
      mx >= this.x &&
      mx <= this.x + this.width &&
      my >= this.y &&
      my <= this.y + this.height
    );
  }

  handleMouseMove(mx, my) {
    this.isHovered = this.containsPoint(mx, my);
  }

  handleClick(mx, my) {
    if (this.containsPoint(mx, my) && this.onClick) {
      this.onClick();
    }
  }

  render(ctx) {
    ctx.save();

    // Glow stronger if hovered
    const glowIntensity = this.isHovered ? 35 : 15;
    applyNeonGlow(ctx, this.color, glowIntensity);

    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;

    ctx.strokeRect(this.x, this.y, this.width, this.height);

    ctx.font = '20px Inter, Arial';
    ctx.fillStyle = this.color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText(
      this.text,
      this.x + this.width / 2,
      this.y + this.height / 2
    );

    ctx.restore();
  }
}
