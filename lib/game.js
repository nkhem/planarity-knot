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
  document.getElementById('level-up-btn').addEventListener(
    'click', () => {
    this.levelUp();
    document.getElementById('level-up-btn').classList.add('hidden');
  });
  document.getElementById('level-up-btn').innerHTML = `Continue to level ${this.level + 1} >`;
  document.getElementById('level-up-btn').classList.remove('hidden');
};

Game.prototype.levelUp = function () {
  this.updateTotalMoveCount();
  this.updateLevel();
  this.graph.populate({level: this.level});
  console.log('leveling up:', this.level);
};

Game.prototype.updateTotalMoveCount = function () {
  this.player.totalMoveCount += this.graph.currentMoveCount;
  document.getElementById("total-move-count").innerHTML = `Total Move Count: ${this.player.totalMoveCount}`;
};

Game.prototype.updateLevel = function () {
  this.level += 1;
  const levelEl = document.getElementById("level");
  levelEl.innerHTML = `level: ${this.level}`;
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Util.DIM_X, Util.DIM_Y);
  ctx.fillStyle = Color.BG;
  ctx.fillRect(0, 0, Util.DIM_X, Util.DIM_Y);

  this.graph.draw(ctx);
};


module.exports = Game;
