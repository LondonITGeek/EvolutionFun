export default class Genome {
  constructor(size) {
    // array of 32 bit numbers, each is a link in the brain
    this.chromosomes = new Uint32Array(size);
    window.crypto.getRandomValues(this.chromosomes);
  }

  toString() {
    this.chromosomes.forEach((c) => {
      console.log(c.toString(2));
    });
  }
}
