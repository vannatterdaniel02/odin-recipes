# Battleship — The Odin Project

A browser-based Battleship game built with JavaScript ES modules, DOM event listeners, and unit tests.

## Features

- `Ship`, `Gameboard`, and `Player` classes in separate modules
- 10×10 boards, with ships of lengths 5, 4, 3, 3, and 2
- Click-to-place ships, orientation toggle, and random fleet placement
- Computer opponent makes random legal moves without repeating coordinates
- Hit and miss markers, sinking detection, and game-over messages
- Restart button and automated tests using Node's built-in test runner

## Play

From the `battleship` directory:

```bash
npm install
npm run start
```

Open the local URL printed by Vite (typically `http://127.0.0.1:5173`).

Click squares on **Your Fleet** to place each ship, rotating when needed, or choose **Random Fleet**. Then click **Enemy Waters** to attack. The computer fires after each of your turns. First to sink every opposing ship wins.

## Test

```bash
npm test
```

The tests cover ship behavior, board placement, collisions, attacks, computer moves, fleet placement, and game setup. UI interactions are managed separately in `src/dom.js`.

## Structure

- `src/Ship.js` — ship hit and sunk logic
- `src/Gameboard.js` — coordinates, placement, and attack tracking
- `src/Player.js` — player types and legal random computer attacks
- `src/game.js` — fleet setup and game initialization
- `src/dom.js` — rendering, click events, turn handling, and win detection
- `tests/battleship.test.js` — unit tests
- `index.html` / `style.css` — interface
