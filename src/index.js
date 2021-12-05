import Creature from "./creature.js";
import Game from "./game.js";

function getRandomColour() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min) + 1);
}

function roundToNearest(numberToRound, valueToNearest) {
  return Math.ceil(numberToRound / valueToNearest) * valueToNearest;
}

function getPositionWithin(game) {
  return roundToNearest(randomNumberBetween(0, game.width * game.divisionSize - game.divisionSize), game.divisionSize);
}

function initialiseGame() {
  const game = new Game(128, 128, 5, false);
  for (let index = 0; index < 1000; index++) {
    // 0,0 to 635,635
    const creature = new Creature(
      getPositionWithin(game),
      getPositionWithin(game),
      game.divisionSize,
      game.width,
      game.height,
      1,
      getRandomColour(),
      false
    );
    game.addGameComponents(creature);
  }

  return game;
}

let game = initialiseGame();
let framesPerSecond = 20;

function animate() {
  game.update();
  setTimeout(() => requestAnimationFrame(animate), 1000 / framesPerSecond);
}

animate();
