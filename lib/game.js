const Graph = require("./Graph");

const Game = function() {
  let graph = new Graph({numLines: 5});
  console.log(graph);
};

Game.DIM_X = 1000;
Game.DIM_Y = 600;

module.exports = Game;
