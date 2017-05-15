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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const Util = {
  inherits(ChildClass, ParentClass) {
    ChildClass.prototype = Object.create(ParentClass.prototype);
    ChildClass.prototype.constructor = ChildClass;
  },

  distance(pos1, pos2) {
    const x1 = pos1[0];
    const y1 = pos1[1];

    const x2 = pos2[0];
    const y2 = pos2[1];

    return Math.sqrt(
      Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)
    );
  },

  inRange(num1, num2, numTest){

    let min = (num1 <= num2) ? num1 : num2;
    let max = (num1 <= num2) ? num2 : num1;

    return Boolean(numTest > min && numTest < max);
  },

  posInRange(startPos, endPos, testPos){
    const testX = testPos[0];
    const testY = testPos[1];

    const startX = startPos[0];
    const startY = startPos[1];

    const endX = endPos[0];
    const endY = endPos[1];

    const isXInRange = Util.inRange(startX, endX, testX);
    const isYInRange = Util.inRange(startY, endY, testY);

    return Boolean(isXInRange && isYInRange);
  },

  uniqPositions(posArray){
    let uniqPositions = [];
    posArray.forEach((pos1) => {
      let isUniq = true;
      uniqPositions.forEach((pos2) => {
        let x1 = Math.floor(pos1[0]);
        let y1 = Math.floor(pos1[1]);
        let x2 = Math.floor(pos2[0]);
        let y2 = Math.floor(pos2[1]);

        if (x1 === x2 && y1 === y2) isUniq = false;
      });

      if(isUniq) uniqPositions.push(pos1);
    });
    return uniqPositions;
  },

  DIM_X: window.innerWidth - 100,
  DIM_Y: window.innerHeight - 100,
  POINT_RADIUS: 10,
  LINE_WIDTH: 5
};

module.exports = Util;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {
	STATIC_POINT: "#4448AF",
	MOVING_POINT: "#7073CC",
  BG: "#101010",
  LINE: "#B1E0C0",
  INTERSECTED_LINE: "#43B768"
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Graph = __webpack_require__(5);
const Color = __webpack_require__(1);
const Util = __webpack_require__(0);

const Game = function(opts) {
  this.graph = new Graph();
  let n = opts.level + 5;
  this.graph.populate(n);

  console.log(this.graph);
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Util.DIM_X, Util.DIM_Y);
  ctx.fillStyle = Color.BG;
  ctx.fillRect(0, 0, Util.DIM_X, Util.DIM_Y);

  this.graph.draw(ctx);
};


module.exports = Game;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Color = __webpack_require__(1);
const Util = __webpack_require__(0);

const Point = function (opts = {}) {
  this.pos = opts.pos;
  this.isMoving = false;
};

Point.prototype.isMouseOnMe = function(mousePos) {
  // console.log("this.pos:",this.pos);
  // console.log("mousePos:",mousePos);
  // console.log("dist between: ", Util.distance(this.pos, mousePos));
  // console.log(Boolean(Util.POINT_RADIUS >= Util.distance(this.pos, mousePos)));
  return Boolean(Util.POINT_RADIUS >= Util.distance(this.pos, mousePos));
};

Point.prototype.draw = function (ctx) {
  ctx.fillStyle = this.isMoving ? Color.MOVING_POINT : Color.STATIC_POINT;

  ctx.beginPath();
  ctx.arc(
    this.pos[0], this.pos[1], Util.POINT_RADIUS, 0, 2 * Math.PI, true
  );
  ctx.fill();
};

Point.hasEnoughSpace = function(newPos, takenPositions) {
  let hasEnoughSpace = true;
  takenPositions.forEach(function(pos) {
    let xTooClose = Boolean(Math.abs(newPos[0] - pos[0]) < 100);
    let yTooClose = Boolean(Math.abs(newPos[1] - pos[1]) < 100);
    if (xTooClose && yTooClose) {
      hasEnoughSpace = false;
    }
  });

  return hasEnoughSpace;
};

module.exports = Point;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(2);

const GameView = function (game, ctx) {
  this.ctx = ctx;
  this.game = game;
  this.game.draw(ctx);
  this.bindEventHandlers();
};

GameView.prototype.bindEventHandlers = function () {
  this.game.graph.bindEventHandlers({
    redrawGameView: this.onMouseUp.bind(this)
  });
};

GameView.prototype.onMouseUp = function (e) {
  this.game.draw(this.ctx);
};

module.exports = GameView;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Line = __webpack_require__(6);
const Point = __webpack_require__(3);
const NullPoint = __webpack_require__(8);
const Util = __webpack_require__(0);

const Graph = function(opts = {}){
  this.lines = [];
  this.points = [];
  this.pointPositions = [];
  this.intersectionPositions = [];
  this.intersectionPoints = [];
  this.movingPoint = new NullPoint();
};

Graph.prototype.populate = function(n) {
  this.reset();
  this.makePoints(n);
  this.makeLines();
  this.setIntersectionPositions();
  this.setIntersectionPoints();
};

Graph.prototype.setIntersectionPositions = function() {
  this.intersectionPositions = [];

  let intPositions = [];
  this.lines.forEach(line => {
    line.setIntersectionPositions(this.lines);
    line.intersectionPositions.forEach(intPos => {
      intPositions.push(intPos);
    });
  });

  this.intersectionPositions = Util.uniqPositions(intPositions);
};

Graph.prototype.setIntersectionPoints = function() {
  this.intersectionPoints = [];
  Util.uniqPositions(this.intersectionPositions).forEach(pos => {
    let newPoint = new Point({pos});
    this.intersectionPoints.push(newPoint);
  });
};

Graph.prototype.reset = function() {
  this.lines = [];
  this.points = [];
  this.pointPositions = [];
  this.intersectionPositions = [];
  this.intersectionPoints = [];
};

Graph.prototype.makePoints = function (n) {
  this.points = [];
  while (this.points.length < n) {
    const x = Math.floor(Math.random() * (Util.DIM_X - 260) + 130);
    const y = Math.floor(Math.random() * (Util.DIM_Y - 260) + 130);
    if (Point.hasEnoughSpace([x,y], this.pointPositions)) {
      this.pointPositions.push([x, y]);
      const newPoint = new Point({pos: [x, y]});
      this.points.push(newPoint);
    }
  }
};

Graph.prototype.makeLines = function(){
  this.lines = [];

  for (var i = 0; i < this.points.length; i++) {
    const startPoint = this.points[i];
    const endPoint = this.points[i + 1] ? this.points[i + 1] : this.points[0];
    const newLine = new Line({
      startPoint,
      endPoint,
    });
    this.lines.push(newLine);
  }
};

Graph.prototype.draw = function (ctx) {
  this.allObjects().forEach((object) => {
    object.draw(ctx);
  });
};

Graph.prototype.allObjects = function () {
  return [].concat(this.lines, this.points, this.movingPoint);
};


Graph.prototype.bindEventHandlers = function (opts) {
  this.redrawGameView = opts.redrawGameView;
  document.onmousedown = this.onMouseDown.bind(this);
};

Graph.prototype.onMouseDown = function(e) {
  let mousePos = [e.offsetX, e.offsetY];
  // console.log(mousePos);
  // console.log(this.targetPoint(mousePos));
  if (this.isMouseOnPoint(mousePos)) {
    this.isolateMovingPoint(mousePos);
    document.onmousemove = this.onMouseMove.bind(this);
    document.onmouseup = this.onMouseUp.bind(this);
  //   console.log('mousedown, e:', e);
  //   console.log('mousedown pos: [',e.offsetX, e.offsetY, ']');
  }
};

Graph.prototype.onMouseMove = function(e){
  let mouseX = e.clientX;
  let mouseY = e.clientY;
  let mousePos = [mouseX, mouseY];
  console.log('mouseMove pos', mousePos);
  this.movingPoint.pos = [
    mouseX - Util.POINT_RADIUS,
    mouseY - Util.POINT_RADIUS
  ];
  this.redrawGameView();
};

Graph.prototype.onMouseUp = function(e){
  let mouseX = e.clientX;
  let mouseY = e.clientY;
  let mousePos = [mouseX, mouseY];
  // console.log('mouseup, e:', e);
  console.log('mouseup pos:', mousePos);
  // console.log(mousePos);
  this.settlizeMovingPoint(mousePos);
  this.redrawGameView();
};

Graph.prototype.setMovingPoint = function (mousePos) {
  this.movingPoint = this.points.filter(point => point.isMouseOnMe(mousePos))[0];
};

Graph.prototype.removeMovingPointfromPointsArr = function (mousePos) {
  this.points = this.points.filter(point => !point.isMouseOnMe(mousePos));
};

Graph.prototype.isolateMovingPoint = function (mousePos) {
  this.setMovingPoint(mousePos);
  this.removeMovingPointfromPointsArr(mousePos);
  this.movingPoint.isMoving = true;
};

Graph.prototype.settlizeMovingPoint = function (mousePos) {
  document.onmousemove = null;
  this.movingPoint.pos = [mousePos[0] - Util.POINT_RADIUS, mousePos[1] - Util.POINT_RADIUS];
  this.movingPoint.isMoving = false;
  this.points = this.points.concat(this.movingPoint);
  this.movingPoint = new NullPoint();
};

Graph.prototype.isMouseOnPoint = function (mousePos) {
  return Boolean(this.points.filter(point => point.isMouseOnMe(mousePos))[0]);
};

// Graph.prototype.onMouseMove = function(e){
//   // console.log('mousemove, e:', e);
//   //
//   // let mouseX = parseInt(
//   //   e.target.style.left.slice(0, e.target.style.left.length - 2)
//   // );
//   // let mouseY = parseInt(
//   //   e.target.style.top.slice(0, e.target.style.top.length - 2)
//   // );
//   // let mousePos = [mouseX, mouseY];
//   //
//   // console.log(mousePos);
// };

module.exports = Graph;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);
const Color = __webpack_require__(1);
const Point = __webpack_require__(3);


const Line = function (options) {
  this.startPoint = options.startPoint;
  this.startX = this.startPoint.pos[0];
  this.startY = this.startPoint.pos[1];

  this.endPoint = options.endPoint;
  this.endX = this.endPoint.pos[0];
  this.endY = this.endPoint.pos[1];

  this.slope = (this.startY - this.endY) / (this.startX - this.endX);
  this.yIntercept = this.startY - (this.slope * this.startX);

  this.intersectionPositions = [];
};

Line.prototype.draw = function (ctx) {
  ctx.strokeStyle = (this.intersectionPositions.length > 0) ? Color.INTERSECTED_LINE : Color.LINE;
  ctx.lineWidth = Util.LINE_WIDTH;
  ctx.beginPath();
  ctx.moveTo(this.startX, this.startY);
  ctx.lineTo(this.endX, this.endY);
  ctx.stroke();
};

Line.prototype.equals = function(otherLine) {
  return Boolean((this.startX === otherLine.startX) &&
    (this.startY === otherLine.startY) &&
    (this.endX === otherLine.endX) &&
    (this.endY === otherLine.endY));
};

Line.prototype.intersectionPos = function (otherLine) {
  //return null if lines are parallel
  if (otherLine.slope - this.slope === 0) return null;


  let commonX = (otherLine.yIntercept - this.yIntercept)/(this.slope - otherLine.slope);
  let commonY = (this.slope * commonX) + this.yIntercept;
  let isValidIntersection = Boolean(
    this.posInRange([commonX, commonY])
    && otherLine.posInRange([commonX, commonY])
  );

  if (isValidIntersection) {
    return [commonX, commonY];
  }

  return null;
};

Line.prototype.intersectsWith = function (otherLine) {
  return Boolean(this.intersectionPos(otherLine));
};


Line.prototype.setIntersectionPositions = function(allLines) {
  let intersectionPositions = [];

  allLines.forEach((line, i) => {
    if (this.intersectsWith(line)) {
      intersectionPositions.push(this.intersectionPos(line));
    }
  });

  this.intersectionPositions = Util.uniqPositions(intersectionPositions);
};

Line.prototype.posInRange = function (pos) {
  const x = pos[0];
  const y = pos[1];

  const isXInRange = Util.inRange(this.startX, this.endX, x) &&
    Util.inRange(0, Util.DIM_X, x);
  const isYInRange = Util.inRange(this.startY, this.endY, y) &&
    Util.inRange(0, Util.DIM_Y, y);

  return Boolean(isXInRange && isYInRange);
};

module.exports = Line;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(2);
const GameView = __webpack_require__(4);
const Util = __webpack_require__(0);

document.addEventListener("DOMContentLoaded", function(){
  //set canvas size
  const canvasEl = document.getElementById("canvas");
  canvasEl.width = Util.DIM_X;
  canvasEl.height = Util.DIM_Y;

  const game = new Game({level: 1});
  const ctx = canvasEl.getContext("2d");
  new GameView(game, ctx); //.start();
});


/***/ }),
/* 8 */
/***/ (function(module, exports) {

const NullPoint = function () {
  this.pos = [];
  this.isMoving = false;
};

NullPoint.prototype.draw = function (ctx) {
  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.arc(
    this.pos[0], this.pos[1], 0, 0, 2 * Math.PI, true
  );
  ctx.fill();
};

module.exports = NullPoint;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map