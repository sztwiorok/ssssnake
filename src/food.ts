import { Point } from './types.js';
import { collidesWithAny } from './collision.js';

export function placeFood(
  width: number,
  height: number,
  occupied: Point[],
  rng: () => number = Math.random,
): Point {
  const available: Point[] = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const point = { x, y };
      if (!collidesWithAny(point, occupied)) {
        available.push(point);
      }
    }
  }

  if (available.length === 0) {
    return { x: 0, y: 0 };
  }

  const index = Math.floor(rng() * available.length);
  return available[index];
}
