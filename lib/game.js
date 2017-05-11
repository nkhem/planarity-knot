const Graph = require("./Graph");

const Game = function(opts) {
  this.graph = new Graph();
  let numLines = opts.level + 4;
  this.graph.addLines(numLines);
  console.log(this.graph);
};

Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.BG_COLOR = "#000000";

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = Game.BG_COLOR;
  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

  this.graph.draw(ctx);
};


module.exports = Game;
