export default class Neuron {
  constructor(name) {
    this.name = name;
  }

  toString() {
    return `${this.name}`;
  }
}

// Input (Sensors)

export class SensitivityToProximityToEast extends Neuron {
  constructor() {
    super("SensitivityToProximityToEast");
  }
}

export class SensitivityToProximityToWest extends Neuron {
  constructor() {
    super("SensitivityToProximityToWest");
  }
}

export class SensitivityToProximityToNorth extends Neuron {
  constructor() {
    super("SensitivityToProximityToNorth");
  }
}

export class SensitivityToProximityToSouth extends Neuron {
  constructor() {
    super("SensitivityToProximityToSouth");
  }
}

// Outputs (Actions)

export class GoEast extends Neuron {
  constructor() {
    super("GoEast");
  }
}

export class GoWest extends Neuron {
  constructor() {
    super("GoWest");
  }
}

export class GoNorth extends Neuron {
  constructor() {
    super("GoNorth");
  }
}

export class GoSouth extends Neuron {
  constructor() {
    super("GoSouth");
  }
}
