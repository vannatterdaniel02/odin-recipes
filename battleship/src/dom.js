import { createGame, FLEET, randomizeFleet } from './game.js';

let game = createGame();
const playerBoard = document.querySelector('#player-board');
const enemyBoard = document.querySelector('#enemy-board');
const status = document.querySelector('#status');
const placementControls = document.querySelector('#placement-controls');
const rotateButton = document.querySelector('#rotate');
const randomButton = document.querySelector('#random');
const restartButton = document.querySelector('#restart');

function renderBoard(element, board, showShips, clickHandler) {
  element.replaceChildren();
  for (let y = 0; y < board.size; y += 1) {
    for (let x = 0; x < board.size; x += 1) {
      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'cell';
      cell.setAttribute('aria-label', `Column ${x + 1}, row ${y + 1}`);
      const ship = board.grid[y][x];
      const attacked = board.wasAttacked(x, y);
      if (attacked) {
        cell.classList.add(ship ? 'hit' : 'miss');
        cell.textContent = ship ? '×' : '•';
      } else if (showShips && ship) {
        cell.classList.add('ship');
      }
      const canClick = clickHandler && !attacked && (game.phase === 'placement' || game.phase === 'battle');
      cell.disabled = !canClick;
      if (canClick) cell.addEventListener('click', () => clickHandler(x, y));
      element.append(cell);
    }
  }
}

function render() {
  placementControls.hidden = game.phase !== 'placement';
  rotateButton.textContent = `Orientation: ${game.horizontal ? 'Horizontal' : 'Vertical'}`;
  renderBoard(playerBoard, game.human.gameboard, true, game.phase === 'placement' ? placeAt : null);
  renderBoard(enemyBoard, game.computer.gameboard, false, game.phase === 'battle' ? attackAt : null);
  if (game.phase === 'placement') {
    status.textContent = `Place ship ${game.nextShip + 1} of ${FLEET.length} (length ${FLEET[game.nextShip]}). Click your board, or choose Random Fleet.`;
  } else if (game.phase === 'over') {
    status.textContent = game.winner === 'human' ? 'Victory! You sank the enemy fleet!' : 'Defeat! The computer sank your fleet.';
  }
}

function placeAt(x, y) {
  const length = FLEET[game.nextShip];
  if (!game.human.gameboard.canPlaceShip(length, x, y, game.horizontal)) {
    status.textContent = 'That ship does not fit there. Choose another square or rotate.';
    return;
  }
  game.human.gameboard.placeShip(length, x, y, game.horizontal);
  game.nextShip += 1;
  if (game.nextShip === FLEET.length) game.phase = 'battle';
  render();
  if (game.phase === 'battle') status.textContent = 'Fleet deployed. Attack by clicking the enemy board!';
}

function attackAt(x, y) {
  if (game.phase !== 'battle') return;
  const result = game.computer.gameboard.receiveAttack(x, y);
  if (game.computer.gameboard.allShipsSunk()) {
    game.phase = 'over';
    game.winner = 'human';
    render();
    return;
  }
  const reply = game.computer.randomAttack(game.human.gameboard);
  if (game.human.gameboard.allShipsSunk()) {
    game.phase = 'over';
    game.winner = 'computer';
    render();
    return;
  }
  render();
  status.textContent = `You ${result.hit ? 'hit' : 'missed'} at (${x + 1}, ${y + 1})${result.sunk ? ' and sank a ship' : ''}! Computer ${reply.hit ? 'hit' : 'missed'} at (${reply.x + 1}, ${reply.y + 1})${reply.sunk ? ' and sank a ship' : ''}. Your turn.`;
}

rotateButton.addEventListener('click', () => {
  game.horizontal = !game.horizontal;
  render();
});
randomButton.addEventListener('click', () => {
  game.human = new (game.human.constructor)('real');
  randomizeFleet(game.human.gameboard);
  game.nextShip = FLEET.length;
  game.phase = 'battle';
  render();
  status.textContent = 'Random fleet deployed. Click the enemy board to attack!';
});
restartButton.addEventListener('click', () => {
  game = createGame();
  render();
});
render();
