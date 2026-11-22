import { Player } from './Player.js';

export const FLEET = [5, 4, 3, 3, 2];

export function randomizeFleet(board, lengths = FLEET) {
  for (const length of lengths) {
    const choices = [];
    for (let y = 0; y < board.size; y += 1) {
      for (let x = 0; x < board.size; x += 1) {
        for (const horizontal of [true, false]) {
          if (board.canPlaceShip(length, x, y, horizontal)) choices.push([x, y, horizontal]);
        }
      }
    }
    if (!choices.length) throw new Error('No room for fleet');
    const [x, y, horizontal] = choices[Math.floor(Math.random() * choices.length)];
    board.placeShip(length, x, y, horizontal);
  }
}

export function createGame() {
  const human = new Player('real');
  const computer = new Player('computer');
  randomizeFleet(computer.gameboard);
  return { human, computer, phase: 'placement', nextShip: 0, horizontal: true, winner: null };
}
