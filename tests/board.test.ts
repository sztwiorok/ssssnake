import { describe, it, expect } from 'vitest';
import { Board } from '../src/board.js';

describe('Board', () => {
  const board = new Board(10, 8);

  describe('isInBounds', () => {
    it('returns true for a point inside the board', () => {
      expect(board.isInBounds({ x: 5, y: 4 })).toBe(true);
    });

    it('returns true for origin', () => {
      expect(board.isInBounds({ x: 0, y: 0 })).toBe(true);
    });

    it('returns true for max valid point', () => {
      expect(board.isInBounds({ x: 9, y: 7 })).toBe(true);
    });

    it('returns false for negative x', () => {
      expect(board.isInBounds({ x: -1, y: 0 })).toBe(false);
    });

    it('returns false for x equal to width', () => {
      expect(board.isInBounds({ x: 10, y: 0 })).toBe(false);
    });

    it('returns false for negative y', () => {
      expect(board.isInBounds({ x: 0, y: -1 })).toBe(false);
    });

    it('returns false for y equal to height', () => {
      expect(board.isInBounds({ x: 0, y: 8 })).toBe(false);
    });
  });

  describe('getAllPositions', () => {
    it('returns correct number of positions', () => {
      const positions = board.getAllPositions();
      expect(positions.length).toBe(80);
    });

    it('includes first and last positions', () => {
      const positions = board.getAllPositions();
      expect(positions[0]).toEqual({ x: 0, y: 0 });
      expect(positions[positions.length - 1]).toEqual({ x: 9, y: 7 });
    });

    it('works for a small board', () => {
      const small = new Board(2, 2);
      expect(small.getAllPositions()).toEqual([
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ]);
    });
  });
});
