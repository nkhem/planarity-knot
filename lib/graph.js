const Line = require("./line");
const Point = require("./point");
const NullObject = require("./null_object");
const Util = require("./util");

const Graph = function(){
  this.clearGraph();
};

Graph.prototype.populate = function(opts = {}) {
  this.renderLevelUpBtn = opts.renderLevelUpBtn ? opts.renderLevelUpBtn : this.renderLevelUpBtn;

  this.setLinesAndPoints(opts.level);
  if (this.intersectionCount < 2) {
    this.populate(opts);
  } else if (this.redrawGameView) {
    document.getElementById('move-count').innerHTML = `Moves: ${this.currentMoveCount}`;
    this.redrawGameView();
  }
};

Graph.prototype.setLinesAndPoints = function (level) {
  let numPoints = level;
  let numConnectingLines = Math.floor(level / 2);

  if (level < 2) {
    numPoints += 4;
  } else if (level < 3) {
    numPoints += 4;
    numConnectingLines = 1;
  } else if (level < 6){
    numPoints += 3;
    numConnectingLines = 2;
  } else if (level < 8){
    numPoints += 2;
    numConnectingLines = 3;
  } else if (level < 10) {
    numPoints += 1;
    numConnectingLines = 4;
  } else if (level > 14 ){
    numPoints -= Math.floor(level / 4);
    if (level > 16) numConnectingLines = 7;
  }

  this.clearGraph();
  this.makePoints(numPoints);
  this.makeBaseLines(numPoints);
  this.makeConnectingLines(numConnectingLines);
  this.setIntersectionData();
};

Graph.prototype.setIntersectionData = function(){
  Line.setIntersectionPositions(this.lines);
  this.countIntersections();
};

Graph.prototype.restoreStartingGraph = function () {
  console.log(this);
  //keep relevant data
  let points = this.initialPoints;
  let pointPositions = this.initialPointPositions;
  let lines = this.initialLines;

  //reset the rest
  this.clearGraph();

  //set relevant data to cleared graph
  this.points = points;
  this.pointPositions = pointPositions;
  this.lines = lines;

  this.initialPoints = points;
  this.initialPointPositions = pointPositions;
  this.initialLines = lines;
  this.setIntersectionData();
  console.log('restoring to:', this);
  document.getElementById('elapsed-time').innerHTML = `Time: ${this.elapsedTime}`;
  document.getElementById('move-count').innerHTML = `Moves: ${this.currentMoveCount}`;
  this.redrawGameView();
};

Graph.prototype.countIntersections = function () {
  let allLines = this.movingLines.length > 1 ? [].concat(this.lines, this.movingLines) : this.lines;
  this.intersectionCount = Line.intersectionCount(allLines);
};

Graph.prototype.clearGraph = function() {
  this.lines = [];
  this.points = [];
  this.pointPositions = [];
  this.intersectionCount = 0;

  this.currentMoveCount = 0;
  this.timer = null;
  this.elapsedTime = 0;

  this.initialPoints = [];
  this.initialPointPositions = [];
  this.initialLines = [];

  this.movingPoint = new NullObject();
  this.movingLines = [new NullObject()];
};

Graph.prototype.makePoints = function (n) {
  this.points = [];
  this.initialPoints = [];
  this.initialPointPositions = [];

  while (this.points.length < n) {
    const x = Math.floor(Math.random() * (Util.DIM_X - 260) + 130);
    const y = Math.floor(Math.random() * (Util.DIM_Y - 260) + 130);
    if (Point.hasEnoughSpace([x,y], this.pointPositions)) {
      this.pointPositions.push([x, y]);
      this.initialPointPositions.push([x, y]);
      const newPoint = new Point({pos: [x, y]});
      const newInitPoint = new Point({pos: [x, y]});
      this.points.push(newPoint);
      this.initialPoints.push(newInitPoint);
    }
  }
};

Graph.prototype.makeBaseLines = function(n){
  this.lines = [];
  this.initialLines = [];

  for (var i = 0; i < n; i++) {
    const startPoint = this.points[i];
    const endPoint = this.points[i + 1] ? this.points[i + 1] : this.points[0];
    const newLine = new Line({ startPoint, endPoint, });
    const newInitLine = new Line({ startPoint, endPoint, });
    this.lines.push(newLine);
    this.initialLines.push(newInitLine);
  }
};

Graph.prototype.makeConnectingLines = function(n){
  let startPoint;
  let endPoint;

  let createFirstConnectingLine = () => {
    startPoint = this.points[0];
    endPoint = this.points[3];
    let newLine = new Line({startPoint, endPoint});
    let newInitLine = new Line({startPoint, endPoint});
    this.lines.push(newLine);
    this.initialLines.push(newInitLine);
  };

  let createSecondConnectingLine = () => {
    startPoint = this.points[0];
    endPoint = this.points[4];
    let newLine = new Line({startPoint, endPoint});
    let newInitLine = new Line({startPoint, endPoint});
    this.lines.push(newLine);
    this.initialLines.push(newInitLine);
  };

  let createThirdConnectingLine = () => {
    startPoint = this.points[this.points.length - 1];
    endPoint = this.points[5];
    let newLine = new Line({startPoint, endPoint});
    let newInitLine = new Line({startPoint, endPoint});
    this.lines.push(newLine);
    this.initialLines.push(newInitLine);
  };

  let createNMoreConnectingLines = (nMore) => {
    for (var i = 0; i < nMore ; i++) {
      startPoint = this.points[this.points.length - 1];
      endPoint = this.points[this.points.length - (i + 5)];
      let newLine = new Line({startPoint, endPoint});
      let newInitLine = new Line({startPoint, endPoint});
      this.lines.push(newLine);
      this.initialLines.push(newInitLine);
      nMore -= 1;
    }
  };

  if (n > 0) createFirstConnectingLine();
  if (n > 1) createSecondConnectingLine();
  if (n > 2) createThirdConnectingLine();
  if (n > 3) createNMoreConnectingLines(n - 3);

};

Graph.prototype.draw = function (ctx) {
  console.log('drawing graph');
  this.allObjects().forEach((object) => {
    object.draw(ctx);
  });
};

Graph.prototype.allObjects = function () {
  return [].concat(this.lines, this.points, this.movingLines, this.movingPoint);
};

Graph.prototype.startTimer = function (opts) {
  this.timer = setInterval(()=>{
    this.elapsedTime += 1;
    document.getElementById('elapsed-time').innerHTML = `Time: ${this.elapsedTime}`;
  }, 1000);
};

Graph.prototype.pauseTimer = function (opts) {
  clearInterval(this.timer);
  this.timer = null;
};

Graph.prototype.resetTimer = function (opts) {
  this.elapsedTime = 0;
  document.getElementById('elapsed-time').innerHTML = `Time: ${this.elapsedTime}`;
};

Graph.prototype.bindEventHandlers = function (opts) {
  this.redrawGameView = opts.redrawGameView;
  document.onmousedown = this.onMouseDown.bind(this);
};

Graph.prototype.onMouseDown = function(e) {
  let mousePos = [e.offsetX, e.offsetY];
  if (this.isMouseOnPoint(mousePos)) {
    this.currentMoveCount += 1;
    document.getElementById('move-count').innerHTML = `Moves: ${this.currentMoveCount}`;
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
};

Graph.prototype.isPlanar = function () {
  this.countIntersections();
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
