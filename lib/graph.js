const Line = require("./line");
const Point = require("./point");
const Util = require("./util");

const Graph = function(opts = {}){
  this.lines = [];
  this.points = [];
  this.pointPositions = [];
  this.intersectionPositions = [];
  this.intersectionPoints = [];
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
  return [].concat(this.lines, this.points);
};


Graph.prototype.bindEventHandlers = function (opts) {
  this.onMouseUpRedrawGameView = opts.onMouseUpRedrawGameView;
  document.onmousedown = this.onMouseDown.bind(this);
};

Graph.prototype.onMouseDown = function(e) {
  let mousePos = [e.offsetX, e.offsetY];
  console.log(mousePos);
  console.log(this.targetPoint(mousePos));
  // console.log("this:", this);
  // console.log("this.isMouseOnPoint(mousePos):",this.isMouseOnPoint(mousePos));
  // if (this.isMouseOnPoint(mousePos)) {
  //   // document.onmousemove = this.onMouseMove.bind(this);
  //   document.onmouseup = this.onMouseUp.bind(this);
  //   this.isMoving = true;
  //   console.log('mousedown, e:', e);
  //   console.log('mousedown pos: [',e.offsetX, e.offsetY, ']');
  // }
};

Graph.prototype.onMouseUp = function(e){
  // let mouseX = e.clientX;
  // let mouseY = e.clientY;
  // let mousePos = [mouseX, mouseY];
  // console.log('mouseup, e:', e);
  // console.log('mouseup pos:', mousePos);
  // // document.onmousemove = null;
  // console.log(mousePos);
  // this.isMoving = false;
  // this.pos = mousePos;
  // this.onMouseUpRedrawGameView();
};

Graph.prototype.targetPoint = function (mousePos) {
  let targetPoint = null;
  this.points.forEach(point => {
    if (point.isMouseOnMe(mousePos)) {
      targetPoint = point;
    }
  });
  return targetPoint;
};

Graph.prototype.isMouseOnPoint = function (mousePos) {
  return Boolean(this.targetPoint(mousePos));
};

Graph.prototype.onMouseMove = function(e){
  // console.log('mousemove, e:', e);
  //
  // let mouseX = parseInt(
  //   e.target.style.left.slice(0, e.target.style.left.length - 2)
  // );
  // let mouseY = parseInt(
  //   e.target.style.top.slice(0, e.target.style.top.length - 2)
  // );
  // let mousePos = [mouseX, mouseY];
  //
  // console.log(mousePos);
};

module.exports = Graph;
