const Line = require("./line");
const Point = require("./point");
const Util = require("./util");

const Graph = function(opts = {}){
  this.lines = [];
  this.points = [];
  this.pointPositions = [];
};

Graph.prototype.populate = function (n) {
  this.makePoints(n);
  this.makeLines();
};

Graph.prototype.makePoints = function (n) {
  while (this.points.length < n) {
    const x = Math.random() * Util.DIM_X;
    const y = Math.random() * Util.DIM_Y;
    this.pointPositions.push([x, y]);
    const newPoint = new Point({pos: [x, y]});
    this.points.push(newPoint);
  }
};

Graph.prototype.makeLines = function(){
  for (var i = 0; i < this.pointPositions.length; i++) {
    const startPoint = this.pointPositions[i];
    const endPoint = this.pointPositions[i + 1] ? this.pointPositions[i + 1] : this.pointPositions[0];
    const newLine = new Line({
      startPoint: startPoint,
      endPoint: endPoint,
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

module.exports = Graph;
