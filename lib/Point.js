const Point = function (opts = {}) {
  this.pos = opts.pos;
};

Point.COLOR = "#8B008B";

Point.prototype.draw = function (ctx) {
  ctx.fillStyle = Point.COLOR;

  ctx.beginPath();
  ctx.arc(
    this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
  );
  ctx.fill();
};

module.exports = Point;
