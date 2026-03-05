// engine/Utils.js
export function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}

export function now() {
  return performance.now();
}
