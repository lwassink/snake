const Coord = require("./coord");

class Snake {
  constructor(pos) {
    this.direction = null;
    this.segments = [pos];
  }

  move() {
    let head = this.segments[this.segments.length - 1];
    this.segments.push(head.plus(this.direction));
    this.segments.shift();
  }

  turn(direction) {
    if (this.direction === null) {
      this.direction = direction;
    }
    if (!this.direction.isOpposite(direction)) {
      this.direction = direction;
    }
  }
}

module.exports = Snake;
