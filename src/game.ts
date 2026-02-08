import { Direction, GameConfig, GameState, GameStatus, Point } from './types.js';
import { Snake } from './snake.js';
import { Board } from './board.js';
import { placeFood } from './food.js';
import { checkWallCollision, checkSelfCollision, checkFoodCollision } from './collision.js';

export class Game {
  private snake: Snake;
  private board: Board;
  private food: Point;
  private score: number = 0;
  private status: GameStatus = GameStatus.Running;
  private rng: () => number;

  constructor(config: GameConfig, rng: () => number = Math.random) {
    this.rng = rng;
    this.board = new Board(config.width, config.height);

    const startX = Math.floor(config.width / 2);
    const startY = Math.floor(config.height / 2);
    const body: Point[] = [];
    for (let i = 0; i < config.initialLength; i++) {
      body.push({ x: startX - i, y: startY });
    }
    this.snake = new Snake(body, Direction.Right);
    this.food = placeFood(config.width, config.height, this.snake.getBody(), this.rng);
  }

  tick(): void {
    if (this.status !== GameStatus.Running) return;

    this.snake.move(false);
    const head = this.snake.getHead();

    if (checkWallCollision(head, this.board.width, this.board.height)) {
      this.status = GameStatus.GameOver;
      return;
    }

    if (checkSelfCollision(this.snake.getBody())) {
      this.status = GameStatus.GameOver;
      return;
    }

    if (checkFoodCollision(head, this.food)) {
      // Grow the snake by adding a tail segment (undo the pop from move)
      const body = this.snake.getBody();
      const tail = body[body.length - 1];
      // Re-create snake with growth: move again from previous state
      // Simpler approach: we move without grow, then detect food, then we need to grow
      // We'll add the tail back by doing a second move with grow next tick
      // Actually, let's just reconstruct: the snake moved, ate food, so add tail back
      this.snake = new Snake(
        [...this.snake.getBody(), tail],
        this.snake.getDirection(),
      );
      this.score++;
      this.food = placeFood(this.board.width, this.board.height, this.snake.getBody(), this.rng);
    }
  }

  changeDirection(dir: Direction): void {
    this.snake.setDirection(dir);
  }

  getState(): GameState {
    return {
      snake: this.snake.getBody(),
      food: this.food,
      score: this.score,
      status: this.status,
      direction: this.snake.getDirection(),
    };
  }

  static defaultConfig(): GameConfig {
    return {
      width: 20,
      height: 15,
      initialLength: 3,
    };
  }
}
