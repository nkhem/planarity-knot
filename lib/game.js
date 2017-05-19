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
  document.getElementsByClassName('fa-repeat')[0].addEventListener(
    'click', () => {
      this.graph.restoreStartingGraph();
    });
  document.getElementsByClassName('fa-question-circle-o')[0].addEventListener(
    'click', () => {
      this.graph.pauseTimer();
      document.getElementsByClassName('instructions-modal')[0].classList.remove('hidden');
    });

  //display icon captions on hover
  document.getElementsByClassName('fa-repeat')[0].addEventListener(
    'mouseover', () => {
      document.getElementsByClassName('fa-repeat-caption')[0].classList.remove('hidden');
    });
  document.getElementsByClassName('fa-repeat')[0].addEventListener(
    'mouseout', () => {
      document.getElementsByClassName('fa-repeat-caption')[0].classList.add('hidden');
    });

  document.getElementsByClassName('fa-backward')[0].addEventListener(
    'mouseover', () => {
      document.getElementsByClassName('fa-backward-caption')[0].classList.remove('hidden');
    });
  document.getElementsByClassName('fa-backward')[0].addEventListener(
    'mouseout', () => {
      document.getElementsByClassName('fa-backward-caption')[0].classList.add('hidden');
    });

  document.getElementsByClassName('fa-question-circle-o')[0].addEventListener(
    'mouseover', () => {
      document.getElementsByClassName('fa-question-circle-o-caption')[0].classList.remove('hidden');
    });
  document.getElementsByClassName('fa-question-circle-o')[0].addEventListener(
    'mouseout', () => {
      document.getElementsByClassName('fa-question-circle-o-caption')[0].classList.add('hidden');
    });

  document.getElementsByClassName('fa-github')[0].addEventListener(
    'mouseover', () => {
      document.getElementsByClassName('fa-github-caption')[0].classList.remove('hidden');
    });
  document.getElementsByClassName('fa-github')[0].addEventListener(
    'mouseout', () => {
      document.getElementsByClassName('fa-github-caption')[0].classList.add('hidden');
    });

  document.getElementsByClassName('fa-linkedin')[0].addEventListener(
    'mouseover', () => {
      document.getElementsByClassName('fa-linkedin-caption')[0].classList.remove('hidden');
    });
  document.getElementsByClassName('fa-linkedin')[0].addEventListener(
    'mouseout', () => {
      document.getElementsByClassName('fa-linkedin-caption')[0].classList.add('hidden');
    });

  document.getElementById('play-btn').addEventListener(
    'click', () => {
      this.graph.startTimer();
      document.getElementsByClassName('instructions-modal')[0].classList.add('hidden');
    });

  document.getElementById('level-up-btn').addEventListener(
    'click', () => {
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
  this.graph.populate({level: this.level, renderLevelUpBtn: this.renderLevelUpBtn});
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
