const Util = {
  inherits(ChildClass, ParentClass) {
    ChildClass.prototype = Object.create(ParentClass.prototype);
    ChildClass.prototype.constructor = ChildClass;
  },

  DIM_X: window.innerWidth - 100,
  DIM_Y: window.innerHeight - 100
};

module.exports = Util;
