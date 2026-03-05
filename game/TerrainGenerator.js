// game/TerrainGenerator.js

export default class TerrainGenerator {
  constructor(canvas, difficultySystem) {
    this.canvas = canvas;
    this.difficultySystem = difficultySystem;

    this.segmentWidth = 200;
    this.margin = 50;

    this.segments = [];
    this.reset();
  }

  reset() {
    this.segments = [];

    const midY = this.canvas.height / 2;
    this.currentTopY = midY - 150;
    this.currentBottomY = midY + 150;
    this.currentXEnd = 0;

    // Create initial flat safe area
    for (let i = 0; i < 5; i++) {
      this.addSegment(0, 0);
    }
  }

  addSegment(slope, difficultyLevel) {
    const width = this.segmentWidth;
    const deltaY = slope * width;

    const nextTopY = this.currentTopY + deltaY;
    const nextBottomY = this.currentBottomY + deltaY;

    // Bounds safety
    if (
      nextTopY < this.margin ||
      nextBottomY > this.canvas.height - this.margin
    ) {
      slope = 0;
    }

    const segment = {
      startX: this.currentXEnd,
      endX: this.currentXEnd + width,
      topStartY: this.currentTopY,
      topEndY: this.currentTopY + slope * width,
      bottomStartY: this.currentBottomY,
      bottomEndY: this.currentBottomY + slope * width
    };

    this.segments.push(segment);

    this.currentTopY = segment.topEndY;
    this.currentBottomY = segment.bottomEndY;
    this.currentXEnd += width;
  }

  generateIfNeeded(playerX) {
    const buffer = 800;

    if (playerX + buffer > this.currentXEnd) {
      const difficultyLevel =
        this.difficultySystem.getDifficulty(playerX);

      const slopeChance =
        this.difficultySystem.getSlopeChance(difficultyLevel);

      while (playerX + buffer > this.currentXEnd) {
        let slope = 0;

        if (Math.random() < slopeChance) {
          slope = Math.random() < 0.5 ? -1 : 1;
        }

        this.addSegment(slope, difficultyLevel);
      }
    }
  }

  render(ctx, playerX) {
    const difficultyLevel =
      this.difficultySystem.getDifficulty(playerX);

    const color =
      this.difficultySystem.getColor(difficultyLevel);

    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 8;
    ctx.shadowColor = color;
    ctx.shadowBlur = 20;

    ctx.beginPath();

    // Draw top
    for (let i = 0; i < this.segments.length; i++) {
      const s = this.segments[i];
      if (i === 0) ctx.moveTo(s.startX, s.topStartY);
      ctx.lineTo(s.endX, s.topEndY);
    }

    // Draw bottom
    for (let i = this.segments.length - 1; i >= 0; i--) {
      const s = this.segments[i];
      ctx.lineTo(s.startX, s.bottomStartY);
    }

    ctx.stroke();
    ctx.restore();
  }

  getCurrentBounds(x) {
    for (let s of this.segments) {
      if (x >= s.startX && x <= s.endX) {
        const t = (x - s.startX) / (s.endX - s.startX);

        const topY =
          s.topStartY + (s.topEndY - s.topStartY) * t;

        const bottomY =
          s.bottomStartY + (s.bottomEndY - s.bottomStartY) * t;

        return { topY, bottomY };
      }
    }
    return null;
  }
}
