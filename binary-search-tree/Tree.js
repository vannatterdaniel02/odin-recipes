export class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

export class Tree {
  constructor(array = []) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    const sorted = [...new Set(array)].sort((a, b) => a - b);
    const build = (start, end) => {
      if (start > end) return null;
      const mid = Math.floor((start + end) / 2);
      return new Node(sorted[mid], build(start, mid - 1), build(mid + 1, end));
    };
    return build(0, sorted.length - 1);
  }

  includes(value) {
    let current = this.root;
    while (current) {
      if (value === current.data) return true;
      current = value < current.data ? current.left : current.right;
    }
    return false;
  }

  insert(value) {
    const add = (node) => {
      if (!node) return new Node(value);
      if (value < node.data) node.left = add(node.left);
      else if (value > node.data) node.right = add(node.right);
      return node;
    };
    this.root = add(this.root);
  }

  deleteItem(value) {
    const remove = (node) => {
      if (!node) return null;
      if (value < node.data) node.left = remove(node.left);
      else if (value > node.data) node.right = remove(node.right);
      else {
        if (!node.left) return node.right;
        if (!node.right) return node.left;
        let successor = node.right;
        while (successor.left) successor = successor.left;
        node.data = successor.data;
        const deleteSuccessor = (subtree, successorValue) => {
          if (subtree.data === successorValue) return subtree.right;
          subtree.left = deleteSuccessor(subtree.left, successorValue);
          return subtree;
        };
        node.right = deleteSuccessor(node.right, successor.data);
      }
      return node;
    };
    this.root = remove(this.root);
  }

  levelOrderForEach(callback) {
    if (typeof callback !== 'function') throw new Error('A callback is required');
    if (!this.root) return;
    const queue = [this.root];
    for (let i = 0; i < queue.length; i++) {
      const node = queue[i];
      callback(node.data);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  inOrderForEach(callback) {
    if (typeof callback !== 'function') throw new Error('A callback is required');
    const visit = (node) => {
      if (!node) return;
      visit(node.left);
      callback(node.data);
      visit(node.right);
    };
    visit(this.root);
  }

  preOrderForEach(callback) {
    if (typeof callback !== 'function') throw new Error('A callback is required');
    const visit = (node) => {
      if (!node) return;
      callback(node.data);
      visit(node.left);
      visit(node.right);
    };
    visit(this.root);
  }

  postOrderForEach(callback) {
    if (typeof callback !== 'function') throw new Error('A callback is required');
    const visit = (node) => {
      if (!node) return;
      visit(node.left);
      visit(node.right);
      callback(node.data);
    };
    visit(this.root);
  }

  height(value) {
    const find = (node) => {
      if (!node) return null;
      if (value === node.data) return node;
      return find(value < node.data ? node.left : node.right);
    };
    const target = find(this.root);
    if (!target) return undefined;
    const measure = (node) => !node ? -1 : 1 + Math.max(measure(node.left), measure(node.right));
    return measure(target);
  }

  depth(value) {
    let current = this.root;
    let depth = 0;
    while (current) {
      if (current.data === value) return depth;
      current = value < current.data ? current.left : current.right;
      depth++;
    }
    return undefined;
  }

  isBalanced() {
    const check = (node) => {
      if (!node) return 0;
      const left = check(node.left);
      if (left === -1) return -1;
      const right = check(node.right);
      if (right === -1 || Math.abs(left - right) > 1) return -1;
      return 1 + Math.max(left, right);
    };
    return check(this.root) !== -1;
  }

  rebalance() {
    const values = [];
    this.inOrderForEach((value) => values.push(value));
    this.root = this.buildTree(values);
  }
}

export const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node == null) return;
  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
};
