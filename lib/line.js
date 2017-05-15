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

Line.prototype.intersectionPos = function (otherLine) {
  if (otherLine.slope - this.slope === 0) return null;

  let commonX = (otherLine.yIntercept - this.yIntercept)/(this.slope - otherLine.slope);
  let commonY = commonX ? ((this.slope * commonX) + this.yIntercept) : null;
  let commonPos = [commonX, commonY];
  let newPoint = new Point({pos : commonPos});
  this.testIntersections.push(newPoint);
  if (commonY && this.hasPos(commonPos) && otherLine.hasPos(commonPos)) {
    return commonPos;
  }

  return null;
};

Line.prototype.intersectsWith = function (otherLine) {
  return Boolean(this.intersectionPos(otherLine));
};


Line.prototype.allIntersections = function(allLines) {
  let allIntersections = [];

  allLines.forEach((line) => {
    const isThisLine = (
      (line.startX === this.startX) &&
      (line.startY === this.startY) &&
      (line.endX === this.endX) &&
      (line.endY === this.endY)
    );

    if (this.intersectsWith(line) && !isThisLine) {
      allIntersections.push(this.intersectionPos(line));
    }
  });

  return allIntersections;
};

Line.prototype.hasPos = function (pos) {
  let isXInRange = Util.inRange(this.startX, this.endX, pos[0]);
  let isYInRange = Util.inRange(this.startY, this.endY, pos[1]);
  let isOnLine = Boolean(pos[1] === ((this.slope * pos[0]) + this.yIntercept));
  console.log('this.startX', this.startX);
  console.log('this.endX', this.endX);
  console.log('pos[0]', pos[0]);
  console.log('isXInRange', isXInRange);
  // console.log('isYInRange', isYInRange);
  // console.log('isOnLine', isOnLine);

  return Boolean(isXInRange && isYInRange && isOnLine);
};


Line.allIntersections = function(allLines) {
  let allIntersections = [];
  console.log(allLines);
  allLines.forEach((line) =>{
    console.log(line.allIntersections(allLines));
    line.allIntersections(allLines).forEach((int) =>{
      if(!allIntersections.includes(int)) allIntersections.push(int);
    });
  });
};

module.exports = Line;
