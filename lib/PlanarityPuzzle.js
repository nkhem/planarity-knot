const Game = require("./Game");
const GameView = require("./GameView");

document.addEventListener("DOMContentLoaded", function(){
  //set canvas size
  const canvasEl = document.getElementById("canvas");
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const game = new Game({level: 1});
  const ctx = canvasEl.getContext("2d");
  new GameView(game, ctx); //.start();
});