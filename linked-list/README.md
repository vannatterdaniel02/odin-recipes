# Odin Project — Linked Lists

A JavaScript singly linked list implemented using ES6 classes.

## Files

- `LinkedList.js`: exports `Node` and `LinkedList` classes
- `main.js`: demonstrates the required example and checks all methods with Node's built-in assertions
- `package.json`: enables ES modules and provides `npm test`

## Run

Install Node.js, open a terminal in this folder, and run:

```bash
node main.js
```

Or use `npm test`.

Expected output:

```text
Required example:
( dog ) -> ( cat ) -> ( parrot ) -> ( hamster ) -> ( snake ) -> ( turtle ) -> null
All linked list tests passed!
```

## Methods

`append`, `prepend`, `size`, `head`, `tail`, `at`, `pop`, `contains`, `findIndex`, and `toString`.

Extra credit: `insertAt(index, ...values)` and `removeAt(index)`. Both throw `RangeError` for invalid indices.

**Note:** This assignment specifically defines `pop()` as removing the *head* node, even though other linked-list implementations often use `pop()` to remove the tail.
