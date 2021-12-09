const { default: Simulation } = require("./simulation");
const { default: SuccessCriteria } = require("./success-criteria");
const { SuccessCriteriaVisualization } = require("./success-criteria-visualization");

var successCriteriaVisualization = new SuccessCriteriaVisualization(SuccessCriteria.allCornersSuccess());
var simulation = new Simulation(500, 100, 300, 40, 6, 3, 0.0001, successCriteriaVisualization);
simulation.start();
