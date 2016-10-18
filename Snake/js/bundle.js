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

	const View = __webpack_require__(1);
	const Board = __webpack_require__(2);

	$( () => {
	  let board = new Board();
	  let $el = $("#snake");
	  let view = new View($el);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(2)

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Snake = __webpack_require__(3);
	const Coord = __webpack_require__(4);

	class Board {
	  constructor(snake) {
	    let center = new Coord(10, 10);
	    this.snake = new Snake(center);
	    this.apples = [];
	  }
	}

	Board.DIRS = [[-1,0], [0,1], [1,0], [0, -1]]

	module.exports = Snake;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Coord = __webpack_require__(4);

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


/***/ },
/* 4 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);