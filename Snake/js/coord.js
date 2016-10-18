class Coord {
  constructor(x, y) {
    this.pos = [x, y];
  }

  plus(other) {
    this.pos[0] += other.pos[0];
    this.pos[1] += other.pos[1];
  }

  equals(other) {
    return this.pos[0] === other.pos[0] && this.pos[1] === other.pos[1]
  }

  isOpposite(other) {
    return this.pos[0] === -other.pos[0] && this.pos[1] === -other.pos[1]
  }
}

module.exports = Coord;
