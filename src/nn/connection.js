export default class Connection {
  constructor(source, sink, weight) {
    this.source = source;
    this.sink = sink;
    this.weight = weight;
  }

  toString() {
    return `${this.source}:${this.sink}:${this.weight}`;
  }
}
