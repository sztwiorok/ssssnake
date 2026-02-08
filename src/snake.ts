import { Point, Direction } from './types.js';

const OPPOSITE: Record<Direction, Direction> = {
  [Direction.Up]: Direction.Down,
  [Direction.Down]: Direction.Up,
  [Direction.Left]: Direction.Right,
  [Direction.Right]: Direction.Left,
};

const DIRECTION_DELTA: Record<Direction, Point> = {
  [Direction.Up]: { x: 0, y: -1 },
  [Direction.Down]: { x: 0, y: 1 },
  [Direction.Left]: { x: -1, y: 0 },
  [Direction.Right]: { x: 1, y: 0 },
};

export class Snake {
  private body: Point[];
  private direction: Direction;

  constructor(body: Point[], direction: Direction = Direction.Right) {
    this.body = [...body];
    this.direction = direction;
  }

  getHead(): Point {
    return this.body[0];
  }

  getBody(): Point[] {
    return [...this.body];
  }

  getDirection(): Direction {
    return this.direction;
  }

  getLength(): number {
    return this.body.length;
  }

  getNextHead(): Point {
    const head = this.body[0];
    const delta = DIRECTION_DELTA[this.direction];
    return { x: head.x + delta.x, y: head.y + delta.y };
  }

  move(grow: boolean = false): void {
    const newHead = this.getNextHead();
    this.body.unshift(newHead);
    if (!grow) {
      this.body.pop();
    }
  }

  setDirection(dir: Direction): void {
    if (OPPOSITE[dir] !== this.direction) {
      this.direction = dir;
    }
  }
}
