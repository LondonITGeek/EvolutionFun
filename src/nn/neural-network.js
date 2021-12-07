import { checkBit, slice } from "../bit-operations";
import Connection from "./connection";
import Neuron, {
  GoEast,
  GoNorth,
  GoSouth,
  GoWest,
  SensitivityToProximityToEast,
  SensitivityToProximityToSouth,
  SensitivityToProximityToNorth,
  SensitivityToProximityToWest,
} from "./neuron";

export default class NeuralNetwork {
  constructor(numberOfHiddenNeurons) {
    this.hiddenNeurons = new Array(numberOfHiddenNeurons);
    for (let index = 0; index < this.hiddenNeurons.length; index++) {
      this.hiddenNeurons[index] = new Neuron(`Hidden Layer ${index}`);
    }
    this.inputNeurons = [
      new SensitivityToProximityToEast(),
      new SensitivityToProximityToNorth(),
      new SensitivityToProximityToSouth(),
      new SensitivityToProximityToWest(),
    ];
    this.outputNeurons = [new GoEast(), new GoNorth(), new GoSouth(), new GoWest()];
  }

  scaleWeight(weight, xMin, xMax, yMin, yMax) {
    var percent = (weight - yMin) / (yMax - yMin);
    return percent * (xMax - xMin) + xMin;
  }

  getConnection(chromosome) {
    // first bit is source type (i.e 0 = sensor neuron, or 1 hidden neuron)
    // next 5 bits determine which instance of that source type we have
    // next bit is the sink type (i.e an internal neuron or an action/output neuron)
    // next 20 bits is the weight of the connection

    //      31| 30-26 | 25| 24-20 |19-----------------0
    //       1| 01110 | 0 | 11000 |10010111001011000101
    //E.g.   0| 00011 | 0 | 01100 |11001100110011001100
    //                             10000000000000000000
    //                             11111111111111111111 = 1048575 - 0

    var sourceIsAnInputNeuron = checkBit(chromosome, 31); // 0 based index on the bits, i.e. 0 is furthest right (least significant bit)
    var getSourceInstance = slice(chromosome, 26, 30) % (sourceIsAnInputNeuron ? this.inputNeurons.length : this.hiddenNeurons.length);
    var sinkIsAnOutputNeuron = checkBit(chromosome, 25);
    var getOutputInstance = slice(chromosome, 20, 24) % (sinkIsAnOutputNeuron ? this.outputNeurons.length : this.hiddenNeurons.length);
    var weight = this.scaleWeight(slice(chromosome, 0, 19), -4, 4, 0, 1048575);
    var source;
    var sink;
    if (sourceIsAnInputNeuron) {
      // get the sensor type
      source = this.inputNeurons[getSourceInstance];
    } else {
      // this is a hidden layer neuron
      source = this.hiddenNeurons[getSourceInstance];
    }

    if (sinkIsAnOutputNeuron) {
      // get the action type
      sink = this.outputNeurons[getOutputInstance];
    } else {
      // this is a hidden layer neuron
      sink = this.hiddenNeurons[getOutputInstance];
    }

    return new Connection(source, sink, weight);
  }
}
