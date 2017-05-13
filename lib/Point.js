const Color = require("./color");

const Point = function (opts = {}) {
  this.pos = opts.pos;
};

Point.prototype.draw = function (ctx) {
  ctx.fillStyle = Color.POINT;

  ctx.beginPath();
  ctx.arc(
    this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
  );
  ctx.fill();
};

module.exports = Point;
