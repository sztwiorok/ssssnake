import { Game } from './game.js';
import { TerminalRenderer } from './renderer.js';
import { setupInput } from './input.js';
import { GameStatus } from './types.js';

const config = Game.defaultConfig();
const game = new Game(config);
const renderer = new TerminalRenderer(config.width, config.height);

function quit(): void {
  process.stdout.write('\x1b[?25h'); // Show cursor
  process.exit(0);
}

setupInput(
  (dir) => game.changeDirection(dir),
  quit,
);

// Hide cursor
process.stdout.write('\x1b[?25l');

const TICK_RATE = 150;

const interval = setInterval(() => {
  game.tick();
  const state = game.getState();
  renderer.render(state);

  if (state.status === GameStatus.GameOver) {
    clearInterval(interval);
    // Keep rendering, wait for quit
  }
}, TICK_RATE);
