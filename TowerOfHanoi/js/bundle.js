/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const HanoiGame = __webpack_require__(1);
	const HanoiView = __webpack_require__(2);

	$( () => {
	  const rootEl = $('.hanoi');
	  const game = new HanoiGame();
	  new HanoiView(game, rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Game {
	  constructor() {
	    this.towers = [[3, 2, 1], [], []];
	  }

	  isValidMove(startTowerIdx, endTowerIdx) {
	      const startTower = this.towers[startTowerIdx];
	      const endTower = this.towers[endTowerIdx];

	      if (startTower.length === 0) {
	        return false;
	      } else if (endTower.length == 0) {
	        return true;
	      } else {
	        const topStartDisc = startTower[startTower.length - 1];
	        const topEndDisc = endTower[endTower.length - 1];
	        return topStartDisc < topEndDisc;
	      }
	  }

	  isWon() {
	      // move all the discs to the last or second tower
	      return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	  }

	  move(startTowerIdx, endTowerIdx) {
	      if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	        return true;
	      } else {
	        return false;
	      }
	  }

	  print() {
	      console.log(JSON.stringify(this.towers));
	  }

	  promptMove(reader, callback) {
	      this.print();
	      reader.question("Enter a starting tower: ", start => {
	        const startTowerIdx = parseInt(start);
	        reader.question("Enter an ending tower: ", end => {
	          const endTowerIdx = parseInt(end);
	          callback(startTowerIdx, endTowerIdx)
	        });
	      });
	  }

	  run(reader, gameCompletionCallback) {
	      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
	        if (!this.move(startTowerIdx, endTowerIdx)) {
	          console.log("Invalid move!");
	        }

	        if (!this.isWon()) {
	          // Continue to play!
	          this.run(reader, gameCompletionCallback);
	        } else {
	          this.print();
	          console.log("You win!");
	          gameCompletionCallback();
	        }
	      });
	  }
	}

	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);