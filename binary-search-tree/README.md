# Odin Project — Binary Search Trees

Implements the Odin Project's Binary Search Trees assignment using JavaScript ES modules.

## Files
- `Tree.js`: `Node`, `Tree`, and `prettyPrint`, including all required tree operations.
- `main.js`: driver script with random numbers below 100, all four traversals, intentional unbalancing, rebalancing, and a visual tree printout.
- `test.js`: assertions for methods and edge cases.
- `package.json`: ES module configuration and scripts.

## Run
From this folder with Node.js installed:

```bash
node main.js
node test.js
```

Or run `npm start` and `npm test`.

## Notes
- Duplicate numbers are removed when building the tree; duplicate insertions are ignored.
- `height(value)` counts edges to the deepest leaf; a leaf has height `0`.
- `depth(value)` counts edges from the root; the root has depth `0`.
- Missing values return `undefined` for height and depth.
- Traversal callbacks receive numeric values, not Node objects.
- The tree is a standard binary search tree, not self-balancing on every insertion. Call `rebalance()` when needed.
