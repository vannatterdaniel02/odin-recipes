export class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

export class LinkedList {
  constructor() {
    this.firstNode = null;
  }

  append(value) {
    const newNode = new Node(value);
    if (this.firstNode === null) {
      this.firstNode = newNode;
      return;
    }
    let current = this.firstNode;
    while (current.nextNode !== null) current = current.nextNode;
    current.nextNode = newNode;
  }

  prepend(value) {
    this.firstNode = new Node(value, this.firstNode);
  }

  size() {
    let count = 0;
    let current = this.firstNode;
    while (current !== null) {
      count++;
      current = current.nextNode;
    }
    return count;
  }

  head() {
    return this.firstNode?.value;
  }

  tail() {
    if (this.firstNode === null) return undefined;
    let current = this.firstNode;
    while (current.nextNode !== null) current = current.nextNode;
    return current.value;
  }

  at(index) {
    if (!Number.isInteger(index) || index < 0) return undefined;
    let current = this.firstNode;
    for (let i = 0; i < index && current !== null; i++) {
      current = current.nextNode;
    }
    return current?.value;
  }

  // This assignment specifies removing the HEAD, not the tail.
  pop() {
    if (this.firstNode === null) return undefined;
    const removedValue = this.firstNode.value;
    this.firstNode = this.firstNode.nextNode;
    return removedValue;
  }

  contains(value) {
    return this.findIndex(value) !== -1;
  }

  findIndex(value) {
    let current = this.firstNode;
    let index = 0;
    while (current !== null) {
      if (current.value === value) return index;
      current = current.nextNode;
      index++;
    }
    return -1;
  }

  toString() {
    const parts = [];
    let current = this.firstNode;
    while (current !== null) {
      parts.push(`( ${current.value} )`);
      current = current.nextNode;
    }
    return parts.length === 0 ? '' : `${parts.join(' -> ')} -> null`;
  }

  insertAt(index, ...values) {
    if (!Number.isInteger(index) || index < 0 || index > this.size()) {
      throw new RangeError('Index out of bounds');
    }
    if (values.length === 0) return;
    const first = new Node(values[0]);
    let last = first;
    for (const value of values.slice(1)) {
      last.nextNode = new Node(value);
      last = last.nextNode;
    }
    if (index === 0) {
      last.nextNode = this.firstNode;
      this.firstNode = first;
      return;
    }
    let previous = this.firstNode;
    for (let i = 1; i < index; i++) previous = previous.nextNode;
    last.nextNode = previous.nextNode;
    previous.nextNode = first;
  }

  removeAt(index) {
    if (!Number.isInteger(index) || index < 0 || index >= this.size()) {
      throw new RangeError('Index out of bounds');
    }
    if (index === 0) {
      this.firstNode = this.firstNode.nextNode;
      return;
    }
    let previous = this.firstNode;
    for (let i = 1; i < index; i++) previous = previous.nextNode;
    previous.nextNode = previous.nextNode.nextNode;
  }
}
