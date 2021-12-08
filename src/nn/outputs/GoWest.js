import Neuron from "../neuron";

export class GoWest extends Neuron {
  constructor() {
    super("GoWest");
  }

  applyAction(creature) {
    creature.position.x -= creature.speed * creature.dimensions.width;
  }
}
