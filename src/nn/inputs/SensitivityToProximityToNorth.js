import Neuron from "../neuron";

export default class SensitivityToProximityToNorth extends Neuron {
  constructor(game) {
    super("SensitivityToProximityToNorth", game);
  }

  /*
    if creature.y = 0 return 1
    if creature.y = 128 return 0
  */
  getValue(creature) {
    var scaledGameHeight = this.game.height * this.game.divisionSize;
    var invertedY = scaledGameHeight - creature.position.y;
    var scaledInput = this.scaleValue(invertedY, 0, 1, 0, scaledGameHeight);
    return scaledInput;
  }
}
