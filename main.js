// main.js (entry point)
import SceneManager from './engine/SceneManager.js';
import MenuScene from './scenes/MenuScene.js';
import Input from './engine/Input.js';
import { now } from './engine/Utils.js';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// === Canvas resizing utility ===
function resizeCanvasToWindow() {
  // keep a logical resolution (you can change baseWidth/baseHeight later)
  const baseWidth = 1280;
  const baseHeight = 720;

  const winW = window.innerWidth;
  const winH = window.innerHeight;
  const scale = Math.min(winW / baseWidth, winH / baseHeight);

  canvas.width = Math.round(baseWidth * scale);
  canvas.height = Math.round(baseHeight * scale);
  // we can also scale CSS size separately if desired; keep it simple for now
  canvas.style.width = `${canvas.width}px`;
  canvas.style.height = `${canvas.height}px`;
}

window.addEventListener('resize', resizeCanvasToWindow);
resizeCanvasToWindow(); // initial

// === Scene manager & initial scene setup ===
const sceneManager = new SceneManager();

// create and register the menu scene
const menuScene = new MenuScene(canvas);
sceneManager.register('menu', menuScene);

// start on menu
sceneManager.changeScene('menu');

// start input
Input.start();

// === Main loop ===
let lastTime = now();
function loop() {
  const t = now();
  const dt = (t - lastTime) / 1000; // seconds
  lastTime = t;

  sceneManager.update(dt);
  sceneManager.render(ctx);

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

// Export for debugging (module-scoped, not global)
export { canvas, ctx, sceneManager, Input };
