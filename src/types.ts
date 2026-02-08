export interface Point {
  x: number;
  y: number;
}

export enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

export enum GameStatus {
  Running = 'RUNNING',
  GameOver = 'GAME_OVER',
}

export interface GameConfig {
  width: number;
  height: number;
  initialLength: number;
}

export interface GameState {
  snake: Point[];
  food: Point;
  score: number;
  status: GameStatus;
  direction: Direction;
}
