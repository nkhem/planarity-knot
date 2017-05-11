const Util = require("./Util");

const Line = function (options) {
  this.slope = options.slope;
  this.y_intercept = options.y_intercept;
};

Line.generateRandom = function () {
  return new Line({
    slope: Math.random(),
    y_intercept: Math.random()
  });
};

Line.prototype.draw = function (ctx) {
  ctx.strokeStyle = "#F5F5F5";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(1000, 600);
  ctx.stroke();
};

module.exports = Line;
