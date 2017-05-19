const Color = require("./color");
const Util = require("./util");

const Point = function (opts = {}) {
  this.pos = opts.pos;
  this.isMoving = false;
};

Point.prototype.dup = function() {
  let newPoint = new Point({pos: this.pos});
  return newPoint;
};

Point.deepDup = function(pointsArr) {
  let pointClones = [];
  pointsArr.forEach(point => {
    let pointClone = point.dup();
    pointClones.push(pointClone);
  });
  return pointClones;
};

Point.prototype.isMouseOnMe = function(mousePos) {
  return Boolean(Util.POINT_RADIUS >= Util.distance(this.pos, mousePos));
};

Point.prototype.draw = function (ctx) {
  ctx.fillStyle = this.isMoving ? Color.MOVING_POINT : Color.STATIC_POINT;

  ctx.beginPath();
  ctx.arc(
    this.pos[0], this.pos[1], Util.POINT_RADIUS, 0, 2 * Math.PI, true
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
