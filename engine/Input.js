// engine/Input.js
// A small keyboard input manager singleton.
// Usage: import Input from './engine/Input.js'; then Input.isKeyDown('ArrowRight')

class InputManager {
  constructor() {
    this.keys = new Set();
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onKeyUp = this._onKeyUp.bind(this);
    this._enabled = false;
  }

  start() {
    if (this._enabled) return;
    window.addEventListener('keydown', this._onKeyDown);
    window.addEventListener('keyup', this._onKeyUp);
    this._enabled = true;
  }

  stop() {
    if (!this._enabled) return;
    window.removeEventListener('keydown', this._onKeyDown);
    window.removeEventListener('keyup', this._onKeyUp);
    this.keys.clear();
    this._enabled = false;
  }

  _onKeyDown(e) {
    this.keys.add(e.key);
  }

  _onKeyUp(e) {
    this.keys.delete(e.key);
  }

  isKeyDown(key) {
    return this.keys.has(key);
    if (e.key === 'r' || e.key === 'R') {
  window.dispatchEvent(new Event('restartGame'));
  }
  }
  
}

const Input = new InputManager();
export default Input;
