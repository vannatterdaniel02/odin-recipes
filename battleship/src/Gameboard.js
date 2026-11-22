import { Ship } from './Ship.js';

export class Gameboard {
  constructor(size = 10) {
    if (!Number.isInteger(size) || size < 1) throw new RangeError('Invalid board size');
    this.size = size;
    this.grid = Array.from({ length: size }, () => Array(size).fill(null));
    this.ships = [];
    this.missedAttacks = [];
    this.attacks = new Set();
  }

  inBounds(x, y) {
    return Number.isInteger(x) && Number.isInteger(y) && x >= 0 && x < this.size && y >= 0 && y < this.size;
  }

  canPlaceShip(length, x, y, horizontal = true) {
    if (!Number.isInteger(length) || length < 1) return false;
    for (let i = 0; i < length; i += 1) {
      const px = x + (horizontal ? i : 0);
      const py = y + (horizontal ? 0 : i);
      if (!this.inBounds(px, py) || this.grid[py][px] !== null) return false;
    }
    return true;
  }

  placeShip(length, x, y, horizontal = true) {
    if (!this.canPlaceShip(length, x, y, horizontal)) throw new RangeError('Invalid or overlapping ship placement');
    const ship = new Ship(length);
    for (let i = 0; i < length; i += 1) {
      this.grid[y + (horizontal ? 0 : i)][x + (horizontal ? i : 0)] = ship;
    }
    this.ships.push(ship);
    return ship;
  }

  receiveAttack(x, y) {
    if (!this.inBounds(x, y)) throw new RangeError('Attack is outside the board');
    const key = `${x},${y}`;
    if (this.attacks.has(key)) throw new Error('Coordinate already attacked');
    this.attacks.add(key);
    const ship = this.grid[y][x];
    if (ship) {
      ship.hit();
      return { hit: true, sunk: ship.isSunk() };
    }
    this.missedAttacks.push([x, y]);
    return { hit: false, sunk: false };
  }

  wasAttacked(x, y) {
    return this.attacks.has(`${x},${y}`);
  }

  allShipsSunk() {
    return this.ships.length > 0 && this.ships.every((ship) => ship.isSunk());
  }
}
