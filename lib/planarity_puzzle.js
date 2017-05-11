const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", function(){
  //set canvas size
  const canvasEl = document.getElementsById("canvas");
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const game = new Game();
  const ctx = canvasEl.getContext("2d");
  new GameView(game, ctx); //.start();

  console.log('DOMContentLoaded');
});
