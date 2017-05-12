/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Graph = __webpack_require__(2);

const Game = function(opts) {
  this.graph = new Graph();
  let numLines = opts.level + 4;
  this.graph.addLines(numLines);
  console.log(this.graph);
};

Game.DIM_X = 600;
Game.DIM_Y = 600;
Game.BG_COLOR = "#000000";

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = Game.BG_COLOR;
  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

  this.graph.draw(ctx);
};


module.exports = Game;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);

const GameView = function (game, ctx) {
  this.ctx = ctx;
  this.game = game;
  this.game.draw(ctx);
};

module.exports = GameView;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Line = __webpack_require__(3);

const Graph = function(opts = {}){
  this.lines = [];
  this.points = [];
};

Graph.prototype.addLines = function(n){
  while (this.lines.length < n) {
    let newLine = Line.generateRandom();
    this.lines.push(newLine);
  }
};

Graph.prototype.draw = function (ctx) {
  this.allObjects().forEach((object) => {
    object.draw(ctx);
  });
};

Graph.prototype.allObjects = function () {
  return [].concat(this.lines, this.points);
};

module.exports = Graph;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(5);

const Line = function (options) {
  this.canvasStartPoint = options.canvasStartPoint;
  this.canvasEndPoint = options.canvasEndPoint;
};

Line.generateRandom = function () {
  const randomEdgeNum = function() {
    return [0, 600][Math.floor ( Math.random() * 2 )];
  };

  const randomNum = function() {
    return 600 * Math.random();
  };

  let startX = randomEdgeNum();
  let startY = randomNum();

  let endX = 600 - startY;
  let endY = randomEdgeNum();

  return new Line({
    canvasStartPoint: [startX, startY],
    canvasEndPoint: [endX, endY]
  });
};

Line.prototype.draw = function (ctx) {
  ctx.strokeStyle = "#F5F5F5";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(this.canvasStartPoint[0], this.canvasStartPoint[1]); //start x, start y
  ctx.lineTo(this.canvasEndPoint[0], this.canvasEndPoint[1]); //end x, end y(600 * this.xIntercept)
  ctx.stroke();
};

module.exports = Line;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);
const GameView = __webpack_require__(1);

document.addEventListener("DOMContentLoaded", function(){
  //set canvas size
  const canvasEl = document.getElementById("canvas");
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const game = new Game({level: 1});
  const ctx = canvasEl.getContext("2d");
  new GameView(game, ctx); //.start();
});


/***/ }),
/* 5 */
/***/ (function(module, exports) {

const Util = {
  slope(startPoint, endPoint) {
    return (startPoint[1] - endPoint[1]) / (startPoint[0] - endPoint[0]);
  },

  inherits(ChildClass, ParentClass) {
    ChildClass.prototype = Object.create(ParentClass.prototype);
    ChildClass.prototype.constructor = ChildClass;
  },
};

module.exports = Util;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map