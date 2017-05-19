const Game = require("./game");

const GameView = function (game, ctx) {
  this.ctx = ctx;
  this.game = game;
  this.game.draw(ctx);
  this.bindEventHandlers();
};

GameView.prototype.bindEventHandlers = function () {
  this.game.graph.bindEventHandlers({
    redrawGameView: this.redrawGameView.bind(this)
  });
  this.displayCaptionsOnHover([
    'fa-repeat',
    'fa-backward',
    'fa-question-circle-o',
    'fa-github',
    'fa-linkedin'
  ]);
};

GameView.prototype.redrawGameView = function (e) {
  this.game.draw(this.ctx);
};

GameView.prototype.displayCaptionsOnHover = function (iconClasses) {
  iconClasses.forEach(iconClass => {
    document.getElementsByClassName(iconClass)[0].addEventListener(
      'mouseover', () => {
        document.getElementsByClassName(`${iconClass}-caption`)[0].classList.remove('hidden');
      });
      document.getElementsByClassName(iconClass)[0].addEventListener(
        'mouseout', () => {
          document.getElementsByClassName(`${iconClass}-caption`)[0].classList.add('hidden');
        });
  });
};

module.exports = GameView;
