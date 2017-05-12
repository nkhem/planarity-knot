const Line = require("./line");

const Graph = function(opts = {}){
  this.lines = [];
  this.points = [];
};

Graph.prototype.addLines = function(n){
  while (this.lines.length < n) {
    let newLine = Line.generateRandom();
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
