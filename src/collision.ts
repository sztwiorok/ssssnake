import { Point } from './types.js';

export function pointsEqual(a: Point, b: Point): boolean {
  return a.x === b.x && a.y === b.y;
}

export function collidesWithAny(point: Point, points: Point[]): boolean {
  return points.some((p) => pointsEqual(point, p));
}

export function checkSelfCollision(snake: Point[]): boolean {
  const head = snake[0];
  return collidesWithAny(head, snake.slice(1));
}

export function checkWallCollision(point: Point, width: number, height: number): boolean {
  return point.x < 0 || point.x >= width || point.y < 0 || point.y >= height;
}

export function checkFoodCollision(head: Point, food: Point): boolean {
  return pointsEqual(head, food);
}
