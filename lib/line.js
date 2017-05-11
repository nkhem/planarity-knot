const Util = require("./Util");

const Line = function (options) {
  this.slope = options.slope;
  this.y_intercept = options.y_intercept;
};

Line.prototype.intersectsWith = function (otherLine) {
};

Line.prototype.intersectionWith = function (otherLine) {
};

Line.generateRandom = function () {
  return new Line({
    slope: Math.random(),
    y_intercept: Math.random()
  });
};

Line.prototype.draw = function (ctx) {

};

module.exports = Line;
