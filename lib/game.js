const Graph = require("./Graph");

const Game = function(opts) {
  this.graph = new Graph();
  let numLines = opts.level + 4;
  this.graph.addLines(numLines);
  console.log(this.graph);
};

Game.DIM_X = 1000;
Game.DIM_Y = 600;

module.exports = Game;
