const Util = require("./util");

const Line = function (options) {
  this.slope = options.slope;
  this.y_intercept = options.y_intercept;
};

Line.prototype.intersectsWith = function (otherLine) {
};

Line.prototype.intersectionWith = function (otherLine) {
};

module.exports = Line;
