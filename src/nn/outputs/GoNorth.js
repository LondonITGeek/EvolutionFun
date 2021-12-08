import Neuron from "../neuron";

export class GoNorth extends Neuron {
  constructor() {
    super("GoNorth");
  }

  applyAction(creature) {
    creature.position.y -= creature.speed * creature.dimensions.width;
  }
}
