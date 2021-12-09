export default class Creature {
  constructor(genome, neuralNetwork, startingX, startingY, dimension, gameWidth, gameHeight, speed, drawInfo) {
    this.fitness = -1;
    this.genome = genome;
    this.neuralNetwork = neuralNetwork;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.speed = speed;
    this.drawInfo = drawInfo;
    this.dimensions = {
      width: dimension,
      height: dimension,
    };

    this.position = {
      x: startingX,
      y: startingY,
    };

    this.generateColour();
  }

  setFitness(fitness) {
    if (this.fitness === -1) {
      this.fitness = fitness;
    }
  }

  scaleValue(value, xMin, xMax, yMin, yMax) {
    var percent = (value - yMin) / (yMax - yMin);
    return percent * (xMax - xMin) + xMin;
  }

  getRandomColour(scaledGenomeNumber) {
    return `#${Math.floor(scaledGenomeNumber * 16777215).toString(16)}`;
  }

  generateColour() {
    var genomeColour =
      this.genome.chromosomes.reduce((lastValue, currentValue) => {
        lastValue ^= currentValue;
        return lastValue >>> 0;
      }, this.genome.chromosomes[0]) >>> 0;

    var scaledGenomeColour = this.scaleValue(genomeColour, 0, 1, 0, 4294967295); // Max value of unsigned 32 bit int... 4294967295
    this.colour = this.getRandomColour(scaledGenomeColour);
  }

  drawerLable(ctx) {
    ctx.fillText(`${this.genome.toString()}`, this.position.x - 10, this.position.y - 10);
  }

  drawer(ctx) {
    ctx.fillStyle = this.colour;
    ctx.beginPath();
    ctx.ellipse(
      this.position.x + this.dimensions.width / 2,
      this.position.y + this.dimensions.height / 2,
      this.dimensions.width / 2,
      this.dimensions.height / 2,
      0,
      0,
      2 * Math.PI
    );
    ctx.fill();
    ctx.closePath();
    if (this.drawInfo) {
      this.drawerLable(ctx);
    }
  }

  update(actionProbabilities) {
    const currentPosition = {
      ...this.position,
    };

    if (actionProbabilities.length > 0) {
      var bestAction = actionProbabilities.filter((action) => Math.random() < action.getValue()).sort((a, b) => b - a);
      //console.log(bestAction.getValue());

      if (bestAction[0]) {
        bestAction[0].applyAction(this);
      }
      if (
        this.position.x < 0 ||
        this.position.x >= this.gameWidth * this.dimensions.width ||
        this.position.y < 0 ||
        this.position.y >= this.gameHeight * this.dimensions.height
      ) {
        //console.log("Hit Edge");
        this.position = currentPosition;
      }
    }
  }

  updateAndRedrawer(ctx) {
    var actionProbabilities = this.neuralNetwork.feedForward(this);
    this.update(actionProbabilities);
    this.drawer(ctx);
  }
}
