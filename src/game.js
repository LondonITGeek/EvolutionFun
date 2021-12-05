export default class Game {
  constructor(GAME_HEIGHT, GAME_WIDTH, DIVISION_SIZE, SHOW_GRAPH) {
    this.height = GAME_HEIGHT;
    this.width = GAME_WIDTH;
    this.divisionSize = DIVISION_SIZE;
    this.showGraph = SHOW_GRAPH;
    this.gameComponents = [];

    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("id", "canvas");
    this.canvas.setAttribute("width", GAME_WIDTH * DIVISION_SIZE);
    this.canvas.setAttribute("height", GAME_HEIGHT * DIVISION_SIZE);
    this.canvas.setAttribute("style", "border: 1px solid black; box-sizing: border-box");
    document.body.appendChild(this.canvas);
    this.ctx = canvas.getContext("2d");
  }

  addGameComponents(gameComponent) {
    this.gameComponents.push(gameComponent);
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

  update(deltaTime) {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(this.canvas.clientTop, this.canvas.clientLeft, this.width * this.divisionSize, this.height * this.divisionSize);
    this.gameComponents.forEach((component) => {
      component.updateAndRedrawer(this.ctx, deltaTime);
    });

    if (this.showGraph) {
      this.drawGrid();
    }
  }
}
