import { Direction } from './types.js';

export function setupInput(
  onDirection: (dir: Direction) => void,
  onQuit: () => void,
): void {
  if (!process.stdin.isTTY) return;

  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', (key: string) => {
    switch (key) {
      case '\u001b[A': // Arrow Up
      case 'w':
      case 'W':
        onDirection(Direction.Up);
        break;
      case '\u001b[B': // Arrow Down
      case 's':
      case 'S':
        onDirection(Direction.Down);
        break;
      case '\u001b[D': // Arrow Left
      case 'a':
      case 'A':
        onDirection(Direction.Left);
        break;
      case '\u001b[C': // Arrow Right
      case 'd':
      case 'D':
        onDirection(Direction.Right);
        break;
      case 'q':
      case 'Q':
      case '\u0003': // Ctrl+C
        onQuit();
        break;
    }
  });
}
