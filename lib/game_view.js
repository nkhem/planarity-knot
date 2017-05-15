const Game = require("./game");

const GameView = function (game, ctx) {
  this.ctx = ctx;
  this.game = game;
  this.game.draw(ctx);
  this.bindEventHandlers();
};

GameView.prototype.bindEventHandlers = function () {
  this.game.graph.points.forEach(point => {
    point.bindEventHandlers({
      onMouseUpCallback: this.onMouseUp.bind(this)
    });
  });
};

GameView.prototype.onMouseUp = function (e) {
  console.log('gameview redrawing!');
  this.game.draw(this.ctx);
};

module.exports = GameView;
