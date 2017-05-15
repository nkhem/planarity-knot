const Util = require("./util");
const Color = require("./color");
const Point = require("./point");

const Line = function (options) {
  this.startPoint = options.startPoint;
  this.startX = this.startPoint.pos[0];
  this.startY = this.startPoint.pos[1];

  this.endPoint = options.endPoint;
  this.endX = this.endPoint.pos[0];
  this.endY = this.endPoint.pos[1];

  this.slope = (this.startY - this.endY) / (this.startX - this.endX);
  this.yIntercept = this.startY - (this.slope * this.startX);
  this.testIntersections = [];
};

Line.prototype.draw = function (ctx) {
  this.testIntersections.forEach(testInt =>testInt.draw(ctx, '#9932CC'));
  ctx.strokeStyle = Color.LINE;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(this.startX, this.startY);
  ctx.lineTo(this.endX, this.endY);
  ctx.stroke();
};

Line.prototype.equals = function(otherLine) {
  return Boolean((this.startX === otherLine.startX) &&
    (this.startY === otherLine.startY) &&
    (this.endX === otherLine.endX) &&
    (this.endY === otherLine.endY));
};

Line.prototype.intersectionPos = function (otherLine) {
  if (otherLine.slope - this.slope === 0) return null;
  if (this.equals(otherLine)) return null;

  let commonX = (otherLine.yIntercept - this.yIntercept)/(this.slope - otherLine.slope);
  let commonY = commonX ? ((this.slope * commonX) + this.yIntercept) : null;
  if (commonY && this.hasPos(commonX, commonY) && otherLine.hasPos(commonX, commonY)) {
    let newPoint = new Point({pos : [commonX, commonY]});
    this.testIntersections.push(newPoint);
    return [commonX, commonY];
  }

  return null;
};

Line.prototype.intersectsWith = function (otherLine) {
  return Boolean(this.intersectionPos(otherLine));
};


Line.prototype.allIntersections = function(allLines) {
  let allIntersections = [];

  allLines.forEach((line) => {
    if (this.intersectsWith(line)) {
      allIntersections.push(this.intersectionPos(line));
    }
  });

  return allIntersections;
};

Line.prototype.hasPos = function (x, y) {
  let isXInRange = Util.inRange(this.startX, this.endX, x);
  let isYInRange = Util.inRange(this.startY, this.endY, y);
  let isOnLine = Boolean(y === ((this.slope * x) + this.yIntercept));

  return Boolean(isXInRange && isYInRange && isOnLine);
};


Line.allIntersections = function(allLines) {
  let allIntersections = [];
  allLines.forEach((line) =>{
    line.allIntersections(allLines).forEach((int) =>{
      if(!allIntersections.includes(int)) allIntersections.push(int);
    });
  });
};

module.exports = Line;
