export class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    if (!(loadFactor > 0 && loadFactor < 1)) throw new RangeError('loadFactor must be between 0 and 1');
    if (!Number.isInteger(capacity) || capacity < 1) throw new RangeError('capacity must be a positive integer');
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = Array.from({ length: capacity }, () => []);
    this.count = 0;
  }

  hash(key) {
    if (typeof key !== 'string') throw new TypeError('Keys must be strings');
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  set(key, value) {
    const bucket = this.buckets[this.hash(key)];
    const existing = bucket.find(entry => entry[0] === key);
    if (existing) {
      existing[1] = value;
      return;
    }
    bucket.push([key, value]);
    this.count++;
    if (this.count / this.capacity > this.loadFactor) this.#grow();
  }

  #grow() {
    const previousEntries = this.entries();
    this.capacity *= 2;
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this.count = 0;
    for (const [key, value] of previousEntries) this.set(key, value);
  }

  get(key) {
    const entry = this.buckets[this.hash(key)].find(([storedKey]) => storedKey === key);
    return entry ? entry[1] : undefined;
  }

  has(key) {
    return this.buckets[this.hash(key)].some(([storedKey]) => storedKey === key);
  }

  remove(key) {
    const bucket = this.buckets[this.hash(key)];
    const index = bucket.findIndex(([storedKey]) => storedKey === key);
    if (index === -1) return false;
    bucket.splice(index, 1);
    this.count--;
    return true;
  }

  length() { return this.count; }

  clear() {
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this.count = 0;
  }

  keys() { return this.entries().map(([key]) => key); }
  values() { return this.entries().map(([, value]) => value); }
  entries() { return this.buckets.flatMap(bucket => bucket.map(([key, value]) => [key, value])); }
}
