const Graph = require("./graph");
const Player = require("./player");
const Color = require("./color");
const Util = require("./util");

const Game = function(opts) {
  this.graph = new Graph();
  this.player = new Player();
  this.level = 1;
  while (this.graph.intersectionCount < 4) {
    this.graph.populate({level: this.level, renderLevelUpBtn: this.renderLevelUpBtn.bind(this)});
  }
};

Game.prototype.renderLevelUpBtn = function () {
};

Game.prototype.levelUp = function () {
  // console.log('leveling up');
  // console.log("this.graph.currentMoveCount:", this.graph.currentMoveCount);
  this.player.score += this.graph.currentMoveCount;
  // console.log("this.player.score:", this.player.score);
  this.level += 1;
  this.graph.populate({level: this.level});
  this.updateScore();
  // console.log("level:", this.level);
};

Game.prototype.updateScore = function () {
  const scoreEl = document.getElementById("score");
  scoreEl.innerHTML = `score: ${this.player.score}`;
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Util.DIM_X, Util.DIM_Y);
  ctx.fillStyle = Color.BG;
  ctx.fillRect(0, 0, Util.DIM_X, Util.DIM_Y);

  this.graph.draw(ctx);
};


module.exports = Game;
