const Line = require("./line");
const Point = require("./point");
const NullObject = require("./null_object");
const Util = require("./util");

const Graph = function(opts = {}){
  this.reset();
};

Graph.prototype.populate = function(n) {
  this.reset();
  this.makePoints(n);
  this.makeLines();
};

Graph.prototype.reset = function() {
  this.lines = [];
  this.points = [];
  this.pointPositions = [];
  this.intersectionPoints = [];
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

  Line.setIntersectionPositions(this.lines);
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
  let mousePos = [e.offsetX, e.offsetY];
  if (this.isMouseOnPoint(mousePos)) {
    this.isolateMovingObjects(mousePos);
    document.onmousemove = this.onMouseMove.bind(this);
    document.onmouseup = this.onMouseUp.bind(this);
  }
};

Graph.prototype.onMouseMove = function(e){
  let mouseX = e.clientX;
  let mouseY = e.clientY;
  let mousePos = [mouseX, mouseY];
  this.updateMovingObjects(mousePos);
  this.redrawGameView();
};

Graph.prototype.onMouseUp = function(e){
  let mouseX = e.clientX;
  let mouseY = e.clientY;
  let mousePos = [mouseX, mouseY];
  this.settlizeMovingObjects(mousePos);
  this.redrawGameView();
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
  this.moveMovingObjects(mousePos);
  document.onmousemove = null;
  this.movingPoint.isMoving = false;
  this.movingLines.forEach(line => {
    if (line.startPoint.isMoving === true){
      line.startPoint.isMoving = false;
    } else if (line.endPoint.isMoving === true){
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

console.log([].concat(this.lines, this.movingLines));
  Line.setIntersectionPositions([].concat(this.lines, this.movingLines));
};

Graph.prototype.moveMovingObjects = function (mousePos) {
  mousePos = [mousePos[0] - Util.POINT_RADIUS, mousePos[1] - Util.POINT_RADIUS];
  this.movingPoint.pos = mousePos;
  this.movingLines.forEach(line => {
    if (line.startPoint.isMoving === true){
      line.startPoint.pos = mousePos;
    } else if (line.endPoint.isMoving === true){
      line.endPoint.pos = mousePos;
    }
  });
};

Graph.prototype.isMouseOnPoint = function (mousePos) {
  return Boolean(this.points.filter(point => point.isMouseOnMe(mousePos))[0]);
};

module.exports = Graph;
