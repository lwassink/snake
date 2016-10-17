class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    $(".square").on("click", click => {
      let $square = $(click.currentTarget);
      try {
        this.makeMove($square);
      }
      catch(err) {
        alert(err.message);
      }

      if (this.game.isOver()) {
        $('figure').after(`<p>${this.game.winner()} won!</p>`);
        $('.square').off("click");
        $('.square').each(idx => {
          $square = $($(".square")[idx]);
          $square.removeClass('clicked');
          $square.removeClass('active')
          if ($square.text() === this.game.winner()) {
            $square.addClass('winner');
          } else {
            $square.addClass('looser');
          }
        });
      }
    });
  }

  makeMove($square) {
    let posString = $square.attr('id');
    let pos = posString.split(',');
    let mark = this.game.currentPlayer;
    this.game.playMove([parseInt(pos[0]), parseInt(pos[1])]);
    $square.text(mark);
    $square.addClass('clicked');
  }

  setupBoard() {
    this.$el.append($("<ul class='board'></ul>"));
    let indices = [[0,0], [0,1], [0,2],
                  [1,0], [1,1], [1,2],
                  [2,0], [2,1], [2,2]];
    for (var i = 0; i < 9; i++) {
      let $li = $("<li class='square active'></li>");
      $li.data('pos', indices[i]);
      $li.attr("id", indices[i]);
      $(".board").append($li);
    }
  }
}

module.exports = View;
