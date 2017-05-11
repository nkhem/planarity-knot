const Graph = require("./Graph");

const Game = function() {
  let newLine = Line.generateRandom();
  console.log(newLine);
};

Game.DIM_X = 1000;
Game.DIM_Y = 600;

module.exports = Game;
