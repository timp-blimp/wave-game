// ui/NeonStyles.js

export const neonColors = {
  blue: '#39f',
  green: '#0f9',
  yellow: '#ffd000',
  orange: '#ff7a00',
  purple: '#b026ff',
  red: '#ff2b2b'
};

export function applyNeonGlow(ctx, color, intensity = 20) {
  ctx.shadowColor = color;
  ctx.shadowBlur = intensity;
}
