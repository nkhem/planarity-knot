const Util = {
  inherits(ChildClass, ParentClass) {
    ChildClass.prototype = Object.create(ParentClass.prototype);
    ChildClass.prototype.constructor = ChildClass;
  },

  samePos(pos1, pos2){
    const x1 = pos1[0];
    const y1 = pos1[1];

    const x2 = pos2[0];
    const y2 = pos2[1];

    return Boolean(x1 === x2 && y1 === y2);
  },

  distance(pos1, pos2) {
    const x1 = pos1[0];
    const y1 = pos1[1];

    const x2 = pos2[0];
    const y2 = pos2[1];

    return Math.sqrt(
      Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)
    );
  },

  inRange(num1, num2, numTest){

    let min = (num1 <= num2) ? num1 : num2;
    let max = (num1 <= num2) ? num2 : num1;

    return Boolean(numTest > min && numTest < max);
  },

  posInRange(startPos, endPos, testPos){
    const testX = testPos[0];
    const testY = testPos[1];

    const startX = startPos[0];
    const startY = startPos[1];

    const endX = endPos[0];
    const endY = endPos[1];

    const isXInRange = Util.inRange(startX, endX, testX);
    const isYInRange = Util.inRange(startY, endY, testY);

    return Boolean(isXInRange && isYInRange);
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

  onClassClick(className, fxn){
    document.getElementsByClassName(className)[0].addEventListener(
      'click', fxn);
  },

  onIdClick(elementId, fxn){
    document.getElementById(elementId).addEventListener(
      'click', fxn);
  },

  unhide(tagName){
    let isTagClass = document.getElementsByClassName(tagName)[0];
    let isTagId = document.getElementById(tagName);

    if (isTagClass) {
      document.getElementsByClassName(tagName)[0].classList.remove('hidden');
    } else if (isTagId) {
      document.getElementById(tagName).classList.remove('hidden');
    }
  },

  hide(tagName){
    let isTagClass = document.getElementsByClassName(tagName)[0];
    let isTagId = document.getElementById(tagName);

    if (isTagClass) {
      document.getElementsByClassName(tagName)[0].classList.add('hidden');
    } else if (isTagId) {
      document.getElementById(tagName).classList.add('hidden');
    }
  },

  clonePositions(posArray){
    let clones = [];
    posArray.forEach(pos => {
      clones.push([pos[0], pos[1]]);
    });
    return clones;
  },

  DIM_X: window.innerWidth - 300,
  DIM_Y: window.innerHeight - 100,
  POINT_RADIUS: 10,
  LINE_WIDTH: 4
};

module.exports = Util;
