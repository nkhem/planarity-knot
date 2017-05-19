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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ({

<<<<<<< HEAD
/***/ 8:
=======
Graph.prototype.clearGraph = function() {
  this.lines = [];
  this.points = [];
  this.pointPositions = [];
  this.currentMoveCount = 0;
  this.intersectionCount = 0;
  this.movingPoint = new NullObject();
  this.movingLines = [new NullObject()];
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

Graph.prototype.makeBaseLines = function(n){
  this.lines = [];

  for (var i = 0; i < n; i++) {
    const startPoint = this.points[i];
    const endPoint = this.points[i + 1] ? this.points[i + 1] : this.points[0];
    const newLine = new Line({
      startPoint,
      endPoint,
    });
    this.lines.push(newLine);
  }
};

Graph.prototype.makeConnectingLines = function(n){
  for (var i = 0; i < n; i++) {
    const startPoint = this.points[i];
    const midIndex = i + Math.floor(this.lines.length / 3);
    const endPoint = this.points[midIndex] ? this.points[midIndex] : this.points[i+2];
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
  return [].concat(this.lines, this.points, this.movingLines, this.movingPoint);
};


Graph.prototype.bindEventHandlers = function (opts) {
  this.redrawGameView = opts.redrawGameView;
  document.onmousedown = this.onMouseDown.bind(this);
};

Graph.prototype.onMouseDown = function(e) {
  this.currentMoveCount += 1;
  let mousePos = [e.offsetX, e.offsetY];
  if (this.isMouseOnPoint(mousePos)) {
    this.isolateMovingObjects(mousePos);
    document.onmousemove = this.onMouseMove.bind(this);
    document.onmouseup = this.onMouseUp.bind(this);
  }
};

Graph.prototype.onMouseMove = function(e){
  let mouseX = e.offsetX;
  let mouseY = e.offsetY;
  let mousePos = [mouseX, mouseY];
  this.updateMovingObjects(mousePos);
  this.redrawGameView();
};

Graph.prototype.onMouseUp = function(e){
  let mouseX = e.offsetX;
  let mouseY = e.offsetY;
  let mousePos = [mouseX, mouseY];
  this.settlizeMovingObjects(mousePos);
  this.redrawGameView();
  if (this.isPlanar()) {
    this.renderLevelUpBtn();
  }
  document.onmousemove = null;
  document.onmouseup = null;
};

Graph.prototype.setMovingPoint = function (mousePos) {
  this.movingPoint = this.points.filter(point => point.isMouseOnMe(mousePos))[0];
};

Graph.prototype.setMovingLines = function () {
  this.movingLines = this.lines.filter(line => {
    let isStartPointMoving = Util.samePos(line.startPoint.pos, this.movingPoint.pos);
    let isEndPointMoving = Util.samePos(line.endPoint.pos, this.movingPoint.pos);
    if (isStartPointMoving) {
      line.startPoint.isMoving = true;
    } else if (isStartPointMoving){
      line.endPoint.isMoving = true;
    }
    return (isStartPointMoving || isEndPointMoving);
  });
};

Graph.prototype.removeMovingLinesfromLinesArr = function () {
  this.lines = this.lines.filter(line => {
    return !(line.startPoint.isMoving || line.endPoint.isMoving);
  });
};

Graph.prototype.removeMovingPointfromPointsArr = function (mousePos) {
  this.points = this.points.filter(point => !point.isMouseOnMe(mousePos));
};

Graph.prototype.isolateMovingObjects = function (mousePos) {
  this.setMovingPoint(mousePos);
  this.setMovingLines();
  this.removeMovingPointfromPointsArr(mousePos);
  this.removeMovingLinesfromLinesArr();
  this.movingPoint.isMoving = true;
};

Graph.prototype.settlizeMovingObjects = function (mousePos) {
  this.updateMovingObjects(mousePos);
  this.movingPoint.isMoving = false;
  this.movingLines.forEach(line => {
    if (line.startPoint.isMoving){
      line.startPoint.isMoving = false;
    } else if (line.endPoint.isMoving){
      line.endPoint.isMoving = false;
    }
  });
  this.points = this.points.concat(this.movingPoint);
  this.lines = this.lines.concat(this.movingLines);
  this.movingPoint = new NullObject();
  this.movingLines = [new NullObject()];
};

Graph.prototype.updateMovingObjects = function (mousePos) {
  this.moveMovingObjects(mousePos);
  Line.setIntersectionPositions([].concat(this.lines, this.movingLines));
  this.countIntersections();
};

Graph.prototype.isPlanar = function () {
  return Boolean(this.intersectionCount < 1);
};

Graph.prototype.moveMovingObjects = function (mousePos) {
  mousePos = [
    mousePos[0] - Util.POINT_RADIUS,
    mousePos[1] - Util.POINT_RADIUS
  ];

  this.movingPoint.pos = mousePos;
  this.movingLines.forEach(line => {
    if (line.startPoint.isMoving){
      line.startPoint.pos = mousePos;
    } else if (line.endPoint.isMoving){
      line.endPoint.pos = mousePos;
    }
    line.setSlopeAndYIntercept();
  });
};

Graph.prototype.isMouseOnPoint = function (mousePos) {
  return Boolean(this.points.filter(point => point.isMouseOnMe(mousePos))[0]);
};

module.exports = Graph;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);
const Color = __webpack_require__(1);
const Point = __webpack_require__(3);


const Line = function (options) {
  this.startPoint = options.startPoint;
  this.endPoint = options.endPoint;
  this.setSlopeAndYIntercept();

  this.intersectionPositions = [];
};

Line.prototype.setSlopeAndYIntercept = function () {
  this.slope = (this.startPoint.pos[1] - this.endPoint.pos[1]) / (this.startPoint.pos[0] - this.endPoint.pos[0]);
  this.yIntercept = this.startPoint.pos[1] - (this.slope * this.startPoint.pos[0]);
};

Line.prototype.draw = function (ctx) {
  ctx.strokeStyle = (this.intersectionPositions.length > 0) ? Color.INTERSECTED_LINE : Color.LINE;
  ctx.lineWidth = Util.LINE_WIDTH;
  if (this.intersectionPositions.length > 0) {
    ctx.shadowColor = Color.INTERSECTED_LINE;
    ctx.shadowBlur = 10;
  }
  ctx.beginPath();
  ctx.moveTo(this.startPoint.pos[0], this.startPoint.pos[1]);
  ctx.lineTo(this.endPoint.pos[0], this.endPoint.pos[1]);
  ctx.stroke();
};

Line.prototype.equals = function(otherLine) {
  return Boolean((this.startPoint.pos[0] === otherLine.startX) &&
    (this.startPoint.pos[1] === otherLine.startY) &&
    (this.endPoint.pos[0] === otherLine.endX) &&
    (this.endPoint.pos[1] === otherLine.endY));
};

Line.prototype.intersectionPos = function (otherLine) {
  //return null if lines are parallel
  if (this.equals(otherLine)) return null;
  if (this.isAdjacentTo(otherLine)) return null;

  let commonX = ((otherLine.yIntercept - this.yIntercept) / (this.slope - otherLine.slope));
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

Line.prototype.isAdjacentTo = function (otherLine) {
  return Boolean(
    Util.samePos(this.startPoint.pos, otherLine.endPoint.pos) ||
    Util.samePos(this.endPoint.pos, otherLine.startPoint.pos)
  );
};

Line.setIntersectionPositions = function(allLines) {
  allLines.forEach(line => {
    line.setIntersectionPositions(allLines);
  });
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

  const isXInRange = Util.inRange(this.startPoint.pos[0], this.endPoint.pos[0], x) &&
    Util.inRange(0, Util.DIM_X, x);
  const isYInRange = Util.inRange(this.startPoint.pos[1], this.endPoint.pos[1], y) &&
    Util.inRange(0, Util.DIM_Y, y);

  return Boolean(isXInRange && isYInRange);
};

module.exports = Line;


/***/ }),
/* 7 */
>>>>>>> parent of 0351ecb... asdf
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/nicolehemenway/Desktop/planarityProject/planarity-knot/lib/planarity_knot.js'\n    at Error (native)");

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map