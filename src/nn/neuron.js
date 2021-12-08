export default class Neuron {
  constructor(type, game) {
    this.type = type;
    this.game = game;
    this.connections = [];
    this.lastValue = 0;
  }

  scaleValue(value, xMin, xMax, yMin, yMax) {
    var percent = (value - yMin) / (yMax - yMin);
    return percent * (xMax - xMin) + xMin;
  }

  addConnection(connection) {
    this.connections.push(connection);
  }

  updateLastValue(lastValue) {
    this.lastValue = lastValue;
  }

  getValue(creature) {
    return this.lastValue;
  }

  applyAction(creature) {
    return;
  }

  toString() {
    return `${this.type}`;
  }
}
