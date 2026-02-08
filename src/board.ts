import { Point } from './types.js';

export class Board {
  constructor(
    public readonly width: number,
    public readonly height: number,
  ) {}

  isInBounds(point: Point): boolean {
    return point.x >= 0 && point.x < this.width && point.y >= 0 && point.y < this.height;
  }

  getAllPositions(): Point[] {
    const positions: Point[] = [];
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        positions.push({ x, y });
      }
    }
    return positions;
  }
}
