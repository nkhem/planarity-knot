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

  this.intersectionPositions = [];
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
  if (Math.floor(otherLine.slope) - Math.floor(this.slope) === 0) return null;


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


Line.prototype.intersectionPositions = function(allLines) {
  let intersectionPositions = [];

  allLines.forEach((line, i) => {
    if (this.intersectsWith(line)) {
      intersectionPositions.push(this.intersectionPos(line));
    }
  });
  return intersectionPositions;
};

Line.prototype.hasPos = function (x, y) {
  let isXInRange = Util.inRange(this.startX, this.endX, x);
  let isYInRange = Util.inRange(this.startY, this.endY, y);

  //check that y === mx + b
  let isOnLine = Boolean(
    Math.floor(y) === Math.floor((this.slope * x) + this.yIntercept)
  );

  return Boolean(isXInRange && isYInRange && isOnLine);
};


Line.intersectionPositions = function(allLines) {
  let intersectionPositions = [];
  allLines.forEach((line) =>{
    line.intersectionPositions(allLines).forEach((int) =>{
      intersectionPositions.push(int);
    });
  });

  let uniqPositions = [];
  intersectionPositions.forEach((pos1) => {
    let isUniq = true;
    uniqPositions.forEach((pos2) => {
      let x1 = Math.floor(pos1[0]);
      let y1 = Math.floor(pos1[1]);
      let x2 = Math.floor(pos2[0]);
      let y2 = Math.floor(pos2[1]);

      if (x1 === x2 && y1 === y2) isUniq = false;
    });

    if(isUniq) uniqPositions.push(pos1);
  });

  return uniqPositions;
};

module.exports = Line;
