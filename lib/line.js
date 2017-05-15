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
};

Line.prototype.draw = function (ctx) {
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
  //return null if lines are parallel
  if (otherLine.slope - this.slope === 0) return null;


  let commonX = (otherLine.yIntercept - this.yIntercept)/(this.slope - otherLine.slope);
  let commonY = (this.slope * commonX) + this.yIntercept;
  let isValidIntersection = Boolean(
    this.hasPos(commonX, commonY)
    && otherLine.hasPos(commonX, commonY)
  );

  if (isValidIntersection) {
    return [commonX, commonY];
  }

  return null;
};

Line.prototype.intersectsWith = function (otherLine) {
  return Boolean(this.intersectionPos(otherLine));
};


Line.prototype.allIntersectionPositions = function(allLines) {
  let allIntersectionPositions = [];

  allLines.forEach((line, i) => {
    console.log(`this.intersectsWith(line ${i}):`, this.intersectsWith(line));
    if (this.intersectsWith(line)) {

      allIntersectionPositions.push(this.intersectionPos(line));
    }
  });
  return allIntersectionPositions;
};

Line.prototype.hasPos = function (x, y) {
  let isXInRange = Util.inRange(this.startX, this.endX, x);
  let isYInRange = Util.inRange(this.startY, this.endY, y);
  // let isOnLine = Boolean(y === ((this.slope * x) + this.yIntercept));

  return Boolean(isXInRange && isYInRange); // && isOnLine
};


Line.allIntersectionPoints = function(allLines) {
  let allIntersectionPositions = [];
  allLines.forEach((line) =>{
    line.allIntersectionPositions(allLines).forEach((int) =>{
      if(!allIntersectionPositions.includes(int)) {
        allIntersectionPositions.push(int);
      }
    });
  });

  let allIntersectionPoints = [];
  allIntersectionPositions.forEach((pos) => {
    let point = new Point({pos: pos});
    allIntersectionPoints.push(point);
  });

  return allIntersectionPoints;
};

module.exports = Line;
