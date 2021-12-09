export default class Genome {
  constructor(size, generateRandomValues = true) {
    if (size % 2 !== 0) {
      throw "Genome size must be an even number.";
    }
    this.size = size;
    this.chromosomes = new Uint32Array(size);
    if (generateRandomValues) {
      window.crypto.getRandomValues(this.chromosomes);
    }
  }

  static createNewGenomeFromParents(genomeOne, genomeTwo) {
    var takeFromParentOneFirst = Math.random() > 0.5;
    var size = genomeOne.size;
    var newGenome = new Genome(size, false);
    for (let index = 0; index < size; index++) {
      if (takeFromParentOneFirst) {
        newGenome.chromosomes[index] = genomeOne.chromosomes[index];
      } else {
        newGenome.chromosomes[index] = genomeTwo.chromosomes[index];
      }

      takeFromParentOneFirst = !takeFromParentOneFirst;
    }

    return newGenome;
  }

  toString() {
    return this.chromosomes.join(":");
  }
}
