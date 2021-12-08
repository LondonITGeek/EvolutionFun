import Neuron from "../neuron";

export default class SensitivityToProximityToSouth extends Neuron {
  constructor(game) {
    super("SensitivityToProximityToSouth", game);
  }

  getValue(creature) {
    var scaledGameHeight = this.game.height * this.game.divisionSize;
    var scaledInput = this.scaleValue(creature.position.y, 0, 1, 0, scaledGameHeight);
    return scaledInput;
  }
}
