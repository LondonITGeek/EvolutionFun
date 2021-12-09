const { default: Simulation } = require("./simulation");
const { default: SuccessCriteria } = require("./success-criteria");
const { SuccessCriteriaVisualization } = require("./success-criteria-visualization");

var successCriteriaVisualization = new SuccessCriteriaVisualization(SuccessCriteria.rightAndLeftWallSuccess());
var simulation = new Simulation(2000, 200, 300, 40, 2, 3, 0.001, successCriteriaVisualization);
simulation.start();
