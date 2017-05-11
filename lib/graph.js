const Line = require("./Line");

const Graph = function(opts){
  this.lines = [];
};

Graph.prototype.addLines = function(n){
  while (this.lines.length < n) {
    let newLine = Line.generateRandom();
    this.lines.push(newLine);
  }
};

module.exports = Graph;
