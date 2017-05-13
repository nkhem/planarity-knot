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
  Line.allIntersections(this.lines);
};

Graph.prototype.makePoints = function (n) {
  while (this.points.length < n) {
    const x = (Math.random() * (Util.DIM_X - 260) + 130);
    const y = (Math.random() * (Util.DIM_Y - 260) + 130);
    if (Point.hasEnoughSpace([x,y], this.pointPositions)) {
      this.pointPositions.push([x, y]);
      const newPoint = new Point({pos: [x, y]});
      this.points.push(newPoint);
    }
  }
};

Graph.prototype.makeLines = function(){
  for (var i = 0; i < this.points.length; i++) {
    const startPoint = this.points[i];
    const endPoint = this.points[i + 1] ? this.points[i + 1] : this.points[0];
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
