import Neuron from "../neuron";

export default class SensitivityToProximityToCenter extends Neuron {
  constructor(game) {
    super("SensitivityToProximityToCenter", game);
  }

  getValue(creature) {
    var scaledGameWidth = this.game.width * this.game.divisionSize;
    var scaledGameHeight = this.game.height * this.game.divisionSize;

    var deltaX = Math.abs(creature.position.x - scaledGameWidth / 2);
    var deltaY = Math.abs(creature.position.y - scaledGameHeight / 2);
    var distance = deltaX + deltaY;
    var scaledInput = this.scaleValue(distance, 0, 1, 0, scaledGameWidth);
    return 1 - scaledInput;
  }
}
