import Neuron from "../neuron";

export class GoNorthEast extends Neuron {
  constructor() {
    super("GoNorthEast");
  }

  applyAction(creature) {
    creature.position.y -= creature.speed * creature.dimensions.width;
    creature.position.x += creature.speed * creature.dimensions.width;
  }
}
