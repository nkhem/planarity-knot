const Game = require("./game");
const GameView = require("./game_view");
const Util = require("./util");

document.addEventListener("DOMContentLoaded", function(){
  //set canvas size
  const canvasEl = document.getElementById("canvas");
  canvasEl.width = Util.DIM_X;
  canvasEl.height = Util.DIM_Y;

  const game = new Game();
  const ctx = canvasEl.getContext("2d");
  new GameView(game, ctx); //.start();
  game.start();
});
