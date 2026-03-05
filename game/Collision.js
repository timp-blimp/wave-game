// game/Collision.js

export default class Collision {
  constructor(margin = 6) {
    this.margin = margin;
  }

  check(player, terrain) {
    const bounds = terrain.getCurrentBounds(player.x);
    if (!bounds) return false;

    const { topY, bottomY } = bounds;

    if (player.y - player.size + this.margin <= topY) {
      return true;
    }

    if (player.y + player.size - this.margin >= bottomY) {
      return true;
    }

    return false;
  }
}
