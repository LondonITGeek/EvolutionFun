export class SuccessCriteriaVisualization {
  constructor(successCriteria) {
    this.successCriteria = successCriteria;
  }

  drawer(ctx) {
    this.successCriteria.forEach((criteria) => {
      ctx.lineWidth = 3;
      ctx.strokeStyle = criteria.borderColour;
      ctx.beginPath();
      ctx.rect(criteria.x, criteria.y, criteria.width, criteria.height);
      ctx.stroke();
    });
  }
}
