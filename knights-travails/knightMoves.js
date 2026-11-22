const OFFSETS = [
  [2, 1], [1, 2], [-1, 2], [-2, 1],
  [-2, -1], [-1, -2], [1, -2], [2, -1],
];

function validSquare(square) {
  return Array.isArray(square) && square.length === 2 &&
    square.every((coordinate) => Number.isInteger(coordinate) && coordinate >= 0 && coordinate < 8);
}

const keyOf = ([x, y]) => `${x},${y}`;

export function knightMoves(start, end) {
  if (!validSquare(start) || !validSquare(end)) {
    throw new RangeError('Start and end must be [x, y] integer coordinates from 0 to 7.');
  }

  const queue = [[...start]];
  let front = 0;
  const visited = new Set([keyOf(start)]);
  const previous = new Map();
  const target = keyOf(end);

  while (front < queue.length) {
    const current = queue[front++];
    const currentKey = keyOf(current);
    if (currentKey === target) {
      const path = [];
      let step = current;
      while (step) {
        path.push(step);
        step = previous.get(keyOf(step));
      }
      return path.reverse();
    }

    for (const [dx, dy] of OFFSETS) {
      const next = [current[0] + dx, current[1] + dy];
      if (!validSquare(next)) continue;
      const nextKey = keyOf(next);
      if (visited.has(nextKey)) continue;
      visited.add(nextKey);
      previous.set(nextKey, current);
      queue.push(next);
    }
  }

  throw new Error('No path found.');
}

export function printKnightMoves(start, end) {
  const path = knightMoves(start, end);
  const moves = path.length - 1;
  console.log(`You made it in ${moves} move${moves === 1 ? '' : 's'}! Here's your path:`);
  path.forEach((square) => console.log(`  [${square.join(',')}]`));
  return path;
}
