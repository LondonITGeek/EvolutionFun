import Creature from "./creature.js";
import Game from "./game.js";

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min) + 1);
}

function roundToNearestFive(numberToRound) {
  return Math.ceil(numberToRound / 5) * 5;
}

function initialiseGame() {
  const game = new Game(128, 128, 5, false);
  for (let index = 0; index < 10; index++) {
    // 0,0 to 635,635
    const creature = new Creature(
      roundToNearestFive(randomNumberBetween(0, 635)),
      roundToNearestFive(randomNumberBetween(0, 635)),
      game.divisionSize,
      1,
      true
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
