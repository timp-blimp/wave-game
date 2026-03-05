// scenes/MenuScene.js

import Button from '../ui/Button.js';
import { neonColors } from '../ui/NeonStyles.js';

export default class MenuScene {
  constructor(canvas, sceneManager) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.sceneManager = sceneManager;

    this.buttons = [];

    this._handleMouseMove = this._handleMouseMove.bind(this);
    this._handleClick = this._handleClick.bind(this);
  }

  enter() {
    this.createButtons();

    this.canvas.addEventListener('mousemove', this._handleMouseMove);
    this.canvas.addEventListener('click', this._handleClick);
  }

  exit() {
    this.canvas.removeEventListener('mousemove', this._handleMouseMove);
    this.canvas.removeEventListener('click', this._handleClick);
  }

  createButtons() {
    const centerX = this.canvas.width / 2;
    const startY = this.canvas.height / 2;

    const buttonWidth = 240;
    const buttonHeight = 50;
    const spacing = 70;

    this.buttons = [
      new Button({
        x: centerX - buttonWidth / 2,
        y: startY,
        width: buttonWidth,
        height: buttonHeight,
        text: 'Single Player',
        color: neonColors.blue,
        onClick: () => this.sceneManager.changeScene('game')
      }),
      new Button({
        x: centerX - buttonWidth / 2,
        y: startY + spacing,
        width: buttonWidth,
        height: buttonHeight,
        text: 'Two Player',
        color: neonColors.green,
        onClick: () => this.sceneManager.changeScene('game')
      }),
      new Button({
        x: centerX - buttonWidth / 2,
        y: startY + spacing * 2,
        width: buttonWidth,
        height: buttonHeight,
        text: 'Level Editor',
        color: neonColors.purple,
        onClick: () => this.sceneManager.changeScene('editor')
      })
    ];
  }

  _handleMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    this.buttons.forEach(button => {
      button.handleMouseMove(mx, my);
    });
  }

  _handleClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    this.buttons.forEach(button => {
      button.handleClick(mx, my);
    });
  }

  update(dt) {}

  render(ctx) {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Background
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Title
    ctx.save();
    ctx.font = 'bold 60px Inter, Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = neonColors.blue;
    ctx.shadowColor = neonColors.blue;
    ctx.shadowBlur = 25;
    ctx.fillText('WAVE GAME', this.canvas.width / 2, 150);
    ctx.restore();

    // Buttons
    this.buttons.forEach(button => button.render(ctx));
  }
}
