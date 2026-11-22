import assert from 'node:assert/strict';
import { LinkedList, Node } from './LinkedList.js';

const list = new LinkedList();
list.append('dog');
list.append('cat');
list.append('parrot');
list.append('hamster');
list.append('snake');
list.append('turtle');

console.log('Required example:');
console.log(list.toString());
assert.equal(list.toString(), '( dog ) -> ( cat ) -> ( parrot ) -> ( hamster ) -> ( snake ) -> ( turtle ) -> null');

// Required methods
assert.equal(list.size(), 6);
assert.equal(list.head(), 'dog');
assert.equal(list.tail(), 'turtle');
assert.equal(list.at(2), 'parrot');
assert.equal(list.at(99), undefined);
assert.equal(list.contains('snake'), true);
assert.equal(list.contains('fish'), false);
assert.equal(list.findIndex('cat'), 1);
assert.equal(list.findIndex('fish'), -1);
list.prepend('rabbit');
assert.equal(list.head(), 'rabbit');
assert.equal(list.pop(), 'rabbit'); // Assignment asks pop() to remove the head.
assert.equal(list.head(), 'dog');

// Extra credit
const numbers = new LinkedList();
for (const number of [1, 2, 3]) numbers.append(number);
numbers.insertAt(1, 10, 11);
assert.equal(numbers.toString(), '( 1 ) -> ( 10 ) -> ( 11 ) -> ( 2 ) -> ( 3 ) -> null');
numbers.removeAt(2);
assert.equal(numbers.toString(), '( 1 ) -> ( 10 ) -> ( 2 ) -> ( 3 ) -> null');
numbers.insertAt(0, 0);
numbers.insertAt(numbers.size(), 4);
assert.equal(numbers.toString(), '( 0 ) -> ( 1 ) -> ( 10 ) -> ( 2 ) -> ( 3 ) -> ( 4 ) -> null');
assert.throws(() => numbers.insertAt(-1, 9), RangeError);
assert.throws(() => numbers.insertAt(99, 9), RangeError);
assert.throws(() => numbers.removeAt(-1), RangeError);
assert.throws(() => numbers.removeAt(99), RangeError);

// Empty list and duplicate value checks
const empty = new LinkedList();
assert.equal(empty.toString(), '');
assert.equal(empty.head(), undefined);
assert.equal(empty.tail(), undefined);
assert.equal(empty.at(0), undefined);
assert.equal(empty.pop(), undefined);
assert.throws(() => empty.removeAt(0), RangeError);
const duplicate = new LinkedList();
duplicate.append('same');
duplicate.append('same');
assert.equal(duplicate.findIndex('same'), 0);
assert.equal(new Node().value, null);
assert.equal(new Node().nextNode, null);

console.log('All linked list tests passed!');
