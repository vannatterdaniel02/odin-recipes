import assert from 'node:assert/strict';
import { HashMap } from './HashMap.js';
import { HashSet } from './HashSet.js';

const test = new HashMap();
const items = [
  ['apple', 'red'], ['banana', 'yellow'], ['carrot', 'orange'],
  ['dog', 'brown'], ['elephant', 'gray'], ['frog', 'green'],
  ['grape', 'purple'], ['hat', 'black'], ['ice cream', 'white'],
  ['jacket', 'blue'], ['kite', 'pink'], ['lion', 'golden'],
];
for (const [key, value] of items) test.set(key, value);
assert.equal(test.loadFactor, 0.75);
assert.equal(test.capacity, 16);
assert.equal(test.length(), 12);
console.log(`12 entries: capacity ${test.capacity}, load ${test.length() / test.capacity}`);

test.set('apple', 'green');
test.set('lion', 'amber');
assert.equal(test.length(), 12);
assert.equal(test.capacity, 16);
assert.equal(test.get('apple'), 'green');

test.set('moon', 'silver');
assert.equal(test.capacity, 32);
assert.equal(test.length(), 13);
console.log(`13 entries: capacity ${test.capacity}, load ${test.length() / test.capacity}`);

for (const [key, value] of items) {
  assert.equal(test.get(key), key === 'apple' ? 'green' : key === 'lion' ? 'amber' : value);
}
assert.equal(test.get('moon'), 'silver');
test.set('moon', 'bright silver');
assert.equal(test.length(), 13);
assert.equal(test.capacity, 32);
assert.equal(test.get('moon'), 'bright silver');
assert.equal(test.get('missing'), undefined);
assert.equal(test.has('banana'), true);
assert.equal(test.has('missing'), false);
assert.equal(test.keys().length, 13);
assert.equal(test.values().length, 13);
assert.equal(test.entries().length, 13);
assert.equal(test.remove('banana'), true);
assert.equal(test.remove('banana'), false);
assert.equal(test.length(), 12);
assert.equal(test.has('banana'), false);
test.clear();
assert.equal(test.length(), 0);
assert.deepEqual(test.keys(), []);
assert.deepEqual(test.values(), []);
assert.deepEqual(test.entries(), []);

// Find a collision and verify both keys survive.
const collisionMap = new HashMap();
const seen = new Map();
let pair;
for (let i = 0; i < 100 && !pair; i++) {
  const key = `key${i}`;
  const bucket = collisionMap.hash(key);
  if (seen.has(bucket)) pair = [seen.get(bucket), key];
  else seen.set(bucket, key);
}
assert.ok(pair);
collisionMap.set(pair[0], 1);
collisionMap.set(pair[1], 2);
assert.equal(collisionMap.get(pair[0]), 1);
assert.equal(collisionMap.get(pair[1]), 2);

const set = new HashSet();
set.add('dog');
set.add('cat');
set.add('dog');
assert.equal(set.length(), 2);
assert.equal(set.has('dog'), true);
assert.equal(set.remove('dog'), true);
assert.equal(set.has('dog'), false);
set.clear();
assert.equal(set.length(), 0);

console.log('All HashMap and HashSet tests passed!');
