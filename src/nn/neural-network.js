import { checkBit, slice } from "../bit-operations";
import Connection from "./connection";
import Neuron from "./neuron";
import { GoNorth } from "./outputs/GoNorth";
import { GoNorthEast } from "./outputs/GoNorthEast";
import { GoEast } from "./outputs/GoEast";
import { GoSouthEast } from "./outputs/GoSouthEast";
import { GoSouth } from "./outputs/GoSouth";
import { GoSouthWest } from "./outputs/GoSouthWest";
import { GoWest } from "./outputs/GoWest";
import { GoNorthWest } from "./outputs/GoNorthWest";
import { DoNothing } from "./outputs/DoNothing";

export default class NeuralNetwork {
  constructor(numberOfHiddenNeurons, genome, sensitivityNeuronFactory) {
    this.genome = genome;
    this.hiddenNeurons = new Array(numberOfHiddenNeurons);

    for (let index = 0; index < this.hiddenNeurons.length; index++) {
      this.hiddenNeurons[index] = new Neuron(`Hidden Layer ${index}`);
    }

    this.inputNeurons = [
      sensitivityNeuronFactory("SensitivityToProximityToCenter"),
      sensitivityNeuronFactory("SensitivityToProximityToEast"),
      sensitivityNeuronFactory("SensitivityToProximityToNorth"),
      sensitivityNeuronFactory("SensitivityToProximityToSouth"),
      sensitivityNeuronFactory("SensitivityToProximityToWest"),
    ];

    this.outputNeurons = [
      new DoNothing(),
      new GoNorth(),
      new GoNorthEast(),
      new GoEast(),
      new GoSouthEast(),
      new GoSouth(),
      new GoSouthWest(),
      new GoWest(),
      new GoNorthWest(),
    ];

    for (let index = 0; index < this.genome.size; index++) {
      var chromosome = this.genome.chromosomes[index];
      this.addConnection(chromosome);
    }
  }

  scaleWeight(weight, xMin, xMax, yMin, yMax) {
    var percent = (weight - yMin) / (yMax - yMin);
    return percent * (xMax - xMin) + xMin;
  }

  // first bit is source type (i.e 0 = sensor neuron, or 1 hidden neuron)
  // next 5 bits determine which instance of that source type we have
  // next bit is the sink type (i.e an internal neuron or an action/output neuron)
  // next 20 bits is the weight of the connection

  //      31| 30-26 | 25| 24-20 |19-----------------0
  //       1| 01110 | 0 | 11000 |10010111001011000101
  //E.g.   0| 00011 | 0 | 01100 |11001100110011001100
  //                             10000000000000000000
  //                             11111111111111111111 = 0 to 1048575
  addConnection(chromosome) {
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

    sink.addConnection(new Connection(source, sink, weight));
  }

  feedForward(creature) {
    // Only return output neurons with a positive "probability"
    return this.outputNeurons.filter((n) => {
      var outputForN = this.feedForwardPer(n, creature);
      n.updateLastValue(outputForN);
      return outputForN > 0;
    });
  }

  feedForwardPer(neuron, creature) {
    var depth = 0;

    let getInput = (connection, seenNodes) => {
      depth++;
      if (depth > 15) {
        //debugger;
      }
      // this connection has a source and a weight, need to get the source input value * weight and return that
      var sink = connection.sink;
      var source = connection.source;
      var weight = connection.weight;
      seenNodes.set(sink, sink.getValue(creature));

      if (seenNodes.has(source)) {
        return seenNodes.get(source);
      } else if (source.connections.length === 0) {
        // we're at the top of the tree so return the value of the input * weight
        var input = source.getValue(creature);
        return input * weight;
      } else {
        // we still have more connections to get
        var sumOfWeightedInputs = 0;
        for (let index = 0; index < source.connections.length; index++) {
          const connection = source.connections[index];
          sumOfWeightedInputs += getInput(connection, seenNodes);
        }

        return Math.tanh(sumOfWeightedInputs);
      }
    };

    var sumOfWeightedInputs = 0;
    for (let index = 0; index < neuron.connections.length; index++) {
      const seenNodes = new Map();
      const connection = neuron.connections[index];
      sumOfWeightedInputs += getInput(connection, seenNodes);
    }
    return Math.tanh(sumOfWeightedInputs);
  }
}
