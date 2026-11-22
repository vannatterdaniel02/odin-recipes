# The Odin Project — Recursion

This assignment practices iteration and recursion with Fibonacci sequences and recursive merge sort.

## Files

- `fibonacci.js` — `fibs(length)` uses a loop; `fibsRec(length)` uses recursion. Both return the first `length` Fibonacci numbers. The recursive function logs `This was printed recursively` on each call.
- `mergeSort.js` — `mergeSort(array)` recursively splits an array, sorts each half, and merges them. It returns a new sorted array without changing the input.

## Run in VS Code

Open the folder in VS Code, then open **Terminal → New Terminal**. Node.js must be installed.

```bash
node fibonacci.js
node mergeSort.js
```

The Fibonacci file tests lengths 0, 1, 2, 5, and 8. The merge sort file tests all five examples in the assignment.

For `fibsRec(8)`, the message prints 8 times because the function calls itself down to the length-1 base case.
