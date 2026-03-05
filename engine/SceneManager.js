// engine/SceneManager.js
export default class SceneManager {
  constructor() {
    this.scenes = new Map(); // name -> scene instance/class
    this.current = null;     // current scene instance
    this._lastSceneName = null;
  }

  register(name, sceneInstance) {
    if (this.scenes.has(name)) {
      console.warn(`[SceneManager] Scene "${name}" is already registered and will be overwritten.`);
    }
    this.scenes.set(name, sceneInstance);
  }

  changeScene(name, data = {}) {
    if (!this.scenes.has(name)) {
      throw new Error(`[SceneManager] Scene "${name}" is not registered.`);
    }

    if (this.current && typeof this.current.exit === 'function') {
      this.current.exit();
    }

    const scene = this.scenes.get(name);
    this.current = scene;
    this._lastSceneName = name;
    if (typeof scene.enter === 'function') {
      scene.enter(data);
    }
  }

  update(dt) {
    if (this.current && typeof this.current.update === 'function') {
      this.current.update(dt);
    }
  }

  render(ctx) {
    if (this.current && typeof this.current.render === 'function') {
      this.current.render(ctx);
    }
  }

  getCurrentSceneName() {
    return this._lastSceneName;
  }
}
