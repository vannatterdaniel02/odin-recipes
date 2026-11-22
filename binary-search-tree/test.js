import assert from 'node:assert/strict';
import { Node, Tree } from './Tree.js';

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
const collect = (method, instance = tree) => {
  const result = [];
  instance[method]((value) => result.push(value));
  return result;
};
assert.equal(new Node().data, null);
assert.deepEqual(collect('inOrderForEach'), [1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]);
assert.equal(tree.isBalanced(), true);
assert.equal(tree.includes(23), true);
assert.equal(tree.includes(999), false);
assert.equal(tree.height(6345), 0);
assert.equal(tree.height(999), undefined);
assert.equal(tree.depth(tree.root.data), 0);
assert.equal(tree.depth(999), undefined);
const originalLength = collect('inOrderForEach').length;
tree.insert(23);
assert.equal(collect('inOrderForEach').length, originalLength);
tree.insert(1000);
assert.equal(tree.includes(1000), true);
tree.deleteItem(1000);
assert.equal(tree.includes(1000), false);
tree.deleteItem(999999);
assert.equal(collect('inOrderForEach').length, originalLength);
for (const method of ['levelOrderForEach', 'inOrderForEach', 'preOrderForEach', 'postOrderForEach']) {
  assert.throws(() => tree[method](), /callback/i);
  assert.equal(collect(method).length, originalLength);
}
for (let value = 10000; value < 10010; value++) tree.insert(value);
assert.equal(tree.isBalanced(), false);
tree.rebalance();
assert.equal(tree.isBalanced(), true);
assert.deepEqual(collect('inOrderForEach'), [...collect('inOrderForEach')].sort((a, b) => a - b));
const empty = new Tree([]);
assert.equal(empty.root, null);
assert.equal(empty.isBalanced(), true);
assert.deepEqual(collect('levelOrderForEach', empty), []);
empty.insert(4);
assert.equal(empty.root.data, 4);
empty.deleteItem(4);
assert.equal(empty.root, null);
const cases = [
  [[2, 1, 3], 1], // leaf
  [[2, 1, 3], 2], // two children
  [[2, 1], 2],    // one child
];
for (const [input, deleted] of cases) {
  const t = new Tree(input);
  t.deleteItem(deleted);
  assert.equal(t.includes(deleted), false);
}
console.log('All binary search tree tests passed!');
