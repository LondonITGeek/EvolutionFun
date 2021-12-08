import Neuron from "../neuron";

export class GoNorthWest extends Neuron {
  constructor() {
    super("GoNorthWest");
  }

  applyAction(creature) {
    creature.position.y -= creature.speed * creature.dimensions.width;
    creature.position.x -= creature.speed * creature.dimensions.width;
  }
}
