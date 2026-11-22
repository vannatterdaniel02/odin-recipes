import { Tree, prettyPrint } from './Tree.js';

const randomNumbers = Array.from({ length: 15 }, () => Math.floor(Math.random() * 100));
const tree = new Tree(randomNumbers);

function showTraversals(label) {
  console.log(`\n${label}`);
  const traversals = [
    ['Level order', 'levelOrderForEach'],
    ['Preorder', 'preOrderForEach'],
    ['Postorder', 'postOrderForEach'],
    ['Inorder', 'inOrderForEach'],
  ];
  for (const [name, method] of traversals) {
    const values = [];
    tree[method]((value) => values.push(value));
    console.log(`${name}: ${values.join(', ')}`);
  }
}

console.log('Original numbers:', randomNumbers);
console.log('Initially balanced:', tree.isBalanced());
showTraversals('Initial traversals');

for (const value of [101, 102, 103, 104, 105, 106, 107, 108, 109, 110]) {
  tree.insert(value);
}
console.log('\nAfter adding values greater than 100, balanced:', tree.isBalanced());

tree.rebalance();
console.log('After rebalance, balanced:', tree.isBalanced());
showTraversals('Rebalanced traversals');
console.log('\nRebalanced tree:');
prettyPrint(tree.root);
