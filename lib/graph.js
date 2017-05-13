const Line = require("./line");
const Point = require("./point");

const Graph = function(opts = {}){
  this.lines = [];
  this.points = [];
};

Graph.prototype.generateLines = function(n){

  while (this.points.length < n) {
    const x = Math.random();
    const y = Math.random();
    const newPoint = [ x, y ];
    this.points.push(newPoint);
  }

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
