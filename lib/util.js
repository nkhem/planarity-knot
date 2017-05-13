const Util = {
  slope(startPoint, endPoint) {
    return (startPoint[1] - endPoint[1]) / (startPoint[0] - endPoint[0]);
  },

  inherits(ChildClass, ParentClass) {
    ChildClass.prototype = Object.create(ParentClass.prototype);
    ChildClass.prototype.constructor = ChildClass;
  },

  DIM_X: window.innerWidth - 100,
  DIM_Y: window.innerHeight - 100
};

module.exports = Util;
