import Creature from "./creature.js";
import Game from "./game.js";
import Genome from "./genome.js";
import SensitivityToProximityToEast from "./nn/inputs/SensitivityToProximityToEast";
import SensitivityToProximityToWest from "./nn/inputs/SensitivityToProximityToWest";
import SensitivityToProximityToSouth from "./nn/inputs/SensitivityToProximityToSouth";
import SensitivityToProximityToNorth from "./nn/inputs/SensitivityToProximityToNorth";
import NeuralNetwork from "./nn/neural-network.js";

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min) + 1);
}

function roundToNearest(numberToRound, valueToNearest) {
  return Math.ceil(numberToRound / valueToNearest) * valueToNearest;
}

function getPositionWithin(game) {
  return roundToNearest(randomNumberBetween(0, game.width * game.divisionSize - game.divisionSize), game.divisionSize);
}

const sensitivityNeuronFactory = (game) => (type) => {
  switch (type) {
    case "SensitivityToProximityToEast":
      return new SensitivityToProximityToEast(game);
    case "SensitivityToProximityToWest":
      return new SensitivityToProximityToWest(game);
    case "SensitivityToProximityToSouth":
      return new SensitivityToProximityToSouth(game);
    case "SensitivityToProximityToNorth":
      return new SensitivityToProximityToNorth(game);
    default:
      break;
  }
};

function initialiseGame() {
  const game = new Game(128, 128, 5, false);
  for (let index = 0; index < 10; index++) {
    // 0,0 to 635,635
    const genome = new Genome(5);
    const neuralNetwork = new NeuralNetwork(3, genome, sensitivityNeuronFactory(game));
    const creature = new Creature(
      genome,
      neuralNetwork,
      getPositionWithin(game),
      getPositionWithin(game),
      game.divisionSize,
      game.width,
      game.height,
      1,
      false
    );
    game.addCreature(creature);
  }

  return game;
}

let game = initialiseGame();
let framesPerSecond = 30;

function animate() {
  game.update();
  setTimeout(() => requestAnimationFrame(animate), 1000 / framesPerSecond);
}

animate();

// var n = new Genome(4);
// n.toString();

// var nn = new NeuralNetwork(2);
// for (let index = 0; index < 4; index++) {
//   var connection = nn.getConnection(n.chromosomes[index]);
//   console.log(connection.toString());
// }
