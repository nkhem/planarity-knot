const Util = {
  inherits(ChildClass, ParentClass) {
    ChildClass.prototype = Object.create(ParentClass.prototype);
    ChildClass.prototype.constructor = ChildClass;
  },

  inRange(num1, num2, numTest){

    let min = (num1 <= num2) ? num1 : num2;
    let max = (num1 <= num2) ? num2 : num1;

    if (numTest > min && numTest < max) {
        return true;
    }

    return false;
  },

  DIM_X: window.innerWidth - 100,
  DIM_Y: window.innerHeight - 100
};

module.exports = Util;
