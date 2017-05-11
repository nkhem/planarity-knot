const Line = require("./Line");

const Graph = function(opts){
  this.lines = Graph.generateLines(opts.numLines);
};

Graph.generateLines = function(n){
  let lines = [];

  while (lines.length < n) {
    let newLine = Line.generateRandom();
    lines.push(newLine);
  }

  return lines;
};

module.exports = Graph;
