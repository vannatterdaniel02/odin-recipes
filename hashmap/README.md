# The Odin Project — HashMap

A JavaScript hash map implemented with an array of buckets and separate chaining for collisions.

## Files

- `HashMap.js` — required `HashMap` class with `hash`, `set`, `get`, `has`, `remove`, `length`, `clear`, `keys`, `values`, and `entries`.
- `HashSet.js` — extra-credit `HashSet` class storing unique keys only.
- `main.js` — tests using the assignment's 12 original entries, overwrites, the 13th `moon` entry, collisions, removal, clearing, and the set.
- `package.json` — enables ES modules and a test script.

## Run

From this folder:

```bash
node main.js
```

Or:

```bash
npm test
```

## Design notes

- Starts at capacity 16 with a load factor of 0.75.
- Uses the polynomial hash with multiplier 31, applying modulo at each character to avoid unsafe integer growth.
- Collisions are handled by storing multiple `[key, value]` entries in the same bucket.
- Existing keys are updated in place, without changing length or triggering growth.
- Adding a new key that makes `length / capacity` exceed 0.75 doubles capacity and rehashes entries.
- Bucket traversal order is not guaranteed to match insertion order.
- Keys must be strings.
