class HanoiView {
  constructor(game, el) {
    this.game = game;
    this.fig = el;
    this.setupTowers();
    this.render();
    this.startTower = undefined;
    this.clickTower();
  }

  setupTowers() {
    for (let i = 0; i < 3; i++) {
      let $pile = $('<ul class="tower unselected"></ul>');
      $pile.attr('id', `${i}`);
      this.fig.append($pile);
    }
  }

  render() {
    for (let i = 0; i < this.game.towers.length; i++) {
      let $ul = $(`#${i}`);
      $ul.children().remove();
      for (let j = 0; j < 3 - this.game.towers[i].length; j++) {
        let $li = $(`<li class='disc invisible'></li>`);
        $ul.append($li);
      }
      for (let j = this.game.towers[i].length - 1; j >= 0; j--) {
        let size = HanoiView.SIZES[String(this.game.towers[i][j])];
        let $li = $(`<li class='disc ${size}'></li>`);
        $ul.append($li);
      }
    }
  }

  clickTower() {
    $("ul").on("click", click => {
      let $tower = $(click.currentTarget);
      if (this.startTower === undefined) {
        this.selectTower($tower);
      }else{
        let valid = this.moveAndReset($tower);

        if (!valid) {
          alert('Invalid move!');
        }

        this.render();

        this.checkGameOver();
      }

    });
  }

  selectTower($tower) {
    this.startTower = parseInt($tower.attr("id"));
    $tower.removeClass('unselected');
    $tower.addClass('selected');
  }

  moveAndReset($tower) {
    let endTower = parseInt($tower.attr("id"));
    let valid = this.game.move(this.startTower, endTower);
    let $startTower = $(`#${this.startTower}`);
    $startTower.removeClass('selected');
    $startTower.addClass('unselected');
    this.startTower = undefined;
    return valid;
  }

  checkGameOver() {
    if (this.game.isWon()) {
      $('ul').off('click');
      $('ul').removeClass('unselected');
      alert('You win!');
    }
  }
}

HanoiView.SIZES = {
  1: "small",
  2: "medium",
  3: "large"
}

module.exports = HanoiView;
