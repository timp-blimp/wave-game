// engine/Camera.js
// Minimal camera: holds an x,y and can follow a target with an instant snap (we'll extend later).

export default class Camera {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  follow(target) {
    // target expected to have x and y properties
    if (!target) return;
    this.x = target.x;
    this.y = target.y;
  }
}
