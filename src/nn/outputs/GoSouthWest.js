import Neuron from "../neuron";

export class GoSouthWest extends Neuron {
  constructor() {
    super("GoSouthWest");
  }

  applyAction(creature) {
    creature.position.y += creature.speed * creature.dimensions.width;
    creature.position.x -= creature.speed * creature.dimensions.width;
  }
}
