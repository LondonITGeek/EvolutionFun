import Creature from "./creature.js";
import Game from "./game.js";
import Genome from "./genome.js";
import SensitivityToProximityToEast from "./nn/inputs/SensitivityToProximityToEast";
import SensitivityToProximityToWest from "./nn/inputs/SensitivityToProximityToWest";
import SensitivityToProximityToSouth from "./nn/inputs/SensitivityToProximityToSouth";
import SensitivityToProximityToNorth from "./nn/inputs/SensitivityToProximityToNorth";
import NeuralNetwork from "./nn/neural-network.js";

export default class Simulation {
  constructor(
    sizeOfPopulation,
    numberOfGenerationsToRun,
    movesPerGeneration,
    framesPerSecond,
    sizeOfGenome,
    numberOfNeuronsInHiddenLayer,
    mutationRate,
    successCriteriaVisualization
  ) {
    this.sizeOfPopulation = sizeOfPopulation;
    this.numberOfGenerationsToRun = numberOfGenerationsToRun;
    this.movesPerGeneration = movesPerGeneration;
    this.framesPerSecond = framesPerSecond;
    this.sizeOfGenome = sizeOfGenome;
    this.numberOfNeuronsInHiddenLayer = numberOfNeuronsInHiddenLayer;
    this.mutationRate = mutationRate;
    this.successCriteriaVisualization = successCriteriaVisualization;

    this._sensitivityNeuronFactory = (game) => (type) => {
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

    this.currentStepCount = 0;
    this.currentGenerationCount = 0;
    this.generationCountLabel = document.createElement("h1");
    document.body.appendChild(this.generationCountLabel);
    this.stepCountLabel = document.createElement("h1");
    document.body.appendChild(this.stepCountLabel);
  }

  _randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min) + 1);
  }

  _roundToNearest(numberToRound, valueToNearest) {
    return Math.ceil(numberToRound / valueToNearest) * valueToNearest;
  }

  _getPositionWithin(game) {
    return this._roundToNearest(this._randomNumberBetween(0, game.width * game.divisionSize - game.divisionSize), game.divisionSize);
  }

  _initialiseGame() {
    this.game = new Game(128, 128, 5, false, this.successCriteriaVisualization);
  }

  _generateInitialCohort() {
    for (let index = 0; index < this.sizeOfPopulation; index++) {
      // 0,0 to 635,635
      const genome = new Genome(this.sizeOfGenome);
      const neuralNetwork = new NeuralNetwork(this.numberOfNeuronsInHiddenLayer, genome, this._sensitivityNeuronFactory(this.game));
      const creature = new Creature(
        genome,
        neuralNetwork,
        this._getPositionWithin(this.game),
        this._getPositionWithin(this.game),
        this.game.divisionSize,
        this.game.width,
        this.game.height,
        1,
        false
      );
      this.game.addCreature(creature);
    }
  }

  _generateNextCohort(survivors) {
    this.game.gameCreatures = [];
    for (let indexOne = 0, indexTwo = 2; indexTwo < survivors.length; indexOne++, indexTwo++) {
      const parentOne = survivors[indexOne];
      const parentTwo = survivors[indexOne + 1];
      const parentOneGenome = parentOne.genome;
      const parentTwoGenome = parentTwo.genome;
      var childGenomeOne = Genome.createNewGenomeFromParents(parentOneGenome, parentTwoGenome);
      var childGenomeTwo = Genome.createNewGenomeFromParents(parentTwoGenome, parentOneGenome);
      const neuralNetworkOne = new NeuralNetwork(
        this.numberOfNeuronsInHiddenLayer,
        childGenomeOne,
        this._sensitivityNeuronFactory(this.game)
      );
      const neuralNetworkTwo = new NeuralNetwork(
        this.numberOfNeuronsInHiddenLayer,
        childGenomeTwo,
        this._sensitivityNeuronFactory(this.game)
      );

      const creatureOne = new Creature(
        childGenomeOne,
        neuralNetworkOne,
        this._getPositionWithin(this.game),
        this._getPositionWithin(this.game),
        this.game.divisionSize,
        this.game.width,
        this.game.height,
        1,
        false
      );

      const creatureTwo = new Creature(
        childGenomeTwo,
        neuralNetworkTwo,
        this._getPositionWithin(this.game),
        this._getPositionWithin(this.game),
        this.game.divisionSize,
        this.game.width,
        this.game.height,
        1,
        false
      );

      this.game.addCreature(creatureOne);
      this.game.addCreature(creatureTwo);
    }
  }

  _animate() {
    this.stepCountLabel.innerText = `Generation Step Count: ${this.currentStepCount++}`;
    this.game.update();
    if (this.currentStepCount <= this.movesPerGeneration) {
      setTimeout(() => requestAnimationFrame(this._animate.bind(this)), 1000 / this.framesPerSecond);
    } else {
      // This generation has finished, time to get the survivors to reproduce
      // Then set the board back with the new generation
      this.generationCountLabel.innerText = `Gen ${++this.currentGenerationCount}`;
      const survivors = this.game.getSurvivors(this.successCriteriaVisualization.successCriteria);
      console.log(`Number of survivors ${survivors.length}.`);
      this._generateNextCohort(survivors);
      this.currentStepCount = 0;
      this._animate();
    }
  }

  start() {
    this.generationCountLabel.innerText = `Gen ${this.currentGenerationCount}`;
    this._initialiseGame();
    this._generateInitialCohort();
    this._animate();
  }
}
