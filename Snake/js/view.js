const Board = require('./board')

class View {
  constructor($el) {
    this.$el = $el;
    this.board = new Board();
    this.setupBoard();
    // this.render();
    this.bindKeys();
  }

  bindKeys() {
    $(document).on('keydown', $keypress => {
      const code = $keypress.keycode;
      if (code >= 37 && code <= 40) {
        let newDirection = Board.DIRS[code - 37];
        this.board.snake.turn(newDirection);
      }
    });
  }

  setupBoard() {
    let $ul, $li;
    for (let i = 0; i < 20; i++) {
      $ul = $("<ul></ul>");
      for (let j = 0; j < 20; j++) {
        $li = $("<li></li>");
        $li.data("idx", [i,j]);
        console.log($li.data("idx"));
        $ul.append($li);
      }
      console.log(this.$el);
      this.$el.append($ul);
    }
  }

  render() {
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        // let pos = new Coord(i, j);
        let $ul = $($('ul')[i]);
        // debugger
        let $li = $($ul.children()[j]);
        if (this.board.snake.segments.includes(pos)) {
        } else {

        }
      }
    }
  }
}

module.exports = View;
