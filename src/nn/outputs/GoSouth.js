import Neuron from "../neuron";

export class GoSouth extends Neuron {
  constructor() {
    super("GoSouth");
  }

  applyAction(creature) {
    creature.position.y += creature.speed * creature.dimensions.width;
  }
}
