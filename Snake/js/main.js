const View = require("./view.js");
const Board = require("./board");

$( () => {
  let board = new Board();
  let $el = $("#snake");
  let view = new View($el);
});
