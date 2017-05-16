const Graph = require("./graph");
const Color = require("./color");
const Util = require("./util");

const Game = function(opts) {
  this.graph = new Graph();
  let n = opts.level + 5;
  this.graph.populate(n);
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Util.DIM_X, Util.DIM_Y);
  ctx.fillStyle = Color.BG;
  ctx.fillRect(0, 0, Util.DIM_X, Util.DIM_Y);

  this.graph.draw(ctx);
};


module.exports = Game;
