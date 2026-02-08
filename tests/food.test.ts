import { describe, it, expect } from 'vitest';
import { placeFood } from '../src/food.js';

describe('placeFood', () => {
  it('places food on unoccupied cell', () => {
    const occupied = [{ x: 0, y: 0 }];
    const rng = () => 0; // always pick first available
    const food = placeFood(3, 3, occupied, rng);
    expect(food).toEqual({ x: 1, y: 0 }); // first unoccupied cell
  });

  it('uses rng to select position', () => {
    const occupied: { x: number; y: number }[] = [];
    // 3x3 board = 9 cells, rng returning 0.5 => index 4
    const rng = () => 0.5;
    const food = placeFood(3, 3, occupied, rng);
    // index 4 in row-major order: (1,1)
    expect(food).toEqual({ x: 1, y: 1 });
  });

  it('avoids all occupied cells', () => {
    const occupied = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
    ];
    const rng = () => 0;
    const food = placeFood(2, 2, occupied, rng);
    expect(food).toEqual({ x: 1, y: 1 });
  });

  it('returns fallback when board is full', () => {
    const occupied = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ];
    const food = placeFood(2, 2, occupied);
    expect(food).toEqual({ x: 0, y: 0 });
  });
});
