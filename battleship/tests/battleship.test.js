import test from 'node:test';
import assert from 'node:assert/strict';
import { Ship } from '../src/Ship.js';
import { Gameboard } from '../src/Gameboard.js';
import { Player } from '../src/Player.js';
import { createGame, randomizeFleet, FLEET } from '../src/game.js';

test('ship tracks hits and sinking', () => {
  const ship = new Ship(2);
  assert.equal(ship.hits, 0);
  assert.equal(ship.isSunk(), false);
  ship.hit();
  assert.equal(ship.isSunk(), false);
  ship.hit();
  assert.equal(ship.isSunk(), true);
  ship.hit();
  assert.equal(ship.hits, 2);
});

test('board places ships, handles collisions and bounds', () => {
  const board = new Gameboard();
  const ship = board.placeShip(3, 1, 2, true);
  assert.equal(board.grid[2][3], ship);
  assert.throws(() => board.placeShip(2, 2, 2), RangeError);
  assert.throws(() => board.placeShip(2, 9, 9), RangeError);
  assert.throws(() => board.receiveAttack(-1, 0), RangeError);
});

test('attacks record hits and misses and reject duplicates', () => {
  const board = new Gameboard();
  board.placeShip(2, 0, 0);
  assert.deepEqual(board.receiveAttack(9, 9), { hit: false, sunk: false });
  assert.deepEqual(board.missedAttacks, [[9, 9]]);
  assert.deepEqual(board.receiveAttack(0, 0), { hit: true, sunk: false });
  assert.deepEqual(board.receiveAttack(1, 0), { hit: true, sunk: true });
  assert.equal(board.allShipsSunk(), true);
  assert.throws(() => board.receiveAttack(0, 0), /already attacked/);
});

test('computer never repeats attacks', () => {
  const player = new Player('computer');
  const board = new Gameboard(3);
  const seen = new Set();
  for (let i = 0; i < 9; i += 1) {
    const shot = player.randomAttack(board);
    assert.ok(shot);
    seen.add(`${shot.x},${shot.y}`);
  }
  assert.equal(seen.size, 9);
  assert.equal(player.randomAttack(board), null);
});

test('random fleet places all ships without overlap', () => {
  const board = new Gameboard();
  randomizeFleet(board);
  assert.deepEqual(board.ships.map((s) => s.length), FLEET);
  const occupied = board.grid.flat().filter(Boolean);
  assert.equal(occupied.length, FLEET.reduce((a, b) => a + b, 0));
});

test('new game creates separate boards and computer fleet', () => {
  const game = createGame();
  assert.notEqual(game.human.gameboard, game.computer.gameboard);
  assert.equal(game.human.gameboard.ships.length, 0);
  assert.equal(game.computer.gameboard.ships.length, FLEET.length);
});
