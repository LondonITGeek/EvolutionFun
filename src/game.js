export default class Game {
  constructor(GAME_HEIGHT, GAME_WIDTH, DIVISION_SIZE, SHOW_GRAPH, successCriteria) {
    this.height = GAME_HEIGHT;
    this.width = GAME_WIDTH;
    this.divisionSize = DIVISION_SIZE;
    this.showGraph = SHOW_GRAPH;
    this.successCriteria = successCriteria;
    this.gameCreatures = [];

    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("id", "canvas");
    this.canvas.setAttribute("width", GAME_WIDTH * DIVISION_SIZE);
    this.canvas.setAttribute("height", GAME_HEIGHT * DIVISION_SIZE);
    this.canvas.setAttribute("style", "border: 1px solid black; box-sizing: border-box");
    document.body.appendChild(this.canvas);
    this.ctx = canvas.getContext("2d");
  }

  addCreature(creature) {
    this.gameCreatures.push(creature);
  }

  getSurvivors(successCriteria) {
    return this.gameCreatures.filter((c) => {
      return successCriteria.some((criteria) => {
        const xBottom = criteria.x + criteria.width;
        const yBottom = criteria.y + criteria.height;
        return c.position.x >= criteria.x && c.position.y >= criteria.y && c.position.x <= xBottom && c.position.y <= yBottom;
      });
    });
  }

  drawGrid() {
    this.ctx.lineWidth = 0.5;
    // Do columns
    for (let index = this.divisionSize; index < this.width * this.divisionSize; index += this.divisionSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(index, 0);
      this.ctx.lineTo(index, this.height * this.divisionSize);
      this.ctx.stroke();
      this.ctx.closePath();
    }

    // Do Rows
    for (let index = this.divisionSize; index < this.height * this.divisionSize; index += this.divisionSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, index);
      this.ctx.lineTo(this.width * this.divisionSize, index);
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }

  update() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.width * this.divisionSize, this.height * this.divisionSize);
    this.gameCreatures.forEach((creature) => {
      creature.updateAndRedrawer(this.ctx);
    });

    if (this.showGraph) {
      this.drawGrid();
    }

    this.successCriteria.drawer(this.ctx);
  }
}
