const Game = require("./game");
const Util = require("./util");

const GameView = function (game, ctx) {
  this.ctx = ctx;
  this.game = game;
  this.game.draw(ctx);
  this.bindEventHandlers();
};

GameView.prototype.bindEventHandlers = function () {
  this.game.receiveRedrawGameView({
    redrawGameView: this.redrawGameView.bind(this)
  });

  this.game.graph.receiveRedrawGameView({
    redrawGameView: this.redrawGameView.bind(this)
  });

  this.displayCaptionsOnHover([
    'fa-backward',
    'fa-repeat',
    'fa-question-circle-o',
    'fa-github',
    'fa-linkedin'
  ]);
};

GameView.prototype.redrawGameView = function (e) {
  Util.hide('level-up-btn');
  this.game.draw(this.ctx);
};

GameView.prototype.displayCaptionsOnHover = function (iconClasses) {
  iconClasses.forEach(iconClass => {
    document.getElementsByClassName(iconClass)[0].addEventListener(
      'mouseover', () => {
        Util.unhide(`${iconClass}-caption`);
      });
      document.getElementsByClassName(iconClass)[0].addEventListener(
        'mouseout', () => {
          Util.hide(`${iconClass}-caption`);
        });
  });
};

module.exports = GameView;
