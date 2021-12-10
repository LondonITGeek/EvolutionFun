import { Chart, LinearScale, LineElement, PointElement, LineController, CategoryScale } from "chart.js";

export default class ChartVisualization {
  constructor() {
    const ctx = document.getElementById("statisticsChart").getContext("2d");
    Chart.register(LinearScale, LineElement, PointElement, LineController, CategoryScale);
    const labels = ["0"];
    const data = {
      labels: labels,
      datasets: [
        {
          label: "My First Dataset",
          data: [100],
          fill: true,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };

    const config = {
      type: "line",
      data: data,
      options: {
        scales: {
          y: {
            suggestedMin: 0,
            suggestedMax: 100,
          },
        },
      },
    };

    this.chart = new Chart(ctx, config);
  }

  updateChart(generation, survivors) {
    this.chart.data.labels.push(generation);
    this.chart.data.datasets.forEach((dataset) => {
      dataset.data.push(survivors);
    });
    this.chart.update();
  }
}
