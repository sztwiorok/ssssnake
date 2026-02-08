import { describe, it, expect } from 'vitest';
import { Snake } from '../src/snake.js';
import { Direction } from '../src/types.js';

describe('Snake', () => {
  function createSnake() {
    return new Snake(
      [{ x: 5, y: 5 }, { x: 4, y: 5 }, { x: 3, y: 5 }],
      Direction.Right,
    );
  }

  describe('getHead', () => {
    it('returns the first segment', () => {
      const snake = createSnake();
      expect(snake.getHead()).toEqual({ x: 5, y: 5 });
    });
  });

  describe('getBody', () => {
    it('returns all segments', () => {
      const snake = createSnake();
      expect(snake.getBody()).toEqual([
        { x: 5, y: 5 },
        { x: 4, y: 5 },
        { x: 3, y: 5 },
      ]);
    });

    it('returns a copy (not a reference)', () => {
      const snake = createSnake();
      const body = snake.getBody();
      body.push({ x: 99, y: 99 });
      expect(snake.getLength()).toBe(3);
    });
  });

  describe('getLength', () => {
    it('returns correct length', () => {
      const snake = createSnake();
      expect(snake.getLength()).toBe(3);
    });
  });

  describe('getNextHead', () => {
    it('returns the next position based on direction', () => {
      const snake = createSnake();
      expect(snake.getNextHead()).toEqual({ x: 6, y: 5 });
    });

    it('computes up correctly', () => {
      const snake = new Snake([{ x: 5, y: 5 }], Direction.Up);
      expect(snake.getNextHead()).toEqual({ x: 5, y: 4 });
    });

    it('computes down correctly', () => {
      const snake = new Snake([{ x: 5, y: 5 }], Direction.Down);
      expect(snake.getNextHead()).toEqual({ x: 5, y: 6 });
    });

    it('computes left correctly', () => {
      const snake = new Snake([{ x: 5, y: 5 }], Direction.Left);
      expect(snake.getNextHead()).toEqual({ x: 4, y: 5 });
    });
  });

  describe('move', () => {
    it('moves without growing (tail removed)', () => {
      const snake = createSnake();
      snake.move(false);
      expect(snake.getBody()).toEqual([
        { x: 6, y: 5 },
        { x: 5, y: 5 },
        { x: 4, y: 5 },
      ]);
      expect(snake.getLength()).toBe(3);
    });

    it('moves with growing (tail kept)', () => {
      const snake = createSnake();
      snake.move(true);
      expect(snake.getBody()).toEqual([
        { x: 6, y: 5 },
        { x: 5, y: 5 },
        { x: 4, y: 5 },
        { x: 3, y: 5 },
      ]);
      expect(snake.getLength()).toBe(4);
    });
  });

  describe('setDirection', () => {
    it('changes direction', () => {
      const snake = createSnake();
      snake.setDirection(Direction.Up);
      expect(snake.getDirection()).toBe(Direction.Up);
    });

    it('prevents 180-degree reversal', () => {
      const snake = createSnake(); // moving Right
      snake.setDirection(Direction.Left);
      expect(snake.getDirection()).toBe(Direction.Right);
    });

    it('allows perpendicular changes', () => {
      const snake = createSnake(); // moving Right
      snake.setDirection(Direction.Down);
      expect(snake.getDirection()).toBe(Direction.Down);
    });
  });
});
