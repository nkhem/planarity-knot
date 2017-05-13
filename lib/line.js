const Util = require("./util");
const Color = require("./color");

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

Line.prototype.intersection = function (otherLine) {
  if (otherLine.slope - this.slope === 0) return null;

  let commonX = (otherLine.yIntercept - this.yIntercept)/(otherLine.slope - this.slope);
  let commonY = commonX ? ((this.slope * commonX) + this.yIntercept) : null;
  let commonPos = [commonX, commonY];

  if (commonY && this.hasPoint(commonPos) && otherLine.hasPoint(commonPos)) {
    return commonPos;
  }

  return null;

};

Line.prototype.hasPoint = function (pos) {
  let isXInRange = Util.inRange(this.startX, this.endX, pos[0]);
  let isYInRange = Util.inRange(this.startY, this.endY, pos[1]);
  let isOnLine = Boolean(pos[1] === ((this.slope * pos[0]) + this.yIntercept));
  if (isXInRange && isYInRange && isOnLine) {
    return true;
  }
  return false;
};


Line.numIntersections = function(lines) {

};

module.exports = Line;
