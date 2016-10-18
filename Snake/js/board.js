const Snake = require('./snake');
const Coord = require('./coord');

class Board {
  constructor(snake) {
    let center = new Coord(10, 10);
    this.snake = new Snake(center);
    this.apples = [];
  }
}

Board.DIRS = [[-1,0], [0,1], [1,0], [0, -1]]

module.exports = Snake;
