export default class Creature {
  constructor(startingX, startingY, dimenstion, speed, drawInfo) {
    this.speed = speed;
    this.drawInfo = drawInfo;
    this.dimensions = {
      width: dimenstion,
      height: dimenstion,
    };

    this.position = {
      x: startingX,
      y: startingY,
    };
  }

  drawerLable(ctx) {
    ctx.fillText(`${this.position.x}:${this.position.y}`, this.position.x - 10, this.position.y - 10);
  }

  drawer(ctx) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.ellipse(
      this.position.x + this.dimensions.width / 2,
      this.position.y + this.dimensions.height / 2,
      this.dimensions.width / 2,
      this.dimensions.height / 2,
      0,
      0,
      2 * Math.PI
    );
    ctx.fill();
    ctx.closePath();
    if (this.drawInfo) {
      this.drawerLable(ctx);
    }
  }

  update() {
    const currentPosition = {
      ...this.position,
    };

    switch (Math.floor(Math.random() * 4) + 1) {
      case 1: // right
        this.position.x += this.speed * this.dimensions.width;
        break;
      case 2: // left
        this.position.x -= this.speed * this.dimensions.width;
        break;
      case 3: // up
        this.position.y -= this.speed * this.dimensions.width;
        break;
      case 4: // down
        this.position.y += this.speed * this.dimensions.width;
        break;
      default:
        break;
    }

    if (
      this.position.x <= 0 ||
      this.position.x + this.dimensions.width >= this.gameWidth ||
      this.position.y <= 0 ||
      this.position.y + this.dimensions.height >= this.gameHeight
    ) {
      console.log("onnexting collide");
      this.position = currentPosition;
    }
  }

  updateAndRedrawer(ctx) {
    this.update();
    this.drawer(ctx);
  }
}
