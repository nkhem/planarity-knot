const Graph = require("./graph");
const Player = require("./player");
const Color = require("./color");
const Util = require("./util");

const Game = function(opts) {
  this.graph = new Graph();
  this.player = new Player();
  this.level = 1;
  this.bindEventListeners();
  this.graph.populate({level: this.level, renderLevelUpBtn: this.renderLevelUpBtn.bind(this)});
};

Game.prototype.bindEventListeners = function () {
  //add icon onClick event handlers
  Util.onClassClick('fa-repeat', () => {
    this.graph.restoreStartingGraph();
  });

  Util.onClassClick('fa-question-circle-o', () => {
    this.graph.pauseTimer();
    document.getElementsByClassName('instructions-modal')[0].classList.remove('hidden');
  });

  Util.onIdClick('play-btn', () => {
    this.graph.startTimer();
    document.getElementsByClassName('instructions-modal')[0].classList.add('hidden');
  });

  Util.onIdClick('level-up-btn', () => {
    this.levelUp();
    this.graph.resetTimer();
    this.graph.startTimer();
    document.getElementById('level-up-btn').classList.add('hidden');
  });
};

Game.prototype.renderLevelUpBtn = function () {
  this.graph.pauseTimer();
  document.getElementById('level-up-btn').innerHTML = `Continue to level ${this.level + 1} <i class="fa fa-hand-o-right" aria-hidden="true"></i></i>`;
  document.getElementById('level-up-btn').classList.remove('hidden');
};

Game.prototype.levelUp = function () {
  this.updateScore();
  this.updateLevel();
  this.graph.populate({level: this.level});
};

Game.prototype.updateScore = function () {
  this.player.score += this.graph.currentMoveCount * this.graph.elapsedTime;
  document.getElementById("score").innerHTML = `Score: ${this.player.score}`;
};

Game.prototype.updateLevel = function () {
  this.level += 1;
  document.getElementById("level").innerHTML = `Level: ${this.level}`;
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Util.DIM_X, Util.DIM_Y);
  ctx.fillStyle = Color.BG;
  ctx.fillRect(0, 0, Util.DIM_X, Util.DIM_Y);

  this.graph.draw(ctx);
};


module.exports = Game;
