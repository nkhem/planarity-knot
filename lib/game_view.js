const Game = require("./game");

const GameView = function (game, ctx) {
  this.ctx = ctx;
  this.game = game;
  this.game.draw(ctx);
  this.bindEventHandlers();
};

GameView.prototype.bindEventHandlers = function () {
  this.game.graph.bindEventHandlers({
    onMouseUpRedrawGameView: this.onMouseUp.bind(this)
  });
};

GameView.prototype.onMouseUp = function (e) {
  this.game.draw(this.ctx);
  console.log(this.game.graph);
};

module.exports = GameView;
