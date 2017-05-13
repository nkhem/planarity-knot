const Util = require("./util");

const Line = function (options) {
  this.startPoint = options.startPoint;
  this.endPoint = options.endPoint;
};

Line.prototype.draw = function (ctx) {
  ctx.strokeStyle = "#F5F5F5";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(this.startPoint[0], this.startPoint[1]); //start x, start y
  ctx.lineTo(this.endPoint[0], this.endPoint[1]); //end x, end y(600 * this.xIntercept)
  ctx.stroke();
};

module.exports = Line;
