// The Odin Project — Recursion: Fibonacci

// Iterative solution: build the sequence one number at a time.
function fibs(length) {
  if (!Number.isInteger(length) || length < 0) {
    throw new RangeError('Length must be a non-negative integer.');
  }

  const sequence = [];
  for (let i = 0; i < length; i++) {
    if (i < 2) {
      sequence.push(i);
    } else {
      sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
  }
  return sequence;
}

// Recursive solution: ask for the shorter sequence, then add its next number.
function fibsRec(length) {
  console.log('This was printed recursively');

  if (!Number.isInteger(length) || length < 0) {
    throw new RangeError('Length must be a non-negative integer.');
  }
  if (length === 0) return [];
  if (length === 1) return [0];

  const sequence = fibsRec(length - 1);
  const next = sequence.length === 1
    ? 1
    : sequence[sequence.length - 1] + sequence[sequence.length - 2];
  return [...sequence, next];
}

// Try several sequence lengths.
for (const length of [0, 1, 2, 5, 8]) {
  console.log(`\nfibs(${length}):`, fibs(length));
  console.log(`fibsRec(${length}):`, fibsRec(length));
}
