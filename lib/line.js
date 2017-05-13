const Util = require("./util");
const Color = require("./color");

const Line = function (options) {
  this.startPoint = options.startPoint;
  this.endPoint = options.endPoint;
};

Line.prototype.draw = function (ctx) {
  ctx.strokeStyle = Color.LINE;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(this.startPoint.pos[0], this.startPoint.pos[1]); //start x, start y
  ctx.lineTo(this.endPoint.pos[0], this.endPoint.pos[1]); //end x, end y(600 * this.xIntercept)
  ctx.stroke();
};



module.exports = Line;
