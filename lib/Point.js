const Color = require("./color");

const Point = function (opts = {}) {
  this.pos = opts.pos;
};

Point.prototype.draw = function (ctx, color) {
  ctx.fillStyle = color ? color : Color.POINT;

  ctx.beginPath();
  ctx.arc(
    this.pos[0], this.pos[1], 7, 0, 2 * Math.PI, true
  );
  ctx.fill();
};

Point.hasEnoughSpace = function(newPos, takenPositions) {
  let hasEnoughSpace = true;
  takenPositions.forEach(function(pos) {
    let xTooClose = Boolean(Math.abs(newPos[0] - pos[0]) < 100);
    let yTooClose = Boolean(Math.abs(newPos[1] - pos[1]) < 100);
    if (xTooClose && yTooClose) {
      hasEnoughSpace = false;
    }
  });

  return hasEnoughSpace;
};

module.exports = Point;
