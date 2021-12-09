const { default: Simulation } = require("./simulation");
const { default: SuccessCriteria } = require("./success-criteria");
const { SuccessCriteriaVisualization } = require("./success-criteria-visualization");

var successCriteriaVisualization = new SuccessCriteriaVisualization(SuccessCriteria.centerSuccess());
var simulation = new Simulation(5000, 200, 300, 0, 10, 8, 0.0001, successCriteriaVisualization);
simulation.start();
