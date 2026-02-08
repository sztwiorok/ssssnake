import { GameState, GameStatus } from './types.js';

export class TerminalRenderer {
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  render(state: GameState): void {
    // Move cursor to top-left
    process.stdout.write('\x1b[H');
    // Clear screen
    process.stdout.write('\x1b[2J');

    const snakeSet = new Map<string, 'head' | 'body'>();
    state.snake.forEach((p, i) => {
      snakeSet.set(`${p.x},${p.y}`, i === 0 ? 'head' : 'body');
    });

    // Top border
    let output = '+' + '-'.repeat(this.width) + '+\n';

    for (let y = 0; y < this.height; y++) {
      output += '|';
      for (let x = 0; x < this.width; x++) {
        const key = `${x},${y}`;
        if (snakeSet.has(key)) {
          output += snakeSet.get(key) === 'head' ? '@' : '#';
        } else if (state.food.x === x && state.food.y === y) {
          output += '*';
        } else {
          output += ' ';
        }
      }
      output += '|\n';
    }

    // Bottom border
    output += '+' + '-'.repeat(this.width) + '+\n';
    output += `Score: ${state.score}\n`;

    if (state.status === GameStatus.GameOver) {
      output += 'GAME OVER! Press q to quit.\n';
    } else {
      output += 'Arrow keys/WASD to move, q to quit\n';
    }

    process.stdout.write(output);
  }
}
