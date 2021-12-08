import Neuron from "../neuron";

export class GoEast extends Neuron {
  constructor() {
    super("GoEast");
  }

  applyAction(creature) {
    creature.position.x += creature.speed * creature.dimensions.width;
  }
}
