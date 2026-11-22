import assert from 'node:assert/strict';
import { knightMoves } from './knightMoves.js';

const cases = [
  [[0, 0], [1, 2], 1],
  [[0, 0], [3, 3], 2],
  [[3, 3], [0, 0], 2],
  [[3, 3], [4, 3], 3],
  [[0, 0], [7, 7], 6],
  [[4, 4], [4, 4], 0],
];

for (const [start, end, expectedMoves] of cases) {
  const path = knightMoves(start, end);
  assert.deepEqual(path[0], start);
  assert.deepEqual(path.at(-1), end);
  assert.equal(path.length - 1, expectedMoves);
  for (let i = 1; i < path.length; i++) {
    const dx = Math.abs(path[i][0] - path[i - 1][0]);
    const dy = Math.abs(path[i][1] - path[i - 1][1]);
    assert.ok((dx === 1 && dy === 2) || (dx === 2 && dy === 1));
    assert.ok(path[i].every((v) => v >= 0 && v < 8));
  }
}

for (const bad of [[-1, 0], [8, 0], [1.5, 2], [0], 'a']) {
  assert.throws(() => knightMoves(bad, [0, 0]), RangeError);
}

console.log('All Knight’s Travails tests passed!');
