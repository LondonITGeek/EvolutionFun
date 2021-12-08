import Neuron from "../neuron";

export class GoSouthEast extends Neuron {
  constructor() {
    super("GoSouthEast");
  }

  applyAction(creature) {
    creature.position.x += creature.speed * creature.dimensions.width;
    creature.position.y += creature.speed * creature.dimensions.width;
  }
}
