const { default: ChartVisualization } = require("./chart-visualization");
const { default: Simulation } = require("./simulation");
const { default: SuccessCriteria } = require("./success-criteria");
const { SuccessCriteriaVisualization } = require("./success-criteria-visualization");

var successCriteriaVisualization = new SuccessCriteriaVisualization(SuccessCriteria.centerSmallSuccess());
var chart = new ChartVisualization();
var simulation = new Simulation(5000, 200, 100, 0, 10, 8, 0.0002, successCriteriaVisualization, chart);
simulation.start();
