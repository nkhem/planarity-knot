const Util = {
  inherits(ChildClass, ParentClass) {
    ChildClass.prototype = Object.create(ParentClass.prototype);
    ChildClass.prototype.constructor = ChildClass;
  },

  inRange(num1, num2, numTest){

    let min = (num1 <= num2) ? num1 : num2;
    let max = (num1 <= num2) ? num2 : num1;

    return Boolean(numTest > min && numTest < max);
  },

  uniqPositions(posArray){
    let uniqPositions = [];
    posArray.forEach((pos1) => {
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
  },

  DIM_X: window.innerWidth - 100,
  DIM_Y: window.innerHeight - 100
};

module.exports = Util;
