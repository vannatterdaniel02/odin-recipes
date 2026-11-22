// The Odin Project — Recursion: Merge Sort

function mergeSort(array) {
  // Base case: zero or one item is already sorted.
  if (array.length <= 1) return [...array];

  // Divide the array into two halves.
  const middle = Math.floor(array.length / 2);
  const left = mergeSort(array.slice(0, middle));
  const right = mergeSort(array.slice(middle));

  // Merge the sorted halves into one sorted array.
  const result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  return result.concat(left.slice(i), right.slice(j));
}

// Test cases from the assignment.
const tests = [
  [],
  [73],
  [1, 2, 3, 4, 5],
  [3, 2, 1, 13, 8, 5, 0, 1],
  [105, 79, 100, 110],
];

for (const test of tests) {
  console.log(`mergeSort(${JSON.stringify(test)}):`, mergeSort(test));
}
