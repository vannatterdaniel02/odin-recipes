# Knight's Travails — The Odin Project

Find the shortest route for a knight between any two squares on a standard 8×8 chessboard.

## How it works

- Squares use `[x, y]` coordinates, each from `0` through `7`.
- The knight has eight possible L-shaped moves: two squares in one direction and one perpendicular.
- Breadth-first search (BFS) explores all positions one move away before positions two moves away, so the first route to the target is shortest.
- A queue explores positions, a visited set prevents cycles, and a predecessor map reconstructs the complete route.
- Invalid coordinates throw `RangeError`.

## Run

From this directory:

```bash
node main.js
node test.js
```

Or use `npm start` and `npm test`.

## Use

```javascript
import { knightMoves, printKnightMoves } from './knightMoves.js';

console.log(knightMoves([0, 0], [1, 2])); // [[0, 0], [1, 2]]
printKnightMoves([3, 3], [4, 3]);
```

Different shortest paths may be equally valid.
