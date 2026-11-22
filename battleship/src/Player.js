import { Gameboard } from './Gameboard.js';

export class Player {
  constructor(type = 'real') {
    if (!['real', 'computer'].includes(type)) throw new Error('Invalid player type');
    this.type = type;
    this.gameboard = new Gameboard();
  }

  randomAttack(opponentBoard) {
    const options = [];
    for (let y = 0; y < opponentBoard.size; y += 1) {
      for (let x = 0; x < opponentBoard.size; x += 1) {
        if (!opponentBoard.wasAttacked(x, y)) options.push([x, y]);
      }
    }
    if (!options.length) return null;
    const [x, y] = options[Math.floor(Math.random() * options.length)];
    return { x, y, ...opponentBoard.receiveAttack(x, y) };
  }
}
