const Line = require("./line");
const Point = require("./point");
const NullObject = require("./null_object");
const Util = require("./util");

const Graph = function(opts = {}){
  this.lines = [];
  this.points = [];
  this.pointPositions = [];
  this.intersectionPositions = [];
  this.intersectionPoints = [];
  this.movingPoint = new NullObject();
  this.movingLines = [new NullObject()];
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
  if (this.isMouseOnPoint(mousePos)) {
    this.isolateMovingPoint(mousePos);
    document.onmousemove = this.onMouseMove.bind(this);
    document.onmouseup = this.onMouseUp.bind(this);
  }
};

Graph.prototype.onMouseMove = function(e){
  let mouseX = e.clientX;
  let mouseY = e.clientY;
  let mousePos = [mouseX, mouseY];
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

module.exports = Graph;
