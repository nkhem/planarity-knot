const Util = require("./util");

const Line = function (options) {
  this.canvasStartPoint = options.canvasStartPoint;
  this.canvasEndPoint = options.canvasEndPoint;
};

Line.generateRandom = function () {
  const randomEdgeNum = function() {
    return [0, 600][Math.floor ( Math.random() * 2 )];
  };

  const randomNum = function() {
    return 600 * Math.random();
  };

  let startX = randomEdgeNum();
  let startY = randomNum();

  let endX = 600 - startY;
  let endY = randomEdgeNum();

  return new Line({
    canvasStartPoint: [startX, startY],
    canvasEndPoint: [endX, endY]
  });
};

Line.prototype.draw = function (ctx) {
  ctx.strokeStyle = "#F5F5F5";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(this.canvasStartPoint[0], this.canvasStartPoint[1]); //start x, start y
  ctx.lineTo(this.canvasEndPoint[0], this.canvasEndPoint[1]); //end x, end y(600 * this.xIntercept)
  ctx.stroke();
};

module.exports = Line;
