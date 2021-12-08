import Neuron from "../neuron";

export class DoNothing extends Neuron {
  constructor() {
    super("DoNothing");
  }

  applyAction(creature) {
    return;
  }
}
