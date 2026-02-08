import { describe, it, expect } from 'vitest';
import {
  pointsEqual,
  collidesWithAny,
  checkSelfCollision,
  checkWallCollision,
  checkFoodCollision,
} from '../src/collision.js';

describe('pointsEqual', () => {
  it('returns true for identical points', () => {
    expect(pointsEqual({ x: 1, y: 2 }, { x: 1, y: 2 })).toBe(true);
  });

  it('returns false for different points', () => {
    expect(pointsEqual({ x: 1, y: 2 }, { x: 3, y: 4 })).toBe(false);
  });
});

describe('collidesWithAny', () => {
  it('returns true when point is in the list', () => {
    const points = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }];
    expect(collidesWithAny({ x: 1, y: 1 }, points)).toBe(true);
  });

  it('returns false when point is not in the list', () => {
    const points = [{ x: 0, y: 0 }, { x: 1, y: 1 }];
    expect(collidesWithAny({ x: 5, y: 5 }, points)).toBe(false);
  });

  it('returns false for empty list', () => {
    expect(collidesWithAny({ x: 1, y: 1 }, [])).toBe(false);
  });
});

describe('checkSelfCollision', () => {
  it('returns false for a straight snake', () => {
    const snake = [{ x: 3, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 0 }];
    expect(checkSelfCollision(snake)).toBe(false);
  });

  it('returns true when head overlaps body', () => {
    const snake = [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 0 }];
    expect(checkSelfCollision(snake)).toBe(true);
  });
});

describe('checkWallCollision', () => {
  it('returns false for a point inside bounds', () => {
    expect(checkWallCollision({ x: 5, y: 5 }, 10, 10)).toBe(false);
  });

  it('returns true for negative x', () => {
    expect(checkWallCollision({ x: -1, y: 5 }, 10, 10)).toBe(true);
  });

  it('returns true for x >= width', () => {
    expect(checkWallCollision({ x: 10, y: 5 }, 10, 10)).toBe(true);
  });

  it('returns true for negative y', () => {
    expect(checkWallCollision({ x: 5, y: -1 }, 10, 10)).toBe(true);
  });

  it('returns true for y >= height', () => {
    expect(checkWallCollision({ x: 5, y: 10 }, 10, 10)).toBe(true);
  });
});

describe('checkFoodCollision', () => {
  it('returns true when head is on food', () => {
    expect(checkFoodCollision({ x: 3, y: 4 }, { x: 3, y: 4 })).toBe(true);
  });

  it('returns false when head is not on food', () => {
    expect(checkFoodCollision({ x: 3, y: 4 }, { x: 5, y: 6 })).toBe(false);
  });
});
