import { flipBit } from "./bit-operations";

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

  static createNewGenomeFromParents(genomeOne, genomeTwo, mutationRate) {
    var takeFromParentOneFirst = Math.random() > 0.5;
    var size = genomeOne.size;
    var newGenome = new Genome(size, false);
    for (let index = 0; index < size; index++) {
      if (takeFromParentOneFirst) {
        newGenome.chromosomes[index] = genomeOne.chromosomes[index];
      } else {
        newGenome.chromosomes[index] = genomeTwo.chromosomes[index];
      }

      var mutationShouldOccure = Math.random() < mutationRate;
      if (mutationShouldOccure) {
        var originalChromosome = newGenome.chromosomes[index];
        var bitToFlip = Math.floor(Math.random() * 32) + 1;
        var mutatedChromosome = flipBit(originalChromosome, bitToFlip);
        console.log(
          `Mutation occured on bit ${bitToFlip}, change from ${(originalChromosome >>> 0).toString(2)} to ${(
            mutatedChromosome >>> 0
          ).toString(2)}.`
        );
        newGenome.chromosomes[index] = mutatedChromosome;
      }

      takeFromParentOneFirst = !takeFromParentOneFirst;
    }

    return newGenome;
  }

  toString() {
    return this.chromosomes.join(":");
  }
}
