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
  return [].concat(this.lines, this.points, this.intersectionPoints);
};

module.exports = Graph;
