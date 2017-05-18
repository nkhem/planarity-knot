const Util = require("./util");
const Color = require("./color");
const Point = require("./point");


const Line = function (options) {
  this.startPoint = options.startPoint;
  this.endPoint = options.endPoint;
  this.setSlopeAndYIntercept();

  this.intersectionPositions = [];
};

Line.prototype.setSlopeAndYIntercept = function () {
  this.slope = (this.startPoint.pos[1] - this.endPoint.pos[1]) / (this.startPoint.pos[0] - this.endPoint.pos[0]);
  this.yIntercept = this.startPoint.pos[1] - (this.slope * this.startPoint.pos[0]);
};

Line.prototype.draw = function (ctx) {
  ctx.strokeStyle = (this.intersectionPositions.length > 0) ? Color.INTERSECTED_LINE : Color.LINE;
  ctx.lineWidth = Util.LINE_WIDTH;
  if (this.intersectionPositions.length > 0) ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.moveTo(this.startPoint.pos[0], this.startPoint.pos[1]);
  ctx.lineTo(this.endPoint.pos[0], this.endPoint.pos[1]);
  ctx.stroke();
};

Line.prototype.equals = function(otherLine) {
  return Boolean((this.startPoint.pos[0] === otherLine.startX) &&
    (this.startPoint.pos[1] === otherLine.startY) &&
    (this.endPoint.pos[0] === otherLine.endX) &&
    (this.endPoint.pos[1] === otherLine.endY));
};

Line.prototype.intersectionPos = function (otherLine) {
  //return null if lines are parallel
  if (this.equals(otherLine)) return null;
  if (this.isAdjacentTo(otherLine)) return null;

  let commonX = ((otherLine.yIntercept - this.yIntercept) / (this.slope - otherLine.slope));
  let commonY = (this.slope * commonX) + this.yIntercept;
  let isValidIntersection = Boolean(
    this.posInRange([commonX, commonY])
    && otherLine.posInRange([commonX, commonY])
  );

  if (isValidIntersection) {
    return [commonX, commonY];
  }

  return null;
};

Line.prototype.intersectsWith = function (otherLine) {
  return Boolean(this.intersectionPos(otherLine));
};

Line.prototype.isAdjacentTo = function (otherLine) {
  return Boolean(
    Util.samePos(this.startPoint.pos, otherLine.endPoint.pos) ||
    Util.samePos(this.endPoint.pos, otherLine.startPoint.pos)
  );
};

Line.setIntersectionPositions = function(allLines) {
  allLines.forEach(line => {
    line.setIntersectionPositions(allLines);
  });
};

Line.prototype.setIntersectionPositions = function(allLines) {
  let intersectionPositions = [];

  allLines.forEach((line, i) => {
    if (this.intersectsWith(line)) {
      intersectionPositions.push(this.intersectionPos(line));
    }
  });

  this.intersectionPositions = Util.uniqPositions(intersectionPositions);
};

Line.prototype.posInRange = function (pos) {
  const x = pos[0];
  const y = pos[1];

  const isXInRange = Util.inRange(this.startPoint.pos[0], this.endPoint.pos[0], x) &&
    Util.inRange(0, Util.DIM_X, x);
  const isYInRange = Util.inRange(this.startPoint.pos[1], this.endPoint.pos[1], y) &&
    Util.inRange(0, Util.DIM_Y, y);

  return Boolean(isXInRange && isYInRange);
};

module.exports = Line;
