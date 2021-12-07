export default class Creature {
  // gnome
  // brain

  constructor(startingX, startingY, dimension, gameWidth, gameHeight, speed, colour, drawInfo) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.speed = speed;
    this.colour = colour;
    this.drawInfo = drawInfo;
    this.dimensions = {
      width: dimension,
      height: dimension,
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
    ctx.fillStyle = this.colour;
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
      this.position.x < 0 ||
      this.position.x >= this.gameWidth * this.dimensions.width ||
      this.position.y < 0 ||
      this.position.y >= this.gameHeight * this.dimensions.height
    ) {
      console.log("Hit Edge");
      this.position = currentPosition;
    }
  }

  updateAndRedrawer(ctx) {
    this.update();
    this.drawer(ctx);
  }
}
