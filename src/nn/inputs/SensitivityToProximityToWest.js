import Neuron from "../neuron";

export default class SensitivityToProximityToWest extends Neuron {
  constructor(game) {
    super("SensitivityToProximityToWest", game);
  }

  getValue(creature) {
    var scaledGameWidth = this.game.width * this.game.divisionSize;
    var invertedX = scaledGameWidth - creature.position.x;
    var scaledInput = this.scaleValue(invertedX, 0, 1, 0, scaledGameWidth);
    return scaledInput;
  }
}
