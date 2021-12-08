import Neuron from "../neuron";

export default class SensitivityToProximityToEast extends Neuron {
  constructor(game) {
    super("SensitivityToProximityToEast", game);
  }

  getValue(creature) {
    var scaledGameWidth = this.game.width * this.game.divisionSize;
    var scaledInput = this.scaleValue(creature.position.x, 0, 1, 0, scaledGameWidth);
    return scaledInput;
  }
}
