const Game = require("./Game");

const GameView = function (game, ctx) {
  this.ctx = ctx;
  this.game = game;
};

module.exports = GameView;