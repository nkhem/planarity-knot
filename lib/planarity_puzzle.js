const Game = require("./game")
    , GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", function(){
  let game = new Game();
  let game_view = new GameView();
  
  console.log('DOMContentLoaded');
});
